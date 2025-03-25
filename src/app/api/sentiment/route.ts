import { NextResponse } from 'next/server';

// API基础URL - 生产环境应使用环境变量
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function GET() {
  try {
    // 从后端API获取情感分析数据
    const response = await fetch(`${API_BASE_URL}/sentiment`, {
      next: { revalidate: 3600 }, // 每小时重新验证一次缓存
    });

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data = await response.json();

    // 返回数据给前端
    return NextResponse.json(data);
  } catch (error) {
    console.error('获取情感数据时出错:', error);
    
    // 如果API请求失败，返回模拟数据
    return NextResponse.json(
      {
        updated_at: new Date().toISOString(),
        average_sentiment: -0.1,
        sentiment_by_day: [
          { timestamp: "2023-10-01", sentiment: -0.3 },
          { timestamp: "2023-10-02", sentiment: 0.1 },
          { timestamp: "2023-10-03", sentiment: 0.2 },
          { timestamp: "2023-10-04", sentiment: -0.1 },
          { timestamp: "2023-10-05", sentiment: 0.4 },
          { timestamp: "2023-10-06", sentiment: 0.3 },
          { timestamp: "2023-10-07", sentiment: -0.6 },
        ],
        keywords: [
          { word: "FFIE", count: 1987 },
          { word: "shorts", count: 1124 },
          { word: "buy", count: 870 },
          { word: "moon", count: 765 },
          { word: "scam", count: 432 },
        ],
        mood: "轻度担忧",
        sample_count: 500
      },
      { status: 200 }
    );
  }
} 