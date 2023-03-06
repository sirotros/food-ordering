import Head from "next/head";
import About from "@/components/About";

const Index = () => {
  return (
    <div>
      <Head>
        <title>About</title>
        <link
          rel="shortcut icon"
          href="https://www.svgrepo.com/show/418815/about-description-help.svg"
          type="image/x-icon"
        />
      </Head>
      <About />
    </div>
  );
};

export default Index;
