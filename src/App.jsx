import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const FACES = {
  happy: 'https://aka.doubaocdn.com/s/SaUFaBsMio',
  curious: 'https://aka.doubaocdn.com/s/SKB1QV9GJE',
  cute: 'https://aka.doubaocdn.com/s/a3hwFJtBNk',
  excited: 'https://aka.doubaocdn.com/s/VHn7EvSqZl',
  surprise: 'https://aka.doubaocdn.com/s/fGJY2xNgS5',
}

// ===== ContactButton =====
function ContactButton({ onHover, onClick }) {
  return (
    <a
      href="https://www.zhihu.com/people/li-yi-20-34"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={onHover}
      onClick={onClick}
      className="rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-white font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base transition-transform hover:scale-105 active:scale-95 inline-block"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181,1,167,0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      Contact Me
    </a>
  )
}

// ===== LiveProjectButton =====
function LiveProjectButton({ onHover }) {
  return (
    <button
      onMouseEnter={onHover}
      className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors"
    >
      Live Project
    </button>
  )
}

// ===== FadeIn =====
function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ===== Magnet =====
function Magnet({ children, padding = 150, strength = 3, className, onHover, onLeave }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  const handleMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < padding + Math.max(rect.width, rect.height) / 2) {
      setActive(true)
      setPos({ x: dx / strength, y: dy / strength })
    } else {
      setActive(false)
      setPos({ x: 0, y: 0 })
    }
  }, [padding, strength])

  useEffect(() => {
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [handleMove])

  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: active
          ? 'transform 0.3s ease-out'
          : 'transform 0.6s ease-in-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}

// ===== AnimatedText =====
function AnimatedText({ text, onCharHover }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  return (
    <p
      ref={ref}
      className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] mx-auto"
      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
    >
      {text.split('').map((ch, i) => (
        <AnimatedChar key={i} progress={scrollYProgress} index={i} total={text.length} ch={ch} />
      ))}
    </p>
  )
}

function AnimatedChar({ progress, index, total, ch }) {
  const start = index / total
  const end = start + 1 / total
  const opacity = useTransform(progress, [start, end], [0.2, 1])
  return (
    <span style={{ opacity }}>
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  )
}

// ===== DATA =====
const NAV_LINKS = [
  { label: '关于我', href: '#about', face: 'curious' },
  { label: '核心优势', href: '#services', face: 'excited' },
  { label: '工作经历', href: '#projects', face: 'cute' },
  { label: '社媒主页', href: '#contact', face: 'surprise', external: 'https://www.zhihu.com/people/li-yi-20-34' },
]

const MARQUEE_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
]
const MARQUEE_IMAGES_2 = [
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
]

const SERVICES = [
  { num: '01', name: '海外社媒运营', desc: 'TikTok / Instagram / YouTube 全平台策略与日常运营，从0到1搭建海外官号矩阵，产出内容直接面向全球用户。' },
  { num: '02', name: '国内公关 & 危机管理', desc: '公众号/知乎/微博内容策划、舆情监控、负面沉降，做过知乎全站热搜第一，单篇阅读300万+。' },
  { num: '03', name: '内容量产 & 视频制作', desc: '拉通设计团队与外部供应商，全年产出1500+条视频，跑通AI机器人批量剪辑发布，效率提升数十倍。' },
  { num: '04', name: 'KOL 资源整合', desc: '知乎137K关注个人IP，与共青团中央、凤凰、知乎、网易等数百家媒体及KOL保持长期联动。' },
  { num: '05', name: 'AI 效率工作流', desc: '熟练使用 Codex / Workbuddy / TraeWork 等AI Agent，批量完成文件处理、海报、网站、AI视频产出。' },
]

