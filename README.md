# CeLeste CMS Platform

A flexible content management system for multiple bilingual websites, with the first implementation being a Temple reunion and fundraising website.

## Project Documentation

- [Implementation Timeline](./implementation-timeline.md) - Development phases and schedule
- [Airtable Integration](./airtable-integration.md) - Database setup and integration

## Setup Scripts

We've provided scripts to automate the setup process. See the [scripts directory](./scripts) for:

- Airtable database setup automation
- Next.js integration helpers
- Guide for creating Personal Access Tokens

## Features

The CeLeste CMS platform includes:

- **Multi-Site Support**: Run multiple websites from a single CMS instance
- **Bilingual Content**: Support for content in multiple languages (initially Brazilian Portuguese and American English)
- **Flexible Architecture**: Extensible design for adding new features and sites
- **Airtable Backend**: Leveraging Airtable for content management
- **Next.js Frontend**: Modern React-based frontend with server-side rendering

## Temple Reunion Site

The first implementation is a reunion and fundraising site with:

1. **Public Content**
   - Event countdown
   - News feed
   - GoFundMe integration

2. **Private Section**
   - Member registration
   - Fund application process
   - Application status tracking

## Getting Started

1. **Set up Airtable**
   - Follow the instructions in [scripts/setup-instructions.md](./scripts/setup-instructions.md)
   - Create a Personal Access Token using [scripts/personal-access-token-guide.md](./scripts/personal-access-token-guide.md)
   - Run the setup script to create all required bases and tables

2. **Set up Next.js project**
   - Install dependencies: `npm install`
   - Configure environment variables (see `.env.example`)
   - Follow the Airtable integration guide: [scripts/airtable-nextjs-integration.md](./scripts/airtable-nextjs-integration.md)

3. **Development**
   - Start the development server: `npm run dev`
   - Access the site at `http://localhost:3000`

## Contributing

This project is open source. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

[MIT License](./LICENSE)
