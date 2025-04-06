import { getSiteConfig, getNews, getEventDetails } from '$lib/airtable';
import { env } from '$env/dynamic/private';

/**
 * Server-side load function for the debug page
 * Fetches data from Airtable directly
 */
export async function load() {
  try {
    // Fetch data in parallel using Promise constructor to fix TypeScript error
    const results = await Promise.all([
      getSiteConfig(env.TEMPLE_SITE_ID),
      getNews(env.TEMPLE_SITE_ID, { featured: true, limit: 3 }),
      getEventDetails(env.TEMPLE_SITE_ID)
    ]);
    
    const [siteConfig, newsItems, eventDetails] = results;
    
    return {
      serverData: {
        siteConfig,
        newsItems,
        eventDetails,
        success: true
      }
    };
  } catch (error) {
    console.error('Error in server-side load function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred fetching data from Airtable';
    
    return {
      serverData: {
        error: errorMessage,
        success: false
      }
    };
  }
}
