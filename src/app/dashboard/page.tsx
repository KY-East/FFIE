import React from 'react';
import SentimentDashboard from '@/components/sentiment/SentimentDashboard';

export const metadata = {
  title: 'FFIE 舆情监控仪表盘',
  description: 'Faraday Future社区舆情的实时分析和可视化',
};

export default function DashboardPage() {
  return <SentimentDashboard />
} 