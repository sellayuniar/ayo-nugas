import "@/styles/globals.css";
import { GlobalProvider } from "@/context/GlobalContext";

export default function App({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  );
}
