import ErrorPage from "@components/dashboard/ErrorPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

function Forbidden() {
  return (
    <ErrorPage statusCode={403} redirectPath="/" redirectText="Back to Home" />
  );
}

export default Forbidden;
