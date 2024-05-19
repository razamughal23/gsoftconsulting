import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styles } from "./styles";
import MenuComponent from "components/Portfolio/ProjectDescription";
import { CustomContainer } from "components/layout";
import { useLazyQuery } from "@apollo/client";
import { GET_PORTFOLIO_CATEGORIES } from "api/graphql/queries/portfolio";
import { useRouter } from "next/router";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Menu = (props: any) => {
  const router = useRouter();
  const [tabIndex, setTabValue] = useState(0);
  const [fetchData, { data }] = useLazyQuery(GET_PORTFOLIO_CATEGORIES);

  useEffect(() => {
    fetchData({
      variables: {
        filters: {
          name: {
            eq: "Mobile App",
          },
        },
      },
    });
  }, []);
  const { getProjectCategories } = props;

  const onChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    fetchData({
      variables: {
        filters: {
          name: {
            eq: getProjectCategories.getProjectCategories[newValue].attributes?.name,
          },
        },
      },
    });
  };
  const TabIndicatorProps = {
    style: {
      display: "none",
    },
  };

  return (
    <Grid container sx={styles.container}>
      <CustomContainer>
        <Grid container item md={12} sm={12} xs={12} sx={styles.tabsGrid}>
          <Tabs
            value={tabIndex}
            onChange={onChangeTab}
            TabIndicatorProps={TabIndicatorProps}
            variant="scrollable"
            sx={styles.tabs}
            id="tab"
            aria-hidden="true"
          >
            {getProjectCategories?.getProjectCategories?.map((item: any, index: any) => (
              <Tab
                sx={styles.tab}
                key={item.id}
                label={item?.attributes?.name}
                aria-controls={`simple-tabpanel-${index}`}
                aria-hidden="false"
              />
            ))}
          </Tabs>
        </Grid>
        <Grid container item lg={12} md={12} sm={12} xs={12} sx={styles.box}>
          {data?.portfolioCategories?.data[0]?.attributes.portfolios.data?.map((item: any, index: any) => {
            return (
              <MenuComponent
                key={`${item?.id}-${index}`}
                pathname={`${router.basePath}/portfolio/${item?.attributes?.slug}`}
                image={item?.attributes?.coverPicture?.data?.attributes?.url}
                detail={item?.attributes}
              />
            );
          })}
        </Grid>
      </CustomContainer>
    </Grid>
  );
};

export default Menu;
