import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Layout, { CustomContainer } from "components/layout";
import { styles } from "../../components/Portfolio/detailpage/styles";
import { Props } from "types/portfoliodetails";
import Header from "components/Services/components/Header";
import { client } from "api/graphql/client";
import { Portfolio_Detail_Page } from "api/graphql/queries/portfolio";
import GSoftImage from "components/GSoftImage";
import Text from "components/GsoftText";
import ApiError from "components/PageError";
import { mapSeoData } from "utlis/next-seo.config";
import { useRouter } from "next/router";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

const PortfolioDetail = (props: Props) => {
  const router = useRouter();
  const { portfolio, seo, error } = props;
  return (
    <>
      {error === true ? (
        <Layout seo={mapSeoData(seo)} header={{ backgroundColor: "#001A1F" }}>
          <ApiError />
        </Layout>
      ) : (
        <main>
          <Layout seo={mapSeoData(seo)}>
            <Header heading={portfolio?.portfolio?.attributes?.title} />
            <CustomContainer>
              <Grid container item xs={11.5} sm={11.5} md={11.5} lg={12} sx={styles.Main}>
                <Box
                  sx={{
                    height: { xs: 210, sm: 400, md: 400, lg: 450 },
                    width: { xs: "100%", sm: "100%", md: "79%", lg: "73%" },
                  }}
                >
                  <GSoftImage
                    src={portfolio?.portfolio?.attributes?.coverPicture?.data?.attributes?.url}
                    alt="Portfolio detail Image"
                    quality={"100"}
                    style={{ objectFit: "contain" }}
                  />
                </Box>
                <Grid
                  container
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  sx={{ display: "flex", margin: "auto", paddingTop: "20px" }}
                >
                  {portfolio?.portfolio?.attributes?.tags?.split(",").map((tag: any, index: any) => {
                    return (
                      <Text key={`${tag?.id}-${index}`} sx={styles.technologyHeadings} fontSize={"14px"} name={tag} />
                    );
                  })}
                  <ReactMarkdown
                    children={portfolio?.portfolio?.attributes?.description}
                    remarkPlugins={[remarkGfm]}
                    className="markdown"
                    components={{
                      h1: ({ node, ...props }) => (
                        <Typography fontSize={32} variant="h1" sx={{ fontWeight: "bold" }} {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <Typography fontSize={28} variant="h2" sx={{ fontWeight: "bold" }} {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <Typography fontSize={24} variant="h3" sx={{ fontWeight: "bold" }} {...props} />
                      ),
                      h4: ({ node, ...props }) => (
                        <Typography fontSize={20} variant="h4" sx={{ fontWeight: "bold" }} {...props} />
                      ),
                      h5: ({ node, ...props }) => (
                        <Typography fontSize={18} variant="h5" sx={{ fontWeight: "bold" }} {...props} />
                      ),
                      h6: ({ node, ...props }) => (
                        <Typography fontSize={16} variant="h6" sx={{ fontWeight: "bold" }} {...props} />
                      ),
                      p: ({ node, ...props }) => <Typography fontSize={16} fontWeight={"400"} {...props} />,
                      ul: ({ node, ...props }) => <Typography fontSize={16} fontWeight={"400"} {...props} />,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ margin: "auto", paddingTop: "20px" }}>
                  {portfolio?.portfolio?.attributes?.playStoreLink || portfolio?.portfolio?.attributes?.AppStoreLink ? (
                    <Typography
                      sx={{
                        fontSize: "28px",
                        fontWeight: 600,
                        lineHeight: "42px",
                      }}
                    >
                      Download Now:
                    </Typography>
                  ) : (
                    <></>
                  )}
                  <Grid container item xs={12} sm={12} md={12} lg={12} sx={{ display: "flex" }}>
                    {portfolio?.portfolio?.attributes?.playStoreLink && (
                      <>
                        <Box
                          sx={{ height: 60, width: 210, cursor: "pointer" }}
                          onClick={() => {
                            router.push(portfolio?.portfolio?.attributes?.playStoreLink);
                          }}
                        >
                          <GSoftImage
                            src={portfolio?.portfolio?.attributes?.playStore?.data?.attributes?.url}
                            alt="Play Store Image"
                          />
                        </Box>
                      </>
                    )}
                    {portfolio?.portfolio?.attributes?.AppStoreLink && (
                      <>
                        <Box
                          sx={{ height: 60, width: 210, cursor: "pointer" }}
                          marginLeft={{ xs: "0px", sm: "20px" }}
                          onClick={() => {
                            router.push(portfolio?.portfolio?.attributes?.AppStoreLink);
                          }}
                        >
                          <GSoftImage
                            src={portfolio?.portfolio?.attributes?.AppStore?.data?.attributes?.url}
                            alt="App Store Image"
                          />
                        </Box>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </CustomContainer>
          </Layout>
        </main>
      )}
    </>
  );
};

export default PortfolioDetail;

export async function getServerSideProps(context: any) {
  try {
    const queries = [
      client.query({
        query: Portfolio_Detail_Page,
        variables: {
          filters: {
            slug: {
              eq: context.query.id,
            },
          },
        },
      }),
    ];

    const response = await Promise.all(queries);
    const portfolio = response[0]?.data?.portfolios?.data || [];
    if (response[0].data.portfolios.data.length > 0) {
      return {
        props: {
          portfolio: {
            portfolio: portfolio[0],
          },
        },
      };
    } else {
      return {
        redirect: {
          permanent: true,
          destination: "/",
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
    };
  }
}
