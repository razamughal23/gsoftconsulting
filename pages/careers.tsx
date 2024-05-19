import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Description from "components/Description";
import HeadingAvatar from "components/Jobs/components/NeedToKnow/HeadingAvatar";
import Job from "components/Jobs/components/Job";
import Benefits from "components/Jobs/components/Benefit";
import JobSearch from "components/Jobs/JobSearch";
import { mapSeoData } from "utlis/next-seo.config";
import Progressbar from "components/ProgressBar/Progressbar";
import Layout from "components/layout";
import { SEARCH_JOBS, BENEFITS_CAREER_JOBS, CareerJobs_SEO } from "api/graphql/queries/career";
import { client } from "api/graphql/client";
import { Props } from "types/jobs";
import Header from "components/Services/components/Header";
import portfolio from "public/images/jobs.png";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import ApiError from "components/PageError";

const Jobs = (props: Props) => {
  const { benefitsList = [], error, seo } = props;
  const [searchedText, setSearchedText] = useState("");
  const [experienceText, setExperienceText] = useState("");
  const [categoryText, setCategoryText] = useState("");
  const { data, loading, refetch } = useQuery(SEARCH_JOBS);
  const searchJob = data?.careerJobs?.data || [];
  const [filterdata, setFilterData] = useState<any>({});
  const saveSearchText = (text: any) => {
    setFilterData((prev: any) => {
      const data = { ...prev };
      data["title"] = text;
      return data;
    });

    setSearchedText(text);
    if (Object.keys(filterdata).length === 1 || Object.keys(filterdata).length === 0) {
      refetch({
        filters: {
          title: {
            contains: text,
          },
        },
      });
    }
  };
  const saveExperienceText = (text: any) => {
    setFilterData((prev: any) => {
      const data = { ...prev };
      data["experience"] = text;
      return data;
    });
    if (text !== "All") {
      setExperienceText(text);

      if (Object.keys(filterdata).length === 1 || Object.keys(filterdata).length === 0) {
        refetch({
          filters: {
            experience: {
              eq: text,
            },
          },
        });
      }
    } else {
      if (Object.keys(filterdata).length === 1 || Object.keys(filterdata).length === 0) {
        refetch({
          filters: {
            experience: {
              contains: "",
            },
          },
        });
      }
    }
  };
  const saveCategoryText = (text: any) => {
    setFilterData((prev: any) => {
      const data = { ...prev };
      data["category"] = text;
      return data;
    });
    if (text !== "All") {
      setCategoryText(text);
      if (Object.keys(filterdata).length === 1 || Object.keys(filterdata).length === 0) {
        refetch({
          filters: {
            category: {
              containsi: text,
            },
          },
        });
      }
    } else {
      if (Object.keys(filterdata).length === 1 || Object.keys(filterdata).length === 0) {
        refetch({
          filters: {
            category: {
              contains: "",
            },
          },
        });
      }
    }
  };
  useEffect(() => {
    if (Object.keys(filterdata).length > 1) {
      const arr = [];
      for (let i = 1; i <= Object.keys(filterdata).length; i++) {
        arr.push(Object.values(filterdata)[i - 1]);
      }

      if (filterdata.hasOwnProperty("title") && filterdata.hasOwnProperty("category")) {
        refetch({
          filters: {
            title: {
              contains: filterdata["title"],
            },
            category: {
              contains: filterdata["category"] === "All" ? "" : filterdata["category"],
            },
          },
        });
      }
      if (filterdata.hasOwnProperty("title") && filterdata.hasOwnProperty("experience")) {
        refetch({
          filters: {
            title: {
              contains: filterdata["title"],
            },
            experience: {
              contains: filterdata["experience"] === "All" ? "" : filterdata["experience"],
            },
          },
        });
      }
      if (filterdata.hasOwnProperty("category") && filterdata.hasOwnProperty("experience")) {
        refetch({
          filters: {
            category: {
              contains: filterdata["category"] === "All" ? "" : filterdata["category"],
            },
            experience: {
              contains: filterdata["experience"] === "All" ? "" : filterdata["experience"],
            },
          },
        });
      }

      if (
        filterdata.hasOwnProperty("title") &&
        filterdata.hasOwnProperty("category") &&
        filterdata.hasOwnProperty("experience")
      ) {
        refetch({
          filters: {
            title: {
              contains: filterdata["title"],
            },
            category: {
              contains: filterdata["category"] === "All" ? "" : filterdata["category"],
            },
            experience: {
              contains: filterdata["experience"] === "All" ? "" : filterdata["experience"],
            },
          },
        });
      }
    }
  }, [filterdata]);

  return (
    <Container maxWidth={false} disableGutters>
      {error === true ? (
        <Layout seo={mapSeoData(seo)} header={{ backgroundColor: "#001A1F" }}>
          <ApiError />
        </Layout>
      ) : (
        <main>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Header heading="Building What's Next!" image={portfolio}></Header>
            <Progressbar />
          </Grid>
          <Layout seo={mapSeoData(seo)}>
            <Description
              title="Careers"
              name="It's not just a job, it’s an adventure!"
              details="Are you ready to join a team that values collaboration, innovation, and excellence? Look no further! Our company is committed to creating a positive and inclusive work environment where employees can thrive and grow in their careers. We believe in investing in our people and providing them with the resources and support they need to achieve their professional goals. With competitive salaries and benefits packages, as well as opportunities for growth and development, we invite you to explore the possibilities of working with us. Join our team today and make a positive impact on the world around us!"
            />
            <HeadingAvatar />
            <Job />
            <JobSearch
              saveSearchText={saveSearchText}
              saveExperienceText={saveExperienceText}
              saveCategoryText={saveCategoryText}
              jobsList={searchJob}
              loading={loading}
            />
            <Benefits benefitsList={benefitsList} />
          </Layout>
        </main>
      )}
    </Container>
  );
};

export default Jobs;

export async function getStaticProps() {
  try {
    const queries = [
      client.query({
        query: BENEFITS_CAREER_JOBS,
        variables: {
          pagination: {
            limit: 20,
          },
        },
      }),
      client.query({
        query: CareerJobs_SEO,
      }),
    ];

    const response = await Promise.all(queries);
    const benefitsList = response[0]?.data?.benefitsOfCareers?.data || [];
    const seo = response[1]?.data?.careerJobPage?.data?.attributes?.seo || [];
    if (response[0]?.data?.benefitsOfCareers?.data.length > 0) {
      return {
        props: {
          benefitsList: benefitsList,
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
