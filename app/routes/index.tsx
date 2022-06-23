import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  throw redirect('/homepage')
}
export default function Index() {
  return <></>;
}
