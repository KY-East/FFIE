import React from 'react';
import SentimentDashboard from '@/components/sentiment/SentimentDashboard';

export const metadata = {
  title: 'FFIE 舆情监控仪表盘',
  description: 'Faraday Future社区舆情的实时分析和可视化',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-primary">FFIE 舆情监控</h1>
          <p className="text-sm text-gray-400">实时追踪社区情绪和话题</p>
        </div>
      </header>
      
      <main className="container mx-auto py-6">
        <SentimentDashboard />
      </main>
      
      <footer className="bg-gray-800 p-4 mt-10">
        <div className="container mx-auto text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} FFIE 舆情监控系统 - Meme Is The Flame Of Faith</p>
        </div>
      </footer>
    </div>
  );
} 