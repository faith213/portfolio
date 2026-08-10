// 全站内容与图片源。图片全部来自 public/ 下的本地素材。

// 资源路径统一前缀：dev 下 BASE_URL 为 '/'，GitHub Pages 打包后为 '/portfolio/'。
// 所有 public 资源都必须经过 asset() 处理，否则部署到子路径后会 404。
export const asset = (p: string) =>
  import.meta.env.BASE_URL + p.replace(/^\/+/, '')

export const NAV = [
  { label: 'ABOUT', href: '#about' },
  { label: 'EDUCATION', href: '#education' },
  { label: 'EXPERIENCE', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
]

// Hero 角色主体图（artifacts 透明角色）
export const HERO_CHARACTER = asset('/hero/character.png')
// Hero 职位 / 简历 / 邮箱
export const HERO_ROLE = 'Product Manager / 产品经理'
export const RESUME_URL = asset('/resume.pdf')
export const EMAIL = 'xiageling@163.com'

// 爱好娱乐图片：h1..h15
const hobby = (n: number) => asset(`/hobby/h${n}.jpg`)

// 横向图墙（两行反向滚动）——爱好娱乐
export const MARQUEE_TOP = [1, 2, 3, 4, 5, 6, 7, 8].map(hobby)
export const MARQUEE_BOTTOM = [9, 10, 11].map(hobby)

// About 四角悬浮小图 —— 爱好娱乐剩余图片
export const ABOUT_ICONS = [
  { src: hobby(12), pos: 'top-[6%] left-[4%]' },
  { src: hobby(13), pos: 'top-[8%] right-[5%]' },
  { src: hobby(14), pos: 'bottom-[10%] left-[6%]' },
  { src: hobby(15), pos: 'bottom-[8%] right-[4%]' },
]

// About 正文（用户指定，仅此一段）
export const ABOUT_TEXT =
  '我是夏格羚，统计科班出身的策略产品经理，有电商、商业化、平台方向实习经验，擅长用数据 + AI 双引擎驱动策略迭代，能高效协同跨团队推动落地。'

// 教育背景（时间来自个人简历），每段自带相册（滚轮横向滑动）
export type MediaItem = {
  type: 'image' | 'video'
  src: string
  poster?: string // 视频封面
}

export type Edu = {
  year: string
  school: string
  degree: string
  note: string
  gallery: MediaItem[]
}

const EDUCATION_RAW: Edu[] = [
  {
    year: '2025.09 — 2027.06',
    school: '上海财经大学',
    degree: '应用统计 · 硕士（211）',
    note: '绩点 3.5/4（前 15%）。荣誉奖项：学业奖学金、奖优奖学金、院优秀团员。',
    gallery: [
      { type: 'video', src: '/edu/grad/video.mp4' },
      { type: 'image', src: '/edu/grad/g1.jpg' },
      { type: 'image', src: '/edu/grad/g2.jpg' },
      { type: 'image', src: '/edu/grad/g3.jpg' },
      { type: 'image', src: '/edu/grad/g4.jpg' },
      { type: 'image', src: '/edu/grad/g5.jpg' },
      { type: 'image', src: '/edu/grad/g6.jpg' },
    ],
  },
  {
    year: '2021.09 — 2025.06',
    school: '苏州大学',
    degree: '统计学 · 本科（211）',
    note: '绩点 3.7/4（前 10%）。荣誉奖项：美赛建模二等奖，学习优秀、创新创业、社会工作奖学金，暑期社会实践"先进个人"。',
    gallery: [
      { type: 'image', src: '/edu/undergrad/u1.jpg' },
      { type: 'image', src: '/edu/undergrad/u2.jpg' },
      { type: 'image', src: '/edu/undergrad/u3.jpg' },
      { type: 'image', src: '/edu/undergrad/u4.jpg' },
      { type: 'image', src: '/edu/undergrad/u6.jpg' },
      { type: 'image', src: '/edu/undergrad/u7.jpg' },
    ],
  },
]

export type ExpBlock = {
  title: string
  items: { k: string; v: string }[]
}

export type Project = {
  no: string
  cat: string
  name: string
  period: string
  summary: string[]
  blocks: ExpBlock[]
  cover: string | string[]
}

// 实习经历：时间倒序（近 → 远），完整还原简历内容
const PROJECTS_RAW: Project[] = [
  {
    no: '01',
    cat: '字节跳动 · TikTok Shop',
    name: '商城搜索增长策略产品实习生',
    period: '2026.06 — 至今',
    summary: [
      '主要业务方向：负责 TTS FYP → 商城搜索的用户增长与搜索渗透提升，覆盖搜索异形卡、主动搜业务。',
      '词图巡检自动化：协助组内评测 Prompt & 巡检看板产品建设，提高模型准召和看板可读性，显著降低重复性人工投入。',
    ],
    blocks: [
      {
        title: '【异形卡】年中大促 C 端改版',
        items: [
          { k: '业务背景', v: '异形卡是 FYP → 商城的核心引流卡，其 C 端样式与出卡策略直接决定搜索渗透与 GMV。' },
          { k: '核心动作', v: '①年中大促 C 端改版：推动异形卡新增大促氛围 Banner、券包、券后价能力，主导 6 组 AB 实验并推全。②年中大促后数据归因：大促期 AB 正向但同比去年下滑，数据分析定位三类问题——追打商品重合度较低（各场域信号利用不足）、首坑商品出券率低且多出在低曝光的非首坑商品、搜索新客效率低。③后续策略：推动「引入场域间更丰富信号 + 商品发券信号入排序」，首坑券曝光占比调优 + 分人群出卡 + AI 生图探索。' },
          { k: '策略成果', v: '大促核心指标商城搜索渗透 +0.5%，全量推全；后续策略中「发券信号入排序 + 首坑券曝光调优」已作为本季度核心专项落地，预计驱动搜索卡渗透增长。' },
        ],
      },
      {
        title: '【主动搜】承接全链路策略制定',
        items: [
          { k: '业务背景', v: 'FYP 已能激发用户主动搜，但当前链路存在问题——激发信号识别不完整、搜索框看后搜承接覆盖不足、结果页同款商品承接仍有损耗。' },
          { k: '核心动作', v: '主导主动搜现状的数据梳理与问题定位（基于 case 评估与数据分析），拆出并推动四段策略：①激发端——分析发现 53% 的搜索由多条视频共同种草，推动算法多曝光激发主动搜视频，并挖掘家具、珠宝等"非视频热门但搜索率高"的类目分发机会；②引流卡——异形卡近 45% GMV 来自后续复搜，联动营销侧新增"搜 X 次得 X 券"任务券营销玩法；③搜索框——定义并推上线"看后手搜猜中"新指标（衡量推荐词命中用户真实搜索意图的能力），建立三层监控，推动各内容形态看后搜信号接入，并让低价/折扣标在搜索框露出；④结果页——定位首屏同款率仅 66.7%，推动结果页同款策略迭代，反哺推荐算法。' },
        ],
      },
    ],
    cover: '/intern/bytedance.jpg',
  },
  {
    no: '02',
    cat: '字节跳动 · 抖音电商',
    name: '内容场策略产品实习生',
    period: '2025.11 — 2026.06',
    summary: [
      '主要业务方向：供给牵引方向，种草激励计划分成策略（面向电商及非电商达人的看后搜分成激励）相关业务。',
      '策略平台迭代：负责分成策略平台效率提升，通过重构计算链路与新增策略快捷配置功能，优化平台计算架构与操作体验，实现季度策略迭代周期缩短 3-4 周，显著提升运营与研发人效。',
    ],
    blocks: [
      {
        title: '【种草激励】买家秀 MVP 试跑专项（供给增长策略）',
        items: [
          { k: '业务背景', v: '商家为提升店铺 GMV、平台为提升 GMV 及价值天花板，通过种草激励为买家秀商家任务输送高价值作者和投稿，以验证商家效果，达成商家 GMV 增长、作者投稿意愿提升及平台效率优化的目标。' },
          { k: '核心动作', v: '①种草激励计划新增固定资源位。②买家秀 MVP 试跑：种草激励新增高价值作者运营触达。' },
          { k: '策略成果', v: '①成功验证模式可行性，实现显著的引流效果与 GMV 贡献。②基于试跑数据，规划分阶段落地路径：短期聚焦效率优化，守住 ROI 基线；中长期扩展供给场景、推进活动产品化，为后续规模化运营奠定基础。' },
        ],
      },
      {
        title: '【种草激励】产品主动触达策略',
        items: [
          { k: '业务背景', v: '内部复盘发现有分成收益作者 0 访问计划页面的异常现象，经用户调研锁定「计划认知缺失 + 经营能力差」为核心痛点，同时产品主动触达机制存在优化空间。' },
          { k: '核心动作', v: '①首页新增高看后搜商品推荐及内容案例，加强作者透传。②优化产品主动触达的规则和频次，提高作者收益感知。' },
          { k: '策略成果', v: '策略于 5 月上线后增量看后搜 GMV 50 万/天，作者人均 GMV +1.5%，作者满意度占比 +10pp。' },
        ],
      },
    ],
    cover: '/intern/bytedance2.jpg',
  },
  {
    no: '03',
    cat: '美团 · 点评事业部',
    name: '信息流推荐策略产品实习生',
    period: '2025.07 — 2025.11',
    summary: [
      '主要业务方向：首页信息流推荐策略制定及优化，提升发现量核心指标。',
      '数据分析：SQL 搭建自动化监测看板，平均问题定位时效缩短 40%；建立从数据调研、实验设计到效果评估的完整闭环，确保策略优化方向的正确性与迭代效率。',
      '用户满意度分析：设置调研问卷，抽样分析 300+ 用户对首页信息流笔记满意程度，根据不同笔记类目制定差异化提升策略。',
    ],
    blocks: [
      {
        title: '垂类子 Tab 迭代',
        items: [
          { k: '背景', v: '针对垂类 Tab 众多导致场景化体验差、用户体验感割裂的问题，对现有垂类 Tab 进行合并删减，提升用户心智。' },
          { k: '动作与成果', v: '主导首页垂类 Tab 心智透传策略优化，通过场景化整合设计 A/B 实验。初始实验数据显示垂类 Tab 整体点击 UV 下降超 50%，用户点击后流失严重；排查原因后重新设计首页垂类 Tab 结构与内容分发策略，迭代实验方案。最终最优实验组 UV-CTR +1.26pp，曝光量、发现量显著正向，推全后提升发现量 20w+。' },
        ],
      },
      {
        title: 'S 级城市高爆时效优化专项',
        items: [
          { k: '背景', v: '针对 S 级城市高爆内容中老旧笔记占比过高（33.7%）、导致用户审美疲劳与体验下滑的核心问题进行策略优化。' },
          { k: '动作与成果', v: '通过数据洞察定位问题根因，主导设计以"时效性优化"与"分层衰减"为核心的推荐策略；建立内容生命周期管理模型，对超期内容进行流量回收与再分配。成功将 S 级城市 7 日内高爆内容曝光占比从 45.5% 提升至 50%，3 个月以上老旧内容占比从 20% 降至 10%，显著提升内容分发时效性与用户体验。' },
        ],
      },
    ],
    cover: ['/intern/meituan.jpg', '/intern/meituan2.jpg'],
  },
  {
    no: '04',
    cat: '小红书 · 商业部生态消费',
    name: '商业分析实习生',
    period: '2025.01 — 2025.05',
    summary: [
      '主要业务方向：小红书商业化，主 own 种草、闭环电商、线索三类广告营销产品专项工作。',
      '数据分析：搭建数据看板，从营销目的、新客老客、投放模式等角度拆解广告投放趋势；利用 Python 和 SQL 查询处理经营数据，撰写运营周报与团队周报。',
      '风险管理：配合部门管理者推进内部专项落地，计算 OKR 完成程度并预估结果；监控广告投放波动与商家消耗，通过漏斗/趋势分析下钻归因，定位新客商家投放掉量问题。',
      '行业洞察：使用内部数据工具（灵犀、redbi）进行数据抓取与分析，从不同维度为品牌/行业提炼营销洞察，定期输出行业研究报告与新商冷启优质案例 onepage。',
    ],
    blocks: [
      {
        title: '闭环电商高潜新客专项',
        items: [
          { k: '核心动作', v: '与新商品牌主理人访谈，了解用户对平台定位、困境与诉求，提供投放优化策略并定期监控复盘；从单品分析、GMV 构成、人群渗透率等方面提炼 TOP3 客户爆款笔记亮点，沉淀可迁移案例，为其他高潜新客提供参考。' },
          { k: '阶段成果', v: '入职期间高潜新商跃迁率较同期 ROI、CTCVR、转化成本、成本达成消耗占比均有优化；生态消费 1-4 月新客消耗同比去年 +41%，3-4 月高潜 10w+ GMV 新客投广率 +27%（70% → 89%）。' },
        ],
      },
    ],
    cover: '/intern/xiaohongshu.jpg',
  },
]

// 统一给 EDUCATION / PROJECTS 里的资源路径加 BASE_URL 前缀，
// 这样列表数据里仍写直观的 '/edu/...' 绝对路径，部署到子路径也不会 404。
export const EDUCATION: Edu[] = EDUCATION_RAW.map((e) => ({
  ...e,
  gallery: e.gallery.map((m) => ({
    ...m,
    src: asset(m.src),
    ...(m.poster ? { poster: asset(m.poster) } : {}),
  })),
}))

export const PROJECTS: Project[] = PROJECTS_RAW.map((p) => ({
  ...p,
  cover: Array.isArray(p.cover) ? p.cover.map(asset) : asset(p.cover),
}))
