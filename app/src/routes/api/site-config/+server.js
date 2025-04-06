import { json } from '@sveltejs/kit';
import { getSiteConfig } from '$lib/airtable';
import { env } from '$env/dynamic/private';

/**
 * GET handler for site configuration
 * @param {Object} request - The request object
 * @returns {Promise<Response>} JSON response with site configuration
 */
export async function GET() {
  try {
    const siteConfig = await getSiteConfig(env.TEMPLE_SITE_ID);
    
    return json({
      success: true,
      data: siteConfig
    });
  } catch (error) {
    console.error('Error fetching site config:', error);
    
    return json({
      success: false,
      error: 'Failed to fetch site configuration'
    }, { status: 500 });
  }
}
