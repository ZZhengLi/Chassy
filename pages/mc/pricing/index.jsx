// import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "@styles/Home.module.css";
import Button from "@mui/material/Button";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import AdminAppBar from "../../../components/mc/AdminAppBar";

function IndexPage() {
  const { data, status } = useSession();
  console.log("useSession", useSession());

  return (
    <div className="w-full">
      <AdminAppBar />
      <main className={styles.main}>
        <h1 className={styles.title}>Pricing</h1>
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  // TODO dummy values
  return {
    props: {
      todayTransactionCount: 2750,
    },
  };
}

IndexPage.admin = true;

export default IndexPage;
