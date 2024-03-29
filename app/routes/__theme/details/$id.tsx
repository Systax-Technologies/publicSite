import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import { CurrencyDollarIcon, GlobeIcon } from "@heroicons/react/outline";
import { json, LoaderFunction, Response } from "@remix-run/node";
import { useLoaderData, Link, Form } from "@remix-run/react";
import { z } from "zod";
import {
  listableProductDetailConverter,
  listableProductConverter,
  ListableProductDetail,
  ListableProduct,
  Product,
} from "../../../helpers/type-helper.server";

import { Cart, CartElement } from "../../../helpers/type-helper.server";

import { ActionFunction, redirect } from "@remix-run/node";
import { cart } from "../orders/cart";
import { commitSession, getSession } from "~/helpers/session.server";

type LoaderData = {
  listableProductDetail: ListableProductDetail;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const id = params.id;
  if (id) {
    const response = await fetch(
      `http://192.168.103.136:3000/api/v1/ecommerce/products/${id}`,
      {
        method: "get",
      }
    );

    const responseBody = await response.json();

    const schema = z.object({
      id: z.string(),
      model: z.string(),
      imageUrl: z.string().array(),
      description: z.string(),
      color: z.string(),
      size: z.string(),
      price: z.number(),
    });

    console.log(responseBody);
    const product = schema.parse(responseBody);
    const listProduct: ListableProduct = listableProductConverter(product);
    const listableProductDetail = listableProductDetailConverter(listProduct);

    return json<LoaderData>({ listableProductDetail });
    // return { listableProductDetail : listableProductDetailConverter(listProduct)} ;
  }
  throw new Response(null, {
    status: 400,
    statusText: "Bad Request",
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  const formBody = await request.formData();

  const productId = params.id;

  const color = formBody.get("color");
  const size = formBody.get("size");
  const price = formBody.get("price");

  if (color == null || typeof color !== "string") {
    return null;
  }

  if (price == null || typeof price !== "number") {
    return null;
  }

  throw redirect("/cart", cart);
};

const policies = [
  {
    name: "International delivery",
    icon: GlobeIcon,
    description: "Get your order in 2 years",
  },
  {
    name: "Loyalty rewards",
    icon: CurrencyDollarIcon,
    description: "Don't look at other tees",
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function GetProductDetailById() {
  const product = useLoaderData<LoaderData>().listableProductDetail;
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  return (
    <div className="bg-white">
      <div className="pt-6 pb-16 sm:pb-24">
        <main className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Product Detail
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="max-w-7xl mx-auto sm:px-6 lg:px-8"
          >
            <ol role="list" className="flex items-center space-x-4">
              {product.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a
                      href={breadcrumb.href}
                      className="mr-4 text-sm font-medium text-gray-900"
                    >
                      {breadcrumb.name}
                    </a>
                    <svg
                      viewBox="0 0 6 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="h-5 w-auto text-gray-300"
                    >
                      <path
                        d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <a
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.listableProduct.description}
                </a>
              </li>
            </ol>
          </nav>
          <div className="mt-8 max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
              <div className="lg:col-start-8 lg:col-span-5">
                <div className="flex justify-between">
                  <h1 className="text-xl font-medium text-gray-900">
                    {product.listableProduct.description}
                  </h1>
                  <p className="text-xl font-medium text-gray-900">
                    € {product.listableProduct.price}
                  </p>
                </div>
                {/* Reviews */}
                <div className="mt-4">
                  <h2 className="sr-only">Reviews</h2>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-700">
                      4.5
                      <span className="sr-only"> out of 5 stars</span>
                    </p>
                    <div className="ml-1 flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            4.5 > rating ? "text-yellow-400" : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <div
                      aria-hidden="true"
                      className="ml-4 text-sm text-gray-300"
                    >
                      ·
                    </div>
                    <div className="ml-4 flex">
                      <a
                        href="#"
                        className="text-sm font-medium text-orange-600 hover:text-orange-500"
                      >
                        See all 3422 reviews
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image gallery */}
              <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
                <h2 className="sr-only">Images</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                  <img
                    key={product.listableProduct.description}
                    src={product.listableProduct.imgUrl}
                    alt={product.listableProduct.imgUrl}
                    className={classNames(
                      "lg:col-span-2 lg:row-span-2",
                      "rounded-lg"
                    )}
                  />
                </div>
              </div>

              <div className="mt-8 lg:col-span-5">
                <Form className="" action="#" method="post">
                  {/* Color picker */}
                  <div>
                    <h2 className="text-sm font-medium text-gray-900">Color</h2>
                    <input hidden={true} name="price" value={product.listableProduct.price}/>
                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="mt-2"
                      name="color"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a color
                      </RadioGroup.Label>
                      <div className="flex items-center space-x-3">
                        {product.colors.map((color) => (
                          <RadioGroup.Option
                            key={color.name}
                            value={color}
                            className={({ active, checked }) =>
                              classNames(
                                color.selectedColor,
                                active && checked ? "ring ring-offset-1" : "",
                                !active && checked ? "ring-2" : "",
                                "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                              )
                            }
                          >
                            <RadioGroup.Label as="span" className="sr-only">
                              {color.name}
                            </RadioGroup.Label>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                color.bgColor,
                                "h-8 w-8 border border-black border-opacity-10 rounded-full"
                              )}
                            />
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Size picker */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-medium text-gray-900">
                        Size
                      </h2>
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        See sizing chart
                      </a>
                    </div>

                    <RadioGroup
                      value={selectedSize}
                      name="size"
                      onChange={setSelectedSize}
                      className="mt-2"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a size
                      </RadioGroup.Label>
                      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                        {product.sizes.map((size) => (
                          <RadioGroup.Option
                            key={size.name}
                            value={size}
                            className={({ active, checked }) =>
                              classNames(
                                size.inStock
                                  ? "cursor-pointer focus:outline-none"
                                  : "opacity-25 cursor-not-allowed",
                                active
                                  ? "ring-2 ring-offset-2 ring-indigo-500"
                                  : "",
                                checked
                                  ? "bg-indigo-600 border-transparent text-white hover:bg-indigo-700"
                                  : "bg-white border-gray-200 text-gray-900 hover:bg-gray-50",
                                "border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1"
                              )
                            }
                            disabled={!size.inStock}
                          >
                            <RadioGroup.Label as="span">
                              {size.name}
                            </RadioGroup.Label>
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <button
                    type="submit"
                    className="mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add to cart
                  </button>
                </Form>

                {/* Product details */}
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">
                    Description
                  </h2>

                  <div
                    className="mt-4 prose prose-sm text-gray-500"
                    dangerouslySetInnerHTML={{
                      __html: product.listableProduct.description,
                    }}
                  />
                </div>

                <div className="mt-8 border-t border-gray-200 pt-8">
                  <h2 className="text-sm font-medium text-gray-900">
                    Fabric &amp; Care
                  </h2>

                  <div className="mt-4 prose prose-sm text-gray-500">
                    <ul role="list">
                      {product.details.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Policies */}
                <section aria-labelledby="policies-heading" className="mt-10">
                  <h2 id="policies-heading" className="sr-only">
                    Our Policies
                  </h2>

                  <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {policies.map((policy) => (
                      <div
                        key={policy.name}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center"
                      >
                        <dt>
                          <policy.icon
                            className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="mt-4 text-sm font-medium text-gray-900">
                            {policy.name}
                          </span>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-500">
                          {policy.description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
