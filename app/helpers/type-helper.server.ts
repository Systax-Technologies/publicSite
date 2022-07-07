import { boolean, string } from "zod";

export type Product = {
  id: string;
  model: string;
  imageUrl: string;
  description: string;
  color: string;
  size: string;
  price: number;
  createdAt: string;
  updatedAt: string;
};

export type ListableProduct = {
  id: string;
  imgUrl: string;
  imgAlt: string;
  description: string;
  model: string;
  color: string;
  price: number;
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

type Breadcrumb = {
  id: number;
  name: string;
  href: string;
};

type Color = {
  name: string;
  bgColor: string;
  selectedColor: string;
};

type Size = {
  name: string;
  inStock: boolean;
};
export type ListableProductDetail = {
  listableProduct: ListableProduct;
  breadcrumbs: Breadcrumb[];
  colors: Color[];
  sizes: Size[];
  details: string[];
};

export function listableProductDetailConverter(product: ListableProduct) {
  return {
    listableProduct: {
      id: product.id,
      imgUrl: product.imgUrl,
      imgAlt: product.imgAlt,
      description: product.description,
      model: product.model,
      color: product.color,
      price: product.price,
    },
    breadcrumbs: [
      { id: 1, name: "Home", href: "/homepage" },
      { id: 2, name: "Products", href: "/products" },
    ],
    colors: [
      { name: "Black", bgColor: "bg-gray-900", selectedColor: "ring-gray-900" },
      {
        name: "Heather Grey",
        bgColor: "bg-gray-400",
        selectedColor: "ring-gray-400",
      },
      {
        name: "Orange",
        bgColor: "bg-orange-400",
        selectedColor: "ring-orange-400",
      },
    ],
    sizes: [
      { name: "XXS", inStock: false },
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: false },
    ],
    details: [
      "Only the best materials",
      "Ethically and locally made",
      "Waterproof",
    ],
  };
}


export type CartElement = {
  id: string;
  quantity: number;
  price: number;
}

export type Cart = {
  cartElements : CartElement[];
  totalPrice : number;
}
