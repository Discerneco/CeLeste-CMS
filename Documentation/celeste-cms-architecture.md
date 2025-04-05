# CeLeste CMS Platform

## Project Overview
CeLeste CMS is a flexible content management platform that will power multiple bilingual websites. The first implementation will be a Temple reunion and fundraising website.

### Temple Reunion Site Features
A bilingual (Brazilian Portuguese and American English) website with two main features:
1. Public content with event countdown, news feed, and GoFundMe integration
2. Private section for group members to apply for travel fund assistance

## CeLeste CMS Architecture

```
┌───────────────────────────────────────┐     ┌─────────────────────┐
│           CeLeste CMS Platform        │     │      Airtable       │
│                                       │     │                     │
│  ┌───────────────────────────────┐    │     │  ┌───────────────┐  │
│  │ Temple Reunion Site (First)   │    │     │  │  Site Configs │  │
│  │  ┌───────────────┐            │    │     │  └───────────────┘  │
│  │  │  Public Pages │────────────┼────┼─────┼─▶│                  │
│  │  └───────────────┘            │    │     │  │  Content Base │  │
│  │                               │    │     │  │  (per site)   │  │
│  │  ┌───────────────┐            │    │     │  │                  │
│  │  │ Private Pages │────────────┼────┼─────┼─▶│  Users Base   │  │
│  │  └───────────────┘            │    │     │  │  (per site)   │  │
│  └───────────────────────────────┘    │     │  │                  │
│                                       │     │  └───────────────┘  │
│  ┌───────────────────────────────┐    │     │                     │
│  │      Future Sites...          │    │     │                     │
│  └───────────────────────────────┘    │     │                     │
│                                       │     │                     │
│  ┌───────────────┐                    │     │                     │
│  │ API Functions │────────────────────┼─────┘                     │
│  └───────────────┘                    │                           │
└───────────────────────────────────────┘                           │
                   │                                                │
                   │                                                │
                   ▼                                                │
         ┌─────────────────────┐                                    │
         │      Netlify        │                                    │
         └─────────────────────┘                                    │
                                                                    │
         ┌─────────────────────┐                                    │
         │  Future Flutter App │◀───────────────────────────────────┘
         └─────────────────────┘
```

## Technical Stack

### CeLeste CMS Platform
- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **Authentication**: NextAuth.js
- **Deployment**: Netlify
- **Domain**: Custom .com domain for the platform

### Temple Reunion Site (First Implementation)
- **Domain**: Custom domain or subdomain
- **Features**: Countdown, News Feed, GoFundMe integration, Fund Application

### Backend
- **Database**: Airtable
- **Serverless Functions**: Next.js API routes (deployed via Netlify)
- **Content API**: Custom API for retrieving site-specific content

## Airtable Structure

### Platform Configuration Base
- **Sites Table**:
  - `id`: Auto-generated
  - `siteName`: Text
  - `domain`: Text
  - `languages`: Multiple select (en, pt, etc.)
  - `defaultLanguage`: Single select
  - `active`: Checkbox
  - `createdAt`: Date/Time
  - `features`: Multiple select (Countdown, News, Fundraising, etc.)

### Content Base (Per Site)
- **News Table**:
  - `id`: Auto-generated
  - `siteId`: Text (linked to Sites)
  - `title_en`: Text (English title)
  - `title_pt`: Text (Portuguese title)
  - `content_en`: Long text (English content)
  - `content_pt`: Long text (Portuguese content)
  - `publishDate`: Date
  - `featured`: Checkbox
  - `image`: Attachment
  - `slug`: Text (URL-friendly identifier)

- **Event Table**:
  - `id`: Auto-generated
  - `siteId`: Text (linked to Sites)
  - `name_en`: Text (English name)
  - `name_pt`: Text (Portuguese name)
  - `description_en`: Long text (English description)
  - `description_pt`: Long text (Portuguese description)
  - `eventDate`: Date/Time
  - `location`: Text
  - `coordinates`: Text (lat/long)

### Users Base (Per Site)
- **Members Table**:
  - `id`: Auto-generated
  - `siteId`: Text (linked to Sites)
  - `email`: Email
  - `name`: Text
  - `approved`: Checkbox
  - `role`: Single select (Admin, Editor, Member)
  - `createdAt`: Date/Time

- **Applications Table** (For Temple Reunion Site):
  - `id`: Auto-generated
  - `siteId`: Text (linked to Sites)
  - `memberEmail`: Email (linked to Members)
  - `requestAmount`: Number
  - `reason`: Long text
  - `status`: Single select (New, Under Review, Approved, Rejected)
  - `submittedDate`: Date/Time
  - `approvedDate`: Date/Time
  - `notes`: Long text (internal)

## Key Features Implementation

### Bilingual Support
- Language toggle in header
- Content stored in both languages in Airtable
- URL structure with language prefix (e.g., `/en/news`, `/pt/noticias`)
- Language detection based on browser settings

### Dynamic Content Pages
- Next.js will use Incremental Static Regeneration (ISR) for content pages:
  - Fast loading experience
  - Content updates every few minutes
  - Lower load on Airtable API

### Authentication Flow
1. User registers/logs in via email
2. Account status stored in Airtable
3. Admin approves account via Airtable interface
4. User gains access to private section

### GoFundMe Integration
- Embedded GoFundMe widget on relevant pages
- API integration to show fundraising progress (if available)

### Fund Application Process
1. Authenticated user submits application form
2. Data stored in Applications table
3. Admin reviews via Airtable interface
4. Email notifications sent for status changes

## Future Flutter App Considerations
- Will use the same Airtable API
- Authentication via the same system
- Shared business logic
- Native mobile experience

## Deployment Strategy
1. GitHub repository setup (open source)
2. Netlify connected to GitHub repository
3. Environment variables for API keys
4. Automatic deployments on push to main branch

## Future Platform Development
- Admin dashboard for managing sites
- Template system for faster site creation
- Custom domain management
- Analytics integration
- Additional site templates and themes
- API access for third-party integrations
