# CeLeste CMS Platform

A flexible multilanguage content management system (similar to a WordPress competitor), with the first implementation being a bilingual Temple reunion and fundraising website.

## Project Documentation

- [Implementation Timeline](./Documentation/implementation-timeline.md) - Development phases and schedule
- [Architecture Overview](./Documentation/celeste-cms-architecture.md) - System architecture and components
- [Temple Reunion Site](./Documentation/temple-reunion-site.md) - Specifications for the first implementation

## Features

The CeLeste CMS platform includes:

- **Multilanguage Support**: Support for content in multiple languages
- **Flexible Architecture**: Extensible design for adding new features
- **Airtable Backend**: Leveraging Airtable for content management
- **SvelteKit Frontend**: Modern, performant frontend with minimal JavaScript
- **Optimized Performance**: Cloudflare CDN integration for global reach

## Temple Reunion Site

The first implementation is a bilingual (Brazilian Portuguese and American English) reunion and fundraising site with:

1. **Public Content**
   - Event countdown
   - News feed
   - GoFundMe integration

2. **Private Section**
   - Member registration
   - Fund application process
   - Application status tracking

## Technical Stack

- **Frontend Framework**: SvelteKit
- **Styling**: Tailwind CSS
- **Internationalization**: svelte-i18n
- **Authentication**: Auth.js
- **Database**: Airtable
- **Deployment**: Vercel
- **CDN**: Cloudflare CDN

## Getting Started

1. **Set up Airtable**
   - Follow the instructions in [scripts/setup-instructions.md](./scripts/setup-instructions.md)
   - Create a Personal Access Token using [scripts/personal-access-token-guide.md](./scripts/personal-access-token-guide.md)
   - Run the setup script to create all required bases and tables

2. **Set up SvelteKit project**
   - Install dependencies: `npm install`
   - Configure environment variables (see `.env.example`)
   - Follow the Airtable integration guide

3. **Development**
   - Start the development server: `npm run dev`
   - Access the site at `http://localhost:5173`

## Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Set up custom domain
4. Configure Cloudflare CDN for performance optimization

## Contributing

This project is open source. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

[MIT License](./LICENSE)
