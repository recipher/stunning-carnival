import ErrorPage from "~/components/500";

export default function DeniedPage() {
  return <ErrorPage message="Access Denied" statusCode={403} />;
}
