import React, { useEffect, useState, useRef } from "react";
import { Grid, Typography } from "@mui/material";
import { styles } from "../../components/JobDetail/styles";
import TextField from "@mui/material/TextField";
import { GET_CAREER_JOBS } from "api/graphql/queries/career";
import { client } from "api/graphql/client";
import Layout, { CustomContainer } from "components/layout";
import { APPLY_JOB } from "api/graphql/queries/career";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { gql, useMutation } from "@apollo/client";
import { validationApplyJob } from "components/add-validation/validation";
import { Props } from "types/contact";
import { Box } from "@mui/system";
import { Field, Form, Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import { uploadFileClient } from "api/graphql/client";
import { mapSeoData } from "utlis/next-seo.config";
import ApiError from "components/PageError";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

const SeniorCustomer = (props: Props) => {
  const { getcareerjob, seo, error } = props;
  const [image, setImage] = React.useState({});
  const fileInputRef = useRef(null);
  const [loadingButtonState, setLoadingButtonState] = useState(false);
  const [applyForJob, { data, loading }] = useMutation(APPLY_JOB);
  const notify = () => toast.success("Your application has been submitted");
  const submitHandler = async (values: any, { resetForm }: any) => {
    setLoadingButtonState(true);
    const { data } = await uploadFileClient.mutate({
      mutation: gql`
        mutation ($file: Upload!) {
          upload(file: $file) {
            data {
              id
              attributes {
                url
              }
            }
          }
        }
      `,
      variables: { file: image },
    });
    const imageUrl = data?.upload?.data?.id || "";
    applyForJob({
      variables: {
        data: {
          name: values?.name,
          email: values?.email,
          phoneNo: values?.phoneNo,
          CV: imageUrl,
        },
      },
    });
    resetForm();
    setLoadingButtonState(false);
  };
  useEffect(() => {
    if (data?.createApplyForJob?.data && !loading) {
      notify();
    }
  }, [loading]);

  return (
    <>
      {error === true ? (
        <Layout seo={mapSeoData(seo)} header={{ backgroundColor: "#001A1F" }}>
          <ApiError />
        </Layout>
      ) : (
        <Layout
          seo={mapSeoData(seo)}
          header={{
            backgroundColor: "secondary.main",
          }}
        >
          <CustomContainer>
            <Box sx={{ marginTop: "212px", marginBottom: "50px" }}>
              <Grid container xs={12} sm={12} md={12} lg={12}>
                <Grid container xs={12} sm={12} md={8} lg={8}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography
                      mb={2}
                      variant="h2"
                      sx={{
                        fontSize: "40px !important",
                      }}
                    >
                      {getcareerjob?.getcareerjob?.attributes?.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={11}>
                    <ReactMarkdown
                      children={getcareerjob?.getcareerjob?.attributes?.description}
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
                </Grid>

                <Grid container xs={12} sm={12} md={4} lg={4}>
                  <Formik
                    initialValues={{
                      name: "",
                      email: "",
                      phoneNo: "",
                      CV: null,
                    }}
                    validationSchema={validationApplyJob}
                    onSubmit={submitHandler}
                  >
                    {({ values, errors, touched, handleSubmit, handleChange }) => (
                      <Form onSubmit={handleSubmit}>
                        <Grid container xs={12} sm={12} md={12} lg={12} sx={styles.form}>
                          <Grid
                            container
                            item
                            lg={11}
                            md={11}
                            sm={11}
                            xs={11}
                            style={{ paddingTop: "20px", justifyContent: "center" }}
                          >
                            <Grid item xs={11} sm={11} md={11} lg={12}>
                              <Typography align="left" sx={{ fontWeight: "600", fontSize: "24px", color: "white" }}>
                                Apply for this position
                              </Typography>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <Field
                                as={TextField}
                                placeholder="Name*"
                                required
                                name="name"
                                variant="outlined"
                                value={values?.name}
                                error={touched?.name && Boolean(errors?.name)}
                                helperText={touched?.name && errors?.name}
                                sx={{
                                  width: "100%",
                                  border: "1px solid rgba(211, 211, 211, 0.4)",
                                  borderRadius: "8px",
                                }}
                                inputProps={{ style: { color: "white", fontSize: "16px" } }}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <Field
                                as={TextField}
                                placeholder="Email*"
                                type="email"
                                required
                                name="email"
                                variant="outlined"
                                value={values?.email}
                                error={touched?.email && Boolean(errors?.email)}
                                helperText={touched?.email && errors?.email}
                                sx={{
                                  width: "100%",
                                  border: "1px solid rgba(211, 211, 211, 0.4)",
                                  borderRadius: "8px",
                                }}
                                inputProps={{ style: { color: "white", fontSize: "16px" } }}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <Field
                                as={TextField}
                                placeholder="Phone*"
                                type="number"
                                required
                                name="phoneNo"
                                variant="outlined"
                                value={values?.phoneNo}
                                error={touched?.phoneNo && Boolean(errors?.phoneNo)}
                                helperText={touched?.phoneNo && errors?.phoneNo}
                                sx={{
                                  width: "100%",
                                  border: "1px solid rgba(211, 211, 211, 0.4)",
                                  borderRadius: "8px",
                                }}
                                inputProps={{ style: { color: "white", fontSize: "16px" } }}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <Field
                                as={TextField}
                                type="file"
                                id="avatar"
                                name="CV"
                                required
                                placeholder="Cover Letter*"
                                inputRef={fileInputRef}
                                error={touched?.CV && Boolean(errors?.CV)}
                                helperText={
                                  image?.name?.length === 0 || image?.name?.length === undefined
                                    ? touched?.CV && errors?.CV
                                    : ""
                                }
                                onChange={(value: any) => {
                                  setImage(value?.target?.files[0]);
                                }}
                                rows={5}
                                maxRows={5}
                                sx={{
                                  width: "100%",
                                  border: "1px solid rgba(211, 211, 211, 0.4)",
                                  borderRadius: "8px",
                                }}
                                inputProps={{ style: { color: "white", fontSize: "16px" } }}
                              />
                            </Grid>
                            <Grid lg={12} md={12} sm={12} xs={12}>
                              <LoadingButton
                                variant="contained"
                                type="submit"
                                loading={loadingButtonState}
                                style={{ backgroundColor: "#16B1E1" }}
                                sx={styles.buttonSubmit}
                                disabled={
                                  Object.keys(errors).length > 1
                                    ? true
                                    : image?.name?.length === 0 || image?.name?.length === undefined
                                    ? true
                                    : values?.email.length > 0
                                    ? false
                                    : true
                                }
                              >
                                Submit
                              </LoadingButton>
                            </Grid>
                          </Grid>
                        </Grid>
                        <ToastContainer />
                      </Form>
                    )}
                  </Formik>
                </Grid>
              </Grid>
            </Box>
          </CustomContainer>
        </Layout>
      )}
    </>
  );
};

export default SeniorCustomer;

export async function getServerSideProps(context: any) {
  try {
    const queries = [
      client.query({
        query: GET_CAREER_JOBS,
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
    const getcareerjob = response[0]?.data?.careerJobs?.data || [];
    const seo = response[1]?.data?.CareerJobs_SEO?.data?.attributes?.seo || [];
    if (response[0]?.data?.careerJobs?.data.length > 0) {
      return {
        props: {
          getcareerjob: {
            getcareerjob: getcareerjob[0],
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
