/*
  ============================================================
  ALL THE WORDS ON THE SITE LIVE HERE.
  Change text, add projects, add images: this is the only file
  you need to touch. Images go in the /images folder.

  An image is written like this:
    { src: "images/activate/hero.jpg", label: "Hero", ratio: "16/10" }
  While "src" is empty (""), the site shows a placeholder box
  with the label, so you can see where each image goes.
  ============================================================
*/

window.SITE = {
  name: "Evaldo Marques",
  fullName: "Evaldo Marques",
  email: "dsgn.juniormarques@gmail.com",
  linkedin: "https://www.linkedin.com/in/evaldomarques/",
  cv: "cv/Evaldo-Marques-CV.pdf",

  // SHA-256 of the case study password (currently "magic2026").
  // Ask Claude to change it, or generate a new hash at any SHA-256 tool.
  passwordHash: "d414cb41b60072f58df1789d129afdf4bbc480969bffd68192c32a957c3b2e0e",

  home: {
    // Hand-lettered hero. The first one shows on load, then they take turns:
    // the current one is wiped away and the next one is written in.
    // "split" is where line 1 ends (in % of the height), so each line is written in turn.
    // Leave split out for a drawing that should be written in one sweep.
    heroArt: [
      { src: "images/lettering/hero-1.svg", text: "Great design tickles the brain" },
      { src: "images/lettering/hero-2.svg", text: "Great design does not ask for permission", split: 41 },
      { src: "images/lettering/hero-3.svg", text: "Great design earns a second look", split: 52 },
      { src: "images/lettering/hero-4.svg", text: "Great design gets out of the way", split: 54 },
      { src: "images/lettering/hero-5.svg", text: "Great design makes you feel something", split: 52 }
    ],
    heroHoldSeconds: 8,       // how long each one stays before the next is written
    intro: "Product designer in Stockholm, born and raised in Brazil. For 12 years I've designed everything from nationwide marketing campaigns to B2B products built from zero. The last five years at Funnel taught me to design with <mark>hard data</mark>, and to anchor every idea in <mark>real customer feedback</mark>.",
    featuredTitle: "Featured work",
    featuredArt: "",          // e.g. "images/lettering/featured-work.svg"
    otherTitle: "Other projects",
    otherArt: "",
    peopleTitle: "People that love working with me",
    peopleArt: ""
  },

  // Replace with real quotes, names and roles.
  // Real words from colleagues (lightly trimmed). Add surnames if they want them.
  testimonials: [
    { text: "I don't think I've ever seen a higher degree of \u201cfirst draft excellence\u201d from a designer during my career. You are GOOD and FAST. When you speak, others listen.", name: "Emilie Ljungdal", role: "Product Manager, Funnel" },
    { text: "Simply one of the best colleagues I've ever worked with. If we ever feel stuck, he has a remarkable ability to help us break free, think outside the box, and bring fresh perspectives.", name: "Elena Gjeroska", role: "Staff Designer, Funnel" },
    { text: "He doesn't just want to design a B2B app, he designs delightful experiences that make the user enjoy using the app, not just make it through.", name: "Alex", role: "Product Manager, Funnel" },
    { text: "A real mood raiser, and a significant factor in bringing the team together. He takes feedback very well, with an open mind, while explaining the train of thought behind his design.", name: "Bj\u00f6rn", role: "Senior Engineer, Funnel" },
    { text: "Really good at making people feel comfortable. Willing to help out, and doesn't only look at his own team.", name: "Nina", role: "Head of Product, Funnel" }
  ],

  // ---------- FEATURED CASE STUDIES (password protected) ----------
  caseStudies: [
    {
      slug: "activate",
      name: "Activate",
      company: "Funnel",
      year: "2025",
      line: "Building a 0 to 1 product to solve signal loss for marketers",
      tags: ["0 to 1", "B2B SaaS", "Integrations"],
      thumb: { src: "images/activate/thumb.webp", label: "Field mapping and advanced settings in Activate" },
      title: "Activate.",
      subtitle: "Building a 0 to 1 product to solve signal loss for marketers.",
      context: ["Funnel", "Launched 2025", "Product Designer", "1 PM · 4 engineers"],
      summary: "With cookies disappearing and privacy rules like GDPR, tracking a customer journey online has never been harder. Ad platforms lose sight of which campaigns actually drive conversions, so marketers spend without knowing what works. Activate sends conversion data back to platforms like Google, Meta and LinkedIn automatically, so they can attribute and optimize based on real business outcomes.",
      outcomes: [
        "Integrations with 7 platforms: Google Ads, Meta, LinkedIn, Microsoft, TikTok, Snapchat and Pinterest",
        "Adopted by agencies and in-house teams across the US and Europe, with agencies making up nearly half of users",
        "Introduced to customer-facing teams in Boston and Stockholm, with sales collateral for each team",
        "Featured in a YouTube video, later cut into ads for LinkedIn, Facebook and Instagram"
      ],
      heroImages: [
        { src: "images/activate/hero.webp", label: "Final UI: creating a Google Ads signal, with Funnel AI in context", ratio: "2000/1271" },
        { src: "images/activate/sketch.webp", label: "Early exploration: the same screen as a sketch, questions and all", ratio: "2000/914" }
      ],
      stats: [
        { n: "7", label: "ad platforms connected, from Google to Pinterest" },
        { n: "~15", label: "design partner sessions, 1 to 3 per release" },
        { n: "2", label: "cities on the launch tour: Boston and Stockholm" },
        { n: "+10", label: "launch materials: video, sales materials, knowledge base articles and case studies" }
      ],
      sections: [
        { type: "decision", heading: "Reframe the problem",
          text: "We had 50 paying customers and a goal of 1,000 by next year. The team was focused on moving data from A to B, and incremental releases wouldn't get us there. So I designed and ran a vision workshop with our PM and engineers to step back and think bigger.",
          steps: [
            ["Ice breaker.", "It's 2040, and there's a museum exhibit called 'The Way We Worked in the 2020s'. What's in it?"],
            ["Where we are now.", "50 customers, 1,000 to go. Setting the tone for what we could become."],
            ["Reality map.", "What's holding us back, and where do we already shine?"],
            ["Dreaming big.", "No constraints, no backlog."],
            ["Inspiration wall.", "Patterns from other products worth stealing."],
            ["A day in the life.", "A marketer's day once Activate is everything we believe it can be."],
            ["One step closer.", "What can we do now to move toward 1,000 users?"]
          ],
          after: "Afterwards I used AI to turn the board into three artifacts: a list of feature gaps, a set of quotes from future users on how Activate changed their work, and a press release announcing our 1,000th customer. The team left excited, because we were building something bigger.",
          carouselRatio: "16/10",
          carousel: [
            { src: "images/activate/ws-1-icebreaker.webp", label: "Ice breaker: Funnel in 2040" },
            { src: "images/activate/ws-2-where-we-are.webp", label: "Where we are now: 50 customers, aiming for 1,000" },
            { src: "images/activate/ws-3-reality-map.webp", label: "Reality map: what holds us back, and where we shine" },
            { src: "images/activate/ws-4-inspiration.webp", label: "Inspiration wall: patterns from other products" },
            { src: "images/activate/ws-5-day-in-life.webp", label: "A day in the life of a marketer using Activate" },
            { src: "images/activate/ws-6-ai-artifacts.webp", label: "AI-made artifacts: feature gaps, future user quotes and a press release" }
          ] },
        { type: "decision", heading: "Design the vision, ship the slice",
          text: ["From the workshop, I designed the vision for Activate: every offering in one place, from signals and audiences to customer journeys and data quality, with AI built into the flow instead of sitting beside it. Funnel AI opens next to the signal you're creating and already knows the context.",
                 "What we released was a slimmed-down version. It kept the same design for the core elements but left AI out. Building it would have needed the whole company behind it, and it wasn't a company priority yet."],
          carouselRatio: "2000/1271",
          carousel: [
            { src: "images/activate/vision-1-signal.webp", label: "Creating a signal: destination, field mapping and sensible defaults" },
            { src: "images/activate/vision-2-ai.webp", label: "Funnel AI in context, right next to the setup" },
            { src: "images/activate/vision-3-preview.webp", label: "Data preview: see exactly what gets sent before you send it" }
          ] },
        { type: "decision", heading: "Design for the parts we didn't own",
          text: "Each of the 7 ad platforms has its own rules, and part of the job, tracking, happens outside Funnel. We couldn't build all of it. So I removed every bit of friction I could inside the product, and designed the knowledge around it: help articles for every step of a conversion upload, and sales materials that let customer-facing teams explain Activate with confidence.",
          carouselRatio: "16/10",
          carousel: [
            { src: "images/activate/kb-search.webp", group: "Knowledge base", label: "Every step of a conversion upload has an article" },
            { src: "images/activate/kb-article.webp", group: "Knowledge base", label: "Conversion uploads: the overview article" },
            { src: "images/activate/sales-cover.webp", group: "Sales materials", label: "Funnel Activate: an introduction deck" },
            { src: "images/activate/sales-journey-title.webp", group: "Sales materials", label: "From start to success: the Activate user journey" },
            { src: "images/activate/sales-journeys.webp", group: "Sales materials", label: "High-level user journeys for 3 types of customer" }
          ] },
        { type: "video", youtube: "J1AJcvoiaQQ", label: "Activate explained" },
        { type: "decision", heading: "Validate with every release", text: "We worked with design partners from the start. Every meaningful update went in front of 1 to 3 customers, about 15 conversations in total. I also mined Gong sales calls to hear how prospects described the problem in their own words, which kept every release grounded in real needs.", image: { src: "images/activate/gong-insights.webp", label: "Gong calls: what prospects said about conversions", ratio: "1350/1084" } }
      ],
      learned: "A product can be great and still depend on things it doesn't control. Designing the knowledge around it mattered as much as the screens."
    },
    {
      slug: "marketing-reporting",
      name: "Marketing Reporting",
      company: "Funnel",
      year: "2026",
      line: "Rethinking how people build dashboards, with AI and on their own",
      tags: ["AI", "Data visualization", "Redesign"],
      thumb: { src: "", label: "Thumbnail · 4:3" },
      layout: "split",
      title: "Marketing Reporting.",
      subtitle: "Rethinking how people build dashboards, with AI and on their own.",
      context: ["Funnel", "2026, in progress", "Lead designer on Reporting", "1 PM · 3 engineers"],
      summary: ["Almost 50% of Funnel customers use dashboards, and they get real value from them. But building one hasn't kept up with what people expect today, and Funnel wants to become AI-native.",
        "We're a small team with plenty of competing priorities. So I'm leading an effort to rethink the experience, grounded in customer feedback and usability best practices, and to show where it could go."],
      outcomes: [
        "A working prototype of the vision: AI built into the product, UX improvements and small moments of delight",
        "A presentation explaining the concept of AI in dashboards",
        "Low-hanging improvements now prioritized with the team and validated with customers, to decide what to build first"
      ],
      heroImages: [
        { src: "images/reporting/current.mp4", poster: "images/reporting/current.jpg", label: "The current experience: customers get real value from it, and now it's time to make it delightful", ratio: "1600/1002" }
      ],
      stats: [
        { n: "~50%", label: "of Funnel customers use dashboards" },
        { n: "5", label: "people on the team: 3 engineers, 1 PM and me" }
      ],
      sections: [
        { type: "decision", heading: "Listen at scale", text: "I pulled signals from our user-needs channel, customer-facing teams, recorded customer calls, PMs' conversations with customers, and senior engineers who had worked on the product for years. The same themes kept coming back: dashboards look outdated, it's not clear if you're editing or viewing, people want more control over the look, and exploring data feels like something might break." },
        { type: "decision", heading: "Prototype the vision",
          text: "The prototype is our current vision for dashboards. It brings three things together: AI features built into the product, UX improvements to everyday tasks, and micro-interactions that add small moments of delight.",
          after: "It also surfaced a lot of smaller, low-hanging fruit. We're prioritizing those together as a team and validating them with customers, so we build what matters most first. Go ahead, click around.",
          prototype: { src: "prototypes/reporting-vision.html", label: "The dashboards vision: a clickable prototype made in Claude Design", w: 1440, h: 900 } },
        { type: "decision", heading: "Frame the conversation", text: ["The prototype touched much more than AI. So before each session, I used a short presentation to align stakeholders on what it was about, and what we should focus on that day. When the work goes beyond the brief, framing the discussion is what keeps it useful.", "And going beyond the brief is often the point. People experience a product as a whole, so designing only the piece you were asked for rarely wins."],
          carouselRatio: "16/9",
          carousel: [
            { src: "images/reporting/deck-1-title.webp", label: "Clarity, not clutter: AI in dashboards" },
            { src: "images/reporting/deck-2-context.webp", label: "Context: better, not just more" },
            { src: "images/reporting/deck-3-reframe.webp", label: "Reframe: what if we redesigned how people interact with dashboards?" },
            { src: "images/reporting/deck-4-shift.webp", label: "The shift: always know if you're viewing or editing" },
            { src: "images/reporting/deck-5-key-moments.webp", label: "Key moments: same dashboards, three jobs to be done" },
            { src: "images/reporting/deck-6-out-loud.webp", label: "Setting expectations: fidelity, scope, writing and edge cases" }
          ] }
      ],
      learned: "Still in progress, but it's already changing how I think. AI isn't a feature, it's a mindset. It sets a different tone, and it's a different game."
    },
    {
      slug: "illustration-system",
      name: "Funnel Illustration System",
      company: "Funnel",
      year: "2026",
      line: "Bringing the brand into the product, one empty state at a time",
      tags: ["Design systems", "Brand", "Motion"],
      thumb: { src: "", label: "Thumbnail · 4:3" },
      title: "Funnel Illustration System.",
      subtitle: "Translating our brand into the product to create delightful experiences.",
      context: ["Funnel", "2026", "Self-initiated", "With Creative Director, visual designer, staff designer, VP of Product"],
      summary: "I started this because I wanted Funnel to feel more delightful to use. Our brand had a strong visual identity, but very little of it reached the product. Empty states and system messages felt like dead ends instead of next steps.",
      outcomes: [
        "17 animated illustrations: 7 for system feedback, 10 for empty states",
        "A reusable component for the pages where they live",
        "Live in empty states across the product",
        "Next: dashboard cards, onboarding flows and merchandise"
      ],
      heroImages: [
        { src: "", label: "Hero · illustrations in the product", ratio: "16/10" },
        { src: "", label: "Research slide · benchmark", ratio: "16/9" }
      ],
      stats: [
        { n: "17", label: "animated illustrations" },
        { n: "7", label: "products studied, from Stripe to Duolingo" },
        { n: "~7", label: "teams that adopted the components" },
        { n: "4", label: "illustration types defined" }
      ],
      sections: [
        { type: "decision", heading: "Study who does it best", text: "I broke down how 7 products use illustration: Stripe, Airtable, Mailchimp, Notion, Airbnb, Wise and Duolingo. The big lesson: in product, illustration isn't decoration. It needs a clear purpose, it shouldn't steal attention, and often a simple, muted illustration does more than the most beautiful piece.", image: { src: "", label: "Research slides", ratio: "4/3" } },
        { type: "decision", heading: "Make illustrations tell the user something", text: "Every illustration should explain at a glance what's happening behind the scenes, carry the brand's feeling, and nudge people toward their next step. I defined four types: system feedback, feature introduction, empty state system feedback and empty state feature introduction.", image: { src: "", label: "Documentation · the four types", ratio: "4/3" } },
        { type: "image", image: { src: "", label: "Full width · the illustration set", ratio: "21/9" } },
        { type: "decision", heading: "Ship it as a system, not a set of pictures", text: "I designed and animated the illustrations in Figma and Claude Design. Then I built the components in our design system with Cursor, tested them on staging and published them. Finally, I worked with around 7 teams so they adopted the components in their own code.", image: { src: "", label: "Animated example (GIF or video)", ratio: "4/3" } }
      ],
      quote: { text: "You did not only solve one empty state. You started thinking about how illustrations should work across Funnel as a system.", by: "My manager" },
      learned: "Delight is a system decision. One beautiful screen is a moment, a shared component is a standard."
    },
    {
      slug: "solutions-hub",
      name: "Solutions Hub",
      company: "Funnel",
      year: "2023",
      line: "Helping new users find value on their own, from the first click",
      tags: ["Product-led growth", "Onboarding", "Research"],
      thumb: { src: "images/solutions-hub/thumb.webp", label: "Onboarding: what type of business are you?" },
      title: "Solutions Hub.",
      subtitle: "Designing for product-led growth.",
      context: ["Funnel", "2023", "Product Designer", "Product-led growth team"],
      summary: "In 2023 Funnel opened free sign-ups for everyone. That meant new users had to find value on their own, quickly, without a sales call. Our team owned acquisition, activation, monetisation and onboarding.",
      outcomes: [
        "37% increase in adoption of our dashboard feature",
        "34% more sales-qualified leads, because users could try the product and see its value first",
        "Designed components that were reused in other parts of the product"
      ],
      heroImages: [
        { src: "images/solutions-hub/welcome.webp", label: "Onboarding starts by asking who you are", ratio: "2000/1422" },
        { src: "images/solutions-hub/custom-fields.webp", label: "Ready-made custom fields map cross-channel data", ratio: "2000/1422" }
      ],
      stats: [
        { n: "+37%", label: "dashboard feature adoption" },
        { n: "+34%", label: "sales-qualified leads" },
        { n: "40+", label: "slides of research synthesis" }
      ],
      sections: [
        { type: "decision", heading: "Connect the website and the product", text: "I designed Solutions Hub, a library of ready-made solutions that links the website to the app. New users pick a use case, self-serve their way to a free account and start from something useful instead of a blank page.", image: { src: "images/solutions-hub/hub-top.webp", label: "Solutions Hub: pick a way to start, or a dashboard template", ratio: "784/700" } },
        { type: "decision", heading: "Onboard people by who they are", text: "Agencies see and use Funnel differently from in-house marketers, even without extra benefits. So we designed tailored onboarding paths, with several simple ways to start seeing value.", image: { src: "images/solutions-hub/agencies.webp", label: "Agencies get offered assisted onboarding, not a sales call", ratio: "2000/1422" } },
        { type: "image", image: { src: "images/solutions-hub/workspace.webp", label: "Agency path: set up the first client workspace", ratio: "2000/1422" } },
        { type: "decision", heading: "Build the case with research", text: "We spent weeks gathering insights from marketing, customer success, partners, past interviews with agencies and benchmarks of other tools. The result was a 40+ slide synthesis that shaped the work.", image: { src: "", label: "Research slides", ratio: "4/3" } }
      ],
      learned: "Personalizing an experience doesn't need new features. Sometimes it just needs a different first step."
    }
  ],

  // ---------- OTHER PROJECTS (public, the wall) ----------
  projects: [
    {
      slug: "advanced-measurement", name: "Advanced Measurement", company: "Funnel", year: "2026",
      thumb: { src: "images/advanced-measurement/thumb.webp", label: "Media Plans overview" },
      description: "Two months with the Hamburg team, at 25% of my time, to make our most premium product easier to use. I dug into marketing mix modeling and multi-touch attribution, simplified the UI and rebuilt the Media Plan flow around how marketers actually think, replacing data science lingo with marketer language.",
      quote: "Oh, right, of course. It makes so much more sense. Let's just build it.",
      quoteBy: "The Hamburg team",
      stats: [],
      tags: ["Measurement", "MMM", "Simplification"],
      images: [
        { src: "images/advanced-measurement/media-plans.webp", label: "Media Plans: every plan and its goal at a glance", ratio: "4/3" },
        { src: "images/advanced-measurement/create-media-plan.webp", label: "Creating a media plan in marketer language", ratio: "1/1", narrow: true },
        { src: "images/advanced-measurement/plan-results.webp", label: "Plan results: current vs optimal spend", ratio: "1440/1564" },
        { src: "images/advanced-measurement/chart-detail.webp", label: "Current vs optimal performance by day", ratio: "1/1", pair: true },
        { src: "images/advanced-measurement/plan-cards.webp", label: "Plan cards with goal and status", ratio: "1/1", pair: true }
      ]
    },
    {
      slug: "google-analytics-connector", name: "Google Analytics connector", company: "Funnel", year: "2022",
      thumb: { src: "images/ga-connector/thumb.webp", label: "Connect Google Analytics: choose a report type" },
      description: "My first project at Funnel, on a design team less than 6 months old. Google Analytics was one of our top 10 connectors, and customers kept picking the wrong settings, then wondering why their data didn't match. I moved the flow inside the app, made the steps visible and let users compare report types at a glance.",
      stats: [
        { n: "4.5/5", label: "user rating in tests" },
        { n: "−30%", label: "data-mismatch support tickets" },
        { n: "All", label: "connectors now use the new flow" }
      ],
      tags: ["Integrations", "Usability", "Design culture"],
      images: [
        { src: "images/ga-connector/after-default.webp", label: "After: visible steps, and report types you can compare at a glance", ratio: "1440/1024" },
        { src: "images/ga-connector/before-default.webp", label: "Before: one dropdown and a hidden list of defaults", ratio: "1230/570" },
        { src: "images/ga-connector/before-manual.webp", label: "Before: manual setup", ratio: "1440/2525", pair: true },
        { src: "images/ga-connector/after-manual.webp", label: "After: manual setup, with selected fields counted per group", ratio: "1300/2576", pair: true }
      ]
    },
    {
      slug: "alelo-loyalty", name: "Alelo B2B Loyalty Program", company: "Insidelink for Alelo", year: "2020",
      thumb: { src: "images/alelo-loyalty/thumb.webp", label: "Alelo Recompensas account" },
      description: "Alelo is a Brazilian financial services company handling benefits, incentives and corporate expenses, with cards for meals, groceries, mobility, culture and more. I designed the concept for their B2B loyalty program, letting corporate clients earn and redeem rewards while discovering products suited to their needs.",
      stats: [],
      tags: ["Loyalty", "B2B", "Concept"],
      images: [
        { src: "images/alelo-loyalty/home.webp", label: "Home: trade points for Alelo products or partner benefits", ratio: "1229/2576", narrow: true },
        { src: "images/alelo-loyalty/my-account.webp", label: "My account: points balance, history and wish list", ratio: "1440/1576" },
        { src: "images/alelo-loyalty/redeem-product.webp", label: "Redeeming points for a product, customized for the company", ratio: "1440/1641" }
      ]
    },
    {
      slug: "alelo-design-system", name: "Alelo Design System", company: "Insidelink for Alelo", year: "2020–21",
      thumb: { src: "images/alelo-design-system/thumb.webp", label: "Alelo components" },
      description: "I led the creation of Alelo's Figma design system: 15+ libraries audited and merged into around 300 shared components, for 10 products and 12 designers, in the middle of a rebrand. It's built in three layers: Core styles, Web components and Mobile components.",
      stats: [
        { n: "~300", label: "shared components" },
        { n: "15+", label: "libraries audited and merged" },
        { n: "10", label: "products · 12 designers" }
      ],
      tags: ["Design systems", "Figma", "Consulting"],
      images: [
        { src: "images/alelo-design-system/components.webp", label: "Components: cards, alerts, inputs, tabs, pagination and steppers", ratio: "1920/1080" },
        { src: "images/alelo-design-system/color-scheme.webp", label: "Color scheme: primaries, secondaries, neutrals, status and product colors", ratio: "1532/945" },
        { src: "images/alelo-design-system/brand-icons.webp", label: "Brand icons for illustrating the customer journey", ratio: "876/951", pair: true },
        { src: "images/alelo-design-system/interface-icons.webp", label: "Interface icons at 32, 24 and 16 px", ratio: "911/952", pair: true }
      ]
    },
    {
      slug: "livelo-crm", name: "Livelo CRM", company: "Dextra for Livelo", year: "2016–17",
      thumb: { src: "images/livelo-crm/thumb.webp", label: "Clube Livelo" },
      description: "Livelo is Brazil's biggest loyalty program. We designed communication journeys across email, SMS and push for 6 card tiers from 2 banks, covering expiring points, new points, point balances, travel, shopping and experiences, plus seasonal moments like Black Friday and Christmas.",
      stats: [
        { n: "3M+", label: "customers activated" },
        { n: "10×", label: "the daily email goal: 10 a day, not 1" },
        { n: "6", label: "card tiers across 2 banks" }
      ],
      tags: ["CRM", "Lifecycle", "Email · SMS · Push", "Loyalty"],
      images: [
        { src: "images/livelo-crm/clube-livelo.webp", label: "Clube Livelo key visual", ratio: "1/1" },
        { src: "images/livelo-crm/email-points-expiring.webp", label: "Email: points about to expire", ratio: "600/1689", pair: true },
        { src: "images/livelo-crm/email-clube-livelo.webp", label: "Email: Clube Livelo subscription offer", ratio: "600/1209", pair: true },
        { src: "images/livelo-crm/email-childrens-day.webp", label: "Email: Children's Day seasonal campaign", ratio: "600/2178", narrow: true }
      ]
    },
    {
      slug: "livelo-campaigns", name: "Livelo Campaigns", company: "Livelo", year: "2017–19",
      thumb: { src: "images/livelo-campaigns/thumb.webp", label: "Junte + pontos com muito mais liberdade" },
      description: "A full brand redesign, plus nationwide campaigns across OOH, print, events and paid social for Brazil's biggest loyalty program.",
      stats: [],
      tags: ["Brand", "Campaigns", "OOH · Print", "Paid social"],
      images: [
        { src: "images/livelo-campaigns/liberdade.webp", label: "Print: Junte + pontos com muito mais liberdade", ratio: "1800/1576" },
        { src: "images/livelo-campaigns/shop-and-earn.webp", label: "Print: earn points with partner stores", ratio: "1800/1583" },
        { src: "images/livelo-campaigns/fathers-day.webp", label: "Print: Father's Day partner campaign", ratio: "1767/1547" },
        { src: "images/livelo-campaigns/livelo-empresas.webp", label: "Livelo Empresas: incentive and loyalty for companies", ratio: "1669/2173", pair: true },
        { src: "images/livelo-campaigns/brand-banner.webp", label: "Event banner: Seus pontos. Suas escolhas.", ratio: "1800/3030", pair: true },
        { src: "images/livelo-campaigns/ad-smartphones.webp", label: "Paid social ad: smartphones", ratio: "1200/628", pair: true },
        { src: "images/livelo-campaigns/ad-tech.webp", label: "Paid social ad: tech", ratio: "1200/628", pair: true },
        { src: "images/livelo-campaigns/ad-kitchen.webp", label: "Paid social ad: kitchen", ratio: "1200/628", pair: true },
        { src: "images/livelo-campaigns/ad-sports.webp", label: "Paid social ad: sports", ratio: "1200/628", pair: true },
        { src: "images/livelo-campaigns/ad-fashion.webp", label: "Paid social ad: fashion", ratio: "1200/628" }
      ]
    },
    {
      slug: "livelo-social", name: "Livelo Social", company: "Livelo", year: "2017–19",
      thumb: { src: "images/livelo-social/thumb.webp", label: "Deck Social Dezembro 2018" },
      description: "For over a year, between agency partners, I ran Livelo's social channels end to end: the content strategy, monthly editorial calendars with goals and KPIs, the copy and every post's design, including animated pieces.",
      stats: [],
      tags: ["Social", "Content strategy", "Copywriting", "Motion"],
      images: [
        { src: "images/livelo-social/deck-cover.webp", label: "Monthly social deck, December 2018", ratio: "2000/1125" },
        { src: "images/livelo-social/deck-calendar.webp", label: "Editorial calendar for Facebook and Instagram, with goals and KPIs", ratio: "2000/1125" },
        { src: "images/livelo-social/deck-samba.webp", label: "Post concept with idea and copy: Dia do Samba", ratio: "2000/1125" },
        { src: "images/livelo-social/typing-square.mp4", poster: "images/livelo-social/typing-square.jpg", label: "Animated post: Livelo typing intro", ratio: "1/1", pair: true },
        { src: "images/livelo-social/travel.mp4", poster: "images/livelo-social/travel.jpg", label: "Animated post: travel", ratio: "1/1", pair: true },
        { src: "images/livelo-social/typing-wide.mp4", poster: "images/livelo-social/typing-wide.jpg", label: "Animated post: typing intro, link format", ratio: "1200/628", pair: true },
        { src: "images/livelo-social/products-wide.mp4", poster: "images/livelo-social/products-wide.jpg", label: "Animated post: product selection, link format", ratio: "1200/628", pair: true },
        { src: "images/livelo-social/products-square.mp4", poster: "images/livelo-social/products-square.jpg", label: "Animated post: product selection", ratio: "1/1", pair: true },
        { src: "images/livelo-social/os-da-top.mp4", poster: "images/livelo-social/os-da-top.jpg", label: "Animated post: Os da Top Livelo", ratio: "1/1", pair: true },
        { src: "images/livelo-social/sportsday.mp4", poster: "images/livelo-social/sportsday.jpg", label: "Animated post: Dia do Esportista", ratio: "1/1", pair: true },
        { src: "images/livelo-social/kindle.webp", label: "Post: Kindle reward", ratio: "1/1", pair: true }
      ]
    }
  ],

  // ---------- ABOUT ----------
  about: {
    video: "",          // e.g. "images/about/me.mp4"
    videoPoster: "",    // e.g. "images/about/me.jpg"
    why: "I started designing before I knew the word for it. At 14, working in the same restaurant kitchen as my mom, I refused to just throw lettuce in a bowl. Every container was a canvas, and I loved watching people smile at their salads. Years later, a scholarship to study advertising showed me that what I loved was bigger than visuals: crafting a message that makes people feel something and see the world a little differently. That's still why I design.",
    facts: ["From Brazil, based in Stockholm", "Portuguese and English", "BA in Advertising and Marketing", "12 years in design"],
    tools: ["Figma", "Claude Design", "Cursor", "Adobe Creative Suite", "Miro"],
    hardSkills: [["Discovery and research", 3], ["Interaction design", 4], ["UI and visual design", 5], ["Design systems", 3], ["Prototyping (AI and code)", 5], ["Data-informed design", 4], ["Workshop facilitation", 3], ["Brand, illustration and motion", 4]],
    softSkills: [["Communication and storytelling", 5], ["Cross-functional collaboration", 4], ["Comfort with ambiguity", 3], ["Empathy and listening", 5], ["Stakeholder management", 4], ["Curiosity", 5], ["Ownership", 5], ["Mentoring", 4]],
    timelineTitle: "From a farm in Brazil to the blue line",
    timeline: [
      { year: "1994", title: "Born on a farm", text: "In rural southern Brazil." },
      { year: "1995", title: "A brave move", text: "My parents left everything behind for Pedreira, a small city in the São Paulo countryside, to give my siblings and me a better life." },
      { year: "2000s", title: "Teachers who believed in me", text: "Brazil's public schools had their shortcomings, but I was lucky to meet teachers who believed in me and pushed me to be my best." },
      { year: "2009", title: "First job, at 14", text: "At the restaurant where my mom worked, I prepared the 8 salads for the buffet and turned each one into a tiny painting." },
      { year: "2011", title: "Monday to Monday", text: "A souvenir shop selling candles, dolls and decorations made in Pedreira, seven days a week." },
      { year: "2012", title: "The turning point", text: "A full scholarship to PUC Campinas, one of Brazil's best universities." },
      { year: "2012–13", title: "Working and studying", text: "Full time in my hometown, evening classes in another city, and some of the highest grades in my class." },
      { year: "2014", title: "My first design job", text: "Intern at Impacto, a small local agency. Promoted to junior designer in three months." },
      { year: "2015", title: "A bigger city", text: "Joined Dextra in Campinas and got promoted again within months. They said I never acted like an intern." },
      { year: "2016", title: "One week that changed everything", text: "A one-week project for Livelo turned into months. “There's no way you're leaving us.”" },
      { year: "2017", title: "Brazil's biggest loyalty program", text: "Moved to Barueri, joined Livelo and built its in-house creative team. Campaigns seen across the whole country." },
      { year: "2019", title: "Moving to Sweden, for love", text: "From Barueri to Stockholm." },
      { year: "2020", title: "Working for Brazil from Stockholm", text: "A former colleague brought me into the Alelo project, fully remote." },
      { year: "2021", title: "Choosing Sweden for real", text: "If I was going to live this far from home, I'd be all in. Funnel found me on LinkedIn, and I joined in November." },
      { year: "2022–now", title: "Building a design culture", text: "One of Funnel's first designers. Through new teams, strategies and restructures, still here, still building." },
      { year: "Now", title: "Still a little happy on the blue line", text: "Seven years in, and Stockholm being a bunch of islands still feels like magic." }
    ]
  }
};
