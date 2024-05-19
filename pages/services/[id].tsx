import { GET_SERVICE } from "api/graphql/queries/service";
import { WHAT_WE_OFFER, WHAT_WE_PROVIDE, WHAY_CHOSE_US, WORK_FLOWS } from "api/graphql/queries/service";
import { GET_PROJECT_CATEGORIES, PORTFOLIO_LIST } from "../../api/graphql/queries/home";
import { client } from "api/graphql/client";
import Header from "components/Services/components/Header";
import Services from "components/Services/components/MoreServices";
// import Offers from "components/Services/components/ServicesOffers";
// import ServicesDescription from "components/Services/components/ServicesDescription";
// import WorkFlow from "components/Services/components/WorkFlow";
// import Facilities from "components/Services/components/Facilities";
import { Props } from "types/services";
import Layout from "components/layout";
import { mapSeoData } from "utlis/next-seo.config";
import Progressbar from "components/ProgressBar/Progressbar";
import ApiError from "components/PageError";

const WebDevelopment = (props: Props) => {
  const { service, whatweoffer, whatweprovide, whaychoseus, workflows, seo, error } = props;
  return (
    <>
      {error === true ? (
        <Layout seo={mapSeoData(seo)} header={{ backgroundColor: "#001A1F" }}>
          <ApiError />
        </Layout>
      ) : (
        <Layout seo={mapSeoData(seo)}>
          <Progressbar />
          <Header
            heading={service?.service?.attributes?.title}
            desc={service?.service?.attributes?.description}
            image={service?.service?.attributes?.coverPicture?.data?.attributes?.url}
          />
          {/* <Offers
            topHeading="Our Services"
            heading={whatweoffer?.whatweoffer?.attributes?.title}
            desc={whatweoffer?.whatweoffer?.attributes?.description}
            image={whatweoffer?.whatweoffer?.attributes?.picture?.data?.attributes?.url}
          />
          {whatweprovide?.whatweprovide?.map((item: any, index: any) => {
            return (
              <ServicesDescription
                key={`${item?.id}-${index}`}
                topHeading="Our Services"
                heading={item?.attributes?.title}
                desc={item?.attributes?.description}
                image={item?.attributes?.coverPicture?.data?.attributes?.url}
              />
            );
          })} */}
          <Services service={service} />
          {/* <WorkFlow workflows={workflows} />
          <Facilities whaychoseus={whaychoseus} /> */}
        </Layout>
      )}
    </>
  );
};

export default WebDevelopment;

export async function getServerSideProps(context: any) {
  try {
    const queries = [
      client.query({
        query: GET_SERVICE,
        variables: {
          filters: {
            slug: {
              eq: context.query.id,
            },
          },
        },
      }),
      client.query({
        query: WHAT_WE_OFFER,
      }),
      client.query({
        query: WHAT_WE_PROVIDE,
      }),
      client.query({
        query: WHAY_CHOSE_US,
      }),
      client.query({
        query: WORK_FLOWS,
      }),
      client.query({
        query: GET_PROJECT_CATEGORIES,
      }),
      client.query({
        query: PORTFOLIO_LIST,
      }),
    ];
    const response = await Promise.all(queries);
    const service = response[0].data.services?.data || [];
    const whatweoffer = response[1].data.whatweoffer.data || [];
    const whatweprovide = response[2].data.serviceProvideSections.data || [];
    const whaychoseus = response[3].data.whychooseuses.data || [];
    const workflows = response[4].data.workflows.data || [];
    const projectCategories = response[5]?.data?.portfolioCategories?.data || [];
    const portfolio = response[6]?.data?.portfolios?.data || [];
    const seo = response[0]?.data?.services?.data[0]?.attributes?.seo || [];
    if (response[0].data.services?.data.length > 0) {
      return {
        props: {
          service: {
            service: service[0],
          },
          whatweoffer: {
            whatweoffer: whatweoffer,
          },
          whatweprovide: {
            whatweprovide: whatweprovide,
          },
          whaychoseus: {
            whaychoseus: whaychoseus,
          },
          workflows: {
            workflows: workflows,
          },
          projectCategories: projectCategories,
          portfolio: { list: portfolio },
          seo,
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
