# SvelteKit Airtable Integration for CeLeste CMS

This guide outlines how to integrate Airtable with your SvelteKit project after setting up the Airtable bases.

## Step 1: Environment Setup

Create a `.env` file in your SvelteKit project root with the following variables:

```
# Airtable Personal Access Token
AIRTABLE_PERSONAL_ACCESS_TOKEN=your_personal_access_token_here

# Base IDs
AIRTABLE_PLATFORM_CONFIG_BASE_ID=your_platform_config_base_id
AIRTABLE_TEMPLE_CONTENT_BASE_ID=your_temple_content_base_id
AIRTABLE_TEMPLE_USERS_BASE_ID=your_temple_users_base_id

# Site ID for Temple Reunion
TEMPLE_SITE_ID=your_temple_site_id
```

Then update your `vite.config.js` to expose these environment variables to your app:

```javascript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    fs: {
      allow: ['.']
    }
  },
  define: {
    'process.env': process.env
  }
});
```

## Step 2: Install Dependencies

```bash
npm install airtable dotenv
```

## Step 3: Create Airtable Service

Create a service file at `src/lib/airtable.js`:

```javascript
import Airtable from 'airtable';
import { env } from '$env/dynamic/private';

// Configure Airtable with Personal Access Token
Airtable.configure({
  apiKey: env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
});

// Base instances
export const platformConfigBase = Airtable.base(env.AIRTABLE_PLATFORM_CONFIG_BASE_ID);
export const templeContentBase = Airtable.base(env.AIRTABLE_TEMPLE_CONTENT_BASE_ID);
export const templeUsersBase = Airtable.base(env.AIRTABLE_TEMPLE_USERS_BASE_ID);

// Helper function to normalize Airtable records
export const normalizeRecords = (records) => {
  return records.map((record) => ({
    id: record.id,
    ...record.fields,
  }));
};

// Get site configuration
export const getSiteConfig = async (siteId = env.TEMPLE_SITE_ID) => {
  try {
    const records = await platformConfigBase('Sites')
      .select({
        filterByFormula: `RECORD_ID() = '${siteId}'`,
      })
      .firstPage();
    
    if (records.length === 0) {
      throw new Error(`Site with ID ${siteId} not found`);
    }
    
    return normalizeRecords(records)[0];
  } catch (error) {
    console.error('Error fetching site config:', error);
    throw error;
  }
};

// Get news for a site
export const getNews = async (siteId = env.TEMPLE_SITE_ID, options = {}) => {
  const { featured, limit } = options;
  
  try {
    let filterFormula = `siteId = '${siteId}'`;
    
    if (featured) {
      filterFormula = `AND(${filterFormula}, featured = TRUE())`;
    }
    
    const records = await templeContentBase('News')
      .select({
        filterByFormula: filterFormula,
        sort: [{ field: 'publishDate', direction: 'desc' }],
        maxRecords: limit || 100,
      })
      .firstPage();
    
    return normalizeRecords(records);
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

// Get event details
export const getEventDetails = async (siteId = env.TEMPLE_SITE_ID) => {
  try {
    const records = await templeContentBase('Event')
      .select({
        filterByFormula: `siteId = '${siteId}'`,
      })
      .firstPage();
    
    return records.length > 0 ? normalizeRecords(records)[0] : null;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};

// Create or update member
export const upsertMember = async (memberData) => {
  try {
    // Check if member exists
    const existingRecords = await templeUsersBase('Members')
      .select({
        filterByFormula: `email = '${memberData.email}'`,
      })
      .firstPage();
    
    if (existingRecords.length > 0) {
      // Update existing member
      const record = await templeUsersBase('Members').update(existingRecords[0].id, memberData);
      return normalizeRecords([record])[0];
    } else {
      // Create new member
      const record = await templeUsersBase('Members').create(memberData);
      return normalizeRecords([record])[0];
    }
  } catch (error) {
    console.error('Error upserting member:', error);
    throw error;
  }
};

// Submit fund application
export const submitApplication = async (applicationData) => {
  try {
    const record = await templeUsersBase('Applications').create({
      ...applicationData,
      submittedDate: new Date().toISOString(),
      status: 'new',
    });
    
    return normalizeRecords([record])[0];
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};

// Get member applications
export const getMemberApplications = async (memberEmail) => {
  try {
    const records = await templeUsersBase('Applications')
      .select({
        filterByFormula: `memberEmail = '${memberEmail}'`,
      })
      .firstPage();
    
    return normalizeRecords(records);
  } catch (error) {
    console.error('Error fetching member applications:', error);
    throw error;
  }
};
```

## Step 4: Create API Endpoints

