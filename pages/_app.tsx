import "../styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import Head from "next/head";
import { useRouter } from "next/router";
import { useSession, SessionProvider } from "next-auth/react";
import IndexPage from "./index";
import Navbar from "../components/Navbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// @ts-ignore
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // console.log("MyApp",Component.name, Component.auth)
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={session}>
          <Head>
            <title>Chassy</title>
            <meta
              name="description"
              content="Service management system for car service providers, garages, carwash"
            />
          </Head>

          {
            // @ts-ignore
            Component.auth ? (
              <Auth>
                <Navbar />

                <Component {...pageProps} />
              </Auth>
            ) : (
              // <IndexPage />

              <Component {...pageProps} />
            )
          }
        </SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}
// @ts-ignore
function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });
  console.log("Auth", status);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
export default MyApp;
