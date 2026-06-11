import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { articles, company, oldClientLogos, services, siteFaqs } from "./data";
import "./styles.css";

function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function App() {
  const [route, setRoute] = useState(window.location.hash || "#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const service = useMemo(() => services.find((item) => route === `#service/${item.slug}`), [route]);

  useEffect(() => {
    const onHash = () => {
      setRoute(window.location.hash || "#home");
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const title = service ? `${service.title} | DCV` : pageTitle(route);
    const description = service
      ? service.summary
      : "شركة DCV للحلول الرقمية في الأردن: تصميم مواقع، تطبيقات ويب، أنظمة مخصصة، متاجر إلكترونية، استضافة بريد، وتحسين SEO.";
    document.title = title;
    setMeta("description", description);
    setMeta("keywords", service ? service.keywords.join(", ") : "DCV, تصميم مواقع الأردن, SEO Jordan");
  }, [route, service]);

  return (
    <>
      <div className="video-fallback" aria-hidden="true" />
      <video className="site-video" autoPlay muted loop playsInline aria-hidden="true">
        <source src="/assets/site-background.mp4" type="video/mp4" />
      </video>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {service ? <ServicePage service={service} /> : <Page route={route} />}
      <Footer />
      <a className="whatsapp-float" href="https://wa.me/962796370060" target="_blank" rel="noopener" aria-label="تواصل عبر واتساب"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a8.7 8.7 0 0 0-7.4 13.2L3.7 21l4.9-1.1A8.7 8.7 0 1 0 12 3Zm4.6 12.6c-.2.6-1.3 1.1-1.8 1.2-.5.1-1.1.1-1.7-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1.1-1.5-1.1-2.8 0-1.4.7-2 .9-2.3.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.5.7 1.7.8 1.9.1.2.1.4 0 .6-.1.2-.2.3-.4.5-.2.2-.3.4-.5.5-.2.2-.3.4-.1.7.2.4.8 1.3 1.7 2.1 1.2 1.1 2.1 1.4 2.5 1.6.3.1.5.1.7-.1.2-.3.8-.9 1-1.2.2-.3.4-.2.7-.1.3.1 1.8.9 2.1 1 .3.2.5.2.6.4.1.1.1.7-.1 1.3Z" /></svg></a>
      <div className="mobile-bottom-nav" aria-label="روابط سريعة للجوال"><a href="#home"><span>⌂</span>الرئيسية</a><a href="#about"><span>i</span>من نحن</a><a href="#services"><span>▦</span>خدماتنا</a><a href="#contact"><span>☎</span>اتصل بنا</a></div>
    </>
  );
}

function pageTitle(route) {
  const titles = {
    "#about": "من نحن | DCV",
    "#services": "الخدمات | DCV",
    "#clients": "عملاؤنا | DCV",
    "#faq": "الأسئلة المكررة | DCV",
    "#articles": "مقالات | DCV",
    "#contact": "اتصل بنا | DCV",
  };
  return titles[route] || "DCV | Digital Creative Vision for Information Technology";
}

function Header({ menuOpen, setMenuOpen }) {
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="DCV home">
        <img src="/assets/dcv-logo-full.png" alt="Digital Creative Vision for Information Technology" />
      </a>
      <nav className={menuOpen ? "open" : ""}>
        <a href="#home">الرئيسية</a>
        <a href="#about">من نحن</a>
        <div className="nav-dropdown">
          <a href="#services">خدماتنا</a>
          <div className="dropdown-menu">
            {services.map((service) => <a key={service.slug} href={`#service/${service.slug}`}>{service.title}</a>)}
          </div>
        </div>
        <a href="#clients">عملاؤنا</a>
        <a href="#faq">الأسئلة المكررة</a>
        <a href="#articles">المقالات</a>
        <a href="#contact">اتصل بنا</a>
      </nav>
      <a className="header-cta" href="/assets/profile-Digital-Creative-Vision.pdf" target="_blank" rel="noopener">بروفايل الشركة</a>
      <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="فتح القائمة">
        {menuOpen ? "×" : "☰"}
      </button>
    </header>
  );
}

function Page({ route }) {
  if (route === "#about") return <AboutPage />;
  if (route === "#services") return <ServicesPage />;
  if (route === "#clients") return <ClientsPage />;
  if (route === "#faq") return <FaqPage />;
  if (route === "#articles") return <ArticlesPage />;
  if (route === "#contact") return <ContactPage />;
  return <HomePage />;
}

function HomePage() {
  return (
    <main className="page">
      <section id="home" className="hero section-band">
        <div>
          <span className="eyebrow">◆ Digital Creative Vision for Information Technology</span>
          <h1><span>نطوّر</span> <span className="rotating-word"><span>مواقع إلكترونية</span><span>متاجر إلكترونية</span><span>تطبيقات ذكية</span><span>حضورا رقميا</span></span> <span className="hero-break">تدفع أعمالك نحو النمو.</span></h1>
          <p>نبني حضورا رقميا يجعل العميل يفهم خدماتك بسرعة، يثق بعلامتك، ويعرف كيف يطلب منك. من الموقع الإلكتروني إلى المتجر والتطبيق والسوشيال ميديا، نجعل كل قناة تعمل لصالح البيع.</p>
          <div className="hero-actions">
            <a className="primary-action" href="#services">عرض الخدمات ←</a>
            <a className="secondary-action" href="#contact">اطلب استشارة</a>
          </div>
        </div>
        <aside className="hero-panel glass-panel hero-summary">
          <h2>أرقام تعكس خبرة DCV</h2>
          <p>خبرة طويلة، قاعدة عملاء واسعة، ومئات المشاريع المكتملة؛ مؤشرات عملية على قدرتنا على تنفيذ حلول رقمية موثوقة وقابلة للنمو.</p>
          <div className="metric-grid">{[["16+", "سنوات خبرة"], ["+1,000", "عميل حول العالم"], ["500+", "مشروع مكتمل"], ["98%", "رضا العملاء"]].map(([value, label]) => <Metric key={label} value={value} label={label} />)}</div>
        </aside>
      </section>
      <section className="trust-strip">
        {["تصميم مواقع", "تطبيقات ويب", "متاجر إلكترونية", "سوشيال ميديا", "SEO", "بريد شركات"].map((item) => <span key={item}>{item}</span>)}
      </section>
      <section className="section grid-2">
        <TextCard title="موقعك هو نقطة البيع الأولى" text="قبل أن يتواصل العميل معك، هو يقرر من الموقع: هل الشركة موثوقة؟ هل الخدمة واضحة؟ هل عندكم خبرة؟ لذلك نبني الصفحة الرئيسية وصفحات الخدمات لتقود الزائر خطوة بخطوة نحو الطلب." />
        <TextCard title="كل قناة تخدم الموقع" text="نربط الويب سايت مع السوشيال ميديا، الحملات، SEO، والنماذج حتى لا يبقى الموقع مجرد واجهة، بل مركزا يجمع الزيارات ويحوّلها إلى عملاء محتملين." />
      </section>
      <section className="section">
        <Intro label="خدماتنا" title="كل ما تحتاجه لتحويل الزائر إلى عميل." text="نرتب خدماتك الرقمية بطريقة تجعل العميل يعرف ماذا تقدم، لماذا يختارك، وما الخطوة التالية للتواصل معك." />
        <ServicesGrid />
      </section>
      <section className="section">
        <Intro label="لماذا تحتاج موقعا احترافيا؟" title="نقاط تجعل الموقع جزءا من قرار الشراء." text="بدلا من أن يكون الموقع مجرد واجهة جميلة، يجب أن يشرح، يقنع، ويقود الزائر إلى الخطوة التالية بوضوح." />
        <div className="services-grid">{[
          ["يعرض خدماتك بوضوح", "كل خدمة تظهر بعنوان واضح، وصف مختصر، وتفاصيل تساعد الزائر على فهم ما سيحصل عليه."],
          ["يبني الثقة بسرعة", "الشعار، العملاء، النصوص، وطريقة العرض تعطي الزائر انطباعا مهنيا من أول زيارة."],
          ["يوجه الزائر للتواصل", "الأزرار ونقاط التحويل تكون في أماكن مدروسة حتى لا يضيع العميل بين الصفحات."],
          ["يدعم نتائج البحث", "هيكل الصفحات والعناوين والروابط الداخلية تساعد Google على فهم الموقع وفهرسته بشكل أفضل."],
          ["يربط السوشيال بالمبيعات", "زيارات الحملات ومنصات التواصل تتحول إلى صفحات خدمات واضحة بدل أن تضيع خارج الموقع."],
          ["يبقى قابلا للتطوير", "يمكن إضافة خدمات، مقالات، أعمال، ولوحة تحكم لاحقا دون إعادة بناء الموقع من البداية."],
        ].map(([title, text]) => <TextCard key={title} title={title} text={text} />)}</div>
      </section>
      <section className="section clients-section">
        <Intro label="عملاؤنا" title="ثقة تمتد عبر قطاعات مختلفة." text="نفخر بالعمل مع علامات تجارية ومؤسسات من قطاعات متنوعة، ونبني لكل عميل حضورا رقميا يناسب جمهوره وأهدافه." />
        <div className="client-carousel">
          <div className="client-track trusted-track">
            {oldClientLogos.concat(oldClientLogos).map((logo, index) => <div className="trusted-client-card" key={`${logo}-${index}`}><img src={logo} alt={`عميل موثوق لدى DCV ${index + 1}`} /></div>)}
          </div>
        </div>
        <div className="hero-actions"><a className="secondary-action" href="#clients">شاهد عملاءنا</a></div>
      </section>
      <ContactSection />
    </main>
  );
}

function AboutPage() {
  return (
    <main className="page">
      <section id="about" className="page-hero section-band">
        <div><Breadcrumbs items={[["من نحن"]]} /><span className="eyebrow">◆ من نحن</span><h1>نحوّل الأفكار إلى حلول رقمية تصنع فرقا حقيقيا.</h1><p>DCV شركة أردنية متخصصة في تطوير المواقع الإلكترونية والتطبيقات والأنظمة المخصصة. نساعد الشركات والمؤسسات على بناء حضور رقمي قوي، تحسين كفاءة أعمالها، وتحويل الخدمات إلى تجربة سهلة وواضحة للعميل.</p></div>
        <aside className="hero-panel glass-panel hero-summary"><h2>من الإبداع إلى التنفيذ</h2><p>نجمع بين التصميم، البرمجة، المحتوى، وتحسين محركات البحث لبناء مشاريع رقمية تتميز بالأداء، سهولة الاستخدام، وقابلية التوسع.</p><div className="metric-grid">{[["100+", "شريك نجاح"], ["16+", "سنوات خبرة"], ["500+", "مشروع مكتمل"], ["98%", "رضا العملاء"]].map(([value, label]) => <Metric key={label} value={value} label={label} />)}</div></aside>
      </section>
      <section className="section grid-2">
        {[
          ["رسالتنا", "أن نمنح عملاءنا حضورا رقميا مؤثرا وموثوقا، يساعدهم على الوصول لعملاء أكثر من خلال مواقع وتطبيقات واتصالات رقمية فعالة."],
          ["رؤيتنا", "أن نكون من أبرز مزودي حلول الأعمال الرقمية في الأردن والمنطقة، وأن نبني حضورا قويا لعملائنا في الأسواق المحلية والإقليمية."],
          ["حلول مخصصة", "لا نتعامل مع الموقع كقالب جاهز. ندرس الخدمة، الجمهور، ونقاط البيع، ثم نبني تجربة مناسبة لهدف المشروع."],
          ["دعم واستمرارية", "نضع أساسا تقنيا قابلا للتطوير، وندعم الموقع لاحقا بالمحتوى، SEO، التحديثات، ولوحة تحكم عند الحاجة."],
        ].map(([title, text]) => <TextCard key={title} title={title} text={text} />)}
      </section>
      <section className="section"><Intro label="لماذا DCV" title="نقدم أكثر من مجرد خدمات تقنية." text="نساعد الشركات والمؤسسات على بناء حلول رقمية تجمع بين الجودة، الأداء، التصميم، والتطوير المستمر لتحقيق نتائج حقيقية." /><div className="services-grid">{["حلول مصممة حسب نشاطك", "تقنيات حديثة وأداء مستقر", "تصميم يركز على تجربة العميل", "SEO ومحتوى من بداية المشروع", "دعم فني وتطوير مستمر", "قابلية توسع نحو تطبيقات وأنظمة"].map((title) => <TextCard key={title} title={title} text="كل قرار في المشروع يتم ربطه بهدف واضح: زيادة الثقة، تسهيل الوصول للخدمة، وتحويل الزائر إلى عميل محتمل." />)}</div></section>
      <ContactSection />
    </main>
  );
}

function ServicesPage() {
  return (
    <main className="page">
      <section id="services" className="page-hero section-band">
        <div><Breadcrumbs items={[["الخدمات"]]} /><span className="eyebrow">◆ خدماتنا</span><h1>حلول رقمية متكاملة تبدأ من الموقع وتكبر مع أعمالك.</h1><p>نطوّر مواقع إلكترونية، متاجر، تطبيقات، أنظمة مخصصة، وخدمات تسويق رقمي تعمل معا لتقديم تجربة واضحة للعميل ونتائج ملموسة للشركة.</p></div>
        <TextCard title="نبدأ من الهدف" text="نفهم نشاطك وجمهورك، ثم نختار الحل الأنسب: موقع يعرض خدماتك، متجر يبيع منتجاتك، تطبيق يخدم عملاءك، أو نظام ينظم عملياتك." />
      </section>
      <section className="section"><ServicesGrid /></section>
      <section className="section grid-2"><TextCard title="كيف نختار الخدمة المناسبة؟" text="إذا كان هدفك جذب عملاء جدد، نبدأ بالموقع وSEO. إذا كان هدفك تشغيل العمليات، نضيف نظاما مخصصا. إذا كان هدفك البيع، نبني متجرا. وإذا كان جمهورك على السوشيال، نربط الحملات بالموقع." /><TextCard title="ما الذي تستلمه؟" text="هيكل صفحات واضح، تصميم متجاوب، محتوى موجه، ربط داخلي، إعدادات SEO أساسية، وتجربة تواصل جاهزة للتطوير والتحليل." /></section>
      <ContactSection />
    </main>
  );
}

function ClientsPage() {
  return <main className="page"><section id="clients" className="page-hero section-band"><div><Breadcrumbs items={[["عملاؤنا"]]} /><span className="eyebrow">◆ عملاؤنا</span><h1>عملاء موثوقون اختاروا DCV لبناء حضورهم الرقمي.</h1><p>هذه الشعارات مأخوذة من صفحة العملاء القديمة في موقع DCV، ونستخدمها هنا كعرض أوضح وأكثر أناقة لثقة قطاعات مختلفة بخدماتنا الرقمية.</p></div><TextCard title="ثقة قابلة للقياس" text="يمكن لاحقا تحويل كل شعار إلى دراسة حالة تعرض التحدي، الحل، والخدمة التي نفذناها للعميل." /></section><section className="section"><div className="legacy-logo-wall">{oldClientLogos.map((logo, index) => <div className="legacy-logo" key={logo}><img src={logo} alt={`عميل موثوق لدى DCV ${index + 1}`} /></div>)}</div><div className="hero-actions clients-cta"><a className="primary-action" href="#contact">اطلب مشروعا مشابها ←</a></div></section><ContactSection /></main>;
}

function ServicePage({ service }) {
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  return (
    <main className="page">
      <section className="page-hero section-band">
        <div>
          <Breadcrumbs items={[["الخدمات", "#services"], [service.title]]} />
          <span className="eyebrow">{service.eyebrow}</span>
          <h1>{service.title}</h1>
          <p>{service.summary}</p>
          <div className="keyword-row">{service.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div>
        </div>
        <aside className="service-aside glass-panel">
          <h2>مخرجات الخدمة</h2>
          {service.outcomes.map((item) => <p key={item}>✓ {item}</p>)}
        </aside>
      </section>
      <section className="section grid-2">
        <TextCard title="تفاصيل الخدمة" text={`${service.details} هذه الصفحة مبنية لتخدم البيع والظهور: عنوان واضح، كلمات مستهدفة، روابط داخلية، محتوى يجيب على أسئلة العميل، ونقاط تحويل تقوده للتواصل.`} />
        <article className="text-card"><h3>خطوات العمل</h3><div className="chip-row">{["تحليل الهدف", "تخطيط المحتوى", "تصميم التجربة", "تطوير وتنفيذ", "SEO وتحسين"].map((item) => <span key={item}>{item}</span>)}</div><p>نبدأ بفهم نشاطك والجمهور، ثم نبني الصفحة أو الحل بالطريقة التي تجعل الخدمة واضحة وقابلة للشراء.</p></article>
      </section>
      <section className="section">
        <Intro label="أسئلة مكررة" title={`أسئلة قبل طلب ${service.title}`} text="إجابات مختصرة تساعدك تفهم الخدمة، طريقة التنفيذ، وما الذي تحتاجه للبدء." />
        <FaqList items={service.faqs} />
      </section>
      <section className="section">
        <Intro label="خدمات قد تهمك" title="حلول رقمية تكمل هذه الخدمة." text="يمكن دمج أكثر من خدمة لبناء تجربة رقمية متكاملة من الموقع إلى التطبيق والتسويق." />
        <div className="services-grid">{related.map((item) => <ServiceCard key={item.slug} service={item} />)}</div>
      </section>
      <ContactSection />
    </main>
  );
}

function FaqPage() {
  return <main className="page"><section id="faq" className="page-hero section-band"><div><Breadcrumbs items={[["الأسئلة المكررة"]]} /><span className="eyebrow">◆ الأسئلة المكررة</span><h1>أسئلة تساعدك تختار المسار الرقمي المناسب.</h1><p>جمعنا أهم الأسئلة التي يسألها أصحاب الشركات قبل بناء موقع أو تطبيق أو متجر، مع إجابات مختصرة تساعدك تبدأ بوضوح.</p></div><TextCard title="إجابات قبل التواصل" text="ستجد داخل صفحات الخدمات أسئلة مرتبطة بكل مجال حتى تعرف ما الذي ستحصل عليه، وما الخطوة التالية المناسبة لمشروعك." /></section><section className="section"><FaqList items={siteFaqs} /></section><ContactSection /></main>;
}

function ArticlesPage() {
  return <main className="page"><section id="articles" className="page-hero section-band"><div><span className="eyebrow">◆ مقالات</span><h1>مدونة تساعد الموقع على بناء سلطة موضوعية.</h1><p>المقالات المقترحة تستهدف كلمات بحث تجارية وتدعم صفحات الخدمات بروابط داخلية.</p></div><TextCard title="Content Plan" text="يمكن إضافة مقالين إلى أربعة شهريا حسب أولويات Search Console والكلمات المستهدفة." /></section><section className="section"><div className="articles-grid">{articles.map(([title, text]) => <article className="article-card" key={title}><span className="eyebrow">SEO Article</span><h3>{title}</h3><p>{text}</p><a href="#contact">اطلب المقال ←</a></article>)}</div></section></main>;
}

function ContactPage() {
  return <main className="page"><section id="contact" className="page-hero section-band"><div><Breadcrumbs items={[["اتصل بنا"]]} /><span className="eyebrow">◆ اتصل بنا</span><h1>لنحوّل فكرتك إلى مشروع رقمي واضح ومربح.</h1><p>أرسل لنا نوع المشروع الذي تحتاجه: موقع شركة، متجر إلكتروني، تطبيق، نظام مخصص، تحسين ظهور، أو إدارة سوشيال ميديا. سنساعدك على اختيار البداية الأنسب.</p></div><article className="text-card"><h3>معلومات التواصل</h3><p>{company.location}</p><p><a href={`mailto:${company.email}`}>{company.email}</a></p><p><a href={`tel:${company.phone}`}>{company.phone}</a></p><div className="chip-row"><span>استشارة أولية</span><span>تقدير نطاق العمل</span><span>خطة تنفيذ</span></div></article></section></main>;
}

function HeroPanel() {
  return <aside className="hero-panel glass-panel hero-summary"><h2>أرقام تعكس خبرة DCV</h2><p>خبرة طويلة، قاعدة عملاء واسعة، ومئات المشاريع المكتملة؛ مؤشرات عملية على قدرتنا على تنفيذ حلول رقمية موثوقة وقابلة للنمو.</p><div className="metric-grid">{[["16+", "سنوات خبرة"], ["+1,000", "عميل حول العالم"], ["500+", "مشروع مكتمل"], ["98%", "رضا العملاء"]].map(([value, label]) => <Metric key={label} value={value} label={label} />)}</div></aside>;
}

function Metric({ value, label }) {
  const target = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const prefix = value.trim().startsWith("+") ? "+" : "";
  const suffix = value.trim().endsWith("+") ? "+" : value.trim().endsWith("%") ? "%" : "";
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / 2600, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return <div className="metric"><strong>{prefix}{current.toLocaleString("en-US")}{suffix}</strong><span>{label}</span></div>;
}

function Breadcrumbs({ items }) {
  return <div className="breadcrumbs"><a href="#home">الرئيسية</a>{items.map(([label, href]) => <React.Fragment key={label}><span className="sep">/</span>{href ? <a href={href}>{label}</a> : <span className="current">{label}</span>}</React.Fragment>)}</div>;
}

function Intro({ label, title, text }) {
  return <div className="section-intro"><span className="eyebrow">◆ {label}</span><h2>{title}</h2><p>{text}</p></div>;
}

function ServicesGrid() {
  return <div className="services-grid">{services.map((service) => <ServiceCard key={service.slug} service={service} />)}</div>;
}

function ServiceCard({ service }) {
  return <article className="service-card"><span className="eyebrow">{service.eyebrow}</span><h3>{service.title}</h3><p>{service.summary}</p><a href={`#service/${service.slug}`}>تفاصيل الخدمة ←</a></article>;
}

function FaqList({ items }) {
  return <div className="faq-list">{items.map(([question, answer]) => <article className="faq-item" key={question}><h3 className="faq-question">{question}</h3><p className="faq-answer">{answer}</p></article>)}</div>;
}

function TextCard({ title, text }) {
  return <article className="text-card"><h3>{title}</h3><p>{text}</p></article>;
}

function ClientCard({ client }) {
  const [name, type, url, logo] = client;
  return <a className="client-card" href={url} target={url.startsWith("#") ? undefined : "_blank"} rel={url.startsWith("#") ? undefined : "noopener"}><img className="client-logo" src={logo} alt={name} /><strong>{name}</strong><span>{type}</span><em>{url.startsWith("#") ? "اطلب مشروع مشابه ←" : "زيارة الرابط ←"}</em></a>;
}

function ContactSection() {
  return <section id="contact" className="contact-section section-band"><div><span className="eyebrow">◆ اتصل بنا</span><h2>جاهز تبني موقع يعرض خدماتك بطريقة احترافية؟</h2><p>احكِ لنا عن مشروعك، وسنقترح لك المسار الأنسب: موقع تعريفي، متجر إلكتروني، تطبيق، نظام مخصص، أو حضور رقمي متكامل يربط الموقع بالسوشيال ميديا وتحسين الظهور.</p></div><div className="contact-actions"><a className="primary-action" href="#contact">انتقل إلى صفحة التواصل ←</a></div></section>;
}

function Footer() {
  return <footer><div className="footer-brand"><img src="/assets/dcv-logo-full.png" alt="DCV" /><p>Digital Creative Vision شركة أردنية تقدم حلولا رقمية متكاملة للشركات: مواقع إلكترونية، تطبيقات، أنظمة مخصصة، متاجر، بريد احترافي، وتسويق رقمي.</p></div><div className="footer-col"><h3>روابط سريعة</h3><a href="#about">من نحن</a><a href="#services">خدماتنا</a><a href="#clients">عملاؤنا</a><a href="#articles">المقالات</a><a href="#faq">الأسئلة المكررة</a></div><div className="footer-col"><h3>تواصل</h3><span>عمّان - الدوار السابع - نزول الملكية</span><a href={`tel:${company.phone}`}>{company.phone}</a><a href={`mailto:${company.email}`}>{company.email}</a></div><div className="footer-bottom">© 2026 Digital Creative Vision for Information Technology. جميع الحقوق محفوظة.</div></footer>;
}

createRoot(document.getElementById("root")).render(<App />);
