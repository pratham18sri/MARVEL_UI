import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { motion } from 'framer-motion';
import { useComponentStore } from '../store/componentStore';
import { GlowButton, MarvelCard, ArcReactorLoader } from 'pratham-ui';
import { Copy, Check, Terminal, Sparkles, Cpu } from 'lucide-react';

export const Home: React.FC = () => {
  const [init, setInit] = useState(false);
  const [copied, setCopied] = useState(false);
  const { fetchComponents } = useComponentStore();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    fetchComponents({ page: 1 });
  }, [fetchComponents]);

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText('npm install pratham-ui');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const particlesOptions = {
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: 'grab' } },
      modes: { grab: { distance: 140, links: { opacity: 0.1, color: '#E62429' } } },
    },
    particles: {
      color: { value: ['#E62429', '#F0B90B'] },
      links: { color: '#E62429', distance: 150, enable: true, opacity: 0.03, width: 1 },
      move: { direction: 'none' as const, enable: true, outModes: { default: 'bounce' as const }, speed: 0.8 },
      number: { density: { enable: true }, value: 50 },
      opacity: { value: { min: 0.1, max: 0.3 } },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col justify-between overflow-hidden">
      {/* Background Particles */}
      {init && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          className="absolute inset-0 z-0 pointer-events-none"
        />
      )}

      {/* Radial ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#E62429]/5 rounded-full blur-[120px] z-0 pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 z-10 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-[#A8A9AD] font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#F0B90B]" />
              <span>THE ULTIMATE SHIELD SYSTEM</span>
            </div>
            
            <h1 className="font-marvel text-6xl sm:text-7xl font-extrabold tracking-tight uppercase leading-none text-white">
              BUILD LIKE A <span className="text-[#E62429] drop-shadow-[0_0_15px_rgba(230,36,41,0.2)]">MARVEL HERO</span>
            </h1>
            
            <p className="text-lg text-[#A8A9AD] max-w-xl font-sans leading-relaxed">
              Assemble production-ready React UI widgets styled with stunning Iron Man core glows, nanotech borders, and quantum-tunneling animations.
            </p>

            {/* CTA action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/components">
                <GlowButton className="w-full sm:w-auto">
                  Browse Components
                </GlowButton>
              </Link>
              
              <button
                onClick={handleCopyInstall}
                className="flex items-center justify-between gap-3 px-5 py-3 bg-[#141414] hover:bg-[#1A1A1A] border border-white/10 hover:border-white/20 text-[#F5F5F5] rounded-lg font-mono text-sm transition-all duration-300 shadow-md group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#E62429]" />
                  <span>npm i pratham-ui</span>
                </div>
                {copied ? (
                  <Check className="w-4 h-4 text-[#F0B90B]" />
                ) : (
                  <Copy className="w-4 h-4 text-[#A8A9AD] group-hover:text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Hero Right Showcase Previews Floating */}
          <div className="lg:col-span-5 relative h-96 flex items-center justify-center">
            <div className="absolute w-[120%] h-[120%] bg-gradient-to-tr from-[#E62429]/10 to-transparent blur-3xl rounded-full opacity-35 z-0" />
            
            <div className="relative w-full max-w-sm space-y-4 z-10">
              {/* Floating Card 1 */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >
                <MarvelCard title="MARK LXXXV" subtitle="STARK ENTERPRISES">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 w-16 bg-white/40 rounded" />
                      <div className="h-1.5 w-24 bg-white/10 rounded" />
                    </div>
                  </div>
                </MarvelCard>
              </motion.div>

              {/* Floating Card 2 (Loader) */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
                className="scale-95 translate-x-6"
              >
                <div className="bg-[#1A1A1A] border border-white/5 p-4 rounded-lg flex items-center gap-4 shadow-xl">
                  <ArcReactorLoader />
                  <div className="space-y-2">
                    <span className="font-marvel text-xs text-[#F0B90B] font-bold uppercase tracking-wider block">
                      CORE HARMONICS
                    </span>
                    <div className="h-1.5 w-28 bg-[#E62429]/30 rounded overflow-hidden">
                      <div className="h-full bg-[#E62429] w-3/4 animate-pulse" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-[#0A0A0A] border-t border-white/5 py-8 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6 text-center divide-x divide-white/5">
            <div>
              <p className="font-marvel text-3xl sm:text-4xl font-bold text-white tracking-widest uppercase">
                32+
              </p>
              <p className="text-xs text-[#A8A9AD] font-mono mt-1 uppercase">Components</p>
            </div>
            <div>
              <p className="font-marvel text-3xl sm:text-4xl font-bold text-[#E62429] tracking-widest uppercase shadow-[0_0_15px_rgba(230,36,41,0.1)]">
                12,000+
              </p>
              <p className="text-xs text-[#A8A9AD] font-mono mt-1 uppercase">Downloads</p>
            </div>
            <div>
              <p className="font-marvel text-3xl sm:text-4xl font-bold text-[#F0B90B] tracking-widest uppercase">
                8
              </p>
              <p className="text-xs text-[#A8A9AD] font-mono mt-1 uppercase">Suits Categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
