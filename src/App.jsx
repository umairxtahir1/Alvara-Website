import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Home,
  Hotel,
  Building2,
  Building,
  Landmark,
  Palette,
  Users2,
  MapPin,
  Mail,
  Plus,
  Minus,
  X,
  Play,
  ArrowRight,
} from "lucide-react";

/* ================================================================== */
/*  ALVARA — Cinematic Property Films                                  */
/*  Blue / white architectural identity. Plain CSS is used for all     */
/*  color, spacing and responsive rules (Tailwind's arbitrary-value    */
/*  syntax isn't available in this renderer), so the design system is  */
/*  defined once below and referenced through classNames.              */
/*                                                                      */
/*  NOTE ON SEO (see section 34 of the brief): title, meta description,*/
/*  Open Graph tags and schema markup live in the document <head> of a */
/*  real deployment (index.html or a framework's head/meta API) and    */
/*  can't be set from inside this component — flagged here so it isn't */
/*  forgotten when this is wired into an actual site.                  */
/* ================================================================== */

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&family=Inter:wght@300;400;500;600&display=swap');

  :root{
    --cloud:#F7F9FC;
    --white:#FFFFFF;
    --navy:#102A43;
    --slate:#486581;
    --ice:#D9EAF7;
    --pale:#EDF5FC;
  }
  *{box-sizing:border-box;}
  @media (prefers-reduced-motion: reduce){
    *{animation:none !important; transition:none !important;}
  }

  .av-root{font-family:'Inter',sans-serif;background:var(--white);color:var(--navy);overflow-x:hidden;}
  .disp{font-family:'Space Grotesk',sans-serif;}

  .container{max-width:1280px;margin:0 auto;padding:0 24px;}
  @media(min-width:768px){.container{padding:0 48px;}}

  .section{padding:88px 0;}
  @media(min-width:768px){.section{padding:140px 0;}}

  /* backgrounds */
  .bg-cloud{background:var(--cloud);}
  .bg-white{background:var(--white);}
  .bg-navy{background:var(--navy);}
  .bg-pale{background:var(--pale);}
  .bg-ice{background:var(--ice);}

  /* text colours */
  .c-navy{color:var(--navy);}
  .c-white{color:var(--white);}
  .c-slate{color:var(--slate);}
  .c-navy-60{color:rgba(16,42,67,.62);}
  .c-navy-45{color:rgba(16,42,67,.48);}
  .c-white-70{color:rgba(255,255,255,.72);}
  .c-white-45{color:rgba(255,255,255,.45);}

  /* type scale */
  .eyebrow{font-family:'Inter',sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:.24em;color:var(--slate);margin-bottom:18px;display:block;}
  .h1{font-weight:400;line-height:1.08;font-size:38px;letter-spacing:-.01em;}
  .h2{font-weight:400;line-height:1.15;font-size:32px;letter-spacing:-.01em;}
  .h3{font-weight:400;line-height:1.25;font-size:21px;}
  .body-lg{font-weight:300;line-height:1.7;font-size:16px;}
  .body{font-weight:300;line-height:1.7;font-size:14.5px;}
  .caption{font-size:11px;letter-spacing:.18em;text-transform:uppercase;}
  @media(min-width:768px){
    .h1{font-size:64px;}
    .h2{font-size:44px;}
    .h3{font-size:23px;}
  }

  /* buttons */
  .btn{display:inline-flex;align-items:center;gap:8px;padding:14px 30px;font-size:13px;font-weight:500;border:1px solid transparent;background:none;cursor:pointer;transition:all .3s ease;text-decoration:none;font-family:'Inter',sans-serif;border-radius:2px;}
  .btn-navy{background:var(--navy);color:var(--white);}
  .btn-navy:hover{background:#0b1e30;}
  .btn-line-navy{border-color:rgba(16,42,67,.35);color:var(--navy);}
  .btn-line-navy:hover{border-color:var(--navy);background:rgba(16,42,67,.04);}
  .btn-line-white{border-color:rgba(255,255,255,.4);color:#fff;}
  .btn-line-white:hover{background:#fff;color:var(--navy);border-color:#fff;}

  .flex{display:flex;}
  .flex-col{flex-direction:column;}
  .items-center{align-items:center;}
  .justify-between{justify-content:space-between;}
  .justify-center{justify-content:center;}
  .flex-wrap{flex-wrap:wrap;}
  .text-center{text-align:center;}
  .rel{position:relative;}

  .grid{display:grid;gap:1px;}
  .grid-gap{display:grid;gap:24px;}
  .g2{grid-template-columns:1fr;}
  .g3{grid-template-columns:1fr;}
  .g4{grid-template-columns:repeat(2,1fr);}
  @media(min-width:640px){
    .g3{grid-template-columns:repeat(2,1fr);}
    .g4{grid-template-columns:repeat(2,1fr);}
  }
  @media(min-width:768px){.g2{grid-template-columns:1fr 1fr;}}
  @media(min-width:1024px){
    .g3{grid-template-columns:repeat(3,1fr);}
    .g4{grid-template-columns:repeat(4,1fr);}
  }

  /* nav */
  .nav{position:fixed;top:0;left:0;right:0;z-index:50;transition:all .4s ease;background:transparent;}
  .nav.scrolled{background:rgba(255,255,255,.95);backdrop-filter:blur(10px);border-bottom:1px solid rgba(16,42,67,.06);}
  .nav-link{position:relative;font-size:13px;letter-spacing:.02em;text-decoration:none;color:inherit;opacity:.75;transition:opacity .25s;padding-bottom:4px;}
  .nav-link:hover{opacity:1;}
  .nav-link.active{opacity:1;}
  .nav-link.active::after{content:"";position:absolute;left:0;right:0;bottom:-4px;height:1px;background:var(--slate);}
  .nav-logo{font-size:19px;letter-spacing:.02em;text-decoration:none;color:inherit;font-weight:500;}
  .nav-sub{font-size:10px;letter-spacing:.16em;text-transform:uppercase;opacity:.5;margin-left:10px;font-family:'Inter',sans-serif;}

  .edge{border:1px solid rgba(16,42,67,.1);}
  .edge-white{border:1px solid rgba(255,255,255,.15);}
  .card-hover{transition:box-shadow .35s, border-color .35s, background .35s, transform .35s;}
.card-hover:hover{
  border-color:rgba(72,101,129,.4);
  box-shadow:0 18px 45px rgba(16,42,67,.10);
  transform:translateY(-4px);
}
  .service-cell:hover{background:var(--pale);}

  .media-navy{background:linear-gradient(135deg,#16324f,#102A43,#0b1e30);}
  .media-slate{background:linear-gradient(135deg,#5b7fa0,#486581,#33526d);}
  .media-ice{background:linear-gradient(135deg,#e7f1fa,#D9EAF7,#c9e1f2);}

  @keyframes kenburns{
    0%{transform:scale(1) translate(0,0);}
    100%{transform:scale(1.06) translate(-1%,-1%);}
  }
  .media-inner{position:absolute;inset:-4%;animation:kenburns 18s ease-in-out infinite alternate;}
  .media-panel{position:relative;overflow:hidden;transition:transform .5s ease;}
  .media-panel:hover .media-inner{animation-play-state:paused;}
.pf-card:hover .media-panel{
  transform:scale(1.025);
}
  .play-circle{width:54px;height:54px;border-radius:999px;border:1px solid rgba(255,255,255,.35);display:flex;align-items:center;justify-content:center;}
  .play-circle.dark{border-color:rgba(16,42,67,.3);}

  .placeholder-tag{position:absolute;top:16px;left:16px;background:rgba(16,42,67,.62);color:#fff;font-size:9px;letter-spacing:.14em;text-transform:uppercase;padding:5px 10px;border-radius:2px;}

  .divider{height:1px;background:rgba(16,42,67,.1);}
  .divider-white{height:1px;background:rgba(255,255,255,.15);}
  .dot{width:7px;height:7px;border-radius:999px;background:var(--slate);}
  .icon-navy{color:var(--navy);}
  .icon-slate{color:var(--slate);}

  input.field, textarea.field{width:100%;background:transparent;border:none;border-bottom:1px solid rgba(16,42,67,.18);color:var(--navy);font-family:'Inter',sans-serif;font-weight:300;font-size:14px;padding-bottom:10px;outline:none;transition:border-color .3s;}
  input.field:focus, textarea.field:focus{border-color:var(--slate);}
  label.field-label{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.16em;color:rgba(16,42,67,.5);margin-bottom:8px;}

  .mobile-menu a{font-size:15px;text-decoration:none;color:var(--navy);}
`;

/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

function Reveal({ children, className = "", delay = 0, style }) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/* Signature motif: a restrained architectural plan line, in slate blue,
   standing in for "architecture in motion" without leaning on gold or
   ornament. Used sparingly across dividers and placeholder media. */
function PlanLines({ opacity = 0.5, stroke = "#486581" }) {
  return (
    <svg viewBox="0 0 600 400" style={{ width: "100%", height: "100%", opacity }} fill="none">
      <rect x="50" y="70" width="500" height="260" stroke={stroke} strokeWidth="0.6" />
      <line x1="50" y1="200" x2="550" y2="200" stroke={stroke} strokeWidth="0.4" />
      <line x1="260" y1="70" x2="260" y2="330" stroke={stroke} strokeWidth="0.4" />
      <line x1="260" y1="200" x2="550" y2="120" stroke={stroke} strokeWidth="0.3" />
      <circle cx="260" cy="200" r="2.5" fill={stroke} />
      <path d="M50 330 L130 330 L130 290" stroke={stroke} strokeWidth="0.4" />
      <path d="M470 70 L470 110 L550 110" stroke={stroke} strokeWidth="0.4" />
    </svg>
  );
}

function MediaPanel({
  tone = "navy",
  style,
  className = "",
  video,
  preview = false,
}) {
  const videoRef = useRef(null);

  const toneClass =
    tone === "navy"
      ? "media-navy"
      : tone === "slate"
      ? "media-slate"
      : "media-ice";

  const handleMouseEnter = () => {
    if (preview && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch((error) => {
        console.log("Hover video could not play:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    if (preview && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={`media-panel ${className}`}
      style={{
        ...style,
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {video ? (
        <video
          ref={videoRef}
          src={video}
          muted
          playsInline
          preload="auto"
          controls={!preview}
          autoPlay={!preview}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <div
          className={`media-inner ${toneClass}`}
          style={{
            position: "absolute",
            inset: 0,
          }}
        />
      )}
    </div>
  );
}


/* ------------------------------------------------------------------ */
/*  Nav                                                                 */
/* ------------------------------------------------------------------ */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const links = [
    { label: "Work", href: "#work", id: "work" },
    { label: "Services", href: "#services", id: "services" },
    { label: "About", href: "#about", id: "about" },
    { label: "Process", href: "#process", id: "process" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const textColor = scrolled ? "var(--navy)" : "#fff";

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="container flex items-center justify-between" style={{ padding: "20px 24px" }}>
        <a href="#top" className="nav-logo disp flex items-center" style={{ color: textColor }}>
          ALVARA
          <span className="nav-sub" style={{ color: textColor }}>Cinematic Property Films</span>
        </a>

        <nav className="flex items-center" style={{ gap: 36, display: "none" }} id="desktop-nav">
          {links.map((l) => (
            <a key={l.label} href={l.href} className={`nav-link${activeSection === l.id ? " active" : ""}`} style={{ color: textColor }}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className={`btn ${scrolled ? "btn-navy" : "btn-line-white"}`} style={{ padding: "10px 22px" }}>
            Start a Project
          </a>
        </nav>

        <button onClick={() => setOpen(!open)} className="caption" style={{ background: "none", border: "none", color: textColor, cursor: "pointer" }} aria-label="Toggle menu">
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <style>{`@media(min-width:768px){#desktop-nav{display:flex !important;} header button{display:none;}}`}</style>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-white mobile-menu" style={{ overflow: "hidden" }}>
            <div className="flex flex-col container" style={{ gap: 20, paddingBottom: 32, paddingTop: 8 }}>
              {links.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} id="top" className="bg-navy rel" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <motion.div style={{ position: "absolute", inset: 0, scale }} aria-hidden="true">
        <video
          src="/villa-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(8,25,37,.55) 0%, rgba(8,25,37,.25) 35%, rgba(8,25,37,.55) 100%)",
          }}
        />
      </motion.div>

      <motion.div className="container rel text-center" style={{ maxWidth: 900, zIndex: 2, opacity, paddingTop: 90, paddingBottom: 90 }}>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="caption c-white-45">
          Cinematic Property Films
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12 }}
          className="disp c-white"
          style={{ marginTop: 24, fontSize: "clamp(52px, 8vw, 104px)", fontWeight: 400, lineHeight: 0.98, letterSpacing: "-0.045em" }}
        >
          Make them feel
          <br />
          the space.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.28 }} className="body-lg c-white-70" style={{ maxWidth: 590, margin: "28px auto 0" }}>
          Cinematic property films that turn architecture, atmosphere and movement into an experience people can feel before they arrive.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.42 }} className="flex flex-wrap items-center justify-center" style={{ gap: 14, marginTop: 38 }}>
          <a href="#work" className="btn btn-line-white">View Our Work</a>
          <a href="#contact" className="btn btn-navy" style={{ background: "#fff", color: "var(--navy)" }}>Start a Project</a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }} style={{ marginTop: 90, color: "rgba(255,255,255,.38)", fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase" }}>
          Architecture · Atmosphere · Movement
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Introduction                                                       */
/* ------------------------------------------------------------------ */

function Introduction() {
  return (
    <section className="section bg-white">
      <div className="container" style={{ maxWidth: 780 }}>
        <Reveal>
          <span className="eyebrow">Introduction</span>
          <h2 className="disp h2 c-navy">
            More than a walkthrough.<br />A way to experience the space.
          </h2>
          <p className="body-lg c-navy-60" style={{ marginTop: 28, maxWidth: 560 }}>
            ALVARA creates cinematic property films that transform static imagery into immersive
            visual stories. We focus on the way a space feels, moves and unfolds, rather than
            simply documenting what is there.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Visual Statement                                                    */
/* ------------------------------------------------------------------ */

function VisualStatement() {
 
}

/* ------------------------------------------------------------------ */
/*  Services                                                            */
/* ------------------------------------------------------------------ */

const services = [
  { title: "Cinematic Property Walkthroughs", desc: "Immersive walkthrough films designed around the natural flow of a property." },
  { title: "Villa & Hospitality Films", desc: "Cinematic films for villas, boutique hotels, resorts and vacation rentals." },
  { title: "Architectural Films", desc: "Visual storytelling focused on architecture, materials, proportions and spatial design." },
  { title: "Interior Films", desc: "Cinematic presentation of interiors, furniture, lighting, textures and spatial relationships." },
  { title: "Property Social Content", desc: "Short-form cinematic videos designed for Instagram, TikTok, websites and digital campaigns." },
  { title: "Property Launch Films", desc: "Hero films and visual campaigns for new developments, hospitality launches and property releases." },
];

function Services() {
  return (
    <section id="services" className="section bg-white">
      <div className="container">
        <Reveal style={{ maxWidth: 520, marginBottom: 64 }}>
          <span className="eyebrow">What We Create</span>
          <h2 className="disp h2 c-navy">Film work built around how a space actually feels.</h2>
        </Reveal>
        <div className="grid g3" style={{ background: "rgba(16,42,67,.08)" }}>
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.06} className="service-cell" style={{ padding: 40 }}>
              <span className="caption c-slate">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="disp h3 c-navy" style={{ marginTop: 16 }}>{s.title}</h3>
              <p className="body c-navy-60" style={{ marginTop: 12 }}>{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Who We Work With                                                    */
/* ------------------------------------------------------------------ */

const clients = [
  { icon: Home, title: "Luxury Villas" },
  { icon: Hotel, title: "Boutique Hotels" },
  { icon: MapPin, title: "Vacation Rentals" },
  { icon: Building2, title: "Luxury Apartments & Penthouses" },
  { icon: Landmark, title: "Architects" },
  { icon: Palette, title: "Interior Designers" },
  { icon: Building, title: "Property Developers" },
  { icon: Users2, title: "Hospitality Brands" },
  { icon: Landmark, title: "Luxury Real Estate Agencies" },
];

function WhoWeWorkWith() {
  return (
    <section className="section bg-cloud">
      <div className="container">
        <Reveal style={{ maxWidth: 520, marginBottom: 64 }}>
          <span className="eyebrow">Who We Work With</span>
          <h2 className="disp h2 c-navy">Built for spaces worth experiencing.</h2>
          <p className="body-lg c-navy-60" style={{ marginTop: 18 }}>
            We work with people and brands whose properties deserve more than static presentation.
          </p>
        </Reveal>
        <div className="grid-gap g4" style={{ display: "grid" }}>
          {clients.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 0.05} className="edge card-hover bg-white" style={{ padding: 28 }}>
              <c.icon size={19} strokeWidth={1.3} className="icon-slate" />
              <h3 className="disp" style={{ fontSize: 16, fontWeight: 400, marginTop: 18 }}>{c.title}</h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Portfolio                                                           */
/* ------------------------------------------------------------------ */

const portfolioItems = [
 {
    title: "Villa Levante",
    location: "Bali, Indonesia",
    type: "Cinematic Villa Film",
    video: "/villa.mp4",
    approach:
      "A cinematic walkthrough following the villa's natural flow, revealing the architecture, atmosphere and relationship between each space.",
    deliverables: "Primary hero film, website film and social edit.",
  },
  {
    title: "Kuta Utara Residence",
    location: "Kuta Utara, Bali, Indonesia",
    type: "Residential Property Film",
    video: "/apartment.mp4",
    approach:
      "A cinematic residential film focused on the apartment's layout, natural light and the experience of moving through the space.",
    deliverables: "Property walkthrough film and social ready edit.",
  },
];

function Portfolio() {
  const [active, setActive] = useState(null);

  return (
    <section id="work" className="section bg-white">
      <div className="container">

        <Reveal style={{ maxWidth: 560, marginBottom: 64 }}>
          <span className="eyebrow">Selected Work</span>

          <h2 className="disp h2 c-navy">
            A selection of spaces, captured in motion.
          </h2>

          <p className="body-lg c-navy-60" style={{ marginTop: 18 }}>
            Selected work from our current property film portfolio.
          </p>
        </Reveal>

        <div
        className="portfolio-grid"
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 32,
    maxWidth: 1000,
    margin: "0 auto",
  }}
>

          {portfolioItems.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 0.08}
              className="pf-card"
            >
              <button
                onClick={() => setActive(item)}
                className="edge card-hover bg-white"
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: 0,
                  border: "1px solid rgba(16,42,67,.1)",
                  background: "#fff",
                  cursor: "pointer",
                  display: "block",
                  borderRadius: 4,
  overflow: "hidden",
                }}
              >

                <MediaPanel
                  tone={item.tone}
                  video={item.video}
                  preview={true}
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    background: "#102A43",
                  }}
                />

                <div style={{ padding: "28px 30px 30px" }}>

                  <h3
                    className="disp"
                    style={{
                      fontSize: 20,
                      fontWeight: 400,
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="caption c-slate"
                    style={{ marginTop: 8 }}
                  >
                    {item.location}
                  </p>

                  <p
                    className="body c-navy-60"
                    style={{ marginTop: 6 }}
                  >
                    {item.type}
                  </p>

                  <span
                    className="caption c-navy flex items-center"
                    style={{
                      gap: 8,
                      marginTop: 22,
                      fontWeight: 500,
                    }}
                  >
                    View Project
                    <ArrowRight size={13} />
                  </span>

                </div>

              </button>
            </Reveal>
          ))}

        </div>
      </div>

      <AnimatePresence>

        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              background: "rgba(11,30,48,.92)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
            }}
          >

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white"
              style={{
                maxHeight: "90vh",
                width: "100%",
                maxWidth: 900,
                overflowY: "auto",
              }}
            >

              <MediaPanel
  tone={active.tone}
  video={active.video}
  preview={false}
  style={{ height: 460, width: "100%" }}
/>
              

              <div style={{ padding: "28px 30px 30px" }}>

                <div className="flex items-center justify-between">

                  <div>
                    <h3
                      className="disp"
                      style={{
                        fontSize: 22,
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {active.title}
                    </h3>

                    <p
                      className="caption c-slate"
                      style={{marginTop: 10, opacity: 0.8  }}
                    >
                      {active.location} · {active.type}
                    </p>
                  </div>

                  <button
                    onClick={() => setActive(null)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "rgba(16,42,67,.5)",
                    }}
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>

                </div>

                <div
                  className="grid-gap g2"
                  style={{
                    display: "grid",
                    marginTop: 30,
                  }}
                >

                  <div>
                    <span className="caption c-slate">
                      Creative Approach
                    </span>

                    <p
                      className="body c-navy-60"
                      style={{ marginTop: 8 }}
                    >
                      {active.approach}
                    </p>
                  </div>

                  <div>
                    <span className="caption c-slate">
                      Deliverables
                    </span>

                    <p
                      className="body c-navy-60"
                      style={{ marginTop: 8 }}
                    >
                      {active.deliverables}
                    </p>
                  </div>

                </div>

              </div>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>
    </section>
  );
}
/* ------------------------------------------------------------------ */
/*  Case Study                                                          */
/* ------------------------------------------------------------------ */

function CaseStudy() {
  return (
    <section className="section bg-pale">
      <div className="container">
        <div
          className="case-study-layout"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.15fr",
            gap: 70,
            alignItems: "center",
          }}
        >
          <Reveal>
            <span className="eyebrow">Designed Around Experience</span>

            <h2
              className="disp h2 c-navy"
              style={{
                marginTop: 10,
                maxWidth: 520,
              }}
            >
              Designed around the way people experience a space.
            </h2>

            <p
              className="body-lg c-navy-60"
              style={{
                marginTop: 22,
                maxWidth: 500,
              }}
            >
              A good property film should not simply move from room to room.
              It should create a sense of arrival. It should reveal the property
              naturally, show the relationships between spaces, and communicate
              atmosphere rather than simply document what is there.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 12,
                marginTop: 32,
                maxWidth: 440,
              }}
            >
              {[
                "Natural movement",
                "Spatial continuity",
                "Architectural accuracy",
                "Atmosphere first",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    borderTop: "1px solid rgba(16,42,67,.15)",
                    paddingTop: 12,
                    fontSize: 12,
                    color: "rgba(16,42,67,.7)",
                    letterSpacing: ".02em",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              className="media-panel"
              style={{
                width: "100%",
                aspectRatio: "16 / 10",
                background: "#102A43",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <video
                src="/villa2.mp4"
                muted
                playsInline
                autoPlay
                loop
                preload="auto"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "75% center",
                  display: "block",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(11,30,48,.05) 35%, rgba(11,30,48,.45) 100%)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  left: 19,
                  bottom: 22,
                  color: "#fff",
                  pointerEvents: "none",
                }}
              >
                <span
                  className="caption"
                  style={{
                    fontSize: 9,
                    letterSpacing: ".2em",
                    color: "rgba(255,255,255,.72)",
                  }}
                >
                  The experience comes first
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media(max-width:767px){
          .case-study-layout{
            grid-template-columns:1fr !important;
            gap:40px !important;
          }
        }
      `}</style>
    </section>
  );
}
const approachPoints = ["Natural camera movement", "Spatial continuity", "Architectural accuracy", "Realistic perspective", "Atmosphere", "Light", "Composition", "Storytelling"];

function Approach() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div
          className="approach-layout"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "0.85fr 1.15fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          <Reveal>
            <span className="eyebrow">Our Approach</span>

            <h2 className="disp h2 c-navy" style={{ marginTop: 10 }}>
              Every space has a rhythm.
            </h2>

            <p
              className="body-lg c-navy-60"
              style={{
                marginTop: 22,
                maxWidth: 460,
              }}
            >
              We don't treat a property as a collection of separate rooms.
              We build each film around the way the space naturally unfolds
              from arrival to atmosphere, from architecture to detail.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                borderTop: "1px solid rgba(16,42,67,.12)",
                borderLeft: "1px solid rgba(16,42,67,.12)",
              }}
            >
              {approachPoints.map((p, i) => (
                <div
                  key={p}
                  style={{
                    minHeight: 105,
                    padding: "24px 22px",
                    borderRight: "1px solid rgba(16,42,67,.12)",
                    borderBottom: "1px solid rgba(16,42,67,.12)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    className="caption c-slate"
                    style={{ fontSize: 9 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className="disp c-navy"
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      marginTop: 18,
                    }}
                  >
                    {p}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media(max-width:767px){
          .approach-layout{
            grid-template-columns:1fr !important;
            gap:40px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Camera Philosophy                                                   */
/* ------------------------------------------------------------------ */

const cameraPrinciples = ["Slow", "Smooth", "Stable", "Natural", "Architecturally accurate", "Cinematic"];

function CameraPhilosophy() {
  return (
    <section className="section bg-navy">
      <div className="container">
        <div
          className="camera-philosophy-layout"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 90,
            alignItems: "center",
          }}
        >
          <Reveal>
            <span
              className="eyebrow"
              style={{ color: "rgba(217,234,247,.7)" }}
            >
              Camera Philosophy
            </span>

            <h2 className="disp h2 c-white">
              Movement should feel natural.
            </h2>

            <p
              className="body-lg c-white-70"
              style={{
                marginTop: 22,
                maxWidth: 520,
              }}
            >
              Our walkthroughs are designed around smooth, stabilized camera
              movement that follows the natural logic of a space. The camera
              should feel like a person moving through the property, not a
              virtual camera jumping between rooms.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,.18)",
                borderBottom: "1px solid rgba(255,255,255,.18)",
              }}
            >
              {cameraPrinciples.map((p, i) => (
                <div
                  key={p}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 0",
                    borderBottom:
                      i === cameraPrinciples.length - 1
                        ? "none"
                        : "1px solid rgba(255,255,255,.1)",
                  }}
                >
                  <span
                    className="caption"
                    style={{
                      color: "rgba(255,255,255,.42)",
                      fontSize: 9,
                      letterSpacing: ".18em",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className="disp"
                    style={{
                      color: "rgba(255,255,255,.9)",
                      fontSize: 17,
                      fontWeight: 400,
                    }}
                  >
                    {p}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media(max-width:767px){
          .camera-philosophy-layout{
            grid-template-columns:1fr !important;
            gap:50px !important;
          }
        }
      `}</style>
    </section>
  );
}
/* ------------------------------------------------------------------ */
/*  Process                                                             */
/* ------------------------------------------------------------------ */

