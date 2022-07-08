import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import serenuplogo from "public/assets/seren-up-logo.png";
import { Layout } from "~/components/Layout";
import { getSession } from "~/helpers/session.server";

type LoaderData = {
  isSigned: boolean;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const session = await getSession(request.headers.get("Cookie"));

  const jwt = session.get("jwt");

  if (jwt == null || typeof jwt !== "string") {
    return {
      isSigned: false,
    };
  }

  return {
    isSigned: true,
  };
};

export default function Theme() {
  const { isSigned } = useLoaderData<LoaderData>();
  return (
    <>
      <Layout isSigned={isSigned} />
    </>
  );
}
