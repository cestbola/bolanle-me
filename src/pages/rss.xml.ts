import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/posts';
import { SITE } from '../site';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site!,
    items: posts.map((p) => ({
      title: `${p.data.mood} ${p.data.title}`,
      pubDate: p.data.date,
      description: p.data.description ?? p.data.tldr ?? '',
      link: `/posts/${p.id}/`,
    })),
  });
}
