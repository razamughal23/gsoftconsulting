// pages/server-sitemap-index.xml/index.tsx
import { getServerSideSitemapLegacy } from "next-sitemap";

import { GetServerSideProps } from "next";
import { client } from "api/graphql/client";
import { SERVICES_LIST } from "api/graphql/queries/footer";
import { BLOG_LIST } from "api/graphql/queries/blog";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let urls = [];

  let service = await client.query({
    query: SERVICES_LIST,
  });

  let blogs = await client.query({
    query: BLOG_LIST,
  });

  let serviceList = service?.data?.services?.data || [];
  const blogsList = blogs?.data?.blogs?.data || [];
  serviceList.map((item) => {
    urls.push({
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}services/${item?.attributes?.slug}`,
      lastmod: new Date().toISOString(),
    });
  });
  blogsList.map((item) => {
    urls.push({
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}blogs/${item?.attributes?.slug}`,
      lastmod: new Date().toISOString(),
    });
  });
  return getServerSideSitemapLegacy(ctx, urls);
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
