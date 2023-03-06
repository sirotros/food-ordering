import React from "react";
import About from "@/components/About";
import Campaigns from "@/components/Campaigns";
import Carousel from "@/components/Carousel";
import Customers from "@/components/customers/Customers";
import MenuWrapper from "@/components/product/MenuWrapper";
import Reservation from "@/components/Reservation";
import Head from "next/head";
import { useSession } from "next-auth/react";

const Index = ({ categoryList, productList }) => {
  const { data } = useSession();
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
        <link
          rel="shortcut icon"
          href="https://www.svgrepo.com/show/506663/home.svg"
          type="image/x-icon"
        />
      </Head>
      <Carousel />
      <Campaigns />
      <MenuWrapper categoryList={categoryList} productList={productList} />
      <About />
      <Reservation />
      <Customers />
    </React.Fragment>
  );
};

export default Index;
