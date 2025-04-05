const axios = require('axios');
require('dotenv').config();

// Your Airtable Personal Access Token will be stored in .env file
const PERSONAL_ACCESS_TOKEN = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN;
const headers = {
  'Authorization': `Bearer ${PERSONAL_ACCESS_TOKEN}`,
  'Content-Type': 'application/json'
};

// Create bases for our CeLeste CMS
async function createBases() {
  console.log('Creating Airtable bases...');
  
  try {
    // Create Platform Configuration Base
    const configBase = await axios.post('https://api.airtable.com/v0/meta/bases', {
      name: 'CeLeste CMS - Platform Configuration',
      tables: [
        {
          name: 'Sites',
          description: 'Configuration for all sites in the CeLeste CMS platform',
          fields: [
            { name: 'siteName', type: 'singleLineText' },
            { name: 'domain', type: 'singleLineText' },
            { name: 'languages', type: 'multipleSelects', options: { choices: [
              { name: 'en', label: 'English' },
              { name: 'pt', label: 'Portuguese' }
            ]}},
            { name: 'defaultLanguage', type: 'singleSelect', options: { choices: [
              { name: 'en', label: 'English' },
              { name: 'pt', label: 'Portuguese' }
            ]}},
            { name: 'active', type: 'checkbox' },
            { name: 'createdAt', type: 'dateTime' },
            { name: 'features', type: 'multipleSelects', options: { choices: [
              { name: 'countdown', label: 'Countdown' },
              { name: 'news', label: 'News' },
              { name: 'fundraising', label: 'Fundraising' },
              { name: 'applications', label: 'Fund Applications' }
            ]}}
          ]
        }
      ]
    }, { headers });
    
    console.log('Created Platform Configuration Base:', configBase.data.id);
    
    // Create Content Base for Temple Reunion
    const contentBase = await axios.post('https://api.airtable.com/v0/meta/bases', {
      name: 'CeLeste CMS - Temple Reunion Content',
      tables: [
        {
          name: 'News',
          description: 'News articles for the Temple Reunion site',
          fields: [
            { name: 'siteId', type: 'singleLineText' },
            { name: 'title_en', type: 'singleLineText' },
            { name: 'title_pt', type: 'singleLineText' },
            { name: 'content_en', type: 'multilineText' },
            { name: 'content_pt', type: 'multilineText' },
            { name: 'publishDate', type: 'date' },
            { name: 'featured', type: 'checkbox' },
            { name: 'image', type: 'multipleAttachments' },
            { name: 'slug', type: 'singleLineText' }
          ]
        },
        {
          name: 'Event',
          description: 'Event details for the Temple Reunion',
          fields: [
            { name: 'siteId', type: 'singleLineText' },
            { name: 'name_en', type: 'singleLineText' },
            { name: 'name_pt', type: 'singleLineText' },
            { name: 'description_en', type: 'multilineText' },
            { name: 'description_pt', type: 'multilineText' },
            { name: 'eventDate', type: 'dateTime' },
            { name: 'location', type: 'singleLineText' },
            { name: 'coordinates', type: 'singleLineText' }
          ]
        }
      ]
    }, { headers });
    
    console.log('Created Content Base:', contentBase.data.id);
    
    // Create Users Base for Temple Reunion
    const usersBase = await axios.post('https://api.airtable.com/v0/meta/bases', {
      name: 'CeLeste CMS - Temple Reunion Users',
      tables: [
        {
          name: 'Members',
          description: 'Registered members for the Temple Reunion site',
          fields: [
            { name: 'siteId', type: 'singleLineText' },
            { name: 'email', type: 'email' },
            { name: 'name', type: 'singleLineText' },
            { name: 'approved', type: 'checkbox' },
            { name: 'role', type: 'singleSelect', options: { choices: [
              { name: 'admin', label: 'Admin' },
              { name: 'editor', label: 'Editor' },
              { name: 'member', label: 'Member' }
            ]}},
            { name: 'createdAt', type: 'dateTime' }
          ]
        },
        {
          name: 'Applications',
          description: 'Fund applications for the Temple Reunion',
          fields: [
            { name: 'siteId', type: 'singleLineText' },
            { name: 'memberEmail', type: 'email' },
            { name: 'requestAmount', type: 'number', options: { precision: 2 } },
            { name: 'reason', type: 'multilineText' },
            { name: 'status', type: 'singleSelect', options: { choices: [
              { name: 'new', label: 'New' },
              { name: 'underReview', label: 'Under Review' },
              { name: 'approved', label: 'Approved' },
              { name: 'rejected', label: 'Rejected' }
            ]}},
            { name: 'submittedDate', type: 'dateTime' },
            { name: 'approvedDate', type: 'dateTime' },
            { name: 'notes', type: 'multilineText' }
          ]
        }
      ]
    }, { headers });
    
    console.log('Created Users Base:', usersBase.data.id);
    
    // Save the base IDs to a config file for the CMS
    const baseConfig = {
      platformConfigBaseId: configBase.data.id,
      templeReunionContentBaseId: contentBase.data.id,
      templeReunionUsersBaseId: usersBase.data.id
    };
    
    console.log('Airtable Base Configuration:', baseConfig);
    console.log('Please save these IDs to your CMS configuration');
    
    return baseConfig;
    
  } catch (error) {
    console.error('Error creating Airtable bases:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Create a sample site in the Sites table
async function createSampleSite(platformConfigBaseId) {
  console.log('Creating sample Temple Reunion site configuration...');
  
  try {
    const sitesTableId = await getTableId(platformConfigBaseId, 'Sites');
    
    const response = await axios.post(`https://api.airtable.com/v0/${platformConfigBaseId}/${sitesTableId}`, {
      records: [
        {
          fields: {
            siteName: 'Temple Reunion',
            domain: 'templereunion.com',
            languages: ['en', 'pt'],
            defaultLanguage: 'pt',
            active: true,
            createdAt: new Date().toISOString(),
            features: ['countdown', 'news', 'fundraising', 'applications']
          }
        }
      ]
    }, { headers });
    
    console.log('Created sample site configuration:', response.data.records[0].id);
    return response.data.records[0].id;
    
  } catch (error) {
    console.error('Error creating sample site:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Helper function to get a table ID by name
async function getTableId(baseId, tableName) {
  try {
    const response = await axios.get(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, { headers });
    const table = response.data.tables.find(t => t.name === tableName);
    if (!table) {
      throw new Error(`Table ${tableName} not found in base ${baseId}`);
    }
    return table.id;
  } catch (error) {
    console.error(`Error getting table ID for ${tableName}:`, error.response ? error.response.data : error.message);
    throw error;
  }
}

// Main execution function
async function setupAirtable() {
  try {
    console.log('Starting Airtable setup for CeLeste CMS...');
    
    // Create all the bases with their tables and fields
    const baseConfig = await createBases();
    
    // Create a sample site configuration
    const siteId = await createSampleSite(baseConfig.platformConfigBaseId);
    
    console.log('\nSetup completed successfully!');
    console.log(`Sample site created with ID: ${siteId}`);
    console.log('\nPlease add the following configuration to your .env file:');
    console.log(`AIRTABLE_PLATFORM_CONFIG_BASE_ID=${baseConfig.platformConfigBaseId}`);
    console.log(`AIRTABLE_TEMPLE_CONTENT_BASE_ID=${baseConfig.templeReunionContentBaseId}`);
    console.log(`AIRTABLE_TEMPLE_USERS_BASE_ID=${baseConfig.templeReunionUsersBaseId}`);
    console.log(`TEMPLE_SITE_ID=${siteId}`);
    
  } catch (error) {
    console.error('Setup failed:', error);
  }
}

// Run the setup
setupAirtable();