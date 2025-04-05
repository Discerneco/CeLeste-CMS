# Airtable Integration for CeLeste CMS

This document outlines the Airtable setup and integration process for the CeLeste CMS platform. All necessary scripts and detailed instructions can be found in the `/scripts` directory.

## Airtable Setup Overview

The CeLeste CMS platform uses Airtable as its primary database, with three main bases:

1. **Platform Configuration Base** - Stores site configurations
2. **Content Base** - Stores site-specific content like news and events
3. **Users Base** - Manages members and fund applications

## Setup Process

We've provided an automated setup script to create all necessary Airtable bases and tables. To use it:

1. **Create a Personal Access Token (PAT)** in Airtable
   - Follow the guide in `/scripts/personal-access-token-guide.md`
   - Ensure your token has the necessary scopes (data.records:read/write, schema.bases:read/write)

2. **Run the setup script**
   - Detailed instructions are available in `/scripts/setup-instructions.md`
   - The script will create all bases, tables, and a sample site configuration
   - At the end, it will output the base IDs needed for your environment variables

3. **Integrate with Next.js**
   - Follow the integration guide in `/scripts/airtable-nextjs-integration.md`
   - Set up environment variables and create Airtable service functions
   - Implement API routes and use the data in your components

## Base Structure

The script creates the following structure:

### Platform Configuration Base
- **Sites Table**: Configuration for all sites in the CeLeste CMS platform
  - Site name, domain, languages, features, etc.

### Content Base
- **News Table**: News articles for each site
  - Bilingual content (title_en/pt, content_en/pt)
  - Publishing metadata (date, featured status, etc.)
  - Image attachments
- **Event Table**: Event details
  - Bilingual information (name_en/pt, description_en/pt)
  - Event date, location, coordinates

### Users Base
- **Members Table**: Registered users
  - Email, name, approval status, role
  - Creation timestamp
- **Applications Table**: Fund applications
  - Request amount, reason, status
  - Submission and approval dates
  - Internal notes

## Next.js Integration

The integration with Next.js includes:

1. **Environment Setup**: Configuring variables for base IDs and tokens
2. **Airtable Service**: Central service for all Airtable operations
3. **API Routes**: Server-side endpoints for frontend data access
4. **Components**: Ready-to-use React components for displaying data
5. **Bilingual Support**: Utilities for handling content in multiple languages

## Additional Resources

- **Package JSON**: A ready-to-use package.json for the setup script
- **Example .env File**: Template for required environment variables
- **Documentation**: Comprehensive guides for all aspects of the integration

## Security Considerations

- Never commit your Personal Access Token to version control
- Set appropriate expiration dates for your tokens
- Use environment variables to store sensitive information
- Create separate tokens for development and production environments
- Consider implementing rate limiting to avoid hitting Airtable API limits

## Support and Maintenance

The scripts and integration procedures are designed to be maintainable and extensible. As Airtable evolves, updates to these scripts may be necessary. Always refer to the official Airtable documentation for the latest best practices:

- [Airtable Developers Documentation](https://airtable.com/developers/web)
- [Personal Access Tokens Guide](https://airtable.com/developers/web/guides/personal-access-tokens)
