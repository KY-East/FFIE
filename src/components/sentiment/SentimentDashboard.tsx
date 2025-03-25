"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useMockData } from "@/mock/useMockData";

export default function SentimentDashboard() {
  // 使用模拟数据Hook
  const { keywords, trend, alert, botMessage, isLoading, error } = useMockData();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold neon-text">FFIE 舆情监控仪表盘</h1>
          <div className="flex items-center space-x-2">
            <span className="inline-block w-3 h-3 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm text-gray-400">加载中...</span>
          </div>
        </div>
        <div className="animate-pulse space-y-6">
          <Card className="glassmorphism">
            <CardContent className="h-40 bg-opacity-10 bg-gray-700">
              <div className="w-full h-full"></div>
            </CardContent>
          </Card>
          <Card className="glassmorphism">
            <CardContent className="h-80 bg-opacity-10 bg-gray-700">
              <div className="w-full h-full"></div>
            </CardContent>
          </Card>
          <Card className="glassmorphism">
            <CardContent className="h-20 bg-opacity-10 bg-gray-700">
              <div className="w-full h-full"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold neon-text mb-4">FFIE 舆情监控仪表盘</h1>
        <Card className="border-red-500 bg-opacity-20 bg-red-900 backdrop-blur-md">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-red-400 mb-2">❌ 系统错误</h2>
            <p className="text-red-300">{error}</p>
            <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
              重试
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold neon-text">FFIE 舆情监控仪表盘</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-hover glassmorphism">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="w-8 h-8 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mr-2">
                🔥
              </span>
              热门关键词 (24小时)
            </h2>
            <ul className="space-y-3">
              {keywords.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <span className="font-medium">{item.keyword}</span>
                  <div className="flex items-center">
                    <div className="h-2 bg-primary rounded-full mr-2" 
                         style={{ width: `${Math.min(100, item.count / 2)}px` }}></div>
                    <span className="text-gray-400">{item.count}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {alert.triggered && (
          <Card className="card-hover bg-opacity-20 bg-red-900 border-red-500 backdrop-blur-md">
            <CardContent className="pt-4">
              <h2 className="text-xl font-semibold text-red-400 flex items-center">
                <span className="w-8 h-8 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center mr-2">⚠️</span>
                负面情绪预警
              </h2>
              <p className="text-red-300 mt-3 pl-10">
                {alert.message}
              </p>
              <div className="mt-4 pl-10">
                <button className="text-xs px-3 py-1 bg-red-500 bg-opacity-30 text-red-300 rounded hover:bg-opacity-40 transition-colors">
                  查看详情
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="card-hover glassmorphism">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-8 h-8 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mr-2">
              📈
            </span>
            社区情绪 (7天)
          </h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <defs>
                  <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ff9d" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00ff9d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  stroke="#4b5563" 
                  tick={{fill: '#9ca3af'}}
                  axisLine={{stroke: 'rgba(255,255,255,0.1)'}}
                />
                <YAxis 
                  domain={[-1, 1]} 
                  stroke="#4b5563"
                  tick={{fill: '#9ca3af'}}
                  axisLine={{stroke: 'rgba(255,255,255,0.1)'}}
                  tickFormatter={(value) => value.toFixed(1)}
                />
                <Tooltip 
                  formatter={(value: number | string) => {
                    const numValue = typeof value === 'number' ? value : parseFloat(value as string);
                    return [numValue.toFixed(2), '情绪得分'];
                  }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(17,24,39,0.8)', 
                    borderColor: '#374151',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '0.375rem',
                    color: '#e5e7eb'
                  }}
                  labelStyle={{ color: '#9ca3af' }}
                  itemStyle={{ color: '#00ff9d' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#00ff9d" 
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: '#111827' }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#00ff9d' }}
                  fill="url(#sentimentGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="card-hover glassmorphism">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <span className="w-8 h-8 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mr-2">
              🤖
            </span>
            机器人预览: 每日报告
          </h2>
          <div className="bg-gray-900 bg-opacity-80 border border-gray-800 rounded-md p-6 text-sm">
            <pre className="whitespace-pre-wrap font-mono text-gray-300">
              {botMessage}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 