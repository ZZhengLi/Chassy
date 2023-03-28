
import type { Liff } from "@line/liff";
import { useRouter } from 'next/router';
import type { NextPage } from "next";
import Head from "next/head";
// import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

const PaymentStatus: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError
}) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
            liff?.closeWindow();
          }}>
            Close Tab
          </button>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
              router.replace("/");
          }}>
            Close Tab
          </button>
          <button>Test</button>
      </main>
    </div>
  );
};

export default PaymentStatus;

