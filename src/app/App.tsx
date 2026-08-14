import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight, ArrowUpRight, Mail, Github, Linkedin, MapPin, Zap, Layers, Brain, Wrench, ExternalLink } from "lucide-react";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

const SKILLS = [
  {
    icon: <Layers size={20} />,
    title: "UI/UX Design",
    color: "#6C63FF",
    bg: "#F0EFFF",
    items: ["UI Design", "UX Research", "Wireframing", "Prototyping", "Design Systems", "Responsive Design"],
  },
  {
    icon: <Zap size={20} />,
    title: "Development",
    color: "#0EA5E9",
    bg: "#EFF8FF",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    icon: <Brain size={20} />,
    title: "AI & Backend",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    items: ["Python", "FastAPI", "OpenAI", "Gemini API", "PostgreSQL", "Supabase"],
  },
  {
    icon: <Wrench size={20} />,
    title: "Design Tools",
    color: "#10B981",
    bg: "#ECFDF5",
    items: ["Figma", "Canva", "Framer", "GitHub", "Vercel"],
  },
];

const PROJECTS = [
  {
    title: "PulsePoint AI",
    category: "AI Product • UI/UX • Web",
    description: "An AI-powered platform designed to help users transform ideas into engaging social media content through an intuitive workflow.",
    gradient: "from-[#6C63FF] to-[#a78bfa]",
    mockupBg: "#EEF2FF",
    tag: "Featured",
  },
  {
    title: "VeritasFlow",
    category: "AI • Information Management • Product Design",
    description: "An AI-powered Information Diet Coach designed to help users understand and manage their digital information consumption.",
    gradient: "from-[#0EA5E9] to-[#38bdf8]",
    mockupBg: "#EFF8FF",
    tag: null,
  },
  {
    title: "MediSync",
    category: "Healthcare • AI • UX",
    description: "A healthcare-focused digital experience designed to make medical information and patient workflows easier to understand and manage.",
    gradient: "from-[#10B981] to-[#34d399]",
    mockupBg: "#ECFDF5",
    tag: null,
  },
  {
    title: "ResQSync AI",
    category: "AI • Emergency Response • UX",
    description: "An AI-powered emergency response concept focused on improving coordination, communication and accessibility during critical situations.",
    gradient: "from-[#F59E0B] to-[#fbbf24]",
    mockupBg: "#FFFBEB",
    tag: null,
  },
];

const PROCESS = [
  { step: "01", title: "Discover", desc: "Understand the problem, users and requirements." },
  { step: "02", title: "Define", desc: "Organize insights and identify the core user needs." },
  { step: "03", title: "Design", desc: "Create wireframes, visual systems and interactive interfaces." },
  { step: "04", title: "Refine", desc: "Test, improve and polish the final experience." },
];

