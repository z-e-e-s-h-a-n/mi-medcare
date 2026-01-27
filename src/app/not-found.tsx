import ErrorPage from "@components/dashboard/ErrorPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

function NotFound() {
  return (
    <ErrorPage statusCode={404} redirectPath="/" redirectText="Back to Home" />
  );
}

export default NotFound;
