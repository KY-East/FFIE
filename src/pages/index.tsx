import type { NextPage } from 'next';
import Head from 'next/head';
import SentimentDashboard from '@/components/sentiment/SentimentDashboard';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>FFIE 舆情监控系统</title>
        <meta name="description" content="Faraday Future 社区舆情监控工具" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <SentimentDashboard />
      </main>
    </div>
  );
};

export default Home; 