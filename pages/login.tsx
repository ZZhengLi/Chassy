import React from 'react';
import Button from '@mui/material/Button';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';

const Login = () => {

  const demoShopSignUp = () => {
    // TODO
    alert("TODO")
  }

  return (
    <div className='px-8'>
      <main className='flex flex-col justify-center items-center py-16 min-h-screen'>
        <h1 className='text-3xl'>Login</h1>
        <Link href="/api/auth/signin">
          <Button variant="contained" color="success" className="text-black hover:text-white w-60">
            DEMO SHOP LOGIN
          </Button>
        </Link>
        <Button onClick={demoShopSignUp} variant="contained" color="success" className="text-black hover:text-white w-60">
          SIGN UP
        </Button>

      </main>
    </div>
  );
};

export default Login;
