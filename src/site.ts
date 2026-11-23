// Edit me! Everything personal about the site lives here.
export const SITE = {
  name: 'bolanle.me',
  author: 'Bolanle',
  tagline: 'Thoughts, takes & charts about things.',
  description: 'A blog where Bolanle thinks out loud and charts it — interactive charts, hot-take meters, tier lists and more.',
  sticker: 'now with 100% more charts ✨',
};

// About you: shown on the home page, the About page, and at the end of every post.
export const ME = {
  name: 'Bolanle',
  // Drop a photo into /public (e.g. public/me.jpg) and put its path here.
  // Square-ish works best. Until the file exists, a doodle avatar shows instead.
  photo: '/me.jpg',
  photoAlt: 'Photo of Bolanle',
  // One line for the home page and post footers.
  shortBio: 'PLACEHOLDER: a one-line bio. Who you are and what you think about.',
  // The About page. Each string is a paragraph; **bold** works.
  bio: [
    'PLACEHOLDER: a paragraph or two about you. What you do, where you are, what you can’t stop thinking about.',
    'PLACEHOLDER: what this blog is for, and what readers can expect.',
  ],
  // Little fact chips on the About page. Delete any you don’t want.
  facts: [
    { emoji: '📍', text: 'PLACEHOLDER: where you’re based' },
    { emoji: '💼', text: 'PLACEHOLDER: what you do' },
    { emoji: '❤️', text: 'PLACEHOLDER: something you love' },
  ],
  // Optional links. Remove lines you don’t use.
  links: [
    // { label: 'Instagram', href: 'https://instagram.com/you' },
    // { label: 'LinkedIn', href: 'https://linkedin.com/in/you' },
  ] as { label: string; href: string }[],
};
