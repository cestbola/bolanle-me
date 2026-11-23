// Edit me! Everything personal about the site lives here.
export const SITE = {
  name: 'bolanle.me',
  author: 'Bolanle',
  tagline: 'Essays and interactive charts on the things I think about.',
  description: 'Essays by Bolanle, with interactive charts you can explore, question and redraw.',
};

// About you: shown on the home page, the About page, and at the end of every post.
export const ME = {
  name: 'Bolanle',
  // Drop a photo into /public (e.g. public/me.jpg) and put its path here.
  // Square-ish works best. Until the file exists, a doodle avatar shows instead.
  photo: '/me.jpg',
  photoAlt: 'Bolanle, seen from behind, sitting on a bench above the clouds at sunrise',
  // One line for the home page and post footers.
  shortBio: 'Portfolio Manager of a public multi-asset portfolio, and founder of Scentâme and Perfume Foundry.',
  // The About page. Each string is a paragraph; **bold** works.
  // Names listed under `ventures` below become links automatically wherever they appear here.
  bio: [
    'I’m a **Portfolio Manager** running a public multi-asset portfolio, and the founder of Scentâme and Perfume Foundry.',
    'This blog is where I think out loud about whatever I’m curious about, from markets and AI to stars and food, and turn the numbers into charts you can play with.',
  ],
  // Your businesses. Add each website's address to `href` and the name becomes a link
  // on the About page. Leave `href` empty to show the name without a link.
  ventures: [
    { name: 'Scentâme', href: '' },
    { name: 'Perfume Foundry', href: '' },
  ],
  // Quick facts on the About page. Delete any you don’t want.
  facts: [
    { label: 'Day job', text: 'Portfolio Manager, public multi-asset portfolio' },
    { label: 'Founder', text: 'Scentâme · Perfume Foundry' },
    { label: 'Writing about', text: 'Markets, AI, science, food and anything else I can chart' },
  ],
  // Optional links. Remove lines you don’t use.
  links: [
    // { label: 'Instagram', href: 'https://instagram.com/you' },
    // { label: 'LinkedIn', href: 'https://linkedin.com/in/you' },
  ] as { label: string; href: string }[],
};
