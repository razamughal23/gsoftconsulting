import { NextPage } from "next";
import { useTheme } from "@mui/material";
import AboutComponent from "components/AboutPage/components/TopComponent";
import Offers from "components/Services/components/ServicesOffers";
import Mission from "components/AboutPage/components/Mission";
import Counts from "components/AboutPage/components/Counts";
import Leadership from "components/AboutPage/components/Leadership";
import PortfolioCard from "components/Portfolio";
import Testimonial from "components/Testimonials";
import Layout from "components/layout";
import {
  GET_TESTIMONIALS,
  HOME_CAROUSAL,
  PORTFOLIO_LIST,
  TECHNOLOGY_CATEGORIES,
  GET_PROJECT_CATEGORIES,
} from "api/graphql/queries/home";
import { About_SEO_Query, ABOUT_US, MEET_OUR_TEAM } from "api/graphql/queries/about";
import { client } from "api/graphql/client";
import { Props } from "types/about";
import { mapSeoData } from "utlis/next-seo.config";
import ApiError from "components/PageError";

const About: NextPage<Props> = (props) => {
  const theme = useTheme();
  const { portfolio, error, testimonial, aboutUs, projectCategories, meetOurTeam, seo } = props;

  return (
    <>
      {error === true ? (
        <Layout seo={mapSeoData(seo)} header={{ backgroundColor: "#001A1F" }}>
          <ApiError />
        </Layout>
      ) : (
        <Layout seo={mapSeoData(seo)}>
          <main>
            <AboutComponent
              desc={aboutUs?.aboutUs?.attributes?.shortDescription}
              image={aboutUs?.aboutUs?.attributes?.coverPicture?.data?.attributes?.url}
              {...props.header}
              heading="About"
            />
            <Offers
              topHeading="Work with the Tech Leader."
              heading={aboutUs?.aboutUs?.attributes?.shortDescription}
              desc={aboutUs?.aboutUs?.attributes?.longDescription}
              image={aboutUs?.aboutUs?.attributes?.image1?.data?.attributes?.url}
            />
            <Mission aboutUs={aboutUs} />
            <Counts
              countImg={aboutUs?.aboutUs?.attributes?.image2?.data?.attributes?.url}
              count1={aboutUs?.aboutUs?.attributes?.ClientsNumber}
              title1={aboutUs?.aboutUs?.attributes?.totalClients}
              count2={aboutUs?.aboutUs?.attributes?.projectsNumber}
              title2={aboutUs?.aboutUs?.attributes?.totalProjects}
              count3={aboutUs?.aboutUs?.attributes?.hourOfSupport}
              title3={aboutUs?.aboutUs?.attributes?.totalHours}
              count4={aboutUs?.aboutUs?.attributes?.talentedGsoftian}
              title4={aboutUs?.aboutUs?.attributes?.totalGsoftians}
            />
            <Leadership meetOurTeam={meetOurTeam} />
            <PortfolioCard
              list={portfolio.list}
              tags={projectCategories}
              bgcolor={theme.palette.primary.light}
              color={theme.palette.secondary.main}
              hoverbg={theme.palette.secondary.main}
              hoverColor={theme.palette.secondary.light}
              descColor={theme.palette.success.light}
              tabColor={theme.palette.success.light}
            />
            <Testimonial list={testimonial.list} />
          </main>
        </Layout>
      )}
    </>
  );
};

export async function getStaticProps(context: any) {
  try {
    const queries = [
      client.query({
        query: HOME_CAROUSAL,
      }),

      client.query({
        query: PORTFOLIO_LIST,
      }),
      client.query({
        query: TECHNOLOGY_CATEGORIES,
      }),
      client.query({
        query: GET_TESTIMONIALS,
      }),
      client.query({
        query: ABOUT_US,
      }),
      client.query({
        query: MEET_OUR_TEAM,
      }),
      client.query({
        query: About_SEO_Query,
      }),
      client.query({
        query: GET_PROJECT_CATEGORIES,
      }),
    ];

    const response = await Promise.all(queries);
    const header = response[0]?.data.homeCarousels?.data[0];
    const portfolio = response[1]?.data?.portfolios?.data || [];
    const technologyCategories = response[2].data.technologyCategories.data || [];
    const testimonial = response[3].data.reviews.data || [];
    const projectCategories = response[7]?.data?.portfolioCategories?.data || [];
    const aboutUs = response[4]?.data?.about?.data || [];
    const meetOurTeam = response[5]?.data?.usersPermissionsUsers?.data || [];
    const seo = response[6]?.data?.about?.data?.attributes?.seo;
    if (response[0]?.data.homeCarousels?.data.length > 0) {
      return {
        props: {
          header: {
            ...header?.attributes,
            coverPhoto: {
              ...header?.attributes?.coverPhoto?.data?.attributes,
            },
          },
          projectCategories: projectCategories,
          technologies: { list: technologyCategories },

          portfolio: { list: portfolio },
          testimonial: {
            list: testimonial,
          },
          aboutUs: {
            aboutUs: aboutUs,
          },
          meetOurTeam: {
            meetOurTeam: meetOurTeam,
          },
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
export default About;
