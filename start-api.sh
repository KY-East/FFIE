#!/bin/bash

# 显示欢迎信息
echo "=========================================="
echo "🚀 FFIE 舆情监控 API 启动脚本"
echo "=========================================="

# 检查是否首次运行
if [ ! -f "crawler/.env" ]; then
  echo "⚙️  首次运行，创建环境变量文件..."
  cp crawler/.env.example crawler/.env
  echo "⚠️  请编辑 crawler/.env 文件添加必要的API密钥"
fi

# 检查Python虚拟环境
if [ ! -d "crawler/venv" ]; then
  echo "🐍 创建Python虚拟环境..."
  cd crawler
  python -m venv venv
  echo "✅ 虚拟环境创建完成"
  
  echo "📦 安装Python依赖..."
  source venv/bin/activate
  pip install -r requirements.txt
  cd ..
  echo "✅ Python依赖安装完成"
else
  echo "✅ 已检测到Python虚拟环境"
fi

# 激活虚拟环境并启动API
echo "🌐 启动FastAPI服务..."
cd crawler
source venv/bin/activate
python api.py 