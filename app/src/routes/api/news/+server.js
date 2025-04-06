import { json } from '@sveltejs/kit';
import { getNews } from '$lib/airtable';
import { env } from '$env/dynamic/private';

/**
 * GET handler for news items
 * @param {Object} params - The request params with URL object
 * @param {URL} params.url - The request URL object
 * @returns {Promise<Response>} JSON response with news items
 */
export async function GET({ url }) {
  try {
    // Parse query parameters
    const featured = url.searchParams.get('featured') === 'true';
    const limitParam = url.searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam) : undefined;
    const pageParam = url.searchParams.get('page');
    const page = pageParam ? parseInt(pageParam) : 1;
    
    // Fetch news from Airtable
    const newsItems = await getNews(env.TEMPLE_SITE_ID, { 
      featured, 
      limit,
      page
    });
    
    return json({
      success: true,
      data: newsItems
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    
    return json({
      success: false,
      error: 'Failed to fetch news items'
    }, { status: 500 });
  }
}
