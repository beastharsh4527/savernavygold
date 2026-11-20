# Content notes: Saver UKBD PLC site

Sources used:
- saverukbd.com (homepage): tagline, services, who we place, franchise, office, contact, company legal entity
- studyatanyuni.com (homepage, /destinations, /language-courses, /licenses): study abroad, destinations, language courses, driving licences
- saverukbd.org: only page metadata was retrievable (no body content)
- studymerchant.com/login: internal admin portal sign-in. Not used on the public site.
- WhatsApp +44 7770 485686 is from the client's screenshot, not the website.

Open items for the client:
- Legal name differs across sources: "Saver UKBD PLC" (site name, per client), "UK BD WORLD TRADES PLC" (legal entity on the site, Reg. No. 11087867), "Saver Ukbd World Trade PLC" (copyright line). Confirm the registered name before publishing.
- Social links: only the YouTube live session ("See how we work") is confirmed.
- No team, testimonials, leadership names or photos were published on the sources, so those sections were removed.
- Stock images are from Unsplash. Replace with real photography before launch.
- Destination stats (universities, courses, costs) are as stated on studyatanyuni.com and are estimates.
- "95% satisfied clients" and "1.5k+ placements" are as stated on saverukbd.com, unverified.
- Enquiry form: demo mode unless RESEND_API_KEY and CONTACT_TO_EMAIL are set.
- Typos in the source ("Franchices", "parthnership", "Domesalary", "Dental pharm") have been corrected.

## Scraping limits (read before launch)
- The fetch tool returned summaries, not verbatim text. Copy was rewritten from those summaries, so re-check every line against the live sites.
- www.saverukbdplc.com and saverukbd.com/about-us, /services, /franchise, /careers and /contact-us could not be fetched. Those paths may not exist, and the links on the homepage point to anchors instead (#about, #services and so on).
- saverukbd.org returned only page metadata ("Communities. Climate. Opportunity.").
- studyatanyuni.com: /destinations, /language-courses, /licenses, /universities (sample), /contact and /reviews were read. The university list is a sample of 26 pages, and /reviews had no reviews.
- studymerchant.com/login is a consultant admin portal, not a public page. It is not on the site.
- Stats on the homepage ("1.5k+", "95%", "30+") are as stated on saverukbd.com. Destination costs are estimates from studyatanyuni.com.

## Design
- Navy and gold palette, taken from the reference image (not copied). Theme tokens are in src/app/globals.css.
- Animations: hero entrance, scroll reveals and counters only. No cursor effects, no marquee, no scroll-scrubbed text.
- Images are Unsplash stock. Replace them before launch.
