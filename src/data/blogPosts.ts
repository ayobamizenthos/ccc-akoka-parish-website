export interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: string;
  status: 'draft' | 'published';
  publishedAt: Date;
  externalLinks?: { label: string; url: string }[];
}

// Using public image paths that work reliably
export const blogPosts: BlogPostData[] = [
  {
    id: "glade-cathedral-grand-opening",
    title: "Historic Grand Opening: Glade Cathedral Opens Its Sacred Doors",
    slug: "glade-cathedral-grand-opening-2024",
    content: `
      <h2>A New Chapter in Celestial Church of Christ History</h2>
      <p>Today marks a historic milestone as the Celestial Church of Christ Akoka Parish Glade Cathedral officially opens its sacred doors to the faithful. The grand opening ceremony, commencing at 12:00 PM, draws members from across Lagos and beyond, uniting in celebration of God's faithfulness and the completion of this magnificent house of worship.</p>
      
      <h3>The Vision Realized</h3>
      <p>The Glade Cathedral stands as a testament to years of prayer, sacrifice, and unwavering faith. With its distinctive celestial blue roof and elegant brick facade, the cathedral embodies the spiritual essence of the Celestial Church of Christ while serving as a beacon of hope for the Akoka community.</p>
      
      <h3>Watch the Transformation</h3>
      <p>Experience the incredible journey of our cathedral's transformation. <a href="https://www.instagram.com/cccakokaparish/reel/DR7Nh8tCJBQ/" target="_blank" rel="noopener noreferrer" class="text-gold hover:underline font-semibold">Watch the full transformation video on Instagram</a> and witness how God's faithfulness brought this vision to life.</p>
      
      <h3>Spiritual Significance</h3>
      <p>The cathedral's design incorporates traditional Celestial Church symbolism, including the sacred white that represents purity and divine presence. The interior features rich mahogany wood panels, golden chandeliers reminiscent of divine light, and spacious worship halls designed to accommodate the growing congregation.</p>
      
      <h3>Looking Forward</h3>
      <p>As we step into this new chapter, we invite all members and visitors to join us in regular worship services, community programs, and spiritual growth initiatives. The Glade Cathedral is more than a building—it is a spiritual home for all seeking divine connection.</p>
    `,
    excerpt: "The Celestial Church of Christ Akoka Parish celebrates the historic grand opening of the Glade Cathedral, marking a new era of worship and community in Lagos.",
    featuredImage: "/church-interior.jpg",
    category: "Church News",
    tags: ["Grand Opening", "Glade Cathedral", "Milestone", "CCC Akoka"],
    author: "CCC Akoka Parish Media Team",
    status: "published",
    publishedAt: new Date("2024-12-06T12:00:00"),
    externalLinks: [
      { label: "Watch the Transformation", url: "https://www.instagram.com/cccakokaparish/reel/DR7Nh8tCJBQ/" }
    ]
  },
  {
    id: "shepherd-welcome-message",
    title: "A Message from the Shepherd: Welcome to Our Spiritual Home",
    slug: "shepherd-welcome-message-opening",
    content: `
      <h2>Greetings in the Name of Our Lord Jesus Christ</h2>
      <p>My beloved brethren, today we witness the manifestation of God's promise fulfilled. As your Shepherd, I stand in awe of what the Almighty has accomplished through our collective faith and dedication.</p>
      
      <h3>The Journey of Faith</h3>
      <p>The path to this glorious day has been paved with prayers, fasting, and the sacrificial giving of our members. Each brick of this cathedral represents a prayer answered, a faith tested and proven, and a testimony of God's unfailing love.</p>
      
      <h3>Our Sacred Calling</h3>
      <p>The Glade Cathedral is consecrated for the worship of the Most High God. Here, we shall continue the mission of our founder, Reverend Samuel Biléhou Joseph Oshoffa—to spread the celestial message of salvation, healing, and divine encounter to all nations.</p>
      
      <h3>An Invitation</h3>
      <p>I warmly invite all—members and seekers alike—to experience the divine presence within these walls. May the Glade Cathedral be a place where prayers are answered, lives are transformed, and souls find eternal peace.</p>
      
      <p><em>May the peace of God that surpasses all understanding guard your hearts and minds in Christ Jesus.</em></p>
    `,
    excerpt: "The Shepherd of CCC Akoka Parish shares a heartfelt message welcoming the congregation to the newly opened Glade Cathedral.",
    featuredImage: "/church-interior.jpg",
    category: "Pastoral Message",
    tags: ["Shepherd", "Welcome", "Spiritual", "Opening Day"],
    author: "The Shepherd, CCC Akoka Parish",
    status: "published",
    publishedAt: new Date("2024-12-06T11:00:00")
  },
  {
    id: "cathedral-architecture-beauty",
    title: "Divine Architecture: The Beauty and Symbolism of Glade Cathedral",
    slug: "glade-cathedral-architecture-design",
    content: `
      <h2>A Masterpiece of Sacred Architecture</h2>
      <p>The Glade Cathedral stands as one of the most architecturally significant Celestial Church of Christ parishes in Lagos. Every element of its design carries deep spiritual meaning and reflects the church's rich heritage.</p>
      
      <h3>Exterior Glory</h3>
      <p>The cathedral's distinctive celestial blue roof symbolizes the heavenly realm and God's protective covering over His people. The terracotta brick facade represents the earthly vessel through which divine worship flows, while the elegant arched windows invite natural light—a symbol of God's illuminating presence.</p>
      
      <h3>Interior Sanctity</h3>
      <p>Inside, worshippers are greeted by rich mahogany wood panels that speak to the warmth of God's embrace. The golden chandeliers, reminiscent of divine glory, cast a sacred glow throughout the worship space. The pristine white ceilings and altar area reflect the purity required in approaching the Most High.</p>
      
      <h3>Worship Spaces</h3>
      <p>The cathedral features multiple worship areas including the main sanctuary, prayer halls, and dedicated spaces for different church activities. Each space has been thoughtfully designed to facilitate intimate encounters with God while accommodating the parish's growing congregation.</p>
      
      <h3>A Legacy in Stone</h3>
      <p>The Glade Cathedral will serve generations to come as a landmark of faith in the Akoka community and a symbol of what God's people can achieve through unity and dedication.</p>
    `,
    excerpt: "Explore the stunning architecture and deep symbolism embedded in every aspect of the Glade Cathedral's design.",
    featuredImage: "/church-interior.jpg",
    category: "Features",
    tags: ["Architecture", "Design", "Symbolism", "Cathedral"],
    author: "CCC Akoka Parish Media Team",
    status: "published",
    publishedAt: new Date("2024-12-06T10:00:00")
  },
  {
    id: "opening-day-schedule",
    title: "Grand Opening Day Schedule: A Full Day of Celebration and Worship",
    slug: "opening-day-celebration-schedule",
    content: `
      <h2>Complete Schedule for the Grand Opening Celebration</h2>
      <p>Join us for a full day of worship, praise, and thanksgiving as we celebrate the grand opening of the Glade Cathedral. Here is the complete schedule of activities:</p>
      
      <h3>Morning Preparations</h3>
      <ul>
        <li><strong>10:00 AM</strong> - Arrival of dignitaries and special guests</li>
        <li><strong>11:00 AM</strong> - Final preparations and prayer session</li>
        <li><strong>11:30 AM</strong> - Procession assembly</li>
      </ul>
      
      <h3>Grand Opening Ceremony</h3>
      <ul>
        <li><strong>12:00 PM</strong> - Official Opening Ceremony begins</li>
        <li><strong>12:15 PM</strong> - Ribbon cutting and dedication prayers</li>
        <li><strong>12:30 PM</strong> - Processional entry into the cathedral</li>
        <li><strong>1:00 PM</strong> - Thanksgiving service commences</li>
      </ul>
      
      <h3>Worship and Celebration</h3>
      <ul>
        <li><strong>1:00 PM - 3:00 PM</strong> - Thanksgiving worship service</li>
        <li><strong>3:00 PM - 4:00 PM</strong> - Special choir ministrations</li>
        <li><strong>4:00 PM - 5:00 PM</strong> - Testimonies and thanksgiving</li>
      </ul>
      
      <h3>Fellowship</h3>
      <ul>
        <li><strong>5:00 PM onwards</strong> - Fellowship and refreshments</li>
      </ul>
      
      <p><strong>Note:</strong> All members are encouraged to dress in their celestial white garments. Visitors are warmly welcome in modest attire.</p>
    `,
    excerpt: "Complete schedule of activities for the Glade Cathedral grand opening celebration, featuring worship services, dedications, and fellowship.",
    featuredImage: "/church-interior.jpg",
    category: "Events",
    tags: ["Schedule", "Grand Opening", "Celebration", "Worship"],
    author: "CCC Akoka Parish Events Committee",
    status: "published",
    publishedAt: new Date("2024-12-06T09:00:00")
  },
  {
    id: "community-impact-vision",
    title: "Beyond Worship: Glade Cathedral's Vision for Community Impact",
    slug: "community-impact-vision-glade",
    content: `
      <h2>Serving God by Serving the Community</h2>
      <p>The Glade Cathedral's mission extends far beyond Sunday worship services. With its opening, CCC Akoka Parish unveils an ambitious vision for community transformation and social impact in the Akoka area and beyond.</p>
      
      <h3>Education Initiatives</h3>
      <p>The cathedral will host educational programs including adult literacy classes, youth mentorship programs, and scholarship initiatives for deserving students. We believe that education is a pathway to empowerment and positive change.</p>
      
      <h3>Health and Welfare</h3>
      <p>Regular health outreach programs, blood donation drives, and welfare support for the less privileged will be organized from the cathedral. Our medical committee is already planning quarterly health fairs for the community.</p>
      
      <h3>Youth Development</h3>
      <p>A dedicated youth center within the cathedral complex will offer skills acquisition training, career counseling, and wholesome recreational activities. We are committed to raising a generation of responsible, God-fearing leaders.</p>
      
      <h3>Spiritual Growth</h3>
      <p>Beyond regular services, the cathedral will host Bible study groups, prayer meetings, marriage enrichment programs, and counseling services. Our goal is holistic spiritual development for every member.</p>
      
      <h3>Join the Mission</h3>
      <p>We invite everyone to be part of this transformative vision. Together, we can make a lasting difference in our community while glorifying God through service.</p>
    `,
    excerpt: "Discover the Glade Cathedral's comprehensive vision for community transformation through education, health initiatives, and youth development programs.",
    featuredImage: "/church-interior.jpg",
    category: "Community",
    tags: ["Community", "Outreach", "Vision", "Impact", "Youth"],
    author: "CCC Akoka Parish Social Welfare Committee",
    status: "published",
    publishedAt: new Date("2024-12-06T08:00:00")
  }
];
