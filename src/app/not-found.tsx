import ErrorPage from "@components/dashboard/ErrorPage";

function NotFound() {
  return (
    <ErrorPage statusCode={404} redirectPath="/" redirectText="Back to Home" />
  );
}

export default NotFound;
