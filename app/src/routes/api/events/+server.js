import { json } from '@sveltejs/kit';
import { getEventDetails } from '$lib/airtable';
import { env } from '$env/dynamic/private';

/**
 * GET handler for event details
 * @param {Object} request - The request object
 * @returns {Promise<Response>} JSON response with event details
 */
export async function GET() {
  try {
    // Fetch event details from Airtable
    const eventDetails = await getEventDetails(env.TEMPLE_SITE_ID);
    
    return json({
      success: true,
      data: eventDetails
    });
  } catch (error) {
    console.error('Error fetching event details:', error);
    
    return json({
      success: false,
      error: 'Failed to fetch event details'
    }, { status: 500 });
  }
}
