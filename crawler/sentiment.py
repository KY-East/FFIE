"""
FFIE 舆情分析脚本
用于处理从社交媒体收集的数据并进行情感分析
"""

import os
import json
from datetime import datetime, timedelta
from textblob import TextBlob
import pandas as pd
from collections import Counter

# 将来需要替换为 finBERT 或其他更专业的金融情感分析模型
def analyze_sentiment(text):
    """
    使用TextBlob分析文本情感
    返回情感得分 (-1 到 1 之间)
    """
    if not text or not isinstance(text, str):
        return 0.0
    
    analysis = TextBlob(text)
    # TextBlob的极性范围是-1到1
    return analysis.sentiment.polarity

def extract_keywords(texts, stop_words=None, min_count=3):
    """
    从文本列表中提取关键词
    """
    if stop_words is None:
        stop_words = ['the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 
                      'be', 'been', 'being', 'to', 'of', 'for', 'in', 'that', 'on', 'at',
                      'this', 'it', 'with', 'as', 'by', 'from', 'have', 'has', 'had', 'not']
    
    all_words = []
    for text in texts:
        if not isinstance(text, str):
            continue
        # 转小写并分词
        words = text.lower().split()
        # 过滤停用词并添加到所有词列表
        filtered_words = [w for w in words if w.isalpha() and w not in stop_words and len(w) > 1]
        all_words.extend(filtered_words)
    
    # 计数并返回最常见的词
    word_counts = Counter(all_words)
    return [{"word": word, "count": count} for word, count in word_counts.most_common(10) if count >= min_count]

def process_data(data_file):
    """
    处理收集的数据并生成情感分析结果
    """
    try:
        # 加载数据
        with open(data_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # 提取文本和时间戳
        texts = [item.get('text', '') for item in data]
        timestamps = [item.get('created_at') for item in data]
        
        # 情感分析
        sentiments = [analyze_sentiment(text) for text in texts]
        
        # 生成时间序列数据
        df = pd.DataFrame({
            'timestamp': timestamps,
            'sentiment': sentiments,
            'text': texts
        })
        
        # 转换时间戳
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        
        # 按日期分组计算平均情感
        daily_sentiment = df.groupby(df['timestamp'].dt.date)['sentiment'].mean().reset_index()
        daily_sentiment['timestamp'] = daily_sentiment['timestamp'].astype(str)
        
        # 提取关键词
        keywords = extract_keywords(texts)
        
        # 计算总体情感得分
        avg_sentiment = df['sentiment'].mean()
        
        # 准备结果
        result = {
            'updated_at': datetime.now().isoformat(),
            'average_sentiment': float(avg_sentiment),
            'sentiment_by_day': daily_sentiment.to_dict('records'),
            'keywords': keywords,
            'mood': get_mood_label(avg_sentiment),
            'sample_count': len(data)
        }
        
        # 保存结果
        output_file = 'sentiment_results.json'
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
            
        print(f"分析完成! 结果已保存到 {output_file}")
        return result
        
    except Exception as e:
        print(f"处理数据时出错: {e}")
        return None

def get_mood_label(sentiment_score):
    """
    根据情感得分返回情绪标签
    """
    if sentiment_score < -0.6:
        return "极度恐慌"
    elif sentiment_score < -0.3:
        return "悲观"
    elif sentiment_score < 0:
        return "轻度担忧"
    elif sentiment_score < 0.3:
        return "中性"
    elif sentiment_score < 0.6:
        return "乐观"
    else:
        return "极度兴奋"

if __name__ == "__main__":
    # 测试数据文件路径
    sample_data = "data/reddit_sample.json"
    
    # 检查文件是否存在
    if not os.path.exists(sample_data):
        print(f"文件 {sample_data} 不存在，请先运行爬虫脚本收集数据")
    else:
        # 处理数据
        result = process_data(sample_data)
        if result:
            print(f"平均情感得分: {result['average_sentiment']:.2f}")
            print(f"情绪: {result['mood']}")
            print(f"热门关键词: {', '.join([k['word'] for k in result['keywords'][:5]])}") 