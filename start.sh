#!/bin/bash

# 显示欢迎信息
echo "=========================================="
echo "🚀 FFIE 舆情监控系统启动脚本"
echo "=========================================="

# 检查是否首次运行
if [ ! -f ".env" ]; then
  echo "⚙️  首次运行，创建环境变量文件..."
  cp .env.example .env
  echo "✅ 已创建.env文件，请编辑添加必要的API密钥"
fi

# 安装前端依赖
if [ ! -d "node_modules" ]; then
  echo "📦 安装前端依赖..."
  npm install
  echo "✅ 前端依赖安装完成"
fi

# 启动前端开发服务器
echo "🌐 启动Next.js开发服务器..."
npm run dev 