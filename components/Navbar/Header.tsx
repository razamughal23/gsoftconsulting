import Link from "next/link";
import { pages } from "./data";
import CustomDrawer from "./Drawer";
import { styles } from "./styles";
import { useRouter } from "next/router";
import Logo from "public/images/logo.png";
import CustomMenu from "components/HeaderPopUp";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import { AppBar, Box, Button, Tab, Tabs, Toolbar, useMediaQuery, useScrollTrigger, useTheme } from "@mui/material";
import { useQuery } from "@apollo/client";
import { SERVICES_LIST } from "api/graphql/queries/footer";
import GSoftImage from "components/GSoftImage";

interface Props {
  backgroundColor?: string;
}

const Header = ({ backgroundColor = "transparent" }: Props) => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const { data: development } = useQuery(SERVICES_LIST, {
    variables: {
      filters: {
        service_category: {
          title: {
            eq: "Development",
          },
        },
      },
    },
  });
  const { data: other } = useQuery(SERVICES_LIST, {
    variables: {
      filters: {
        service_category: {
          title: {
            eq: "Other",
          },
        },
      },
    },
  });
  const { data: desgin } = useQuery(SERVICES_LIST, {
    variables: {
      filters: {
        service_category: {
          title: {
            eq: "Design",
          },
        },
      },
    },
  });
  const developmentServices = development?.services?.data || [];
  const otherServices = other?.services?.data || [];
  const desginServices = desgin?.services?.data || [];
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  const [showModal, setShowModal] = React.useState(false);
  const ChangeNavBarColor = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });
  useEffect(() => {
    if (router.pathname.includes("/about")) {
      setValue(0);
    } else if (router.pathname.includes("/services")) {
      setValue(1);
    } else if (router.pathname.includes("/portfolio")) {
      setValue(2);
    } else if (router.pathname.includes("/blogs")) {
      setValue(3);
    } else if (router.pathname.includes("/careers")) {
      setValue(4);
    } else if (router.pathname.includes("/contact")) {
      setValue(5);
    } else if (router.pathname.includes("/life-at-gsoft")) {
      setValue(6);
    } else if (router.pathname.includes("/estimate-your-project")) {
      setValue(7);
    }
  }, [router.pathname]);

  const handleClick = (index: number) => () => {
    if (index == 1) {
      setShowModal(true);
      setValue(1);
      return;
    }
    setShowModal(false);
  };

  const openEstimate = () => {
    router.push("/estimate-your-project");
  };

  const handlePopoverClose = () => {
    setShowModal(false);
  };

  const onClickTab = (index: number) => () => {
    if (index == 1) {
      router.push("/services");
    } else if (index == 0) {
      router.push("/about");
    } else if (index == 2) {
      router.push("/portfolio");
    } else if (index == 3) {
      router.push("/blogs");
    } else if (index == 4) {
      router.push("/careers");
    } else if (index == 5) {
      router.push("/contact");
    } else if (index == 6) {
      router.push("/life-at-gsoft");
    }
  };

  return (
    <AppBar component="nav">
      <Toolbar
        sx={{
          ...styles.toolbar,
          boxShadow: ChangeNavBarColor ? 3 : 0,
          backgroundColor: ChangeNavBarColor ? theme.palette.secondary.main : backgroundColor,
        }}
      >
        <Box>
          <Link href="/">
            <Box
              sx={{
                height: 45,
                width: 154,
              }}
            >
              <GSoftImage src={Logo} alt="Logo" />
            </Box>
          </Link>
        </Box>
        {isMatch ? (
          <>
            <CustomDrawer services={[...developmentServices, ...desginServices, ...otherServices]} />
          </>
        ) : (
          <>
            <Tabs
              sx={styles.headerTabs}
              value={value}
              onChange={(e, value) => {
                setValue(value);
              }}
              TabIndicatorProps={{
                sx: { display: "none" },
              }}
            >
              {pages.map((page, index) => (
                <Tab
                  onMouseEnter={handleClick(index)}
                  label={page.name}
                  key={index}
                  icon={index == 1 && showModal ? <KeyboardArrowUp /> : index == 1 ? <KeyboardArrowDownIcon /> : <></>}
                  iconPosition={"end"}
                  sx={styles.headerLabel}
                  onClick={onClickTab(index)}
                />
              ))}
            </Tabs>

            <Button
              variant="outlined"
              style={{ fontSize: "16px", fontWeight: "600", marginRight: "13px" }}
              onClick={openEstimate}
              sx={styles.headerButton}
            >
              Estimate Your Project
            </Button>
          </>
        )}
      </Toolbar>
      {showModal && (
        <CustomMenu
          onMouseLeave={handlePopoverClose}
          developmentServices={developmentServices}
          desginServices={desginServices}
          otherServices={otherServices}
          hideModel={() => {
            setShowModal(false);
          }}
        />
      )}
    </AppBar>
  );
};

export default Header;
