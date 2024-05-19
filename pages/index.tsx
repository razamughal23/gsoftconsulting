import { NextPage } from "next";
import Description from "components/Description";
import Services from "components/Services";
import WorkFlow from "components/WorkFlow/WorkFlow";
import Technologies from "components/Home/components/Technologies/Technologies";
import Testimonial from "components/Testimonials";
import PortfolioCard from "components/Portfolio";
import Header from "components/Home/components/Header";
import Progressbar from "components/ProgressBar/Progressbar";
import { useTheme } from "@mui/material";
import {
  ABOUT,
  GET_PROJECT_CATEGORIES,
  GET_TESTIMONIALS,
  HOME_CAROUSAL,
  OUR_SERVICES,
  PORTFOLIO_LIST,
  TECHNOLOGY_CATEGORIES,
  WORK_FLOW,
} from "api/graphql/queries/home";
import { SOCIAL_LINKS } from "api/graphql/queries/footer";
import { client } from "api/graphql/client";
import { Props } from "types/home";
import Layout from "components/layout";
import { mapSeoData } from "utlis/next-seo.config";
import ApiError from "components/PageError";

const Home: NextPage<Props> = (props) => {
  const theme = useTheme();
  const { header, about, services, technologies, portfolio, error, testimonial, projectCategories, workflow, seo } =
    props;
  return (
    <>
      {error === true ? (
        <Layout seo={mapSeoData(seo)} header={{ backgroundColor: "#001A1F" }}>
          <ApiError />
        </Layout>
      ) : (
        <Layout seo={mapSeoData(seo)} showFaq={true}>
          <Progressbar />
          <Header {...header} />
          <Description title="Who We Are" name="CONSULTANCY. DESIGN. DEVELOPMENT." details={about.details} />
          <Services {...services} />
          <Technologies
            list={technologies.list}
            bgcolor={theme.palette.primary.light}
            color={theme.palette.secondary.main}
            filter="brightness(0) invert(1)"
            tabColor={theme.palette.success.light}
          />
          <WorkFlow workflow={workflow} />
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
        </Layout>
      )}
    </>
  );
};

export async function getStaticProps() {
  try {
    const queries = [
      client.query({
        query: HOME_CAROUSAL,
      }),
      client.query({
        query: ABOUT,
      }),
      client.query({
        query: OUR_SERVICES,
        variables: {
          pagination: {
            limit: 20,
          },
        },
      }),
      client.query({
        query: TECHNOLOGY_CATEGORIES,
      }),
      client.query({
        query: PORTFOLIO_LIST,
      }),
      client.query({
        query: GET_TESTIMONIALS,
        variables: {
          showOnHome: true,
        },
      }),
      client.query({
        query: GET_PROJECT_CATEGORIES,
      }),
      client.query({
        query: WORK_FLOW,
      }),
      client.query({
        query: SOCIAL_LINKS,
      }),
    ];

    const response = await Promise.all(queries);
    const header = response[0]?.data.homeCarousels?.data[0];
    const about = response[1]?.data?.about?.data?.attributes?.longDescription;
    const ourService = response[2].data.services.data || [];
    const technologyCategories = response[3]?.data?.technologyCategories?.data || [];
    const portfolio = response[4]?.data?.portfolios?.data || [];
    const testimonial = response[5]?.data?.reviews?.data || [];
    const projectCategories = response[6]?.data?.portfolioCategories?.data || [];
    const workflow = response[7]?.data?.workflows?.data || [];
    const seo = response[8]?.data?.homePage?.data?.attributes?.seo;
    if (response[0]?.data.homeCarousels?.data.length > 0) {
      return {
        props: {
          header: {
            ...header?.attributes,
          },
          projectCategories: projectCategories,
          about: {
            details: about,
          },
          services: { data: ourService },
          technologies: { list: technologyCategories },
          portfolio: { list: portfolio },
          testimonial: {
            list: testimonial,
          },

          workflow: {
            workflow: workflow,
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
export default Home;
