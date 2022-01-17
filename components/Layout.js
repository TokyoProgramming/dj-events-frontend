import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/Layout.module.css";
import Footer from "./Footer";
import Header from "./Header";
import Showcase from "./Showcase";

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{title} </title>
        <meta name="descrption" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />

      {router.pathname === "/" && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Dj Events | Find parties",
  description: "my description",
  keywords: "music",
};
