# CeLeste CMS Airtable Scripts

This directory contains scripts and documentation for setting up and integrating Airtable with the CeLeste CMS platform.

## Contents

1. **[setup-instructions.md](./setup-instructions.md)** - Instructions for running the Airtable setup script
2. **[airtable-setup.js](./airtable-setup.js)** - Script to automatically create Airtable bases and tables
3. **[airtable-sveltekit-integration.md](./airtable-sveltekit-integration.md)** - Guide for integrating Airtable with SvelteKit
4. **[personal-access-token-guide.md](./personal-access-token-guide.md)** - How to create an Airtable Personal Access Token

## Quick Start

To set up Airtable for the CeLeste CMS:

1. Create a Personal Access Token in Airtable by following the [guide](./personal-access-token-guide.md)
2. Create a `.env` file based on the `.env.example` template
3. Install dependencies: `npm install`
4. Run the setup script: `npm run setup`
5. Note the base IDs that are generated and add them to your main project's `.env` file
6. Follow the [integration guide](./airtable-sveltekit-integration.md) to connect your SvelteKit app to Airtable

## Prerequisites

- Node.js installed on your system
- An Airtable account
- A Personal Access Token with appropriate scopes