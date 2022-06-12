import Link from 'next/link';
import React from 'react';

type LinkType = {
  href: string;
  label: string;
  key?: string;
}

const links: Array<LinkType> = [
  { href: 'https://vercel.com/', label: 'Vercel' },
  { href: 'https://github.com/vercel/next.js', label: 'GitHub' },
].map((link: LinkType): LinkType => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav = (): JSX.Element => (
  <nav>
    <ul>
      <li>
        <Link href="/">
          Home
        </Link>
      </li>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <a href={href}>{label}</a>
        </li>
      ))}
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
);

export default Nav;
