// import Link from 'next/link'
// import Layout from '../components/Layout'

// const IndexPage = () => (
//   <Layout title="Home | Next.js + TypeScript Example">
//     <h1 className="text-3xl font-bold">Hello Next.js 👋</h1>
//     <p>
//       <Link href="/about">
//         <a>About</a>
//       </Link>
//     </p>
//   </Layout>
// )

// export default IndexPage

import type { liff, Liff } from "@line/liff";
import { useRouter } from 'next/router';
import type { NextPage } from "next";
import Head from "next/head";
// import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import {Profile} from"../../interfaces/index";
import LiffApp from '../../components/liffapp';


const Home = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const [profile, setProfile] = useState<Profile>({
    userId: "",
    displayName: "",
    pictureUrl: "",
    statusMessage: ""
  });
  const [liff, setLiff] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

//   const sendLiffMessage = () => {
//     if (liff != null && !liff.isInClient()) {
//       window.alert('This button is unavailable as LIFF is currently being opened in an external browser.');
//     } else {
//       liff?.sendMessages([
//         {
//             type: 'text',
//             text: 'This is index page',
//         },
//       ])
//         .then(() => {
//             window.alert('Message sent');
//         })
//         .catch((error) => {
//             window.alert('Error sending message: ' + error);
//         });
//     }
//   }

//   useEffect(() => {
    // {currentPath == '/line' &&  
    //   <LiffApp liff={
    //     (liffObject,liffError) => {
    //       console.log(liffObject)
    //       setLiffObject(liffObject)
    //       setLiffError(liffError)
    //     }} 
    // />}

//   }, [liff])

// Execute liff.init() when the app is initialized
useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff")
      .then((liff) => liff.default)
      .then((liff) => {
        console.log("LIFF init...");
        liff
          .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
          .then(() => {
            console.log("LIFF init succeeded.");

            if (!liff.isLoggedIn()) {
              liff.login();
            }
            setLiff(liff);
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
            setLiffError(error.toString());
          });
      });
  }, []);

  useEffect(() => {
    // liff?.permission.query("profile").then((permissionStatus) => {
    //   if (permissionStatus.state === "prompt") {
    //     liff.permission.requestAll();
    //   }
    // });
    console.log(liff)

    liff?.ready.then(() => {
        if (!liff.isLoggedIn()) {
            liff.login();
        } else {
            const getProfile = async () => {
                const profile = await liff.getProfile()
                console.log(profile)
                setProfile(profile)
              }
              getProfile().catch((e) => console.error(e));
        }  
    });
    // liff?.getProfile().then((profile) => {
    //   setProfile(profile)
    //   // sendLiffMessage()
    // })
  }, [liff])

  return (
    
    <>
     {/* {currentPath == '/line' &&  
      <LiffApp liff={
        (liffObject,liffError) => {
          console.log(liffObject)
          setLiff(liffObject)
          setLiffError(liffError)
        }} 
    />} */}
    <div className="bg-[#F9F5EC] h-screen w-screen">
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!liff && 
        <div className="grid place-items-center h-screen">
            <div role="status">
                <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        }
        {liff && profile.userId && 
        <div>
          <h1>{profile.userId}</h1>
          <h1>{profile.displayName}</h1>
          <img src={profile.pictureUrl}/>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
            router.replace("/line/payment?fname=Thitare&lname=Numanong&email=u6210015@au.edu")
          }}>
            Next
          </button>
        </div>
        }
        {liff && <button>TEST</button>}
        
        {liffError && (
          <>
            <p>LIFF init failed.</p>
            <p>
              <code>{liffError}</code>
            </p>
          </>
        )}
      </main>
    </div>
    </>
    
  );
};

export default Home;


