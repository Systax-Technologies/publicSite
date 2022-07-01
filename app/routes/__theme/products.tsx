import { ZoomInIcon } from "@heroicons/react/outline";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { z } from "zod";

type LoaderData = {
  listableProductList: ListableProduct[];
};

type ListableProduct = {
  id: string;
  imgUrl: string;
  imgAlt: string;
  description: string;
  model: string;
  color: string;
  price: number;
};

type Product = {
  id: string;
  model: string;
  imageUrl: string;
  description: string;
  color: string;
  size: string;
  price: number;
  createdAt: string;
};

export function listableProductConverter(product: Product) {
  return {
    id: product.id,
    imgUrl: product.imageUrl,
    imgAlt: product.description,
    description: product.description,
    model: product.model,
    color: product.color,
    price: product.price,
  };
}
export const loader: LoaderFunction = async ({}): Promise<LoaderData> => {
  const listableProductList: ListableProduct[] = [];

  const response = await fetch(
    "http://127.0.0.1:3001/api/v1/warehouse/products",
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
        imageUrl: z.string(),
        description: z.string(),
        color: z.string(),
        size: z.string(),
        price: z.number(),
        createdAt: z.string(),
      })
      .array(),
  });

  const { products } = schema.parse(responseBody);

  products.map((product) => {
    listableProductList.push(listableProductConverter(product));
  });

  return { listableProductList: listableProductList };
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
