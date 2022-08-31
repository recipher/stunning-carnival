import ErrorPage from "~/components/500";

export default function Page() {
  return <ErrorPage message="Not Found" statusCode={404} />;
}
