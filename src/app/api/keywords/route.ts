import { NextResponse } from 'next/server';

// API基础URL - 生产环境应使用环境变量
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function GET(request: Request) {
  try {
    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '10';

    // 从后端API获取关键词数据
    const response = await fetch(`${API_BASE_URL}/keywords?limit=${limit}`, {
      next: { revalidate: 3600 }, // 每小时重新验证一次缓存
    });

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data = await response.json();

    // 返回数据给前端
    return NextResponse.json(data);
  } catch (error) {
    console.error('获取关键词数据时出错:', error);
    
    // 如果API请求失败，返回模拟数据
    return NextResponse.json(
      [
        { word: "FFIE", count: 1987 },
        { word: "shorts", count: 1124 },
        { word: "buy", count: 870 },
        { word: "moon", count: 765 },
        { word: "scam", count: 432 },
      ],
      { status: 200 }
    );
  }
} 