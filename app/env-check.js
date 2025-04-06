// Simple script to check if environment variables are loading correctly
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check if .env file exists
const envPath = join(__dirname, '.env');
console.log(`Checking for .env file at: ${envPath}`);
console.log(`File exists: ${fs.existsSync(envPath)}`);

// Print environment variables (without values for security)
console.log('\nEnvironment Variables:');
const envVars = [
  'AIRTABLE_PERSONAL_ACCESS_TOKEN',
  'AIRTABLE_PLATFORM_CONFIG_BASE_ID',
  'AIRTABLE_TEMPLE_CONTENT_BASE_ID',
  'AIRTABLE_TEMPLE_USERS_BASE_ID',
  'TEMPLE_SITE_ID',
  'PUBLIC_SITE_URL',
  'PUBLIC_DEFAULT_LOCALE'
];

envVars.forEach(varName => {
  console.log(`${varName}: ${process.env[varName] ? '[SET]' : '[NOT SET]'}`);
});
