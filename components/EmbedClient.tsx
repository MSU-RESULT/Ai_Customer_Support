'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EmbedClient = ({ ownerId }: { ownerId: string }) => {
  const [copy, setCopy] = useState(false);
  
  const embedCode = `<script src="${process.env.NEXT_PUBLIC_APP_URL}/chatBot.js" data-owner-id="${ownerId}"></script>`;

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopy(true);
    
    setTimeout(() => {
      setCopy(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#050505] p-8 text-zinc-200 flex items-center justify-center selection:bg-indigo-500/30">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="max-w-3xl w-full"
      >
        <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          
          {/* Decorative Background Elements inside the card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold tracking-wide mb-6">
              DEPLOYMENT
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Connect your website</h1>
            <p className="text-zinc-400 mb-10 text-lg">
              Copy and paste this snippet right before the closing <code className="bg-white/10 px-2 py-0.5 rounded text-indigo-300">{"</body>"}</code> tag of your website.
            </p>

            <div className='relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 text-sm font-mono overflow-hidden group'>
              <pre className="overflow-x-auto whitespace-pre-wrap text-zinc-300 pr-24 leading-relaxed">
                {embedCode}
              </pre>
              
              <button 
                onClick={copyCode}
                className="absolute top-1/2 -translate-y-1/2 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-2 overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {copy ? (
                    <motion.div
                      key="copied"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-1 text-emerald-400"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Copied
                    </motion.div>
                  ) : (
                    <motion.div
                      key="copy"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      Copy Snippet
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            <div className="mt-10 pt-10 border-t border-white/10">
              <h3 className="text-lg font-semibold mb-6">Installation Steps</h3>
              <ol className='space-y-6 text-zinc-400'>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-white font-medium">1</div>
                  <div>
                    <p className="text-white font-medium mb-1">Copy the script</p>
                    <p className="text-sm">Click the copy button above to grab your unique widget code.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-white font-medium">2</div>
                  <div>
                    <p className="text-white font-medium mb-1">Update your HTML</p>
                    <p className="text-sm">Open your website's main HTML file (or layout file in Next.js/React) and paste it before the closing body tag.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-white font-medium">3</div>
                  <div>
                    <p className="text-white font-medium mb-1">Test your bot</p>
                    <p className="text-sm">Refresh your website. You should see the chat bubble appear in the bottom right corner.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default EmbedClient;