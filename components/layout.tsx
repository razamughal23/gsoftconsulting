import { Container, ContainerProps } from "@mui/material";
import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Navbar/Header";
import { NextSeo, NextSeoProps } from "next-seo";
import ApiError from "./PageError";
interface LayoutProps extends ContainerProps {
  children: React.ReactNode;
  header?: { backgroundColor?: string };
  seo?: NextSeoProps;
  showFaq?: boolean;
  error?: boolean;
}
export default function Layout(props: LayoutProps) {
  const { children, header, seo, error, showFaq = false } = props;
  return (
    <Container maxWidth={false} disableGutters>
      <NextSeo {...seo} />
      <Header {...header} />
      <main>{error ? <ApiError /> : children}</main>
      <Footer showFaq={showFaq} />
    </Container>
  );
}

export function CustomContainer(props: ContainerProps) {
  const { children } = props;
  return (
    <Container maxWidth={"lg"} disableGutters {...props}>
      {children}
    </Container>
  );
}
