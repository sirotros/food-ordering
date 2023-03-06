import Head from "next/head";
import Reservation from "@/components/Reservation";

const Index = () => {
  return (
    <>
      <Head>
        <title> Reservation </title>
        <link rel="shortcut icon" href="https://www.svgrepo.com/show/490311/restaurant-waiter.svg" type="image/x-icon" />
      </Head>
      <Reservation />
    </>
  );
};

export default Index;
