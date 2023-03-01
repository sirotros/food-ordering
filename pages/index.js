import Head from "next/head";
import Home from "./home";

export default function Index() {
  return (
    <div >
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>
      <Home />
    </div>
  );
}
