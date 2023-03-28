import Link from 'next/link'
import Script from 'next/script'
import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
// import Layout from '../components/Layout'

const PaymentPage = () => {

  const [userId, setUserId] = useState("");
  const router = useRouter();
  const {fname,lname,email} = router.query;
  console.log(fname)
  console.log(lname)
  console.log(email)
  useEffect(() => {
    import("@line/liff")
    .then((liff) => liff.default)
    .then((liff) => {
          liff?.ready.then(() => {
            liff?.getProfile().then((profile) => {
            //   alert(profile.userId)
              setUserId(profile.userId);
      
            })
          })
    })
    
  }, [])

  return (
    <>
      <Script src="https://cdn.omise.co/omise.js" />
    <div>
      <div className="form">

        <h1>Example 1: Simple Integration</h1>

        <form name="checkoutForm" method="POST" action={`/api/charge?pcx=100000&uuid=${userId}&fname=${fname}&lname=${lname}&email=${email}`}>
          
          <script type="text/javascript" src="https://cdn.omise.co/omise.js"
            data-key="pkey_test_5kpi1oeolw4omvjnl3j"
            data-image="https://cdn.omise.co/assets/dashboard/images/omise-logo.png"
            data-amount="100000"
            data-currency="THB"
            data-default-payment-method="credit_card"
            data-button-label="Pay now"
            data-frame-label="Example 1"
            data-submit-label="Checkout"
            data-other-payment-methods="internet_banking,rabbit_linepay,truemoney,googlepay">
          </script>
        </form>

      </div>
    </div>
    </>
    )
}

export default PaymentPage;