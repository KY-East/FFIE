import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useMockData } from "@/mock/useMockData";

export default function SentimentDashboard() {
  // 使用模拟数据Hook
  const { keywords, trend, alert, botMessage, isLoading, error } = useMockData();

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">FFIE 舆情监控仪表盘</h1>
        <div className="animate-pulse space-y-6">
          <Card>
            <CardContent className="h-40 bg-gray-200 dark:bg-gray-800">
              <div className="w-full h-full"></div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="h-80 bg-gray-200 dark:bg-gray-800">
              <div className="w-full h-full"></div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="h-20 bg-gray-200 dark:bg-gray-800">
              <div className="w-full h-full"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">FFIE 舆情监控仪表盘</h1>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-red-600 mb-2">❌ 发生错误</h2>
            <p className="text-red-600">{error}</p>
            <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              重试
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">FFIE 舆情监控仪表盘</h1>

      <Card className="card-hover">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-2">🔥 热门关键词 (24小时)</h2>
          <ul className="list-disc pl-6 space-y-1">
            {keywords.map((item, idx) => (
              <li key={idx}>
                <span className="font-medium">{item.keyword}</span>: {item.count} 次提及
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="card-hover">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-2">📈 社区情绪 (7天)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trend}>
              <XAxis dataKey="date" />
              <YAxis domain={[-1, 1]} />
              <Tooltip 
                formatter={(value: number | string) => {
                  // 确保value是数字类型
                  const numValue = typeof value === 'number' ? value : parseFloat(value as string);
                  return [numValue.toFixed(2), '情绪得分'];
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#00ff9d" 
                strokeWidth={2} 
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {alert.triggered && (
        <Card className="bg-red-100 border-red-400 card-hover">
          <CardContent className="pt-4">
            <h2 className="text-xl font-semibold text-red-800">⚠️ 负面情绪预警</h2>
            <p className="text-sm text-red-700 mt-2">
              {alert.message}
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="card-hover">
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-2">🤖 机器人预览: 每日报告</h2>
          <pre className="bg-gray-800 text-white p-4 rounded text-sm overflow-x-auto whitespace-pre-wrap">
            {botMessage}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
} 