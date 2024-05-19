import React, { useEffect, useState } from "react";
import MainHead from "../components/Blog/components/Main";
import BlogCard from "../components/Blog/components/BlogCard";
import { BlogPage_SEO, POPULAR_BLOG, SEARCH_BLOG } from "api/graphql/queries/blog";
import { client } from "api/graphql/client";
import { Props } from "types/blog";
import Layout from "components/layout";
import { mapSeoData } from "utlis/next-seo.config";
import Progressbar from "components/ProgressBar/Progressbar";
import { Box, Pagination } from "@mui/material";
import ApiError from "components/PageError";

const Blogpage = (props: Props) => {
  const { seo, error } = props;
  const { popularBlog } = props;
  const [searchDat, setSearchDat] = useState("");
  const [searcBlogData, setSearchBlogData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const searchNewBlogs = async (searchDat: any) => {
    const response = await client.query({
      query: SEARCH_BLOG,
      variables: {
        pagination: {
          page: currentPage,
          pageSize: 3,
        },
        filters: {
          title: {
            containsi: searchDat.trim(),
          },
        },
        sort: "publishedDate:desc",
      },
    });
    const searchblogs = response?.data?.blogs?.data || [];
    const pagination = response?.data?.blogs?.meta?.pagination.total || 1;
    setSearchBlogData(searchblogs);
    setTotalPages(Math.ceil(pagination / 3));
    backToTop();
  };
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    searchNewBlogs(searchDat);
  }, [searchDat, currentPage]);

  const searchData = (searchBlogs: any) => {
    setSearchDat(searchBlogs);
  };

  if (error) {
    return (
      <Layout seo={mapSeoData(seo)} header={{ backgroundColor: "#001A1F" }}>
        <ApiError />
      </Layout>
    );
  }
  const handlePageChange = (_: any, value: any) => {
    setCurrentPage(value);
  };

  return (
    <Layout seo={mapSeoData(seo)}>
      <MainHead />
      <Progressbar />
      <Box style={{ backgroundColor: "#e5f0f3" }}>
        <BlogCard popularBlog={popularBlog} searchData={searchData} searcBlogData={searcBlogData} />
        <Box sx={{ display: "flex", justifyContent: "center", paddingBottom: "20px" }}>
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          )}
        </Box>
      </Box>
    </Layout>
  );
};

export default Blogpage;

export async function getStaticProps() {
  try {
    const queries = [
      client.query({
        query: POPULAR_BLOG,
      }),
      client.query({
        query: BlogPage_SEO,
      }),
    ];

    const response = await Promise.all(queries);
    const popularBlog = response[0]?.data?.blogs?.data || [];
    const seo = response[1]?.data?.blogPage?.data?.attributes?.seo || [];
    return {
      props: {
        popularBlog: {
          popularBlog: popularBlog,
        },
        seo,
      },
    };
  } catch (error) {
    return { props: { error: true } };
  }
}
