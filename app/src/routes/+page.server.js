import { getSiteConfig, getNews, getEventDetails } from '$lib/airtable';
import { env } from '$env/dynamic/private';

/**
 * Server-side load function for the homepage
 * Fetches data from Airtable for the homepage content
 */
export async function load() {
  try {
    // Fetch featured news and event details in parallel
    const results = await Promise.all([
      getNews(env.TEMPLE_SITE_ID, { featured: true, limit: 3 }),
      getEventDetails(env.TEMPLE_SITE_ID)
    ]);
    
    const [featuredNews, eventDetails] = results;
    
    return {
      featuredNews,
      eventDetails,
      success: true
    };
  } catch (error) {
    console.error('Error in homepage load function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred fetching data from Airtable';
    
    return {
      featuredNews: [],
      eventDetails: null,
      error: errorMessage,
      success: false
    };
  }
}
