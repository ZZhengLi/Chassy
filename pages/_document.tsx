import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons+Outlined' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}