const PROJECTS = [
  {
    num: '01', category: 'Client', name: '思摩尔国际 FEELM（全球雾化科技龙头）',
    period: '2022/04 - 2025/08',
    role: '红旗事业群 · 公关媒介专业经理',
    bullets: [
      '从0到1搭建 FEELM 海外+国内全平台社媒矩阵，在 Instagram/TikTok 累计 2亿+ 自然播放，负责内容策略、调性把控与日常运营',
      '1500+ 条/年视频产能：拉通内部设计与外部供应商，对接客户电商引流，为官网/店铺带来数十万精准访客',
      '主导 AI 机器人项目落地：海外社媒批量私信、评论、视频自动剪辑发布，运营效率提升数十倍',
    ],
    img1: 'https://aka.doubaocdn.com/s/bOITUDiOwq',
    img2: 'https://aka.doubaocdn.com/s/OMzJV7UIMx',
    img3: 'https://aka.doubaocdn.com/s/qYcNgHN1jK',
    img4: 'https://aka.doubaocdn.com/s/DcTM2NYidc',
    links: [
      'https://www.instagram.com/reel/C_eucBGIR-C/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==',
      'https://www.instagram.com/reel/C_rmO6XC4Q6/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==',
      'https://www.instagram.com/reel/C_KLnJTC7v7/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==',
      'https://www.instagram.com/reel/C7TMsojJyKi/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==',
    ],
  },
  {
    num: '02', category: 'Client', name: '未来穿戴技术有限公司（智能可穿戴）',
    period: '2020/09 - 2022/03',
    role: '媒介策划',
    bullets: [
      '统筹微信公众号/知乎/微博/网稿的图文视频策划与投放复盘，驱动品牌曝光',
      '创新 KOL 投放路径，营销节点实现 ROI > 3，完成品牌曝光到引流转化闭环',
      '负责百度/知乎/微信搜一搜 SEO 与舆情口碑管理，维护正面关键词生态',
    ],
  },
  {
    num: '03', category: 'Client', name: '强脑科技 BrainCo（脑机接口独角兽）',
    period: '2019/08 - 2020/09',
    role: '市场公关部 · 公关经理',
    bullets: [
      '搭建公司国内外社媒矩阵，公众号阅读量最高提升50倍；操盘知乎全站热搜第一，有效阅读超300万，获亿欧、雷锋网、36氪、凤凰科技等转载报道',
      '主导危机公关：负面持续沉降、正面持续曝光；搭建中美两地（波士顿/深圳/杭州）信息与资源协同机制',
      '产品传播助力：推动旗下产品登上美国《时代》杂志封面、斩获2020红点最佳设计奖；从0搭建公司官方网站，完成业务梳理与内容审核维护',
    ],
  },
  {
    num: '04', category: 'Client', name: '华为慧通商务有限公司',
    period: '2018/05 - 2019/07',
    role: '解决方案部 · 运营专员',
    bullets: [
      '在心声社区、「菊厂旅行家」公众号、WeLink 推广慧通爱旅/差旅业务，累计发稿400+篇；组织线下游学讲座，报名250+，创该业务线历史最高参与记录',
      '运营品牌「幸会」年度话题，10万+浏览、3200+华为员工参与',
      '从0搭建华为人旅行社群，探索UGC玩法并形成个人IP，方法论被同事效仿；业余运营摄影协会公众号「结图记事」，内容被心声社区与官方号转发',
    ],
  },
  {
    num: '05', category: '实习', name: '新疆网信办新媒体部（实习）',
    period: '2017/07 - 2017/09',
    role: '新媒体运营实习生',
    bullets: [
      '运营「小疆有话说」，独立撰稿5篇均10万+，单篇最高40万+，修改稿被收入内参；译文同步维语平台同获10万+',
      '通过社群挖掘南疆基层公务员事迹，向内地输出新疆正面形象',
    ],
  },
]

const SERVICE_FACES = ['curious', 'excited', 'cute', 'surprise', 'curious']
const PROJECT_FACES = ['excited', 'surprise', 'cute', 'curious', 'happy']

