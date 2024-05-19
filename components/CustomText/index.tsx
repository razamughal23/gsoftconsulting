import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface Props extends TypographyProps {
  name?: string;
  children?: React.ReactNode;
  fontSize?: string | number;
}

const Text = (props: Props) => {
  const { name = "", children, fontSize, style } = props;
  return (
    <Typography {...props} {...(fontSize ? { style: { fontSize } } : { style: style })}>
      {children ? children : name}
    </Typography>
  );
};

export default Text;
