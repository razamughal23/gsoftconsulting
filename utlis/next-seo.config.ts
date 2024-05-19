import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  openGraph: {
    type: "Website",
    locale: "en_IE",
    url: "https://gsoftconsulting.com/",
    siteName: "Global Software Consulting",
    description: "We offer modern solutions for growing your business.",
    article: {
      authors: [
        {
          url: "/Gsoftfavicon.png",
          width: 800,
          height: 600,
          alt: "Global Software Consulting",
        },
        {
          url: "/Gsoftfavicon.png",
          width: 800,
          height: 600,
          alt: "Global Software Consulting",
        },
      ],
    },
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
    description: "We offer modern solutions for growing your business.",
    url: "https://gsoftconsulting.com/",
    title: "Global Software Consulting",
    domain: "gsoftconsulting.com",
    images: [
      {
        url: "/Gsoftfavicon.png",
        width: 800,
        height: 600,
        alt: "Global Software Consulting",
      },
      {
        url: "/Gsoftfavicon.png",
        width: 800,
        height: 600,
        alt: "Global Software Consulting",
      },
    ],
  },
  titleTemplate: "Global Software Consulting",
  defaultTitle: "Global Software Consulting",
  title: "Global Software Consulting",
  description: "We offer modern solutions for growing your business.",
  additionalLinkTags: [
    {
      rel: "favicon",
      href: "public/Gsoftfavicon.png",
    },
    {
      rel: "icon",
      href: "/Gsoftfavicon.png",
      sizes: "76x76",
    },
  ],
  robotsProps: {
    nosnippet: true,
    notranslate: true,
    noimageindex: true,
    noarchive: true,
    maxSnippet: -1,
    maxImagePreview: "standard",
    maxVideoPreview: -1,
  },
  canonical: "https://gsoftconsulting.com/",
  additionalMetaTags: [
    {
      property: "",
      content: "",
    },
    {
      name: "",
      content: "",
    },
  ],
};

export default config;

export const mapSeoData = (data: any) => {
  return {
    titleTemplate: data?.titleMeta || config.titleTemplate,
    defaultTitle: data?.titleMeta || config.defaultTitle,
    title: data?.titleMeta || config.title,
    openGraph: {
      type: "Website",
      locale: "en_IE",
      url: data?.canonicalURL || config.canonical,
      siteName: data?.focuskeyphrase || config.title,
      title: data?.focuskeyphrase || config.title,
      description: data?.metaDescriptionmeta || config.openGraph?.description,
      article: {
        authors: [
          {
            url: data?.metaImage?.data?.attributes?.url,
            width: 800,
            height: 600,
            alt: "Global Software Consulting",
          },
          {
            url: data?.metaImage?.data?.attributes?.url,
            width: 800,
            height: 600,
            alt: "Global Software Consulting",
          },
        ],
      },
      images: [
        {
          url: data?.metaImage?.data?.attributes?.url,
          width: 800,
          height: 600,
          alt: "Global Software Consulting",
        },
        {
          url: data?.metaImage?.data?.attributes?.url,
          width: 800,
          height: 600,
          alt: "Global Software Consulting",
        },
      ],
    },
    twitter: {
      title: data?.titleMeta || config.titleTemplate,
      description: data?.metaDescriptionmeta || config.openGraph?.description,
      handle: "@handle",
      site: "@site",
      cardType: data?.metaDescription || config.twitter?.cardType,
      images: [
        {
          url: data?.metaImage?.data?.attributes?.url,
          width: 800,
          height: 600,
          alt: "Global Software Consulting",
        },
        {
          url: data?.metaImage?.data?.attributes?.url,
          width: 800,
          height: 600,
          alt: "Global Software Consulting",
        },
      ],
    },
    additionalLinkTags: [
      {
        rel: "favicon",
        href: "/Gsoftfavicon.png",
      },
      {
        rel: "apple-touch-icon",
        href: "/Gsoftfavicon.png",
        sizes: "76x76",
      },
    ],
    description: data?.metaDescription || config.description,
    canonical: data?.canonicalURL || config.canonical,
  };
};

export const mapSeodataForBlogsPreview = (data: any) => {
  return {
    titleTemplate: data?.titleMeta || config.titleTemplate,
    defaultTitle: data?.titleMeta || config.defaultTitle,
    title: data?.titleMeta || config.title,
    canonical: data?.canonicalURL || config.canonical,

    openGraph: {
      type: "artical",
      locale: "en_IE",
      url: data?.canonicalURL || config.canonical,
      siteName: data?.title || config.title,
      title: data?.titleMeta || config.title,
      description: data?.metaDescription || config.openGraph?.description,
      images: [
        {
          url: data?.metaImage?.data?.attributes?.url,
          secure_url: data?.metaImage?.data?.attributes?.url,
          width: 650,
          height: 850,
          alt: data?.titleMeta || config.title,
          type: "image/webp",
          secureUrl: data?.metaImage?.data?.attributes?.url,
        },
        {
          url: data?.metaImage?.data?.attributes?.url,
          width: 800,
          height: 600,
          alt: data?.titleMeta || config.title,
          type: "image/webp",
          secureUrl: data?.metaImage?.data?.attributes?.url,
        },
      ],
    },
    twitter: {
      handle: "@handle",
      site: "@site",
      cardType: "summary_large_image",
      description: data?.metaDescription || config.openGraph?.description,
      url: data?.canonicalURL || config.canonical,
      title: data?.titleMeta || config.title,
      domain: "gsoftconsulting.com",
      images: [
        {
          url: data?.metaImage?.data?.attributes?.url,
          width: 800,
          height: 600,
          alt: "Global Software Consulting",
        },
        {
          url: data?.metaImage?.data?.attributes?.url,
          width: 800,
          height: 600,
          alt: "Global Software Consulting",
        },
      ],
    },
  };
};
