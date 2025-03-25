import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard-layout cyber-grid">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-opacity-50 bg-gray-900 border-b border-gray-800 shadow-lg">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center border border-primary neon-border">
              <span className="text-primary font-bold text-xl">FF</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold neon-text tracking-wider">FFIE 舆情监控</h1>
              <p className="text-sm text-gray-400 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse mr-2"></span>
                实时追踪社区情绪和话题
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm px-3 py-1 rounded-full bg-black bg-opacity-50 border border-gray-800">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-gray-300">系统在线</span>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4 md:px-6 relative">
        {/* 背景装饰元素 */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-primary bg-opacity-5 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-secondary bg-opacity-5 rounded-full filter blur-3xl -z-10"></div>
        
        {children}
      </main>
      
      <footer className="bg-gray-900 bg-opacity-40 backdrop-blur-lg border-t border-gray-800">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-primary bg-opacity-20 border border-primary flex items-center justify-center">
                <span className="text-primary font-bold text-sm">FF</span>
              </div>
              <span className="text-gray-400 text-sm">© {new Date().getFullYear()} FFIE 舆情监控系统</span>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm text-gray-500">
                <span className="neon-text font-medium">"数据即权力，情绪即现实"</span>
              </p>
              <div className="mt-1 text-xs text-gray-600 flex items-center">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-1 blink"></span>
                v1.0.0
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 