Create server endpoints for each service you need to expose to the frontend. In SvelteKit, you can use the `+server.js` files in your routes directory:

```javascript
// src/routes/api/news/+server.js
import { getNews } from '$lib/airtable';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET({ url }) {
  try {
    const featured = url.searchParams.get('featured') === 'true';
    const limit = parseInt(url.searchParams.get('limit') || '100');
    
    const news = await getNews(env.TEMPLE_SITE_ID, {
      featured,
      limit,
    });
    
    return json(news);
  } catch (error) {
    console.error('API error:', error);
    return json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
```

## Step 5: Use in Components

Example usage in a Svelte component:

```svelte
<!-- src/lib/components/NewsFeed.svelte -->
<script>
  import { onMount } from 'svelte';

  export let featured = false;
  export let limit = 10;
  
  let news = [];
  let loading = true;
  
  async function fetchNews() {
    try {
      const response = await fetch(
        `/api/news?featured=${featured}&limit=${limit}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      
      news = await response.json();
    } catch (error) {
      console.error('Error in NewsFeed component:', error);
    } finally {
      loading = false;
    }
  }
  
  onMount(fetchNews);

  $: if (featured !== undefined || limit !== undefined) {
    fetchNews();
  }
</script>

{#if loading}
  <div>Loading news...</div>
{:else}
  <div class="news-feed">
    <h2>Latest News</h2>
    {#if news.length === 0}
      <p>No news available.</p>
    {:else}
      <ul>
        {#each news as item}
          <li>
            <h3>{item.title_en}</h3>
            <p>{new Date(item.publishDate).toLocaleDateString()}</p>
            {@html item.content_en}
          </li>
        {/each}
      </ul>
    {/if}
  </div>
{/if}
```

## Step 6: Server-Side Data Fetching

For pages that need server-side data in SvelteKit, use the `+page.server.js` file:

```javascript
// src/routes/+page.server.js
import { getNews, getEventDetails } from '$lib/airtable';
import { env } from '$env/dynamic/private';

export async function load() {
  try {
    const [featuredNews, eventDetails] = await Promise.all([
      getNews(env.TEMPLE_SITE_ID, { featured: true, limit: 3 }),
      getEventDetails(env.TEMPLE_SITE_ID),
    ]);
    
    return {
      featuredNews,
      eventDetails,
    };
  } catch (error) {
    console.error('Error in load function:', error);
    return {
      featuredNews: [],
      eventDetails: null,
    };
  }
}
```

## Step 7: Bilingual Content Handling with svelte-i18n

SvelteKit projects can use svelte-i18n for internationalization. First, install it:

```bash
npm install svelte-i18n
```

Then set up the i18n configuration in `src/lib/i18n.js`:

```javascript
import { browser } from '$app/environment';
import { init, register, locale } from 'svelte-i18n';

register('en', () => import('./locales/en.json'));
register('pt', () => import('./locales/pt.json'));

init({
  fallbackLocale: 'en',
  initialLocale: browser ? window.navigator.language.split('-')[0] : 'en',
});

export { locale };
```

Example of handling content in multiple languages:

```svelte
<!-- src/lib/components/BilingualContent.svelte -->
<script>
  import { page } from '$app/stores';
  
  export let content;
  
  // Get the appropriate field based on current locale
  function getLocalizedField(fieldName) {
    const locale = $page.params.lang || 'en';
    const suffix = locale === 'pt' ? '_pt' : '_en';
    return content[`${fieldName}${suffix}`];
  }
</script>

<div>
  <h1>{getLocalizedField('title')}</h1>
  {@html getLocalizedField('content')}
</div>
```

## Additional Tips

1. **Caching**: Consider adding a caching layer (like Redis or simple in-memory caching) to avoid hitting Airtable API limits.

2. **Rate Limiting**: Airtable has rate limits, so implement retry mechanisms and queuing for high-traffic scenarios.

3. **SvelteKit Hooks**: Use SvelteKit hooks (`src/hooks.server.js`) to add global middleware for authentication or logging.

4. **Environment Variables**: Remember that in SvelteKit, you need to use `$env/static/private` or `$env/dynamic/private` for server-side environment variables, and `$env/static/public` for client-side variables (which must be prefixed with `PUBLIC_`).

5. **Deployment**: When deploying to Vercel, make sure to select the SvelteKit framework preset for optimal configuration.

3. **Error Handling**: Implement robust error handling throughout your application.

4. **Webhooks**: For real-time updates, consider setting up Airtable automations to trigger webhooks when data changes.

5. **Connection Pooling**: Reuse Airtable base connections where possible rather than creating new ones for each request.
