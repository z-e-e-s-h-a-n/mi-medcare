import ErrorPage from "@components/dashboard/ErrorPage";

function Forbidden() {
  return (
    <ErrorPage statusCode={403} redirectPath="/" redirectText="Back to Home" />
  );
}

export default Forbidden;
