# FFIE 舆情监控系统

> "Meme is the flame of faith; data is the armor of the retail army."

Faraday Future (FFIE) 社区舆情监控工具，用于追踪和分析FFIE在社交媒体上的情感趋势、热门话题和社区活跃度。

## 快速启动

我们提供了便捷的启动脚本：

### 方法一：使用启动脚本（推荐）

```bash
# 前端开发服务器
./start.sh

# 后端API服务器（可选，目前支持模拟数据模式）
./start-api.sh
```

### 方法二：手动启动

```bash
# 前端部分
npm install
npm run dev

# 后端部分
cd crawler
pip install -r requirements.txt
python api.py
```

## 项目结构

```
ffie-sentiment/
├── src/                  # 前端源代码 (Next.js)
├── crawler/              # 爬虫和数据分析系统 (Python)
├── public/               # 静态资源
└── docs/                 # 文档
```

## 功能特性

- 📊 实时舆情仪表盘
- 🔍 社交媒体数据爬取 (Reddit, Twitter等)
- 📈 情感分析和趋势可视化
- 🔔 负面情绪预警系统
- 🌐 多语言支持 (英文/中文)

## 开发模式

### 前端部分 (Next.js)

1. 安装依赖:

```bash
npm install
# 或
pnpm install
```

2. 启动开发服务器:

```bash
npm run dev
# 或
pnpm dev
```

3. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 后端部分 (Python)

1. 安装Python依赖:

```bash
cd crawler
pip install -r requirements.txt
```

2. 设置环境变量:

创建 `.env` 文件:

```
REDDIT_CLIENT_ID=你的Reddit客户端ID
REDDIT_CLIENT_SECRET=你的Reddit客户端密钥
REDDIT_USER_AGENT=FFIE Sentiment Monitor v0.1
```

3. 启动API服务:

```bash
cd crawler
python api.py
```

API将在 [http://localhost:8000](http://localhost:8000) 上运行，可通过 [http://localhost:8000/docs](http://localhost:8000/docs) 访问API文档。

## 部署

### Vercel部署 (前端)

1. 将代码推送到GitHub仓库
2. 在Vercel中导入项目
3. 配置环境变量
4. 部署!

### 后端部署 (Railway/Render)

1. 将代码推送到GitHub仓库
2. 连接到Railway或Render
3. 配置构建命令: `cd crawler && pip install -r requirements.txt`
4. 配置启动命令: `cd crawler && python api.py`
5. 设置必要的环境变量

## 技术栈

### 前端
- Next.js 14
- React 18
- Tailwind CSS
- Recharts (图表)
- next-i18next (国际化)

### 后端
- FastAPI
- PRAW (Reddit API)
- TextBlob/finBERT (情感分析)
- pandas (数据处理)
- APScheduler (定时任务)

## 贡献指南

欢迎贡献代码、报告问题或提出新功能建议!

1. Fork本仓库
2. 创建你的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建一个Pull Request

## 许可证

MIT

## 更新计划

- [ ] 添加Twitter数据源
- [ ] 实现用户认证
- [ ] 增加高级数据可视化
- [ ] 集成Telegram机器人通知
- [ ] 增加新闻情感分析 