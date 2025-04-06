// Simple script to debug environment variables
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

console.log('Environment Variables:');
console.log('AIRTABLE_API_KEY:', process.env.AIRTABLE_API_KEY ? 'Set (hidden for security)' : 'Not set');
console.log('AIRTABLE_CONFIG_BASE_ID:', process.env.AIRTABLE_CONFIG_BASE_ID);
console.log('AIRTABLE_CONTENT_BASE_ID:', process.env.AIRTABLE_CONTENT_BASE_ID);
console.log('AIRTABLE_USERS_BASE_ID:', process.env.AIRTABLE_USERS_BASE_ID);
console.log('TEMPLE_SITE_ID:', process.env.TEMPLE_SITE_ID);

// Check if .env file exists and read its content (without showing sensitive values)
const envPath = join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('\n.env file exists at:', envPath);
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');
  console.log('\n.env file structure:');
  envLines.forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key] = line.split('=');
      console.log(`- ${key}: Set`);
    } else if (line.trim() && line.startsWith('#')) {
      console.log(`- Comment: ${line}`);
    }
  });
} else {
  console.log('\n.env file does not exist at:', envPath);
}
