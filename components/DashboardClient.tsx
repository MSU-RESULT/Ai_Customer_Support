"use client"
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const DashboardClient = ({ ownerId }: { ownerId: string }) => {
    const navigate = useRouter()
    const [businessName, setBusinessName] = useState("")
    const [SupportEmail, setSupportEmail] = useState("")
    const [knowledge, setKnowledge] = useState("")
    const [loading, setLoading] = useState(false)
    const [saved, setSaved] = useState(false)

    const handleSettings = async () => {
        setLoading(true)
        try {
            await axios.post('/api/settings', {
                ownerId, businessName, SupportEmail, knowledge
            })
            setLoading(false)
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (ownerId) {
            const handleGetDetails = async () => {
                try {
                    const result = await axios.post('/api/settings/get', { ownerId })
                    setBusinessName(result.data.businessName || "")
                    setSupportEmail(result.data.SupportEmail || "")
                    setKnowledge(result.data.knowledge || "")
                } catch (error) {
                    console.error(error)
                }
            }
            handleGetDetails()
        }
    }, [ownerId])

    return (
        <div className='min-h-screen bg-[#050505] text-zinc-200 selection:bg-indigo-500/30 overflow-hidden'>
            {/* Background Glow */}
            <div className="fixed top-0 right-0 w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

            {/* Navbar */}
            <motion.nav 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5"
            >
                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                    <div 
                        className='text-xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer'
                        onClick={() => navigate.push('/')}
                    >
                        <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white text-[10px]">⚡</span>
                        </div>
                        Support<span className='text-zinc-500 font-normal'>AI</span>
                    </div>
                    
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors flex items-center gap-2' 
                        onClick={() => navigate.push('/embed')}
                    >
                        <span>Get Embed Code</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </motion.button>
                </div>
            </motion.nav>

            <main className='pt-24 pb-12 px-6 max-w-5xl mx-auto relative z-10'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-10'>
                    
                    {/* Left Sidebar Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className='lg:col-span-4'
                    >
                        <h1 className='text-3xl font-bold tracking-tight mb-2'>Settings</h1>
                        <p className='text-zinc-500 text-sm mb-8'>Configure how your AI interacts with customers and what data it uses.</p>
                        
                        <div className="space-y-2">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">🏢</div>
                                <div>
                                    <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Profile</p>
                                    <p className="text-sm">Business Identity</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white">🧠</div>
                                <div>
                                    <p className="text-xs text-indigo-300 uppercase font-bold tracking-widest">Brain</p>
                                    <p className="text-sm">Knowledge Base</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Form Area */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='lg:col-span-8 space-y-6'
                    >
                        {/* Section 1: Business */}
                        <div className='bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl'>
                            <h2 className='text-lg font-semibold mb-6 flex items-center gap-2'>
                                <span className="w-1.5 h-4 bg-indigo-500 rounded-full" />
                                Business Details
                            </h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-zinc-500 ml-1">Company Name</label>
                                    <input 
                                        type="text" 
                                        className='w-full bg-white/5 rounded-xl border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all text-white placeholder:text-zinc-600' 
                                        placeholder='e.g. Acme Corp' 
                                        onChange={(e) => setBusinessName(e.target.value)} 
                                        value={businessName} 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-zinc-500 ml-1">Support Email</label>
                                    <input 
                                        type="email" 
                                        className='w-full bg-white/5 rounded-xl border border-white/10 px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all text-white placeholder:text-zinc-600' 
                                        placeholder='support@company.com' 
                                        onChange={(e) => setSupportEmail(e.target.value)} 
                                        value={SupportEmail}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Knowledge */}
                        <div className='bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl'>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className='text-lg font-semibold flex items-center gap-2'>
                                    <span className="w-1.5 h-4 bg-purple-500 rounded-full" />
                                    Knowledge Base
                                </h2>
                                <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-zinc-500">MARKDOWN SUPPORTED</span>
                            </div>
                            <p className='text-xs text-zinc-500 mb-4 italic'>Paste your FAQs, shipping policies, refund terms, and anything else the AI should know.</p>
                            
                            <textarea 
                                className='w-full h-64 bg-white/5 rounded-2xl border border-white/10 px-5 py-4 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all text-zinc-300 placeholder:text-zinc-700 font-mono leading-relaxed resize-none' 
                                placeholder="Example:&#10;Shipping: We deliver in 3-5 days.&#10;Refunds: 14-day money back guarantee..." 
                                onChange={(e) => setKnowledge(e.target.value)} 
                                value={knowledge} 
                            />
                        </div>

                        {/* Save Action */}
                        <div className='flex items-center justify-between bg-[#111] border border-white/10 rounded-3xl p-6'>
                            <div className="flex items-center gap-4">
                                <motion.button 
                                    whileHover={{ scale: 1.02 }} 
                                    whileTap={{ scale: 0.98 }} 
                                    disabled={loading} 
                                    onClick={handleSettings} 
                                    className='px-10 py-3 rounded-2xl bg-white text-black text-sm font-bold hover:bg-zinc-200 transition-all disabled:opacity-50 shadow-[0_0_30px_rgba(255,255,255,0.1)]'
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                            Saving...
                                        </div>
                                    ) : "Sync Settings"}
                                </motion.button>

                                <AnimatePresence>
                                    {saved && (
                                        <motion.span 
                                            initial={{ opacity: 0, x: -10 }} 
                                            animate={{ opacity: 1, x: 0 }} 
                                            exit={{ opacity: 0 }}
                                            className='text-sm font-medium text-emerald-400 flex items-center gap-2'
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            AI Successfully Updated
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    )
}

export default DashboardClient