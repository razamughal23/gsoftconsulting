import Container from "@mui/material/Container";
// import { useTheme } from "@mui/material";
import Header from "components/Services/components/Header";
import Menu from "components/Portfolio/ProjectList";
import portfolio from "public/images/portfolio.png";
import Layout from "components/layout";
import { GET_PORTFOLIO_CATEGORIES, Portfolio_Page_SEO, TECHNOLOGY_CATEGORIES } from "api/graphql/queries/portfolio";
import { client } from "api/graphql/client";
import { Props } from "types/portfolio";
import Technologies from "components/Home/components/Technologies/Technologies";
import { mapSeoData } from "utlis/next-seo.config";
import Progressbar from "components/ProgressBar/Progressbar";
import ApiError from "components/PageError";

const Portfolio = (props: Props) => {
  const { technologies, getProjectCategories, seo, error } = props;

  return (
    <>
      {error === true ? (
        <Layout seo={mapSeoData(seo)} header={{ backgroundColor: "#001A1F" }}>
          <ApiError />
        </Layout>
      ) : (
        <Layout seo={mapSeoData(seo)}>
          <Container maxWidth={false} disableGutters>
            <main>
              <Header heading="Portfolio" desc="Our Work Speaks Itself" image={portfolio} />
              <Progressbar />
              <Menu getProjectCategories={getProjectCategories} />
              <Technologies list={technologies?.list} />
            </main>
          </Container>
        </Layout>
      )}
    </>
  );
};

export default Portfolio;

export async function getStaticProps() {
  try {
    const queries = [
      client.query({
        query: GET_PORTFOLIO_CATEGORIES,
      }),
      client.query({
        query: TECHNOLOGY_CATEGORIES,
      }),
      client.query({
        query: Portfolio_Page_SEO,
      }),
    ];

    const response = await Promise.all(queries);
    const getProjectCategories = response[0].data.portfolioCategories.data || [];
    const technologyCategories = response[1]?.data?.technologyCategories?.data || [];
    const seo = response[2]?.data?.portfolioPage?.data?.attributes?.seo || [];
    if (response[0].data.portfolioCategories.data.length > 0) {
      return {
        props: {
          getProjectCategories: {
            getProjectCategories: getProjectCategories,
          },
          technologies: { list: technologyCategories },
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
