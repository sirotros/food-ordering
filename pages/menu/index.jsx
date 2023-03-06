import { api } from "@/api";
import Head from "next/head";
import React from "react";
import MenuWrapper from "@/components/product/MenuWrapper";

const Index = ({ categoryList, productList }) => {
  return (
    <div className="pt-10">
      <Head>
        <title>Menu</title>
        <link
          rel="shortcut icon"
          href="https://www.svgrepo.com/show/495467/menu-1.svg"
          type="image/x-icon"
        />
      </Head>
      <MenuWrapper categoryList={categoryList} productList={productList} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const category = await api.get(`/categories`);
  const product = await api.get(`/products`);
  return {
    props: {
      categoryList: category.data ? category.data : [],
      productList: product.data ? product.data : [],
    },
  };
};

export default Index;
