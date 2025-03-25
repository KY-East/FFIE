"""
FFIE 舆情监控API服务
提供舆情数据和分析结果的API接口
"""

import os
import json
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
from fastapi import FastAPI, HTTPException, Query, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler
from pydantic import BaseModel

# 导入爬虫和分析模块
import reddit
import sentiment

# 创建FastAPI实例
app = FastAPI(
    title="FFIE 舆情监控API",
    description="Faraday Future社区舆情数据和分析结果API",
    version="0.1.0"
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 生产环境中应限制为特定域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 数据路径
DATA_DIR = "data"
RESULTS_FILE = os.path.join(DATA_DIR, "sentiment_results.json")
LATEST_DATA_FILE = os.path.join(DATA_DIR, "reddit_sample.json")

# 定义数据模型
class KeywordItem(BaseModel):
    word: str
    count: int

class SentimentDataPoint(BaseModel):
    timestamp: str
    sentiment: float

class SentimentResult(BaseModel):
    updated_at: str
    average_sentiment: float
    sentiment_by_day: List[Dict[str, Any]]
    keywords: List[KeywordItem]
    mood: str
    sample_count: int

# 加载分析结果数据
def load_sentiment_results() -> Optional[Dict[str, Any]]:
    """
    加载最新的情感分析结果
    """
    if not os.path.exists(RESULTS_FILE):
        return None
    
    try:
        with open(RESULTS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"加载结果数据出错: {e}")
        return None

# 后台任务: 爬取数据并分析
def crawl_and_analyze():
    """
    运行爬虫并进行情感分析的后台任务
    """
    print(f"[{datetime.now().isoformat()}] 开始爬取数据...")
    # 运行Reddit爬虫
    reddit.main()
    
    print(f"[{datetime.now().isoformat()}] 开始分析数据...")
    # 分析数据
    if os.path.exists(LATEST_DATA_FILE):
        sentiment.process_data(LATEST_DATA_FILE)
        print(f"[{datetime.now().isoformat()}] 分析完成!")
    else:
        print(f"[{datetime.now().isoformat()}] 错误: 未找到数据文件!")

# 设置定时任务
scheduler = BackgroundScheduler()
scheduler.add_job(crawl_and_analyze, 'interval', hours=12)  # 每12小时运行一次
scheduler.start()

# API端点
@app.get("/", response_model=Dict[str, str])
async def root():
    """
    API根端点，返回基本信息
    """
    return {
        "name": "FFIE 舆情监控API",
        "version": "0.1.0",
        "status": "运行中",
        "documentation": "/docs"
    }

@app.get("/sentiment", response_model=SentimentResult)
async def get_sentiment():
    """
    获取最新的情感分析结果
    """
    results = load_sentiment_results()
    if not results:
        raise HTTPException(status_code=404, detail="未找到情感分析结果")
    return results

@app.get("/keywords", response_model=List[KeywordItem])
async def get_keywords(limit: int = Query(10, ge=1, le=50)):
    """
    获取热门关键词
    """
    results = load_sentiment_results()
    if not results or "keywords" not in results:
        raise HTTPException(status_code=404, detail="未找到关键词数据")
    
    return results["keywords"][:limit]

@app.post("/refresh", response_model=Dict[str, str])
async def refresh_data(background_tasks: BackgroundTasks):
    """
    手动触发数据刷新
    """
    background_tasks.add_task(crawl_and_analyze)
    return {"status": "已开始刷新数据", "message": "数据将在后台更新"}

@app.get("/daily", response_model=List[SentimentDataPoint])
async def get_daily_sentiment(days: int = Query(7, ge=1, le=30)):
    """
    获取每日情感趋势数据
    """
    results = load_sentiment_results()
    if not results or "sentiment_by_day" not in results:
        raise HTTPException(status_code=404, detail="未找到每日情感数据")
    
    # 限制返回天数
    return results["sentiment_by_day"][-days:]

if __name__ == "__main__":
    import uvicorn
    # 首次启动时，如果没有数据，先运行一次爬虫和分析
    if not os.path.exists(RESULTS_FILE):
        crawl_and_analyze()
    
    # 启动API服务
    uvicorn.run(app, host="0.0.0.0", port=8000) 