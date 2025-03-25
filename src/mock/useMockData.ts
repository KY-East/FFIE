"use client";

import { useState, useEffect } from 'react';
import { 
  trendingKeywords, 
  sentimentTrend, 
  sentimentAlert, 
  botPreview 
} from './data';

// 类型定义
export interface KeywordItem {
  keyword: string;
  count: number;
}

export interface SentimentDataPoint {
  date: string;
  score: number;
}

export interface AlertState {
  triggered: boolean;
  message: string;
}

export interface SentimentData {
  keywords: KeywordItem[];
  trend: SentimentDataPoint[];
  alert: AlertState;
  botMessage: string;
  isLoading: boolean;
  error: string | null;
}

/**
 * 使用模拟数据的Hook
 * 未来可以轻松切换到真实API实现
 */
export function useMockData(): SentimentData {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SentimentData>({
    keywords: [],
    trend: [],
    alert: { triggered: false, message: '' },
    botMessage: '',
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // 模拟API延迟
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // 加载模拟数据
        setData({
          keywords: trendingKeywords,
          trend: sentimentTrend,
          alert: sentimentAlert,
          botMessage: botPreview,
          isLoading: false,
          error: null
        });
        
        setIsLoading(false);
      } catch (err) {
        setError('加载数据时出错');
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    ...data,
    isLoading,
    error
  };
} 