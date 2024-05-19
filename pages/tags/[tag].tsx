import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { client } from "api/graphql/client";
import Layout, { CustomContainer } from "components/layout";
import Header from "components/Services/components/Header";
import { SEARCH_BLOG } from "api/graphql/queries/blog";
import GSoftImage from "components/GSoftImage";
import { Box, Button, Grid, Typography } from "@mui/material";

const BlogsSortedAccordingTags = () => {
  const [searcBlogData, setSearchBlogData] = useState<any[]>([]);
  const router = useRouter();
  const { tag } = router.query;
  const searchNewBlogs = async () => {
    const queries = [
      client.query({
        query: SEARCH_BLOG,
        variables: {
          filters: {
            tags: {
              containsi: tag,
            },
          },
        },
      }),
    ];
    const response = await Promise.all(queries);
    const searchblogs = response[0]?.data?.blogs?.data || [];
    [...searchblogs]?.sort((a, b) => {
      const dateA = new Date(a.attributes.publishedDate);
      const dateB = new Date(b.attributes.publishedDate);
      return dateB - dateA;
    });
    setSearchBlogData(searchblogs);
  };
  useEffect(() => {
    searchNewBlogs();
  }, []);
  return (
    <>
      <main>
        <Layout>
          <Header
            heading={"Blogs Related to "}
            desc={typeof tag === "string" ? tag?.charAt(0).toUpperCase() + tag.substring(1) : tag}
          />
          <CustomContainer>
            <Grid
              container
              gap={2}
              item
              xs={11.5}
              sm={11.5}
              md={11.5}
              lg={12}
              sx={{ alignItems: "center", margin: "auto" }}
            >
              {searcBlogData?.map((item: any) => {
                return (
                  <>
                    <Grid item xs={12} sm={5.5} md={5.5} sx={{ width: "100%" }}>
                      <Box
                        sx={{
                          height: { xs: 207, sm: 400, md: 400, lg: 350 },
                          width: "100%",
                        }}
                      >
                        <GSoftImage
                          alt="img"
                          src={item?.attributes?.picture?.data?.attributes?.url}
                          quality={"100"}
                          style={{ objectFit: "contain" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={5.5} md={5.5} paddingBottom={{ xs: "20px", sm: "0px" }}>
                      <Box>
                        <Typography
                          variant="h4"
                          sx={{
                            lineHeight: {
                              xs: "30px",
                              sm: "30px",
                              md: "36px",
                              lg: "36px",
                            },
                          }}
                        >
                          {item?.attributes?.title}
                        </Typography>
                        <Button
                          sx={{
                            color: "secondary.dark",
                            borderRadius: "30px",
                            padding: "15px 25px",
                            marginTop: { xs: "5px", sm: "7px", md: "10px" },
                            backgroundColor: "#10b2db",
                            "&:hover": {
                              backgroundColor: "#10b2db",
                            },
                          }}
                          onClick={() => {
                            router.push(`/blogs/${item?.attributes?.slug}`);
                          }}
                        >
                          <Typography fontSize={"14px !important"} fontWeight={"700"}>
                            Read More
                          </Typography>
                        </Button>
                      </Box>
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </CustomContainer>
        </Layout>
      </main>
    </>
  );
};

export default BlogsSortedAccordingTags;
