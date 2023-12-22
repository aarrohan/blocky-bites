import { GlobalInformation } from "@/components/common/CommonProvider";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalInformation>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <Component {...pageProps} />{" "}
        </SkeletonTheme>

        <ToastContainer position="bottom-right" theme="colored" />
      </GlobalInformation>
    </>
  );
}
