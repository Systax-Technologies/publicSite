import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

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
  createdAt: Date;
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

  const products: Product[] = [
    {
      id: "1",
      model: "T-Shirt",
      imageUrl:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      description: "Basic Tee",
      color: "Black",
      size: "M",
      price: 35,
      createdAt: new Date(1.5e12),
    },
    {
      id: "1",
      model: "T-Shirt",
      imageUrl:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      description: "Basic Tee",
      color: "Black",
      size: "M",
      price: 35,
      createdAt: new Date(1.5e12),
    },
    {
      id: "1",
      model: "T-Shirt",
      imageUrl:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      description: "Basic Tee",
      color: "Black",
      size: "M",
      price: 35,
      createdAt: new Date(1.5e12),
    },
    {
      id: "1",
      model: "T-Shirt",
      imageUrl:
        "data:image/jpeg;base64,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",
      description: "Basic Tee",
      color: "Black",
      size: "M",
      price: 35,
      createdAt: new Date(1.5e12),
    },
    {
      id: "1",
      model: "T-Shirt",
      imageUrl:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      description: "Basic Tee",
      color: "Black",
      size: "M",
      price: 35,
      createdAt: new Date(1.5e12),
    },
    {
      id: "1",
      model: "T-Shirt",
      imageUrl:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      description: "Basic Tee",
      color: "Black",
      size: "M",
      price: 35,
      createdAt: new Date(1.5e12),
    },
    // More products...
  ];

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
