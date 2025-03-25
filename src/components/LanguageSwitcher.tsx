'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [lang, setLang] = useState('en-US')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('NEXT_LOCALE') || 'en-US'
      setLang(storedLang)
    }
  }, [])

  const switchLanguage = () => {
    const newLang = lang === 'en-US' ? 'zh-CN' : 'en-US'
    localStorage.setItem('NEXT_LOCALE', newLang)
    setLang(newLang)
    
    // App Router中不支持router.push带locale选项，使用新方式
    const newPath = `/${newLang}${pathname}`
    router.push(newPath)
  }

  return (
    <button
      onClick={switchLanguage}
      className="group relative overflow-hidden text-sm px-3 py-1 rounded border border-gray-700 bg-black bg-opacity-50 backdrop-blur-sm text-gray-300 hover:border-primary transition-all duration-300"
      title={lang === 'en-US' ? '切换到中文' : 'Switch to English'}
    >
      <span className="relative z-10 flex items-center">
        <span className="w-4 h-4 mr-1.5 inline-flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-primary">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            <path d="M2 12h20"></path>
          </svg>
        </span>
        {lang === 'en-US' ? '中文' : 'English'}
      </span>
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
    </button>
  )
} 