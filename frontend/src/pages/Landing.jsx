import { Terminal, Code2, Brain, Trophy, ArrowRight, Sparkles, Zap, Target } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
const EDITOR_SECTIONS = [
  {
    id: "01",
    title: "Problem Library",
    align: "left",
    Editor: CodeEditor1,
    reverse: false,
  },
  {
    id: "02",
    title: "Real Time Hints",
    align: "right",
    Editor: CodeEditor2,
    reverse: true,
  },
  {
    id: "03",
    title: "Video Editorial",
    align: "left",
    Editor: CodeEditor3,
    reverse: false,
  },
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-[#140026] to-[#39016b] text-white relative overflow-hidden">
      <ParticleTrail />
      
      {/* ---------------- NAVBAR ---------------- */}
      <nav className="px-6 py-5 max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Terminal className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold">HeavyCoderr</span>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex gap-4">
            <Link to="/auth">
              <button className="px-4 py-2 rounded-xl border border-white/20 hover:bg-yellow-400/75 transition bg-yellow-400 text-black">
                Login
              </button>
            </Link>
            <Link to="/auth">
              <button className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-purple-400"
            onClick={() => setMenuOpen(v => !v)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3 bg-black/60 backdrop-blur-lg border border-white/10 rounded-xl p-4">
            <Link to="/auth">
              <button className="w-[30%] px-4 py-2 rounded-xl border border-white/20 bg-yellow-400 text-black">
                Login
              </button>
            </Link>
            <Link to="/auth">
              <button className="w-[30%] px-4 py-2 rounded-xl bg-purple-600">
                Get Started
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* ---------------- HERO ---------------- */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-24 text-center relative z-10">
        <ScrollReveal delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">AI-Powered Learning Platform</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h1 className="text-5xl sm:text-8xl font-extrabold leading-tight">
            Master <span className="text-purple-400">DSA</span>
            <br />
            Crack Coding Interviews
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
            Solve curated problems, understand optimal solutions, and learn
            through AI-powered hints and editorial videos — all in one place.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link to={'/auth'}>
              <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-lg font-semibold flex items-center gap-2 shadow-lg hover:shadow-purple-500/50 transition-all">
                Start Coding <ArrowRight />
              </button>
            </Link>
          </div>
        </ScrollReveal>
      </section>
      <section className="max-w-7xl mx-auto px-6 space-y-22">
        {EDITOR_SECTIONS.map(({ id, title, align, Editor, reverse }) => (
          <ScrollReveal key={id} delay={400}>
            <div
              className={`flex flex-col gap-10 md:gap-16 md:flex-row ${
                reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Heading */}
              <div className="w-full md:w-[40%]">
                <TypingHeading index={id} text={title} align={align} />
              </div>

              {/* Code */}
              <div className="w-full md:w-[60%]">
                <CodeCard>
                  <Editor />
                </CodeCard>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-12">
            Everything You Need to <span className="text-purple-400">Excel</span>
          </h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollReveal delay={0}>
            <FeatureCard
              icon={<Code2 />}
              title="Curated DSA Problems"
              desc="Hand-picked problems covering arrays, DP, graphs, trees, and more. Organized by difficulty and topic."
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FeatureCard
              icon={<Brain />}
              title="AI-Powered Assistant"
              desc="Get hints, complexity analysis, and code reviews without spoilers. Learn at your own pace."
            />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <FeatureCard
              icon={<Trophy />}
              title="Editorial Videos"
              desc="Watch concise solution walkthroughs by experienced engineers. Multiple approaches explained."
            />
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <FeatureCard
              icon={<Target />}
              title="Easy to use AI-Bot"
              desc="No need to explain or send your code because our bot will already have it."
            />
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <FeatureCard
              icon={<Zap />}
              title="Interactive Coding"
              desc="Write, test, and submit code directly in the browser. Instant feedback on your solutions."
            />
          </ScrollReveal>
          <ScrollReveal delay={500}>
            <FeatureCard
              icon={<Sparkles />}
              title="Interview Prep"
              desc="Practice with real interview questions from top tech companies. Build confidence."
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section className="bg-black/40 border-y border-white/10 relative z-10">
        <ScrollReveal>
          <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-3 text-center gap-10">
            <AnimatedStat value={10} suffix="+" label="Currently DSA Problems" />
            <Stat value="AI-Driven" label="Personalized Help" />
            <Stat value="100%" label="Interview Focused" />
          </div>
        </ScrollReveal>
      </section>

      {/* ---------------- TESTIMONIAL / TRUST ---------------- */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-12">
            Trusted by <span className="text-purple-400">Aspiring Engineers</span>
          </h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <ScrollReveal delay={100}>
            <TestimonialCard
              quote="HeavyCoderr helped me understand the approach for solving problems. The AI hints were game-changing!"
              author="Software Engineer"
            />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <TestimonialCard
              quote="Best platform for DSA prep. The video editorials explain concepts I struggled with for months."
              author="CS Student"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl sm:text-6xl font-bold">
            Your Interview Journey Starts Here
          </h2>
          <p className="mt-6 text-gray-300 max-w-xl mx-auto text-lg">
            Join HeavyCoderr today and build strong problem-solving intuition. Start solving, start growing.
          </p>
          <Link to={'/auth'}>
            <button className="mt-10 px-12 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl text-xl font-semibold shadow-2xl hover:shadow-purple-500/50 transition-all">
              Create Free Account
            </button>
          </Link>
        </ScrollReveal>
        
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="border-t border-white/10 py-8 text-center text-gray-400 text-sm relative z-10">
        <p>© {new Date().getFullYear()} HeavyCoderr. Built for serious coders.</p>
        <div className="flex justify-center gap-6 mt-4 text-xs">
          <Link to='/' className="hover:text-purple-400 transition">Privacy</Link>
          <Link to='/' className="hover:text-purple-400 transition">Terms</Link>
          <Link to='/' className="hover:text-purple-400 transition">Contact</Link>
        </div>
      </footer>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

// Scroll Reveal Animation Component
function ScrollReveal({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}

// Animated Counter Component
function AnimatedStat({ value, suffix = "", label }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const duration = 2000;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [value, hasAnimated]);

  return (
    <div ref={ref}>
      <p className="text-5xl font-bold text-purple-400">
        {count}{suffix}
      </p>
      <p className="text-gray-300 mt-3 text-lg">{label}</p>
    </div>
  );
}

function ParticleTrail() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Create floating background particles
    const bgParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 100 + 50,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(bgParticles);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Large cursor spotlight effect */}
      <div 
        className="fixed pointer-events-none z-0 transition-all duration-300 ease-out"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          width: '600px',
          height: '600px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0.05) 30%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Floating background particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, rgba(192, 132, 252, 0.05) 50%, transparent 100%)',
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              filter: 'blur(20px)',
            }}
          />
        ))}
      </div>

      {/* Animated grid */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          transform: `perspective(500px) rotateX(60deg) translateY(-50%)`,
          transformOrigin: 'center top',
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(30px, -30px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(40px, 10px) scale(1.05);
          }
        }
      `}</style>
    </>
  );
}

function CodeCard({ children }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / 20;
    const tiltY = (centerX - x) / 20;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-all duration-300"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
    </div>
  );
}
function TypingHeading({ index, text, align = "left", speed = 120 }) {
  const [displayed, setDisplayed] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const ref = useRef(null);

  // Start typing only when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Typing effect
  useEffect(() => {
    if (!startTyping) return;

    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayed(text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [startTyping, text, speed]);

  return (
    <div
      ref={ref}
      className={`font-mono space-y-3 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      <div className="text-sm tracking-widest text-emerald-400">
        // feature_{index}
      </div>

      <h2 className="text-3xl sm:text-5xl font-extrabold text-[#F5F7FA] leading-tight">
        <span className="text-purple-400">const</span>{" "}
        <span className="text-yellow-300">{displayed}</span>{" "}
        <span className="text-gray-500">=</span>{" "}
        <span className="text-blue-400">true</span>
      </h2>
    </div>
  );
}

function CodeEditor1() {
  return (
    <div className="bg-[#0d1117] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      
      {/* Terminal Header */}
      <div className="bg-[#161b22] px-4 py-2 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-xs text-green-400 font-mono">● LIVE</span>
          <span className="text-sm text-gray-300 font-mono">
            ~/problems.js
          </span>
        </div>
        <span className="text-xs text-gray-500 font-mono">JavaScript</span>
      </div>

      {/* Code Body */}
      <div className="p-6 text-left text-sm overflow-x-auto font-mono">
        <div className="text-gray-500">
          <span>// </span>
          <span className="text-sky-300">Explore</span>
          <span> a rich, well-curated library of coding problems</span>
        </div>

        <div className="pl-4 text-gray-500">
          <span>// </span>
          <span>Designed to take you from </span>
          <span className="text-green-300">fundamentals</span>
          <span> to </span>
          <span className="text-purple-400">advanced concepts</span>
        </div>

        <div className="h-4"></div>

        <div className="pl-4 text-gray-500">
          <span>// </span>
          <span>Each problem is categorized by </span>
          <span className="text-yellow-300">difficulty</span>
          <span> and </span>
          <span className="text-yellow-300">topic</span>
        </div>

        <div className="pl-8 text-gray-500">
          <span>// </span>
          <span>Practice systematically</span>
          <span>, track your </span>
          <span className="text-sky-300">progress</span>
        </div>

        <div className="pl-8 text-gray-500">
          <span>// </span>
          <span>And build strong </span>
          <span className="text-green-300">problem-solving skills</span>
          <span> step by step</span>
        </div>
      </div>
    </div>
  );
}
function CodeEditor2() {
  return (
    <div className="bg-[#020617] border border-emerald-500/20 rounded-xl shadow-2xl overflow-hidden">
      
      {/* Terminal Header */}
      <div className="bg-[#020617] px-4 py-2 border-b border-emerald-500/20 flex gap-3">
        <span className="text-emerald-400 font-mono text-xs">user@heavycoderr</span>
        <span className="text-gray-500 font-mono text-xs">:</span>
        <span className="text-cyan-400 font-mono text-xs">~/problems</span>
        <span className="text-gray-500 font-mono text-xs">$</span>
        <span className="text-gray-400 font-mono text-xs">vim AI_hint.js</span>
      </div>

      {/* Terminal Body */}
      <div className="p-6 text-left text-sm overflow-x-auto font-mono">
        <div className="text-gray-200">
          <span className="text-pink-400">function</span>{" "}
          <span className="text-green-300">aiHints</span>
          <span>() {"{"}</span>
        </div>

        <div className="pl-4 text-gray-200">
          <span className="text-pink-400">const</span>{" "}
          <span className="text-sky-300">hints</span>
          <span> = </span>
          <span className="text-green-300">"intelligent, real-time guidance"</span>
          <span>;</span>
        </div>

        <div className="pl-4 text-gray-200">
          <span className="text-pink-400">const</span>{" "}
          <span className="text-sky-300">purpose</span>
          <span> = </span>
          <span className="text-green-300">"help you think, not reveal answers"</span>
          <span>;</span>
        </div>

        <div className="h-4"></div>

        <div className="pl-4 text-gray-200">
          <span className="text-pink-400">if</span>
          <span> (</span>
          <span className="text-sky-300">stuck</span>
          <span>) {"{"}</span>
        </div>

        <div className="pl-8 text-gray-200">
          <span>highlight(</span>
          <span className="text-yellow-300">edgeCases</span>
          <span>, </span>
          <span className="text-yellow-300">constraints</span>
          <span>, </span>
          <span className="text-yellow-300">nextSteps</span>
          <span>);</span>
        </div>

        <div className="pl-8 text-gray-200">
          <span className="text-pink-400">return</span>
          <span> </span>
          <span className="text-green-300">"guided problem-solving"</span>
          <span>;</span>
        </div>

        <div className="pl-4 text-gray-200">
          <span>{"}"}</span>
        </div>

        <div className="text-gray-200">
          <span>{"}"}</span>
        </div>
      </div>
        {/* Cursor */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-emerald-400">$</span>
          <span className="w-2 h-4 bg-emerald-400 animate-pulse"></span>
        </div>
    </div>
  );
}

function CodeEditor3() {
  return (
    <div className="bg-[#1f1f1f] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-[#2a2a2a] px-4 py-3 flex items-center gap-2 border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-sm text-gray-400 ml-4">editorial_video.js</span>
      </div>

      {/* Code */}
      <div className="p-6 text-left text-sm overflow-x-auto font-mono">
      <div className="text-gray-200">
        <span className="text-sky-300">watch</span>
        <span>(</span>
        <span className="text-green-300">videoEditorial</span>
        <span>)</span>
      </div>

      <div className="pl-4 text-gray-200">
        <span className="text-gray-500">→ </span>
        <span className="text-yellow-300">understandProblem</span>
        <span>()</span>
      </div>

      <div className="pl-4 text-gray-200">
        <span className="text-gray-500">→ </span>
        <span className="text-yellow-300">learnApproach</span>
        <span>()</span>
      </div>

      <div className="pl-4 text-gray-200">
        <span className="text-gray-500">→ </span>
        <span className="text-yellow-300">walkThroughSolution</span>
        <span>()</span>
      </div>

      <div className="h-4"></div>

      <div className="pl-4 text-gray-200">
        <span className="text-gray-500">→ </span>
        <span className="text-yellow-300">exploreAlternatives</span>
        <span>()</span>
      </div>

      <div className="pl-4 text-gray-200">
        <span className="text-gray-500">→ </span>
        <span className="text-green-300">reinforceConcepts</span>
        <span>()</span>
      </div>

      <div className="h-4"></div>

      <div className="pl-4 text-gray-200">
        <span className="text-pink-400">return</span>
        <span> </span>
        <span className="text-green-300">deepUnderstanding</span>
        <span>;</span>
      </div>
    </div>
    </div>
  );
}




function FeatureCard({ icon, title, desc }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / 10;
    const tiltY = (centerX - x) / 10;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-black/50 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:shadow-[0_0_25px_rgba(157,0,255,0.25)] hover:border-purple-500/30 transition-all group"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-600/20 text-purple-400 mb-4 group-hover:bg-purple-600/30 transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-5xl font-bold text-purple-400">{value}</p>
      <p className="text-gray-300 mt-3 text-lg">{label}</p>
    </div>
  );
}

function TestimonialCard({ quote, author }) {
  return (
    <div className="bg-black/50 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
      <div className="text-purple-400 text-4xl mb-4">"</div>
      <p className="text-gray-300 italic mb-6">{quote}</p>
      <p className="text-sm text-gray-400">— {author}</p>
    </div>
  );
}