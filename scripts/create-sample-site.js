const axios = require('axios');
require('dotenv').config({ path: '../app/.env' });

// Your Airtable API Key from .env file
const API_KEY = process.env.AIRTABLE_API_KEY;
const CONFIG_BASE_ID = process.env.AIRTABLE_CONFIG_BASE_ID;
const CONTENT_BASE_ID = process.env.AIRTABLE_CONTENT_BASE_ID;

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
};

// Create a sample site in the Sites table
async function createSampleSite() {
  console.log('Creating sample Temple Reunion site configuration...');
  
  try {
    // First, get the table ID for the Sites table
    const tablesResponse = await axios.get(`https://api.airtable.com/v0/meta/bases/${CONFIG_BASE_ID}/tables`, { headers });
    const sitesTable = tablesResponse.data.tables.find(t => t.name === 'Sites');
    
    if (!sitesTable) {
      throw new Error('Sites table not found in the Platform Configuration base');
    }
    
    // Create a sample site record
    const response = await axios.post(`https://api.airtable.com/v0/${CONFIG_BASE_ID}/${sitesTable.id}`, {
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
    
    const siteId = response.data.records[0].id;
    console.log('Created sample site configuration with ID:', siteId);
    
    // Now create some sample news articles
    await createSampleNews(siteId);
    
    // And create a sample event
    await createSampleEvent(siteId);
    
    console.log('\nSetup completed successfully!');
    console.log(`Sample site created with ID: ${siteId}`);
    console.log('\nPlease update your .env file with:');
    console.log(`TEMPLE_SITE_ID=${siteId}`);
    
    return siteId;
    
  } catch (error) {
    console.error('Error creating sample site:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Create sample news articles
async function createSampleNews(siteId) {
  console.log('Creating sample news articles...');
  
  try {
    // First, get the table ID for the News table
    const tablesResponse = await axios.get(`https://api.airtable.com/v0/meta/bases/${CONTENT_BASE_ID}/tables`, { headers });
    const newsTable = tablesResponse.data.tables.find(t => t.name === 'News');
    
    if (!newsTable) {
      throw new Error('News table not found in the Temple Content base');
    }
    
    // Create sample news articles
    const response = await axios.post(`https://api.airtable.com/v0/${CONTENT_BASE_ID}/${newsTable.id}`, {
      records: [
        {
          fields: {
            siteId: siteId,
            title_en: 'Temple Reunion Announced',
            title_pt: 'Reunião do Templo Anunciada',
            content_en: 'We are excited to announce the upcoming Temple Reunion event. Join us for a weekend of celebration and connection.',
            content_pt: 'Estamos animados em anunciar o próximo evento de Reunião do Templo. Junte-se a nós para um fim de semana de celebração e conexão.',
            publishDate: new Date().toISOString().split('T')[0],
            featured: true,
            slug: 'temple-reunion-announced'
          }
        },
        {
          fields: {
            siteId: siteId,
            title_en: 'Fundraising Campaign Launched',
            title_pt: 'Campanha de Arrecadação Lançada',
            content_en: 'Our fundraising campaign for the Temple Reunion has officially launched. Your contributions will help make this event a success.',
            content_pt: 'Nossa campanha de arrecadação para a Reunião do Templo foi oficialmente lançada. Suas contribuições ajudarão a tornar este evento um sucesso.',
            publishDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
            featured: false,
            slug: 'fundraising-campaign-launched'
          }
        }
      ]
    }, { headers });
    
    console.log('Created sample news articles:', response.data.records.length);
    
  } catch (error) {
    console.error('Error creating sample news:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Create a sample event
async function createSampleEvent(siteId) {
  console.log('Creating sample event...');
  
  try {
    // First, get the table ID for the Event table
    const tablesResponse = await axios.get(`https://api.airtable.com/v0/meta/bases/${CONTENT_BASE_ID}/tables`, { headers });
    const eventTable = tablesResponse.data.tables.find(t => t.name === 'Event');
    
    if (!eventTable) {
      throw new Error('Event table not found in the Temple Content base');
    }
    
    // Create a sample event
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + 2); // Event in 2 months
    
    const response = await axios.post(`https://api.airtable.com/v0/${CONTENT_BASE_ID}/${eventTable.id}`, {
      records: [
        {
          fields: {
            siteId: siteId,
            name_en: 'Temple Reunion 2025',
            name_pt: 'Reunião do Templo 2025',
            description_en: 'Join us for the annual Temple Reunion event. This year we will be celebrating our community and connection.',
            description_pt: 'Junte-se a nós para o evento anual de Reunião do Templo. Este ano estaremos celebrando nossa comunidade e conexão.',
            eventDate: futureDate.toISOString(),
            location: 'São Paulo, Brazil',
            coordinates: '-23.550520,-46.633308'
          }
        }
      ]
    }, { headers });
    
    console.log('Created sample event:', response.data.records[0].id);
    
  } catch (error) {
    console.error('Error creating sample event:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Run the setup
createSampleSite().catch(console.error);
