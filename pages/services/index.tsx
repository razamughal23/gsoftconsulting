import React from "react";
import { Grid, Typography } from "@mui/material";
import { styles } from "styles/services";
import Description from "components/Description";
import Services from "components/Services/components/ServicesBlock";
import Facilities from "components/Services/components/Facilities";
import PortfolioCard from "components/Portfolio";
import { PORTFOLIO_LIST, GET_PROJECT_CATEGORIES } from "api/graphql/queries/home";
import { ALL_SERVICES, WHAT_WE_OFFER, WHAY_CHOSE_US, Service_Page_SEO } from "../../api/graphql/queries/service";
import { client } from "api/graphql/client";
import { Props } from "types/services";
import Layout from "components/layout";
import { mapSeoData } from "utlis/next-seo.config";
import ApiError from "components/PageError";

function ServicesPage(props: Props) {
  const { error, portfolio, service, whaychoseus, whatweffer, projectCategories, seo } = props;

  return (
    <>
      {error === true ? (
        <Layout seo={mapSeoData(seo)} header={{ backgroundColor: "#001A1F" }}>
          <ApiError />
        </Layout>
      ) : (
        <Layout seo={mapSeoData(seo)}>
          <Grid sx={styles.toolbar}>
            <Grid container item lg={12} md={12} sm={12} xs={12} sx={styles.Headings}>
              <Grid item lg={8} md={8} sm={10} xs={12} style={{ textAlign: "center", alignItems: "center" }}>
                <Typography variant="h1" sx={styles.styling}>
                  Our Services
                </Typography>
                <Typography sx={styles.description} fontSize={{ xs: "28px", sm: "28px", md: "30px", lg: "36px" }}>
                  Fast, secure, stunning websites & Web Apps at unbeatable prices.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Description
            title={whatweffer?.whatweffer?.attributes?.title}
            details={whatweffer?.whatweffer?.attributes?.description}
            name=""
          />
          <Services service={service} />
          <Facilities whaychoseus={whaychoseus} />
          <PortfolioCard
            list={portfolio.list}
            tags={projectCategories}
            color={"black"}
            hoverbg={"black"}
            hoverColor={"white"}
            descColor={"#black"}
            tabColor={"secondary.light"}
          />
        </Layout>
      )}
    </>
  );
}

export default ServicesPage;

export async function getStaticProps() {
  try {
    const queries = [
      client.query({
        query: PORTFOLIO_LIST,
      }),
      client.query({
        query: ALL_SERVICES,
        variables: {
          pagination: {
            limit: 20,
          },
        },
      }),
      client.query({
        query: WHAT_WE_OFFER,
      }),
      client.query({
        query: WHAY_CHOSE_US,
      }),
      client.query({
        query: GET_PROJECT_CATEGORIES,
      }),
      client.query({
        query: Service_Page_SEO,
      }),
    ];

    const response = await Promise.all(queries);
    const portfolio = response[0].data.portfolios.data || [];
    const allservices = response[1].data.services.data || [];
    const whatweffer = response[2].data.whatweoffer.data || [];
    const whaychoseus = response[3].data.whychooseuses.data || [];
    const projectCategories = response[4]?.data?.portfolioCategories?.data || [];
    const seo = response[5]?.data?.servicePage?.data?.attributes?.seo || {};
    if (response[0].data.portfolios.data.length > 0) {
      return {
        props: {
          portfolio: { list: portfolio },
          service: {
            allservices: allservices,
          },
          whatweffer: {
            whatweffer: whatweffer,
          },
          whaychoseus: {
            whaychoseus: whaychoseus,
          },
          projectCategories: projectCategories,
          seo,
        },
      };
    } else {
      return { props: { error: true } };
    }
  } catch (error) {
    return { props: { error: true } };
  }
}