const processSteps = [
  { n: "01", title: "Discovery", desc: "We understand the property, its character, audience and marketing goals." },
  { n: "02", title: "Creative Planning", desc: "We map the visual journey and decide how the property should unfold." },
  { n: "03", title: "Production", desc: "We create the cinematic footage and visual sequences." },
  { n: "04", title: "Delivery", desc: "Final videos are delivered in formats suited for websites, listings, social media and marketing campaigns." },
];

function Process() {
  return (
    <section id="process" className="section bg-cloud">
      <div className="container">
        <Reveal style={{ maxWidth: 600, marginBottom: 72 }}>
          <span className="eyebrow">Process</span>

          <h2 className="disp h2 c-navy">
            From still images to cinematic stories.
          </h2>

          <p
            className="body-lg c-navy-60"
            style={{
              marginTop: 18,
              maxWidth: 520,
            }}
          >
            Every project begins with understanding the space and ends with a
            film built for where your audience will experience it.
          </p>
        </Reveal>

        <div
          className="process-grid"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "rgba(16,42,67,.1)",
          }}
        >
          {processSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div
                style={{
                  minHeight: 300,
                  padding: "30px 28px",
                  background: "var(--cloud)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="disp c-slate"
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                    }}
                  >
                    {s.n}
                  </span>

                  <ArrowRight
                    size={15}
                    strokeWidth={1.2}
                    className="icon-slate"
                    style={{
                      transform: i === processSteps.length - 1
                        ? "rotate(90deg)"
                        : "none",
                      opacity: 0.55,
                    }}
                  />
                </div>

                <div style={{ marginTop: "auto" }}>
                  <h3
                    className="disp h3 c-navy"
                    style={{
                      marginBottom: 12,
                    }}
                  >
                    {s.title}
                  </h3>

                  <p className="body c-navy-60">
                    {s.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .process-grid{
            grid-template-columns:repeat(2, 1fr) !important;
          }
        }

        @media(max-width:600px){
          .process-grid{
            grid-template-columns:1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  What We Care About                                                  */
/* ------------------------------------------------------------------ */

const careAbout = [
  { title: "Architecture", desc: "The structure of the property should remain the hero." },
  { title: "Continuity", desc: "Movement should feel connected from one space to the next." },
  { title: "Atmosphere", desc: "Light, texture, scale and environment matter." },
  { title: "Story", desc: "A property should unfold naturally rather than simply be shown." },
  { title: "Precision", desc: "Small details matter." },
  { title: "Clarity", desc: "The visuals should communicate without unnecessary effects." },
];

function WhatWeCareAbout() {
  return (
    <section className="section bg-white">
      <div className="container">
        <Reveal style={{ maxWidth: 600, marginBottom: 64 }}>
          <span className="eyebrow">What We Care About</span>

          <h2 className="disp h2 c-navy">
            What we care about.
          </h2>

          <p
            className="body-lg c-navy-60"
            style={{
              marginTop: 18,
              maxWidth: 520,
            }}
          >
            The details that make a property feel like a place rather than
            simply a collection of images.
          </p>
        </Reveal>

        <div
          className="care-grid"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: "rgba(16,42,67,.1)",
          }}
        >
          {careAbout.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <div
                style={{
                  minHeight: 210,
                  padding: "30px 28px",
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <span
                  className="caption c-slate"
                  style={{
                    fontSize: 9,
                    letterSpacing: ".18em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3
                    className="disp c-navy"
                    style={{
                      fontSize: 21,
                      fontWeight: 400,
                    }}
                  >
                    {c.title}
                  </h3>

                  <p
                    className="body c-navy-60"
                    style={{
                      marginTop: 8,
                      maxWidth: 280,
                    }}
                  >
                    {c.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .care-grid{
            grid-template-columns:repeat(2, 1fr) !important;
          }
        }

        @media(max-width:600px){
          .care-grid{
            grid-template-columns:1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  About                                                               */
/* ------------------------------------------------------------------ */

function About() {
  return (
    <section id="about" className="section bg-pale">
      <div className="container">
        <div
          className="about-layout"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "0.75fr 1.25fr",
            gap: 90,
            alignItems: "center",
          }}
        >
          <Reveal>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <img
                src="/logo.png"
                alt="ALVARA"
                style={{
                  width: "min(280px, 70%)",
                  height: "auto",
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h2
              className="disp h2 c-navy"
              style={{
                maxWidth: 720,
              }}
            >
              We create films for spaces that deserve to be experienced.
            </h2>

            <p
              className="body-lg c-navy-60"
              style={{
                marginTop: 24,
                maxWidth: 620,
              }}
            >
              ALVARA is a creative studio focused on cinematic property
              storytelling. We work at the intersection of architecture,
              visual storytelling and modern production to create films that
              make spaces feel tangible.
            </p>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media(max-width:767px){
          .about-layout{
            grid-template-columns:1fr !important;
            gap:40px !important;
          }

          .about-layout img{
            width:180px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Early Work (replaces fabricated testimonials)                       */
/* ------------------------------------------------------------------ */

function EarlyWork() {
  return (
    <section className="section bg-white">
      <div className="container">
        <div
          className="early-work-layout"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "0.8fr 1.2fr",
            gap: 90,
            alignItems: "center",
          }}
        >
          <Reveal>
            <span className="eyebrow">Early Work</span>

            <h2 className="disp h2 c-navy">
              Building a body of work, one property at a time.
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p
              className="body-lg c-navy-60"
              style={{
                maxWidth: 620,
              }}
            >
              ALVARA is building its portfolio with a focus on quality,
              consistency and long-term creative relationships. The projects
              featured above represent the current body of work and the
              standard we aim to bring to every space we film.
            </p>

            <div
              style={{
                marginTop: 30,
                paddingTop: 20,
                borderTop: "1px solid rgba(16,42,67,.12)",
              }}
            >
              <span
                className="caption c-slate"
                style={{
                  fontSize: 9,
                  letterSpacing: ".2em",
                }}
              >
                Built with intention
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media(max-width:767px){
          .early-work-layout{
            grid-template-columns:1fr !important;
            gap:35px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                 */
/* ------------------------------------------------------------------ */

const faqs = [
  { q: "How does the process work?", a: "Every project moves through discovery, creative planning, production and delivery. We'll walk you through what each stage needs from you at the start of the project." },
  { q: "What do you need from us?", a: "Access to the property, a sense of your goals and audience, and any brand or listing context that helps us plan the film." },
  { q: "How long does a project take?", a: "Timelines depend on the scope of the property and the number of deliverables. This is confirmed during discovery for each project." },
  { q: "What formats do you deliver?", a: "Formats are matched to where the film will live, typically a mix of landscape and vertical edits for web, listings and social." },
  { q: "Can videos be made for social media?", a: "Yes, short-form vertical edits can be cut alongside the primary film." },
  { q: "Can you work with existing property photography?", a: "Yes, existing photography can inform the shot list and creative plan alongside new filming." },
  { q: "Can revisions be requested?", a: "Yes, a revision round is included so the final film matches your expectations." },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section bg-cloud">
      <div className="container">
        <div
          className="faq-layout"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "0.75fr 1.25fr",
            gap: 90,
            alignItems: "start",
          }}
        >
          <Reveal>
            <span className="eyebrow">FAQ</span>

            <h2 className="disp h2 c-navy">
              Questions, answered.
            </h2>

            <p
              className="body-lg c-navy-60"
              style={{
                marginTop: 18,
                maxWidth: 380,
              }}
            >
              A few things clients usually want to know before starting a
              project with ALVARA.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              style={{
                borderTop: "1px solid rgba(16,42,67,.14)",
                borderBottom: "1px solid rgba(16,42,67,.14)",
              }}
            >
              {faqs.map((f, i) => (
                <div
                  key={f.q}
                  style={{
                    borderBottom:
                      i === faqs.length - 1
                        ? "none"
                        : "1px solid rgba(16,42,67,.1)",
                  }}
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === i ? null : i)
                    }
                    className="flex items-center justify-between"
                    style={{
                      width: "100%",
                      padding: "24px 0",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      gap: 20,
                    }}
                    aria-expanded={openIndex === i}
                  >
                    <span
                      className="disp"
                      style={{
                        fontSize: 17,
                        fontWeight: 400,
                        color: "var(--navy)",
                      }}
                    >
                      {f.q}
                    </span>

                    <span
                      style={{
                        width: 28,
                        height: 28,
                        border: "1px solid rgba(16,42,67,.18)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {openIndex === i ? (
                        <Minus size={13} className="icon-slate" />
                      ) : (
                        <Plus size={13} className="icon-slate" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          className="body c-navy-60"
                          style={{
                            paddingBottom: 24,
                            maxWidth: 620,
                          }}
                        >
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media(max-width:767px){
          .faq-layout{
            grid-template-columns:1fr !important;
            gap:45px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Final CTA                                                           */
/* ------------------------------------------------------------------ */

function FinalCTA() {
  return (
    <section className="bg-ice" style={{ padding: "120px 0" }}>
      <div className="container text-center" style={{ maxWidth: 640, margin: "0 auto" }}>
        <Reveal>
          <h2 className="disp h2 c-navy">Have a space worth experiencing?</h2>
          <p className="body-lg c-navy-60" style={{ marginTop: 16 }}>Let's turn it into a story.</p>
          <div className="flex flex-wrap items-center justify-center" style={{ gap: 14, marginTop: 34 }}>
            <a href="#contact" className="btn btn-navy">Start a Project</a>
            <a href="#work" className="btn btn-line-navy">View Our Work</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                             */
/* ------------------------------------------------------------------ */

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", property: "", propertyType: "", url: "", message: "" });

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const fields = [
    { key: "name", label: "Name", type: "text" },
    { key: "company", label: "Company", type: "text" },
    { key: "email", label: "Email", type: "email" },
    { key: "property", label: "Property", type: "text" },
    { key: "propertyType", label: "Property Type", type: "text" },
    { key: "url", label: "Website / Listing URL", type: "text" },
  ];

  return (
    <section id="contact" className="section bg-navy">
      <div className="container grid-gap g2" style={{ display: "grid" }}>
        <Reveal>
          <span className="eyebrow" style={{ color: "rgba(217,234,247,.7)" }}>Contact</span>
          <h2 className="disp c-white" style={{ fontSize: 38, fontWeight: 400, lineHeight: 1.2 }}>Start a project.</h2>
          <p className="body-lg c-white-70" style={{ maxWidth: 380, marginTop: 20 }}>
            Tell us about your property and we'll follow up to talk it through.
          </p>
          <div className="flex items-center" style={{ gap: 10, marginTop: 32, color: "rgba(255,255,255,.55)" }}>
            <Mail size={16} strokeWidth={1.5} />
            <span style={{ fontSize: 13 }}>hello@alvara.studio</span>
          </div>
          <a href="#contact" className="body" style={{ display: "inline-block", marginTop: 16, color: "#D9EAF7", textDecoration: "underline" }}>
            or book a discovery call
          </a>
        </Reveal>

        <Reveal delay={0.15}>
          {sent ? (
            <div className="edge-white flex flex-col items-center justify-center text-center" style={{ minHeight: 320, padding: 24 }}>
              <p className="disp c-white" style={{ fontSize: 22, fontWeight: 400 }}>Thank you.</p>
              <p className="body c-white-70" style={{ marginTop: 10, maxWidth: 260 }}>We've received your message and will follow up shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: 24 }}>
              <div className="grid-gap g3" style={{ display: "grid" }}>
                {fields.map((f) => (
                  <div key={f.key}>
                    <label className="field-label" style={{ color: "rgba(255,255,255,.5)" }}>{f.label}</label>
                    <input
                      required={f.key === "name" || f.key === "email"}
                      type={f.type}
                      value={form[f.key]}
                      onChange={handleChange(f.key)}
                      className="field"
                      style={{ color: "#fff", borderBottomColor: "rgba(255,255,255,.25)" }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="field-label" style={{ color: "rgba(255,255,255,.5)" }}>Message</label>
                <textarea rows={3} value={form.message} onChange={handleChange("message")} className="field" style={{ resize: "none", color: "#fff", borderBottomColor: "rgba(255,255,255,.25)" }} />
              </div>
              <button type="submit" className="btn btn-navy" style={{ alignSelf: "flex-start", background: "#fff", color: "var(--navy)" }}>
                Start a Project
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="bg-navy" style={{ padding: "56px 0" }}>
      <div className="container">
        <div className="flex flex-wrap items-center justify-between" style={{ gap: 32 }}>
          <div>
            <p className="disp c-white" style={{ fontSize: 18 }}>ALVARA</p>
            <p className="caption c-white-45" style={{ marginTop: 6 }}>Cinematic Property Films</p>
          </div>
          <nav className="flex flex-wrap" style={{ gap: 22 }}>
            {["Work", "Services", "About", "Process", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="caption c-white-45" style={{ textDecoration: "none" }}>{l}</a>
            ))}
          </nav>
          <div className="flex items-center" style={{ gap: 20, color: "rgba(255,255,255,.45)" }}>
            <span style={{ fontSize: "14px", fontWeight: 600 }}>IG</span>
            <span style={{ fontSize: "14px", fontWeight: 600 }}>in</span>
            <Play size={16} strokeWidth={1.5} />
            <Mail size={16} strokeWidth={1.5} />
          </div>
        </div>
        <div className="divider-white" style={{ margin: "36px 0 24px" }} />
        <div className="flex flex-wrap items-center justify-between" style={{ gap: 16 }}>
          <p className="body c-white-45" style={{ fontSize: 12.5 }}>Cinematic property films for spaces worth experiencing.</p>
          <div className="flex caption c-white-45" style={{ gap: 20 }}>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
  return (
    <div className="av-root">
      <style>{css}</style>
      <Nav />
      <Hero />
      <Portfolio />
      <Introduction />
      <Services />
      <WhoWeWorkWith />
      <CaseStudy />
      <Approach />
      <CameraPhilosophy />
      <About />
      <Process />
      <WhatWeCareAbout />
      <EarlyWork />
      <FAQ />
      <FinalCTA />
      <Contact />
      <Footer />
    </div>
  );
}
