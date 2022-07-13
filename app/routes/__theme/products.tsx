import { ZoomInIcon } from "@heroicons/react/outline";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import {
  listableProductConverter,
  Product,
  ListableProduct,
} from "../../helpers/type-helper.server";
import { z } from "zod";
import { commitSession, getSession } from "~/helpers/session.server";

type LoaderData = {
  listableProductList: ListableProduct[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const listableProductList: ListableProduct[] = [];

  const response = await fetch(
    "http://192.168.103.136:3000/api/v1/ecommerce/products",
    {
      method: "get",
    }
  );

  const responseBody = await response.json();

  const schema = z.object({
    products: z
      .object({
        id: z.string(),
        model: z.string(),
        imageUrl: z.string().array(),
        description: z.string(),
        color: z.string(),
        size: z.string(),
        price: z.number(),
      })
      .array(),
  });

  const { products } = schema.parse(responseBody);

  products.map((product) => {
    listableProductList.push(listableProductConverter(product));
  });

  return json<LoaderData>({ listableProductList });
  // return { listableProductList: listableProductList , headers: {
  //   // only necessary with cookieSessionStorage
  //   "Set-Cookie": await commitSession(session),
  // }, };
};

type ElaboratedDataProps = {
  elaboratedData: ListableProduct[];
};
export default function Products() {
  const { listableProductList } = useLoaderData<LoaderData>();
  return (
    <div className="bg-gradient-to-b from-orange-50 to-white">
      <main className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Products
        </h1>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {listableProductList.map((product) => (
            <div key={product.description} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={product.imgUrl}
                  alt={product.imgAlt}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <Link to={`/details/${product.id}`}>
                    <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.description}
                    </h3>
                  </Link>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
