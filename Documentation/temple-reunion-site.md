# Temple Reunion Site Specifications

## Site Overview
The Temple Reunion site will be the first implementation of the CeLeste CMS platform, designed to help organize a 26-year reunion event in Belo Horizonte, MG, Brazil. The site will facilitate fundraising to assist attendees with travel costs and provide a central hub for reunion information.

## Key Features

### 1. Bilingual Support
- **Languages**: Brazilian Portuguese and American English
- **Implementation**: Complete translation of all content, UI elements, and forms
- **Default**: Auto-detect based on browser settings with manual override

### 2. Event Countdown
- **Functionality**: Dynamic countdown to the reunion date
- **States**: "Date coming soon" (before date is set) and countdown timer (after date confirmation)
- **Display**: Featured prominently on homepage

### 3. News Feed
- **Content**: Updates about the reunion, fundraising progress, and relevant announcements
- **Format**: Chronological feed with featured posts option
- **Media**: Support for text, images, and embedded videos
- **Sharing**: Social media integration for sharing posts

### 4. GoFundMe Integration
- **Display**: Embedded GoFundMe widget showing current fundraising progress
- **Updates**: Automatic or manual updates of fundraising milestones
- **Call to Action**: Direct links to contribute to the fundraising campaign

### 5. Fund Application System
- **Access**: Private, members-only section
- **Registration**: Email-based registration with admin approval
- **Application Process**:
  - Form for requesting travel assistance
  - Status tracking for submitted applications
  - Notification system for status changes
- **Transparency**: Clear criteria for fund distribution

## User Roles

### Public Visitors
- View countdown, news, and fundraising information
- Switch between language versions
- Share content on social media
- Donate via GoFundMe

### Registered Members
- All public visitor capabilities
- Access to private fund application section
- Submit and track fund applications
- Update personal information

### Administrators
- Content management (news, events, etc.)
- Member approval
- Fund application review
- Site configuration via Airtable interface

## Content Structure

### Home Page
- Language selector
- Event countdown
- Featured news items (3-5 most recent)
- GoFundMe widget/stats
- Call to action for registration

### News Page
- Complete news feed with pagination
- Filtering/search capabilities
- Individual post pages with sharing options

### About Page
- Reunion information and history
- Organizers and contact information
- FAQ section

### Fund Information Page
- Eligibility requirements
- Application process explanation
- Timeline for disbursement
- Transparency report on fund usage

### Private Section
- Member profile
- Fund application form
- Application status tracking
- Communication with administrators

## Design Requirements

### Visual Identity
- Theme colors: [To be determined]
- Typography: Clear, readable fonts suitable for multiple languages
- Imagery: Focus on nostalgia, connection, and celebration
- Responsive: Fully functional on mobile, tablet, and desktop devices

### User Experience
- Intuitive navigation between languages
- Clear pathways to key actions (donate, register, apply)
- Accessible design following WCAG guidelines
- Fast loading times and performance optimization

## Technical Requirements

### Hosting & Domain
- Netlify hosting (free tier)
- Custom domain (to be acquired)

### Data Management
- Airtable integration for all content and user data
- Regular backups of all application data

### Security
- Secure authentication for private section
- Data encryption for sensitive information
- Form validation and protection against common attacks
- Privacy policy compliance

## Future Expansion Possibilities

### Post-Event
- Photo and video gallery from the reunion
- Testimonials and stories from attendees
- Planning for future reunions

### Potential Features
- Interactive attendee map showing where people are coming from
- Private messaging between registered members
- Virtual attendance options for those unable to travel

## Success Metrics

### Short-term
- Site launch within one-week timeline
- 100% of expected group members registered
- Fundraising goal progress

### Long-term
- Fundraising goal completion
- Successful fund distribution to applicants
- Event attendance facilitated by the platform
- Positive user feedback on site usability