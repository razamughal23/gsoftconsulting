import React from "react";
import { Box, Grid, TypographyProps } from "@mui/material";
import { styles } from "./styles";
import Text from "components/GsoftText";
import GSoftImage from "components/GSoftImage";
import { useRouter } from "next/router";

interface Props extends TypographyProps {
  image: string;
  name: string;
  description: string;
  pathname: any;
}

const Block = (props: Props) => {
  const route = useRouter();
  const { name, description, image } = props;

  return (
    <Grid
      container
      item
      sm={6}
      xs={12}
      md={4}
      lg={3}
      sx={styles.container}
      onClick={() => {
        route.push(props.pathname);
      }}
    >
      <Grid item sm={6} xs={12} md={12} sx={styles.img}>
        <Box
          sx={{
            height: 60,
            width: 60,
          }}
        >
          <GSoftImage src={image} alt={"image"} style={{ objectFit: "cover" }} />
        </Box>

        <Text sx={styles.styling} fontSize={24} fontWeight={"bold"} name={name} />
        <Text variant="body2" name={description} />
      </Grid>
    </Grid>
  );
};

export default Block;
