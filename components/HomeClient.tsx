"use client"
import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const HomeClient = ({ email }: { email: string }) => {
  const navigate = useRouter()
  const popupRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const firstLetter = email?.[0]?.toUpperCase() || ""

  const handleLogin = () => {
    window.location.href = "/api/auth/login"
  }

  const handleLogOut = async () => {
    try {
      await axios.get('/api/auth/logout')
      window.location.href = "/"
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const features = [
    {
      title: 'Plug & Play',
      desc: 'Add the chatbot to your site with a single script tag. No complex setups or coding required.',
      colSpan: 'md:col-span-2 md:row-span-2',
      bg: 'bg-gradient-to-br from-indigo-500/10 to-purple-500/10'
    },
    {
      title: 'Admin Controlled',
      desc: "You control exactly what the AI knows and answers.",
      colSpan: 'md:col-span-2',
      bg: 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10'
    },
    {
      title: 'Always Online',
      desc: "Your customers get instant support 24/7, without delay.",
      colSpan: 'md:col-span-2',
      bg: 'bg-gradient-to-br from-orange-500/10 to-red-500/10'
    }
  ]

  return (
    <div className='min-h-screen bg-[#050505] text-zinc-200 overflow-x-hidden selection:bg-indigo-500/30'>
      {/* Ambient Background Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] pointer-events-none" />

      {/* Floating Glass Navbar */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
      >
        <div className='px-6 h-16 flex items-center justify-between'>
          <div className='text-xl font-bold tracking-tighter flex items-center gap-2'>
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
              <span className="text-white text-xs">⚡</span>
            </div>
            Customer<span className='text-zinc-500 font-normal'>Support</span>
          </div>

          {email ? (
            <div className='relative' ref={popupRef}>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-lg'
                onClick={() => setOpen(!open)}
              >
                {firstLetter}
              </motion.button>

              <AnimatePresence>
                {open && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className='absolute right-0 mt-4 w-48 bg-[#111] rounded-2xl border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl'
                  >
                    <div className="p-2 border-b border-white/5 text-xs text-zinc-500 truncate">{email}</div>
                    <button className='w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors' onClick={() => navigate.push('/dashboard')}>Dashboard</button>
                    <button className='w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors' onClick={handleLogOut}>Logout</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors flex items-center gap-2" 
              onClick={handleLogin}
            >
              Login
            </motion.button>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className='pt-48 pb-20 px-6 relative z-10'>
        <div className='max-w-5xl mx-auto flex flex-col items-center text-center'>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-indigo-300 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Next-Gen Chatbot Engine
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className='text-5xl md:text-7xl font-bold leading-tight tracking-tighter'
          >
            AI Customer Support <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Built for Modern Web
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className='mt-8 text-lg md:text-xl text-zinc-400 max-w-2xl'
          >
            Add a powerful AI chatbot to your website in minutes. Let your customers get instant answers using your own business knowledge.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className='mt-10 flex flex-col sm:flex-row gap-4'
          >
            {email ? (
              <button onClick={() => navigate.push('/dashboard')} className='px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition'>
                Go To Dashboard
              </button>
            ) : (
              <button className='px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition shadow-[0_0_40px_rgba(255,255,255,0.2)]' onClick={handleLogin}>
                Start Building Free
              </button>
            )}
            <a href='#features' className='px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition backdrop-blur-md'>
              Explore Features
            </a>
          </motion.div>

          {/* Floating Chat Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className='mt-20 relative w-full max-w-2xl'
          >
            <div className='absolute inset-0 bg-gradient-to-b from-indigo-500/20 to-transparent blur-3xl -z-10' />
            <div className='rounded-3xl bg-[#111]/80 backdrop-blur-xl border border-white/10 p-6 shadow-2xl relative overflow-hidden'>
              {/* Mac-style window controls */}
              <div className="flex gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>

              <div className='space-y-4 relative z-10'>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className='bg-white/10 text-white rounded-2xl rounded-tr-sm px-5 py-3 text-sm ml-auto w-fit border border-white/5 backdrop-blur-md'
                >
                  Do you offer Cash on Delivery?
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 }}
                  className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl rounded-tl-sm px-5 py-3 text-sm w-fit shadow-lg'
                >
                  Yes! Cash on Delivery is available for all orders within the local district. 🚚
                </motion.div>
              </div>

              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className='absolute -bottom-4 -right-4 w-16 h-16 rounded-2xl rotate-12 bg-white text-black flex items-center justify-center shadow-2xl text-2xl border border-zinc-200'
              >
                🤖
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id='features' className='py-28 px-6 relative z-10'>
        <div className='max-w-5xl mx-auto'>
          <div className="text-center mb-16">
            <h2 className='text-3xl md:text-5xl font-bold tracking-tight'>
              Smarter Support. <br/><span className="text-zinc-500">Zero Friction.</span>
            </h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4'>
            {features.map((f, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-3xl p-8 border border-white/5 backdrop-blur-md relative overflow-hidden group hover:border-white/20 transition-colors ${f.colSpan} ${f.bg}`}
              >
                <div className="absolute inset-0 bg-black/40 z-0" />
                <div className="relative z-10 h-full flex flex-col justify-end">
                  <h3 className='text-2xl font-semibold mb-2'>{f.title}</h3>
                  <p className='text-zinc-400 leading-relaxed'>{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className='py-10 text-center text-sm text-zinc-600 border-t border-white/5 relative z-10'>
        &copy; {new Date().getFullYear()} SupportAI. All Rights Reserved.
      </footer>
    </div>
  )
}

export default HomeClient