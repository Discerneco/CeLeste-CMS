# Airtable Setup for CeLeste CMS

This guide will help you run the Airtable setup script to automatically create your CMS database structure.

## Prerequisites

- Node.js installed on your machine
- Airtable account
- A Personal Access Token (PAT) from Airtable (API keys are deprecated)

## Installation Steps

1. Create a new directory for the setup script:
   ```bash
   mkdir celeste-airtable-setup
   cd celeste-airtable-setup
   ```

2. Create a package.json file:
   ```bash
   npm init -y
   ```

3. Install required dependencies:
   ```bash
   npm install axios dotenv
   ```

4. Create a `.env` file in the same directory with your Airtable Personal Access Token:
   ```
   AIRTABLE_PERSONAL_ACCESS_TOKEN=your_personal_access_token_here
   ```

5. Copy the `airtable-setup.js` script from the `scripts` folder into your setup directory

6. Run the script:
   ```bash
   node airtable-setup.js
   ```

7. After running the script successfully, it will output the base IDs that were created. Add these to your main project's `.env` file.

## Troubleshooting

- If you encounter any errors related to API permissions, make sure your Personal Access Token has the necessary scopes and permissions.
- The free tier of Airtable has some limitations on the number of bases you can create. If you're at the limit, you may need to delete unused bases first.

## Next Steps

After setting up your Airtable structure:

1. Add these base IDs to your Next.js project's environment variables
2. Configure your API services to connect to these bases
3. Start developing your CMS features
