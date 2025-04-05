# Creating a Personal Access Token (PAT) for Airtable

As of February 1, 2024, Airtable has fully deprecated API keys in favor of Personal Access Tokens (PATs). This guide will walk you through creating a PAT for use with the CeLeste CMS project.

## Step 1: Access the Developer Hub

1. Log in to your Airtable account
2. Click on your account icon in the top right corner
3. From the menu, select "Developer hub" (or access it directly at https://airtable.com/create/tokens)

## Step 2: Create a New Token

1. In the Developer hub, click on the "Personal access tokens" tab
2. Click the "+ Create new token" button
3. Give your token a descriptive name (e.g., "CeLeste CMS Setup")

## Step 3: Configure Scopes and Access

For the CeLeste CMS setup script to work properly, you'll need to grant the following scopes:

1. **data.records:read** - To read records
2. **data.records:write** - To create/update records
3. **schema.bases:read** - To read base schema
4. **schema.bases:write** - To create bases and define schema

For access level, select:
- "All workspaces" - For broad access to create new bases
- Or select specific workspaces where you want the bases to be created

## Step 4: Set Token Expiration

For security purposes, Airtable requires you to set an expiration date for your token:
- For setup purposes, you can set a short expiration (e.g., 1 week)
- For ongoing usage in your application, consider a longer duration (e.g., several months)

## Step 5: Create Token

1. Review the scopes and access you've granted
2. Click "Create token"
3. Airtable will generate your PAT and display it once - **copy it immediately**
4. Store this token securely - it won't be shown again, and you'll need to create a new one if you lose it

## Step 6: Use the Token

1. Add the token to your `.env` file as `AIRTABLE_PERSONAL_ACCESS_TOKEN=your_token_here`
2. Use this in place of the former API key in all your code that interacts with Airtable

## Security Considerations

- Never commit your token to version control
- Use environment variables to store the token
- Set appropriate expiration dates
- Create separate tokens for development and production
- Regenerate tokens if you suspect they've been compromised

## Troubleshooting

If you encounter permission errors when using your token, verify:
1. You've granted all necessary scopes
2. You've given access to the correct workspaces
3. The token hasn't expired

For more details, refer to the [official Airtable documentation on Personal Access Tokens](https://airtable.com/developers/web/guides/personal-access-tokens).