export default function App() {
  const [avatarFace, setAvatarFace] = useState('happy')
  const [avatarBounce, setAvatarBounce] = useState(false)
  const marqueeRef = useRef(null)

  const triggerBounce = (face) => {
    setAvatarFace(face)
    setAvatarBounce(true)
    setTimeout(() => setAvatarBounce(false), 500)
    setTimeout(() => setAvatarFace('happy'), 1200)
  }

  // Marquee scroll offset
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      if (!marqueeRef.current) return
      const rect = marqueeRef.current.getBoundingClientRect()
      const sectionTop = rect.top + window.scrollY
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ background: '#0C0C0C', color: '#fff', overflowX: 'clip', minHeight: '100vh' }}>
      {/* ===== HERO ===== */}
      <section className="h-screen flex flex-col relative overflow-x-clip">
        <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 relative z-20">
          {NAV_LINKS.map((link, i) => (
            <FadeIn key={link.label} delay={i * 0.1}>
              <a
                href={link.external || link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                onClick={() => triggerBounce(link.face)}
                onMouseEnter={() => setAvatarFace(link.face)}
                onMouseLeave={() => setAvatarFace('happy')}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200"
              >
                {link.label}
              </a>
            </FadeIn>
          ))}
        </nav>

        <div className="overflow-hidden">
          <FadeIn delay={0.15} y={40}>
            <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] mt-6 sm:mt-4 md:-mt-5 text-center">
              你好, 我是李毅
            </h1>
          </FadeIn>
        </div>

        <div className="flex-1" />

        {/* Bottom bar */}
        <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 relative z-20">
          <FadeIn delay={0.35} y={20}>
            <p
              className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
              style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
            >
              11年社媒老兵，个人自媒体创作者，AI Agent 实践者，让内容自己跑起来
            </p>
          </FadeIn>
          <FadeIn delay={0.5} y={20}>
            <ContactButton
              onHover={() => setAvatarFace('excited')}
              onClick={() => triggerBounce('excited')}
            />
          </FadeIn>
        </div>

        {/* Portrait - floating avatar with magnet */}
        <FadeIn delay={0.6} y={30} className="absolute left-1/2 -translate-x-1/2 z-10">
          <Magnet
            padding={150}
            strength={3}
            onHover={() => setAvatarFace('curious')}
            onLeave={() => setAvatarFace('happy')}
            className="w-[180px] sm:w-[240px] md:w-[300px] lg:w-[360px] bottom-0 sm:bottom-0 translate-y-[15%] sm:translate-y-0"
          >
            <img
              src={FACES[avatarFace]}
              alt="李毅"
              className="w-full h-auto drop-shadow-2xl"
              style={{
                transition: 'transform 0.3s cubic-bezier(.34,1.56,.64,1)',
                transform: avatarBounce ? 'translateY(-12px)' : 'translateY(0)',
              }}
            />
          </Magnet>
        </FadeIn>
      </section>

      {/* ===== MARQUEE ===== */}
      <section ref={marqueeRef} className="pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden">
        <div className="flex flex-col gap-3">
          {/* Row 1 - moves right */}
          <div
            className="flex gap-3 will-change-transform"
            style={{ transform: `translateX(${offset - 200}px)` }}
          >
            {[...MARQUEE_IMAGES, ...MARQUEE_IMAGES, ...MARQUEE_IMAGES].map((src, i) => (
              <img
                key={i}
                src={src}
                loading="lazy"
                className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
                alt=""
              />
            ))}
          </div>
          {/* Row 2 - moves left */}
          <div
            className="flex gap-3 will-change-transform"
            style={{ transform: `translateX(${-(offset - 200)}px)` }}
          >
            {[...MARQUEE_IMAGES_2, ...MARQUEE_IMAGES_2, ...MARQUEE_IMAGES_2].map((src, i) => (
              <img
                key={i}
                src={src}
                loading="lazy"
                className="w-[420px] h-[270px] rounded-2xl object-cover flex-shrink-0"
                alt=""
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="min-h-screen relative px-5 sm:px-8 md:px-10 py-20 flex flex-col items-center justify-center scroll-mt-20">
        {/* Decorative images */}
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" className="w-[120px] sm:w-[160px] md:w-[210px]" alt="" />
        </FadeIn>
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" className="w-[100px] sm:w-[140px] md:w-[180px]" alt="" />
        </FadeIn>
        <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" className="w-[120px] sm:w-[160px] md:w-[210px]" alt="" />
        </FadeIn>
        <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" className="w-[130px] sm:w-[170px] md:w-[220px]" alt="" />
        </FadeIn>

        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            关于我
          </h2>
        </FadeIn>

        <div className="mt-10 sm:mt-14 md:mt-16">
          <AnimatedText text="11年社交媒体运营经验，做过国内做过海外，待过华为、强脑科技、思摩尔FEELM。从0到1打出过2亿+海外自然播放量，知乎137K关注。现在沉迷用AI Agent把效率拉满。让我们一起搞点有意思的事情！" />
        </div>

        {/* 知乎个人IP数据 */}
        <FadeIn delay={0.2} y={30}>
          <div className="mt-10 sm:mt-14 max-w-2xl mx-auto w-full">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-[#D7E2EA]">137K+</div>
                <div className="text-xs text-[#646973] mt-1">知乎关注</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-[#D7E2EA]">570K+</div>
                <div className="text-xs text-[#646973] mt-1">赞同</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-[#D7E2EA]">1亿+</div>
                <div className="text-xs text-[#646973] mt-1">累计阅读</div>
              </div>
            </div>
            <ul className="space-y-2 text-sm sm:text-base text-[#D7E2EA]/70 max-w-xl mx-auto">
              <li className="flex gap-2">
                <span className="text-[#B600A8] flex-shrink-0">▸</span>
                <span>内容方向：家电测评、美食测评、社会热点、商业评论、"一带一路"话题；受邀开通专栏「我们新疆好地方」</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B600A8] flex-shrink-0">▸</span>
                <span>被「共青团中央」关注，内容转发至央视新闻频道，写进外交部白皮书</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#B600A8] flex-shrink-0">▸</span>
                <span>与数百位科技/热点KOL、行业媒体运营建立长期联系</span>
              </li>
            </ul>
          </div>
        </FadeIn>

        <div className="mt-16 sm:mt-20 md:mt-24">
          <ContactButton
            onHover={() => setAvatarFace('excited')}
            onClick={() => triggerBounce('excited')}
          />
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 scroll-mt-20">
        <FadeIn y={40}>
          <h2 className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            核心优势
          </h2>
        </FadeIn>
        <div className="max-w-5xl mx-auto">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.1} y={30}>
              <div
                className="flex gap-6 md:gap-10 py-8 sm:py-10 md:py-12"
                style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(12,12,12,0.15)' }}
                onMouseEnter={() => setAvatarFace(SERVICE_FACES[i])}
                onMouseLeave={() => setAvatarFace('happy')}
              >
                <div className="font-black" style={{ fontSize: 'clamp(3rem, 10vw, 140px)', lineHeight: 1 }}>
                  {s.num}
                </div>
                <div>
                  <h3 className="font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                    {s.name}
                  </h3>
                  <p
                    className="font-light leading-relaxed max-w-2xl opacity-60 mt-2"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section id="projects" className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 py-20 scroll-mt-20">
        <FadeIn y={40}>
          <h2 className="hero-heading font-black uppercase text-center" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            工作经历
          </h2>
        </FadeIn>

        <div className="mt-16 sm:mt-20 md:mt-24 max-w-6xl mx-auto">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.num}
              project={p}
              index={i}
              total={PROJECTS.length}
              onHover={() => setAvatarFace(PROJECT_FACES[i])}
              onLeave={() => setAvatarFace('happy')}
            />
          ))}
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="text-center py-16 text-[#646973] scroll-mt-20">
        <a
          href="https://www.zhihu.com/people/li-yi-20-34"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-heading font-black uppercase mb-6 inline-block hover:opacity-80 transition-opacity"
          style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
        >
          社媒主页
        </a>
        <p className="text-sm mb-2">知乎：李毅二一个 · 137K+ 关注 · 570K+ 赞同</p>
        <p className="text-sm mb-6">邮箱：278963239@qq.com</p>
        <p className="text-xs">© 2026 李毅 · Built with React + Tailwind + Framer Motion</p>
      </footer>
    </div>
  )
}

