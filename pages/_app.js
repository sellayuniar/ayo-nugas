import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "@/context/GlobalContext";
import Head from "next/head";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <GlobalProvider>
      <Head>
        <title>Ayo Nugas{router.pathname === "/" ? "" : router.pathname}</title>
        <link rel="icon" href="/logo_title.png" />
      </Head>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}
