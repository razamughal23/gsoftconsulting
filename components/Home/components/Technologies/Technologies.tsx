import React, { useState, useEffect } from "react";
import { Grid, useTheme, useMediaQuery, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Text from "components/GsoftText";
import { styles } from "./styles";
import Box from "@mui/material/Box";
import TecBlock from "components/Home/components/TecBlock/TecBlock";
import { TechnologiesProps } from "types/home";
import { CustomContainer } from "components/layout";
import Aos from "aos";
import "aos/dist/aos.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index?: number;
  value?: number;
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

const Technologies = (props: TechnologiesProps) => {
  const { bgcolor, color, filter, list = [], tabColor } = props;
  const [tabIndex, setTabValue] = React.useState(0);
  const [indexNumber, setStateNumber] = useState([]);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const onChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setStateNumber(list[newValue]?.attributes?.technologies?.data);
  };
  const TabIndicatorProps = {
    style: {
      color: theme.palette.secondary.light,
      backgroundColor: theme.palette.secondary.contrastText,
    },
  };

  useEffect(() => {
    setStateNumber(list[tabIndex]?.attributes?.technologies?.data);
  }, []);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <Grid container sx={styles.container} style={{ backgroundColor: bgcolor, color: color }}>
      <CustomContainer>
        <Grid data-aos="fade-right" container item lg={12} md={12} sm={12} xs={12} sx={styles.box}>
          <Grid container item md={12} sm={8} xs={8} sx={styles.text}>
            <Text variant="h2" name="Technologies We Work With" />
          </Grid>

          <Grid container item md={12} sm={12} xs={12} sx={styles.text}>
            <Tabs
              value={tabIndex}
              onChange={onChangeTab}
              TabIndicatorProps={TabIndicatorProps}
              variant="scrollable"
              sx={styles.tabs}
              id="tabs"
            >
              {list.map((item, index) => (
                <Tab
                  key={`${item?.id}-${index}`}
                  sx={[styles.tab, { color: tabColor }]}
                  label={item.attributes.title}
                  id={`simple-tab-${index}`}
                  aria-controls={`simple-tabpanel-${index}`}
                  aria-hidden="true"
                />
              ))}
            </Tabs>
          </Grid>
          <Grid
            container
            item
            md={10}
            sm={12}
            xs={12}
            sx={styles.tec}
            style={{ justifyContent: isMatch ? "space-evenly" : "center", alignItems: "center" }}
          >
            {indexNumber.map((item, index) => (
              <TecBlock
                key={`${item}-${index}`}
                image={item?.attributes?.logo?.data?.attributes?.url}
                name={item?.attributes?.title}
                filter={filter}
              />
            ))}
          </Grid>
        </Grid>
      </CustomContainer>
    </Grid>
  );
};

export default Technologies;
