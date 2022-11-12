import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="/manifest.json" rel="manifest" />
          <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
          <meta content="#F5F5F5" name="theme-color" />
          <link href="/favicon.ico" rel="icon" />
          <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
