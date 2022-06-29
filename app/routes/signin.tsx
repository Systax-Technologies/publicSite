import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import React from "react";
import { hashPassword } from "~/helpers/crypto.server";

export const action: ActionFunction = async ({ request }) => {
  const formBody = await request.formData();

  if (formBody.get("signin") === "login") {
    const email = formBody.get("email");
    const password = formBody.get("password");

    if (
      email == null ||
      password == null ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return {
        error: true,
      };
    }

    const body = JSON.stringify({
      email,
      password: hashPassword(password),
    });

    const response = await fetch(
      "http://127.0.0.1:3001/api/v1/ecommerce/login",
      {
        method: "post",
        body,
      }
    );

    if (response.ok) {
      const responseBody = await response.json();

      throw redirect("/homepage");
    }
  } else {
    const email = formBody.get("email");
    const password = formBody.get("password");
    const confirmPassword = formBody.get("confirmPassword");

    if (
      email == null ||
      password == null ||
      password !== confirmPassword ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return {
        error: true,
      };
    }

    const body = JSON.stringify({
      email,
      password: hashPassword(password),
    });

    const response = await fetch("/api/v1/ecommerce/login", {
      method: "post",
      body,
    });

    if (response.ok) {
      const responseBody = await response.json();
    }
  }
};

export default function SignIn() {
  const [currentForm, setCurrentForm] = React.useState<"login" | "register">(
    "login"
  );

  if (currentForm === "login") {
    return <Login setCurrentForm={setCurrentForm} />;
  } else {
    return <Register setCurrentForm={setCurrentForm} />;
  }
}

type LoginProps = {
  setCurrentForm: React.Dispatch<React.SetStateAction<"login" | "register">>;
};

function Login({ setCurrentForm }: LoginProps) {
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-24 w-auto"
            alt="seren-up-logo"
            src={"/assets/seren-up-logo.png"}
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Form className="space-y-6" action="#" method="post">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="text-sm">
                  <div
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => setCurrentForm("register")}
                  >
                    Register your account
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  name="signin"
                  value="login"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Login
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

type RegisterProps = {
  setCurrentForm: React.Dispatch<React.SetStateAction<"login" | "register">>;
};

function Register({ setCurrentForm }: RegisterProps) {
  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-24 w-auto"
            alt="seren-up-logo"
            src={"/assets/seren-up-logo.png"}
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Form className="space-y-6" action="#" method="post">
            <div className="flex flex-row columns-2 justify-between">
                <div className=" col-span-1 m-1">
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1 col-span-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="col-span-1 m-1">
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Surname
                  </label>
                  <div className="mt-1 col-span-1">
                    <input
                      id="surname"
                      name="surname"
                      type="text"
                      autoComplete="surname"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>


              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="text-sm">
                  <div
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => setCurrentForm("login")}
                  >
                    Login to your account
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  name="signin"
                  value="register"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Register
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