const TIMELINE = [
  { year: "2024", text: "Started exploring Web Development" },
  { year: "2025", text: "Started building AI & Full-Stack Projects" },
  { year: "2026", text: "Exploring Product Design & UI/UX" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function MockupCard({ gradient, mockupBg }: { gradient: string; mockupBg: string }) {
  return (
    <div className="relative w-full h-52 rounded-xl overflow-hidden" style={{ background: mockupBg }}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`} />
      <div className="absolute inset-4 flex flex-col gap-2">
        <div className={`h-6 w-24 rounded-full bg-gradient-to-r ${gradient} opacity-80`} />
        <div className="flex gap-2 mt-1">
          <div className="h-20 w-32 rounded-lg bg-white/70 shadow-sm border border-white/80" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-9 rounded-lg bg-white/70 shadow-sm border border-white/80" />
            <div className="h-9 rounded-lg bg-white/50 shadow-sm border border-white/60" />
          </div>
        </div>
        <div className="flex gap-1.5 mt-1">
          <div className={`h-2 w-16 rounded-full bg-gradient-to-r ${gradient} opacity-50`} />
          <div className={`h-2 w-10 rounded-full bg-gradient-to-r ${gradient} opacity-30`} />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = NAV_LINKS.map((n) => ({ name: n, el: document.getElementById(n.toLowerCase()) }));
      const current = sections.reverse().find((s) => s.el && s.el.getBoundingClientRect().top <= 100);
      if (current) setActiveSection(current.name);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="min-h-screen font-['Inter',sans-serif] bg-[#F8F9FC] text-[#111827] overflow-x-hidden">

      {/* Navbar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(248,249,252,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #E5E7EB" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight text-[#111827] cursor-pointer" onClick={() => scrollTo("home")}>
            Tanya Garg
          </span>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-sm font-medium transition-colors duration-200 relative"
                style={{ color: activeSection === link ? "#6C63FF" : "#6B7280" }}
              >
                {link}
                {activeSection === link && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#6C63FF]" />
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:flex">
            <button
              onClick={() => scrollTo("contact")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-[#6C63FF] text-white transition-all duration-200 hover:bg-[#5a52e0] hover:shadow-lg hover:shadow-[#6C63FF]/20"
            >
              {"Let's Connect"} <ArrowUpRight size={14} />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-[#6B7280] hover:text-[#111827] hover:bg-white/60 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-[#E5E7EB] px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-left text-base font-medium py-1 transition-colors"
                style={{ color: activeSection === link ? "#6C63FF" : "#374151" }}
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="mt-2 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#6C63FF] text-white"
            >
              {"Let's Connect"} <ArrowUpRight size={14} />
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-6 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6C63FF]/8 border border-[#6C63FF]/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-pulse" />
                <span className="text-xs font-semibold text-[#6C63FF] tracking-wide uppercase">
                  UI/UX Designer · Developer · AI Enthusiast
                </span>
              </div>

              <h1
                className="font-bold leading-[1.1] mb-6 text-[#111827]"
                style={{ fontSize: "clamp(2.4rem,5vw,4rem)" }}
              >
                Designing digital experiences that are{" "}
                <span className="text-[#6C63FF]">simple, useful</span>{" "}
                and memorable.
              </h1>

              <p className="text-lg text-[#6B7280] leading-relaxed mb-8 max-w-lg">
                {"Hi, I'm Tanya Garg — a UI/UX designer and B.Tech IT student passionate about creating clean interfaces and meaningful digital experiences."}
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo("projects")}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6C63FF] text-white font-semibold text-sm transition-all duration-200 hover:bg-[#5a52e0] hover:shadow-xl hover:shadow-[#6C63FF]/25 hover:-translate-y-0.5"
                >
                  View My Work <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[#E5E7EB] bg-white text-[#111827] font-semibold text-sm transition-all duration-200 hover:border-[#6C63FF] hover:text-[#6C63FF] hover:-translate-y-0.5"
                >
                  {"Let's Connect"}
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 mt-12 pt-8 border-t border-[#E5E7EB]">
                <div>
                  <div className="text-3xl font-bold text-[#111827]">10+</div>
                  <div className="text-sm text-[#6B7280] mt-0.5">Projects</div>
                </div>
                <div className="w-px h-10 bg-[#E5E7EB]" />
                <div>
                  <div className="text-3xl font-bold text-[#111827]">5+</div>
                  <div className="text-sm text-[#6B7280] mt-0.5">Technologies</div>
                </div>
                <div className="w-px h-10 bg-[#E5E7EB]" />
                <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                  <MapPin size={14} className="text-[#6C63FF]" />
                  Based in India
                </div>
              </div>
            </div>

            {/* Right — avatar + floating chips */}
            <div className="relative flex justify-center items-center">
              <div className="relative w-72 h-72 lg:w-80 lg:h-80">
                {/* Avatar circle */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#6C63FF] to-[#a78bfa] flex items-center justify-center shadow-2xl shadow-[#6C63FF]/30">
                  <span className="text-6xl font-bold text-white/90 select-none">TG</span>
                </div>

                {/* Floating skill chips */}
                <div className="absolute -left-12 top-10 bg-white border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 shadow-lg text-xs font-semibold text-[#111827] flex items-center gap-2 animate-[float_3s_ease-in-out_infinite]">
                  <span className="w-2 h-2 rounded-full bg-[#6C63FF]" /> UI/UX Design
                </div>
                <div className="absolute -right-8 top-16 bg-white border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 shadow-lg text-xs font-semibold text-[#111827] flex items-center gap-2 animate-[float_3.5s_ease-in-out_0.5s_infinite]">
                  <span className="w-2 h-2 rounded-full bg-[#0EA5E9]" /> Product Design
                </div>
                <div className="absolute -left-8 bottom-16 bg-white border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 shadow-lg text-xs font-semibold text-[#111827] flex items-center gap-2 animate-[float_4s_ease-in-out_1s_infinite]">
                  <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" /> AI × Technology
                </div>

                {/* Currently card */}
                <div className="absolute -right-4 bottom-10 bg-white border border-[#E5E7EB] rounded-xl px-4 py-3 shadow-lg animate-[float_3.2s_ease-in-out_0.3s_infinite]">
                  <div className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider mb-0.5">Currently</div>
                  <div className="text-xs font-bold text-[#111827]">Building & Learning</div>
                  <div className="mt-1.5 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] animate-pulse" style={{ animationDelay: "0.3s" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" style={{ animationDelay: "0.6s" }} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white border-t border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#6C63FF]">About</span>
            <h2 className="text-4xl font-bold mt-2 text-[#111827]">About Me</h2>
            <p className="text-[#6B7280] mt-2 text-lg">A little bit about my journey</p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — text + timeline */}
            <div>
              <Reveal delay={0.1}>
                <p className="text-[#374151] text-lg leading-relaxed mb-4">
                  {"I'm Tanya Garg, a B.Tech IT student who enjoys turning ideas into simple and engaging digital experiences. I work across UI/UX design, web development and AI-powered products."}
                </p>
                <p className="text-[#6B7280] text-base leading-relaxed">
                  I enjoy understanding a problem, exploring different solutions and transforming the idea into a clean and user-friendly interface.
                </p>
              </Reveal>

              {/* Timeline */}
              <Reveal delay={0.2} className="mt-10">
                <div className="space-y-0">
                  {TIMELINE.map((item, i) => (
                    <div key={i} className="flex gap-5 group">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-[#6C63FF]/10 border-2 border-[#6C63FF]/30 flex items-center justify-center flex-shrink-0 group-hover:border-[#6C63FF] transition-colors">
                          <div className="w-2 h-2 rounded-full bg-[#6C63FF]" />
                        </div>
                        {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-[#E5E7EB] mt-1 mb-1" style={{ minHeight: 32 }} />}
                      </div>
                      <div className="pb-8">
                        <div className="text-sm font-bold text-[#6C63FF] mb-0.5">{item.year}</div>
                        <div className="text-[#374151] font-medium">{item.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — About card */}
            <Reveal delay={0.15}>
              <div className="bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#6C63FF]/10 to-transparent rounded-full -translate-y-16 translate-x-16" />
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#a78bfa] flex items-center justify-center mb-6 text-white font-bold text-xl">
                  TG
                </div>
                <div className="text-xl font-bold text-[#111827] mb-1">TANYA GARG</div>
                <div className="h-px w-10 bg-[#6C63FF] mb-4" />
                {["B.Tech IT", "UI/UX Designer", "Developer", "AI Enthusiast"].map((tag) => (
                  <div key={tag} className="flex items-center gap-2 py-2 border-b border-[#E5E7EB] last:border-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6C63FF]" />
                    <span className="text-[#374151] font-medium text-sm">{tag}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 bg-[#F8F9FC] border-t border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#6C63FF]">Skills</span>
            <h2 className="text-4xl font-bold mt-2 text-[#111827]">Skills & Tools</h2>
            <p className="text-[#6B7280] mt-2 text-lg">Tools and technologies I use to turn ideas into products.</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS.map((skill, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 h-full hover:border-[#6C63FF]/40 hover:shadow-lg hover:shadow-[#6C63FF]/8 transition-all duration-300 hover:-translate-y-1 group">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: skill.bg, color: skill.color }}
                  >
                    {skill.icon}
                  </div>
                  <h3 className="font-bold text-[#111827] mb-4 text-base">{skill.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2.5 py-1 rounded-full font-medium transition-colors"
                        style={{ background: skill.bg, color: skill.color }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 bg-white border-t border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#6C63FF]">Work</span>
            <h2 className="text-4xl font-bold mt-2 text-[#111827]">Selected Projects</h2>
            <p className="text-[#6B7280] mt-2 text-lg">{"A few things I've designed and built."}</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl overflow-hidden group hover:border-[#6C63FF]/30 hover:shadow-xl hover:shadow-[#6C63FF]/10 transition-all duration-300 hover:-translate-y-1.5">
                  {/* Mockup area */}
                  <div className="p-5 pb-0">
                    <MockupCard gradient={project.gradient} mockupBg={project.mockupBg} />
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">{project.category}</span>
                      {project.tag && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#6C63FF]/10 text-[#6C63FF]">
                          {project.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-[#111827] mb-2">{project.title}</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed mb-4">{project.description}</p>
                    <button className="flex items-center gap-1.5 text-sm font-semibold text-[#6C63FF] group-hover:gap-2.5 transition-all duration-200">
                      {i === 0 ? "View Case Study" : "View Project"}
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN PROCESS */}
      <section className="py-24 bg-[#F8F9FC] border-t border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#6C63FF]">Process</span>
            <h2 className="text-4xl font-bold mt-2 text-[#111827]">How I Design</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connector line — desktop only */}
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-[#E5E7EB] z-0" />

            {PROCESS.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 relative hover:border-[#6C63FF]/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-full bg-[#6C63FF] text-white text-sm font-bold flex items-center justify-center mb-5 relative z-10">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-[#111827] mb-2">{step.title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-white border-t border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#6C63FF]">Contact</span>
            <h2 className="text-4xl font-bold mt-2 text-[#111827]">Have an idea in mind?</h2>
            <p className="text-[#6B7280] mt-2 text-lg">{"Let's create something meaningful together."}</p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — info */}
            <Reveal delay={0.1}>
              <div className="space-y-6">
                <a
                  href="mailto:tanyagarg5315@gmail.com"
                  className="flex items-center gap-4 p-5 rounded-xl border border-[#E5E7EB] bg-[#F8F9FC] hover:border-[#6C63FF]/40 hover:bg-[#6C63FF]/4 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#6C63FF]/10 flex items-center justify-center text-[#6C63FF]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">Email</div>
                    <div className="text-[#111827] font-semibold group-hover:text-[#6C63FF] transition-colors">
                      tanyagarg5315@gmail.com
                    </div>
                  </div>
                  <ExternalLink size={14} className="ml-auto text-[#6B7280] opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://github.com/Tanya-garg10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-xl border border-[#E5E7EB] bg-[#F8F9FC] hover:border-[#6C63FF]/40 hover:bg-[#6C63FF]/4 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#6C63FF]/10 flex items-center justify-center text-[#6C63FF]">
                    <Github size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">GitHub</div>
                    <div className="text-[#111827] font-semibold group-hover:text-[#6C63FF] transition-colors">Tanya-garg10</div>
                  </div>
                  <ExternalLink size={14} className="ml-auto text-[#6B7280] opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <div className="flex items-center gap-4 p-5 rounded-xl border border-[#E5E7EB] bg-[#F8F9FC] hover:border-[#6C63FF]/40 hover:bg-[#6C63FF]/4 transition-all duration-200 group cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-[#6C63FF]/10 flex items-center justify-center text-[#6C63FF]">
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">LinkedIn</div>
                    <div className="text-[#111827] font-semibold group-hover:text-[#6C63FF] transition-colors">Tanya Garg</div>
                  </div>
                  <ExternalLink size={14} className="ml-auto text-[#6B7280] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Large CTA */}
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#a78bfa] text-white">
                  <h3 className="text-xl font-bold mb-1">Ready to collaborate?</h3>
                  <p className="text-white/80 text-sm mb-4">{"I'm open to internships, freelance projects and creative collaborations."}</p>
                  <button
                    onClick={() => document.getElementById("contact-form")?.querySelector("input")?.focus()}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#6C63FF] font-bold text-sm hover:bg-white/90 transition-colors"
                  >
                    {"Let's Talk"} <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Right — form */}
            <Reveal delay={0.15}>
              <form id="contact-form" onSubmit={handleSubmit} className="bg-[#F8F9FC] border border-[#E5E7EB] rounded-2xl p-8 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#111827] text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#111827] text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#111827] text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#6C63FF] focus:ring-2 focus:ring-[#6C63FF]/20 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#6C63FF] text-white font-bold text-sm hover:bg-[#5a52e0] hover:shadow-lg hover:shadow-[#6C63FF]/25 transition-all duration-200"
                >
                  {sent ? "Message Sent!" : "Send Message"} <ArrowRight size={16} />
                </button>
                {sent && (
                  <p className="text-center text-sm text-[#10B981] font-medium">
                    Thanks! {"I'll"} get back to you soon.
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#F8F9FC] border-t border-[#E5E7EB] py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="text-xl font-bold text-[#111827]">Tanya Garg</div>
            <div className="text-sm text-[#6B7280]">UI/UX Designer · Developer · AI Enthusiast</div>
            <div className="flex flex-wrap justify-center gap-6 mt-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-sm text-[#6B7280] hover:text-[#6C63FF] transition-colors font-medium"
                >
                  {link}
                </button>
              ))}
            </div>
            <div className="flex gap-4 mt-2">
              <a href="mailto:tanyagarg5315@gmail.com" className="p-2 rounded-lg text-[#6B7280] hover:text-[#6C63FF] hover:bg-[#6C63FF]/8 transition-all">
                <Mail size={18} />
              </a>
              <a href="https://github.com/Tanya-garg10" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-[#6B7280] hover:text-[#6C63FF] hover:bg-[#6C63FF]/8 transition-all">
                <Github size={18} />
              </a>
              <a href="#" className="p-2 rounded-lg text-[#6B7280] hover:text-[#6C63FF] hover:bg-[#6C63FF]/8 transition-all">
                <Linkedin size={18} />
              </a>
            </div>
            <div className="mt-4 pt-4 border-t border-[#E5E7EB] w-full text-xs text-[#9CA3AF]">
              © 2026 Tanya Garg. Designed & built with curiosity.
            </div>
          </div>
        </div>
      </footer>

      {/* Float animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 0; }
      `}</style>
    </div>
  );
}