// ===== ProjectCard =====
function ProjectCard({ project, index, total, onHover, onLeave }) {
  return (
    <div
      className="mb-8 md:mb-12"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8">
        {/* Top row */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div className="flex items-baseline gap-4 md:gap-6">
            <span className="font-black text-[#D7E2EA]" style={{ fontSize: 'clamp(3rem, 10vw, 100px)', lineHeight: 1 }}>
              {project.num}
            </span>
            <div>
              <div className="text-xs uppercase tracking-widest text-[#646973] mb-1">{project.category}</div>
              <h3 className="text-2xl md:text-3xl font-medium text-[#D7E2EA]">{project.name}</h3>
            </div>
          </div>
          <LiveProjectButton />
        </div>
          {/* Bottom row - images (only if project has images) */}
          {project.img1 && (
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {[project.img1, project.img2, project.img3, project.img4].map((img, i) => (
              <a key={i} href={project.links?.[i]} target="_blank" rel="noopener noreferrer" className="block">
                <img src={img} className="rounded-[30px] sm:rounded-[40px] object-cover w-full aspect-square hover:opacity-80 transition-opacity" alt="" />
              </a>
            ))}
          </div>
          )}
        {/* Details */}
        <div className="mt-6 md:mt-8">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
            <span className="text-sm md:text-base text-[#D7E2EA] font-medium">{project.role}</span>
              <span className="text-xs md:text-sm text-[#646973]">{project.period}</span>
            </div>
            <ul className="space-y-1.5">
              {project.bullets.map((b, i) => (
                <li key={i} className="text-sm md:text-base text-[#D7E2EA]/80 leading-relaxed flex gap-2">
                  <span className="text-[#B600A8] flex-shrink-0">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  )
}
