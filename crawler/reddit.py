"""
FFIE Reddit爬虫
用于从Reddit收集与Faraday Future相关的帖子和评论
"""

import os
import praw
import json
import datetime
import time
import logging
from dotenv import load_dotenv
from pathlib import Path

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("reddit_crawler.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# 加载环境变量
load_dotenv()

# 创建数据目录
data_dir = Path("data")
data_dir.mkdir(exist_ok=True)

def setup_reddit_api():
    """
    设置Reddit API客户端
    """
    try:
        # 从环境变量获取API凭证
        client_id = os.getenv('REDDIT_CLIENT_ID')
        client_secret = os.getenv('REDDIT_CLIENT_SECRET')
        user_agent = os.getenv('REDDIT_USER_AGENT', 'FFIE Sentiment Monitor v0.1')
        
        # 检查凭证是否存在
        if not client_id or not client_secret:
            logger.error("未找到Reddit API凭证。请确保.env文件中包含REDDIT_CLIENT_ID和REDDIT_CLIENT_SECRET")
            return None
        
        # 创建Reddit实例
        reddit = praw.Reddit(
            client_id=client_id,
            client_secret=client_secret,
            user_agent=user_agent
        )
        logger.info("Reddit API设置成功")
        return reddit
    
    except Exception as e:
        logger.error(f"设置Reddit API时出错: {e}")
        return None

def search_posts(reddit, subreddits, keywords, time_filter="week", limit=100):
    """
    在指定的subreddit中搜索关键词相关的帖子
    
    参数:
        reddit: praw.Reddit实例
        subreddits: subreddit名称列表
        keywords: 关键词列表
        time_filter: 时间过滤器 (hour, day, week, month, year, all)
        limit: 每个关键词和subreddit组合返回的最大帖子数
    
    返回:
        包含帖子数据的列表
    """
    all_posts = []
    
    for subreddit_name in subreddits:
        try:
            subreddit = reddit.subreddit(subreddit_name)
            
            for keyword in keywords:
                logger.info(f"在r/{subreddit_name}中搜索关键词 '{keyword}'")
                
                # 搜索帖子
                search_results = subreddit.search(
                    query=keyword,
                    sort="new",
                    time_filter=time_filter,
                    limit=limit
                )
                
                # 处理帖子
                for post in search_results:
                    # 基本帖子数据
                    post_data = {
                        "id": post.id,
                        "title": post.title,
                        "text": post.selftext,
                        "url": post.url,
                        "author": str(post.author),
                        "subreddit": post.subreddit.display_name,
                        "created_at": datetime.datetime.fromtimestamp(post.created_utc).isoformat(),
                        "score": post.score,
                        "upvote_ratio": post.upvote_ratio,
                        "num_comments": post.num_comments,
                        "type": "post",
                        "keyword": keyword
                    }
                    
                    all_posts.append(post_data)
                    
                    # 抓取评论 (只获取顶级评论)
                    post.comments.replace_more(limit=0)  # 移除MoreComments对象
                    for comment in post.comments[:20]:  # 每个帖子最多20条评论
                        comment_data = {
                            "id": comment.id,
                            "text": comment.body,
                            "author": str(comment.author),
                            "subreddit": post.subreddit.display_name,
                            "created_at": datetime.datetime.fromtimestamp(comment.created_utc).isoformat(),
                            "score": comment.score,
                            "post_id": post.id,
                            "post_title": post.title,
                            "type": "comment",
                            "keyword": keyword
                        }
                        all_posts.append(comment_data)
                
                # 避免API速率限制
                time.sleep(2)
        
        except Exception as e:
            logger.error(f"处理subreddit '{subreddit_name}'时出错: {e}")
    
    logger.info(f"共收集了 {len(all_posts)} 条数据")
    return all_posts

def main():
    """
    主函数
    """
    # 设置Reddit API
    reddit = setup_reddit_api()
    if not reddit:
        return
    
    # 要搜索的subreddit
    subreddits = [
        "FFIE", 
        "FaradayFuture", 
        "wallstreetbets", 
        "stocks", 
        "investing",
        "electricvehicles"
    ]
    
    # 要搜索的关键词
    keywords = [
        "FFIE", 
        "Faraday Future", 
        "$FFIE", 
        "FF91",
        "Carsten Breitfeld", 
        "Xuefeng Chen", 
        "YT Jia"
    ]
    
    # 搜索帖子
    posts = search_posts(reddit, subreddits, keywords, time_filter="month", limit=100)
    
    # 保存数据
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = data_dir / f"reddit_data_{timestamp}.json"
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)
    
    # 同时保存一个样本文件用于测试
    sample_file = data_dir / "reddit_sample.json"
    with open(sample_file, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)
    
    logger.info(f"数据已保存到 {filename}")

if __name__ == "__main__":
    main() 