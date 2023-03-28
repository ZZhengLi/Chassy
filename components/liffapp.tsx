import Script from 'next/script'
import type { AppProps } from "next/app";
import type { Liff } from "@line/liff";
import { useState, useEffect } from "react";
import { NextPage } from "next";

const Liffapp: NextPage<{ liff: ((liffObject: (Liff | null), liffError: (string | null)) => void)}> = (props) => {
    const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);

  
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
            setLiffObject(liff);
            console.log(liff)
            // return liff
            
            // props.liff(liffObject, liffError);

            // if (!liff.isLoggedIn()) {
            //   liff.login();
            // }
          }).then(() => {
            console.log(liffObject)
            props.liff(liffObject, liffError);
          })
          .catch((error: Error) => {
            console.log("LIFF init failed.");
            setLiffError(error.toString());
          });
      });
  }, []);

//   useEffect(() => {
    
//   }, [liffObject])

  // Provide `liff` object and `liffError` object
  // to page component as property
 
  return (
    <div></div>
  )

}

export default Liffapp;