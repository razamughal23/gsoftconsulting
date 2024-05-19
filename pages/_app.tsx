import "../styles/globals.css";
import type { AppProps } from "next/app";
import { theme } from "styles/theme/defalutTheme";
import { Button, ThemeProvider, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { client } from "api/graphql/client";
import { ApolloProvider } from "@apollo/client";
import { DefaultSeo } from "next-seo";
import SEO from "../utlis/next-seo.config";
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";
import { WhatsappIcon } from "react-share";
import Script from "next/script";
import { useRouter } from "next/router";
import { pageview } from "utlis/gtm";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "utlis/createEmotionCache";

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }: MyAppProps) {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeComplete", pageview);
    return () => {
      router.events.off("routeChangeComplete", pageview);
    };
  }, [router.events]);
  return (
    <CacheProvider value={emotionCache}>
      {/* {For Google Tag Manager} */}
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TN93ZDX');`,
        }}
      />
      {/* {For Google Analytics} */}
      <Script async src={"https://www.googletagmanager.com/gtag/js?id=G-ZMVR3V0SS4"}></Script>
      <Script>
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config','G-ZMVR3V0SS4');`}
      </Script>
      <Head>
        <link rel="manifest" href="/manifest/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/images/icon-512x512.png"></link>
        <meta name="theme-color" content="#317EFB" />
        <meta name="google-site-verification" content="zM8iimY1IFz41BnwPRihxtztMpi7OMvtnxPIItReJnc" />
      </Head>

      <DefaultSeo {...SEO} />
      <ThemeProvider theme={theme}>
        <NextNProgress color="#29D" startPosition={0.3} height={3} showOnShallow={true} />
        <ApolloProvider client={client}>
          <Tooltip title="Whatsapp us">
            <Button
              style={{
                position: "fixed",
                bottom: "15px",
                right: "15px",
                cursor: "pointer",
                zIndex: "99999999",
                backgroundColor: "transparent",
              }}
            >
              <a
                href="https://api.whatsapp.com/send?phone=+924232215942&text=I came across your website and was wondering if you could assist me with some information about [product/service]. Can we chat now?"
                target="_blank"
                rel="noreferrer"
              >
                <WhatsappIcon style={{ borderRadius: "60px" }} />
              </a>
            </Button>
          </Tooltip>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
