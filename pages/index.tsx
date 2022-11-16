import { Heading } from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="px-8">
      <Head>
        <title>Create Next App</title>
        <meta content="Generated by create next app" name="description" />
      </Head>
      <main>
        <h1 className="block bg-slate-300 text-4xl leading-tight">Test</h1>
        <Heading>Test</Heading>
      </main>
    </div>
  );
}
