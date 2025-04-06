import Airtable from 'airtable';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Configure Airtable with Personal Access Token
Airtable.configure({
  apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN,
});

// Base instances
export const platformConfigBase = Airtable.base(process.env.AIRTABLE_PLATFORM_CONFIG_BASE_ID || '');
export const templeContentBase = Airtable.base(process.env.AIRTABLE_TEMPLE_CONTENT_BASE_ID || '');
export const templeUsersBase = Airtable.base(process.env.AIRTABLE_TEMPLE_USERS_BASE_ID || '');

// Types
export interface AirtableRecord {
  id: string;
  [key: string]: any;
}

export interface SiteConfig {
  id: string;
  siteName: string;
  domain: string;
  languages: string[];
  defaultLanguage: string;
  active: boolean;
  createdAt: string;
  features: string[];
}

export interface NewsItem {
  id: string;
  siteId: string;
  title_en: string;
  title_pt: string;
  content_en: string;
  content_pt: string;
  publishDate: string;
  featured: boolean;
  image?: any[];
  slug: string;
}

export interface EventDetails {
  id: string;
  siteId: string;
  name_en: string;
  name_pt: string;
  description_en: string;
  description_pt: string;
  eventDate: string;
  location: string;
  coordinates?: string;
}

// Helper function to normalize Airtable records
export const normalizeRecords = <T extends AirtableRecord>(records: any[]): T[] => {
  return records.map((record) => ({
    id: record.id,
    ...record.fields,
  })) as T[];
};

// Get site configuration
export const getSiteConfig = async (siteId = process.env.TEMPLE_SITE_ID): Promise<SiteConfig> => {
  try {
    const records = await platformConfigBase('Sites')
      .select({
        filterByFormula: `RECORD_ID() = '${siteId}'`,
      })
      .firstPage();
    
    if (records.length === 0) {
      throw new Error(`Site with ID ${siteId} not found`);
    }
    
    return normalizeRecords<SiteConfig>(records)[0];
  } catch (error) {
    console.error('Error fetching site config:', error);
    throw error;
  }
};

// Get news for a site
export const getNews = async (
  siteId = process.env.TEMPLE_SITE_ID, 
  options: { featured?: boolean; limit?: number } = {}
): Promise<NewsItem[]> => {
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
    
    return normalizeRecords<NewsItem>(records);
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};

// Get event details
export const getEventDetails = async (siteId = process.env.TEMPLE_SITE_ID): Promise<EventDetails | null> => {
  try {
    const records = await templeContentBase('Event')
      .select({
        filterByFormula: `siteId = '${siteId}'`,
      })
      .firstPage();
    
    return records.length > 0 ? normalizeRecords<EventDetails>(records)[0] : null;
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};

// Create or update member
export const upsertMember = async (memberData: any) => {
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
export const submitApplication = async (applicationData: any) => {
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
export const getMemberApplications = async (memberEmail: string) => {
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
