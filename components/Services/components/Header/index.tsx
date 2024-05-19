import React from "react";
import { Grid, TypographyProps } from "@mui/material";
import { StaticImageData } from "next/image";
import { styles } from "./styles";
import Text from "components/GsoftText";

interface Props extends TypographyProps {
  heading?: string;
  desc?: any;
  image?: StaticImageData;
  component?: React.ReactNode;
}

const WebDev = (props: Props) => {
  const { heading = "", desc = "", image } = props;

  return (
    <Grid container sx={styles.container} style={{ backgroundImage: `url(${image})` }}>
      <Grid container item md={10} lg={8} sm={12} xs={12} sx={styles.block}>
        <Text name={heading} variant="h1" />
        <Text fontSize={"25px"} lineHeight={"35px"} name={desc} />
        {props.component}
      </Grid>
    </Grid>
  );
};

export default WebDev;
