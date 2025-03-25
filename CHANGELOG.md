# 更新日志 (Changelog)

本文档记录 FFIE 舆情监控系统的所有重要变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [未发布]

### 新增
- 基础Next.js项目结构搭建
- 舆情仪表盘组件(SentimentDashboard)开发
- 多语言支持（中文/英文）配置
- 爬虫系统基础架构（Reddit数据源）
- 情感分析模块（使用TextBlob）
- FastAPI后端服务开发
- 模拟数据模块(src/mock/data.ts)添加，支持MVP快速验证
- 创建useMockData Hook用于模拟API数据获取流程
- 添加加载状态和错误处理UI
- App Router架构的页面和布局组件

### 优化
- 国际化默认语言机制完善
- 数据接口层级重构，提供更清晰的API架构
- 遵循Reddit API使用规范，增加请求频率限制
- 增加可配置的情绪预警阈值机制
- 新增情绪与股价联动图表功能
- 环境变量配置文件(.env.example)用于简化部署流程
- 组件接口优化，提高代码复用性
- 机器人预览部分使用深色背景，提高文本可读性
- 部署配置(vercel.json)更新以支持Vercel部署

### 修复
- 修复Next.js 13+ App Router使用useState和useEffect的问题，为组件添加"use client"指令
- 解决路由冲突：删除重复的页面文件，选择App Router架构
- 修复i18n配置问题，确保国际化正常工作

## [0.1.0] - 2023-10-28

### 新增
- 项目初始化
- 基础文件结构创建
- 技术栈选型：Next.js + FastAPI 