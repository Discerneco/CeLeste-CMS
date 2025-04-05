# Next.js Airtable Integration for CeLeste CMS

This guide outlines how to integrate Airtable with your Next.js project after setting up the Airtable bases.

## Step 1: Environment Setup

Create a `.env.local` file in your Next.js project root with the following variables:

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

## Step 2: Install Dependencies

```bash
npm install airtable
```

## Step 3: Create Airtable Service

Create a service file at `lib/airtable.js`:

```javascript
import Airtable from 'airtable';

// Configure Airtable with Personal Access Token
Airtable.configure({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
});

// Base instances
export const platformConfigBase = Airtable.base(process.env.AIRTABLE_PLATFORM_CONFIG_BASE_ID);
export const templeContentBase = Airtable.base(process.env.AIRTABLE_TEMPLE_CONTENT_BASE_ID);
export const templeUsersBase = Airtable.base(process.env.AIRTABLE_TEMPLE_USERS_BASE_ID);

// Helper function to normalize Airtable records
export const normalizeRecords = (records) => {
  return records.map((record) => ({
    id: record.id,
    ...record.fields,
  }));
};

// Get site configuration
export const getSiteConfig = async (siteId = process.env.TEMPLE_SITE_ID) => {
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
export const getNews = async (siteId = process.env.TEMPLE_SITE_ID, options = {}) => {
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
export const getEventDetails = async (siteId = process.env.TEMPLE_SITE_ID) => {
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

## Step 4: Create API Routes

Create an API route for each service you need to expose to the frontend, for example:

```javascript
// pages/api/news.js
import { getNews } from '../../lib/airtable';

export default async function handler(req, res) {
  try {
    const { featured, limit } = req.query;
    const news = await getNews(process.env.TEMPLE_SITE_ID, {
      featured: featured === 'true',
      limit: parseInt(limit) || undefined,
    });
    
    res.status(200).json(news);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}
```

## Step 5: Use in Components

Example usage in a React component:

```jsx
// components/NewsFeed.js
import { useState, useEffect } from 'react';

export default function NewsFeed({ featured = false, limit = 10 }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(
          `/api/news?featured=${featured}&limit=${limit}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error in NewsFeed component:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNews();
  }, [featured, limit]);
  
  if (loading) {
    return <div>Loading news...</div>;
  }
  
  return (
    <div className="news-feed">
      <h2>Latest News</h2>
      {news.length === 0 ? (
        <p>No news available.</p>
      ) : (
        <ul>
          {news.map((item) => (
            <li key={item.id}>
              <h3>{item.title_en}</h3>
              <p>{new Date(item.publishDate).toLocaleDateString()}</p>
              <div dangerouslySetInnerHTML={{ __html: item.content_en }} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## Step 6: Server-Side Data Fetching

For pages that need server-side data:

```jsx
// pages/index.js
import { GetStaticProps } from 'next';
import { getNews, getEventDetails } from '../lib/airtable';

export default function HomePage({ featuredNews, eventDetails }) {
  // Component implementation
}

export const getStaticProps = async () => {
  try {
    const [featuredNews, eventDetails] = await Promise.all([
      getNews(process.env.TEMPLE_SITE_ID, { featured: true, limit: 3 }),
      getEventDetails(process.env.TEMPLE_SITE_ID),
    ]);
    
    return {
      props: {
        featuredNews,
        eventDetails,
      },
      revalidate: 60, // Regenerate page every 60 seconds
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        featuredNews: [],
        eventDetails: null,
      },
      revalidate: 60,
    };
  }
};
```

## Step 7: Bilingual Content Handling

Example of handling content in multiple languages:

```jsx
import { useRouter } from 'next/router';

export default function BilingualContent({ content }) {
  const { locale } = useRouter();
  
  // Get the appropriate field based on current locale
  const getLocalizedField = (fieldName) => {
    const suffix = locale === 'pt' ? '_pt' : '_en';
    return content[`${fieldName}${suffix}`];
  };
  
  return (
    <div>
      <h1>{getLocalizedField('title')}</h1>
      <div dangerouslySetInnerHTML={{ __html: getLocalizedField('content') }} />
    </div>
  );
}
```

## Additional Tips

1. **Caching**: Consider adding a caching layer (like Redis or simple in-memory caching) to avoid hitting Airtable API limits.

2. **Rate Limiting**: Airtable has rate limits, so implement retry mechanisms and queuing for high-traffic scenarios.

3. **Error Handling**: Implement robust error handling throughout your application.

4. **Webhooks**: For real-time updates, consider setting up Airtable automations to trigger webhooks when data changes.

5. **Connection Pooling**: Reuse Airtable base connections where possible rather than creating new ones for each request.
