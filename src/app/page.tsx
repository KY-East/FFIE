'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [bootSequence, setBootSequence] = useState(0)

  useEffect(() => {
    // 模拟启动序列
    const timer = setTimeout(() => {
      if (bootSequence < 100) {
        setBootSequence(prev => Math.min(prev + Math.floor(Math.random() * 10) + 1, 100))
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [bootSequence])

  const handleEnterSystem = () => {
    if (bootSequence < 100) return
    
    setLoading(true)
    // 模拟加载
    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 cyber-grid relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
        <div className="absolute top-[10%] right-[15%] w-64 h-64 bg-primary opacity-5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-secondary opacity-5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="glassmorphism p-8 rounded-lg border border-gray-800">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary bg-opacity-20 flex items-center justify-center border border-primary neon-border">
              <span className="text-primary font-bold text-2xl">FF</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center neon-text mb-2">FFIE 舆情监控系统</h1>
          <p className="text-gray-400 text-center mb-8">高级情绪分析与社区监控平台</p>
          
          <div className="space-y-6 mb-6">
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>系统初始化</span>
                <span>{bootSequence}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-200"
                  style={{ width: `${bootSequence}%` }}
                ></div>
              </div>
              
              <div className="mt-6 h-24 border border-gray-800 rounded bg-black bg-opacity-60 p-2 overflow-hidden font-mono text-xs text-gray-400">
                <div className="animate-typing">
                  <p>{'>'} 初始化系统核心... <span className="text-green-400">完成</span></p>
                  <p>{'>'} 连接情绪分析服务器... <span className="text-green-400">完成</span></p>
                  <p>{'>'} 加载用户配置文件... <span className="text-green-400">完成</span></p>
                  <p>{'>'} 校验安全访问令牌... <span className="text-green-400">完成</span></p>
                  <p>{'>'} 建立数据流通道... <span className={bootSequence >= 80 ? "text-green-400" : "blink"}>
                    {bootSequence >= 80 ? "完成" : "进行中"}
                  </span></p>
                  <p>{'>'} 准备仪表盘界面... <span className={bootSequence >= 100 ? "text-green-400" : "blink"}>
                    {bootSequence >= 100 ? "完成" : "进行中"}
                  </span></p>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleEnterSystem}
            disabled={bootSequence < 100 || loading}
            className={`w-full py-3 rounded-md text-center relative overflow-hidden transition-all duration-300 ${
              bootSequence >= 100 
                ? "heavy-button hover:neon-border" 
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
          >
            <span className="relative z-10 flex items-center justify-center">
              {loading ? (
                <>
                  <span className="data-loader mr-2"></span>
                  正在进入系统...
                </>
              ) : bootSequence >= 100 ? (
                "进入系统"
              ) : (
                `系统初始化中 (${bootSequence}%)`
              )}
            </span>
          </button>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              FFIE 系统 v1.0.0 | <span className="live-indicator inline-flex items-center">实时监控中</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
} 