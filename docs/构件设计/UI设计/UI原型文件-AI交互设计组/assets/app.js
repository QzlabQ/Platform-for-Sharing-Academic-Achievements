(function () {
  "use strict";

  const STORAGE_KEY = "scholarflow-ui-prototype-v1";
  const TYPE_LABEL = { paper: "论文", patent: "专利", project: "项目", award: "获奖" };
  const TYPE_SYMBOL = { paper: "论", patent: "专", project: "项", award: "奖" };
  const STATUS_CLASS = {
    "待执行": "waiting",
    "运行中": "running",
    "成功": "success",
    "失败": "failed",
    "重试": "retrying",
    "已停止": "stopped",
    "草稿": "withdrawn",
    "已提交": "submitted",
    "验证中": "verifying",
    "审核中": "reviewing",
    "已通过": "approved",
    "已驳回": "rejected",
    "已撤回": "withdrawn"
  };

  const achievements = [
    {
      id: "A-2026-001",
      type: "paper",
      title: "多模态大模型的知识边界评测与可信推理",
      authors: ["张知远", "林嘉禾", "周文"],
      scholarId: "S-001",
      year: 2026,
      field: "计算机科学",
      institution: "北京航空航天大学",
      venue: "中国科学：信息科学",
      source: "OpenAlex",
      updated: "3 天前更新",
      citations: 48,
      summary: "构建覆盖视觉、语言与结构化知识的统一评测集，提出面向事实一致性和推理链可追溯性的可信评估框架。",
      keywords: ["多模态大模型", "知识边界", "可信推理"],
      doi: "10.1360/SSI-2026-0142",
      review: "已审核公开",
      volume: "56(3)",
      pages: "412-431"
    },
    {
      id: "A-2025-014",
      type: "paper",
      title: "面向科研数据的异构知识图谱构建方法",
      authors: ["张知远", "周文", "李若溪"],
      scholarId: "S-001",
      year: 2025,
      field: "计算机科学",
      institution: "北京航空航天大学",
      venue: "软件学报",
      source: "Crossref",
      updated: "8 天前更新",
      citations: 76,
      summary: "针对论文、专利和项目元数据的结构差异，提出实体对齐、证据约束和图谱增量更新方法。",
      keywords: ["科研数据", "知识图谱", "实体对齐"],
      doi: "10.13328/j.cnki.jos.007112",
      review: "已审核公开",
      volume: "36(9)",
      pages: "3780-3802"
    },
    {
      id: "A-2025-022",
      type: "paper",
      title: "大模型驱动的软件架构决策辅助方法",
      authors: ["杨卓", "张知远", "傅淇"],
      scholarId: "S-002",
      year: 2025,
      field: "软件工程",
      institution: "北京航空航天大学",
      venue: "计算机研究与发展",
      source: "OpenAlex",
      updated: "12 天前更新",
      citations: 31,
      summary: "把架构决策记录与质量属性场景输入大模型，形成可追踪的候选方案比较和风险提示。",
      keywords: ["软件架构", "架构决策", "大模型"],
      doi: "10.7544/issn1000-1239.2025.20241021",
      review: "已审核公开",
      volume: "62(10)",
      pages: "2416-2431"
    },
    {
      id: "A-2024-067",
      type: "paper",
      title: "面向低资源场景的联邦学习隐私保护框架",
      authors: ["李若溪", "陈思远"],
      scholarId: "S-003",
      year: 2024,
      field: "人工智能",
      institution: "浙江大学",
      venue: "IEEE Transactions on Knowledge and Data Engineering",
      source: "OpenAlex",
      updated: "20 天前更新",
      citations: 112,
      summary: "提出自适应噪声分配与客户端漂移校正机制，在通信受限和标签稀疏条件下兼顾隐私与模型效用。",
      keywords: ["联邦学习", "隐私保护", "低资源"],
      doi: "10.1109/TKDE.2024.3382190",
      review: "已审核公开",
      volume: "36(11)",
      pages: "7021-7035"
    },
    {
      id: "P-2026-003",
      type: "project",
      title: "复杂软件系统智能运维关键技术研究",
      authors: ["张知远", "杨卓"],
      scholarId: "S-001",
      year: 2026,
      field: "软件工程",
      institution: "北京航空航天大学",
      venue: "国家自然科学基金",
      source: "NSFC",
      updated: "5 天前更新",
      citations: 0,
      summary: "围绕微服务系统的异常定位、根因分析与自适应恢复开展研究，建设可复现的智能运维实验平台。",
      keywords: ["智能运维", "微服务", "根因分析"],
      doi: "NSFC-62272018",
      review: "已审核公开",
      volume: "面上项目",
      pages: "2026-2029"
    },
    {
      id: "T-2025-018",
      type: "patent",
      title: "一种面向工业软件的多源数据融合系统及方法",
      authors: ["张知远", "胡云帆"],
      scholarId: "S-001",
      year: 2025,
      field: "软件工程",
      institution: "北京航空航天大学",
      venue: "国家知识产权局",
      source: "CNIPA",
      updated: "1 个月前更新",
      citations: 0,
      summary: "通过统一数据契约和证据链管理实现异构工业数据的接入、清洗、版本化与跨源关联。",
      keywords: ["工业软件", "数据融合", "证据链"],
      doi: "CN202510238761.4",
      review: "已审核公开",
      volume: "发明专利",
      pages: "授权"
    },
    {
      id: "A-2024-086",
      type: "paper",
      title: "图神经网络可解释性研究：从局部归因到结构解释",
      authors: ["陈思远", "李若溪"],
      scholarId: "S-003",
      year: 2024,
      field: "人工智能",
      institution: "浙江大学",
      venue: "计算机学报",
      source: "Crossref",
      updated: "1 个月前更新",
      citations: 93,
      summary: "系统梳理图神经网络的局部与全局解释方法，并提出面向异质图的证据子图评估协议。",
      keywords: ["图神经网络", "可解释性", "结构解释"],
      doi: "10.11897/SP.J.1016.2024.01031",
      review: "已审核公开",
      volume: "47(5)",
      pages: "1031-1052"
    },
    {
      id: "W-2024-009",
      type: "award",
      title: "中国电子学会自然科学奖二等奖：可信知识计算",
      authors: ["张知远", "周文"],
      scholarId: "S-001",
      year: 2024,
      field: "计算机科学",
      institution: "北京航空航天大学",
      venue: "中国电子学会",
      source: "CIE",
      updated: "2 个月前更新",
      citations: 0,
      summary: "表彰在复杂知识表示、证据约束推理和可信知识计算方向取得的系统性成果。",
      keywords: ["可信知识计算", "知识表示", "证据推理"],
      doi: "CIE-NS-2024-023",
      review: "已审核公开",
      volume: "省部级",
      pages: "二等奖"
    },
    {
      id: "A-2023-109",
      type: "paper",
      title: "基于事件日志的微服务故障传播路径识别",
      authors: ["杨卓", "张知远", "李浩正"],
      scholarId: "S-002",
      year: 2023,
      field: "软件工程",
      institution: "北京航空航天大学",
      venue: "计算机科学与探索",
      source: "OpenAlex",
      updated: "3 个月前更新",
      citations: 57,
      summary: "利用服务调用图和事件时序约束定位故障传播主路径，降低微服务系统根因分析的人工成本。",
      keywords: ["微服务", "故障传播", "事件日志"],
      doi: "10.3778/j.issn.1673-9418.2210087",
      review: "已审核公开",
      volume: "17(8)",
      pages: "1864-1878"
    },
    {
      id: "P-2025-012",
      type: "project",
      title: "面向科学发现的知识增强大模型基础研究",
      authors: ["李若溪", "陈思远"],
      scholarId: "S-003",
      year: 2025,
      field: "人工智能",
      institution: "浙江大学",
      venue: "国家重点研发计划",
      source: "MOST",
      updated: "4 个月前更新",
      citations: 0,
      summary: "研究知识增强大模型在科学假设生成、实验设计辅助和跨学科知识发现中的应用。",
      keywords: ["知识增强", "科学发现", "大模型"],
      doi: "2025YFA1003200",
      review: "已审核公开",
      volume: "青年科学家项目",
      pages: "2025-2028"
    },
    {
      id: "T-2024-031",
      type: "patent",
      title: "一种基于检索快照的稳定分页与隐私复核方法",
      authors: ["杨卓", "张知远"],
      scholarId: "S-002",
      year: 2024,
      field: "软件工程",
      institution: "北京航空航天大学",
      venue: "国家知识产权局",
      source: "CNIPA",
      updated: "6 个月前更新",
      citations: 0,
      summary: "在检索快照基础上叠加当前公开状态复核，兼顾结果翻页稳定性与隐私收紧的即时生效。",
      keywords: ["检索快照", "稳定分页", "隐私复核"],
      doi: "CN202410663219.8",
      review: "已审核公开",
      volume: "发明专利",
      pages: "公开"
    },
    {
      id: "A-2022-204",
      type: "paper",
      title: "科研人员实体消歧中的证据融合与人工确认机制",
      authors: ["周文", "张知远", "张奇容"],
      scholarId: "S-001",
      year: 2022,
      field: "计算机科学",
      institution: "北京航空航天大学",
      venue: "情报学报",
      source: "Crossref",
      updated: "1 年前更新",
      citations: 84,
      summary: "融合 ORCID、机构任职和合著关系证据，建立候选生成、冲突阻断与人工确认的分层消歧流程。",
      keywords: ["实体消歧", "证据融合", "人工确认"],
      doi: "10.3772/j.issn.1000-0135.2022.11.006",
      review: "已审核公开",
      volume: "41(11)",
      pages: "1178-1193"
    }
  ];

  const claimsSeed = [
    {
      id: "CLM-20261115-0037",
      applicant: "张知远",
      maskedAccount: "z****@buaa.edu.cn",
      portal: "张知远 · 计算机科学",
      institution: "北京航空航天大学",
      submittedAt: "2026-11-15 10:24",
      state: "审核中",
      orcid: "0000-0002-1825-0097",
      evidence: ["ORCID 公开档案", "代表性论文 DOI"],
      match: 96,
      statement: "本人长期从事知识图谱、可信知识计算与大模型评测研究，申请认领本学者门户，以维护个人成果信息并纠正来源标注。",
      history: [["10:24", "申请人提交材料"], ["10:25", "系统完成身份与材料预校验"], ["10:27", "进入管理员人工审核"]]
    },
    {
      id: "CLM-20261115-0036",
      applicant: "李若溪",
      maskedAccount: "l****@zju.edu.cn",
      portal: "李若溪 · 人工智能",
      institution: "浙江大学",
      submittedAt: "2026-11-15 09:41",
      state: "验证中",
      orcid: "0000-0001-5109-3700",
      evidence: ["ORCID 公开档案", "机构主页"],
      match: 91,
      statement: "申请认领本人学者门户，用于补充科研项目与获奖信息。",
      history: [["09:41", "申请人提交材料"], ["09:42", "系统正在进行材料核验"]]
    },
    {
      id: "CLM-20261114-0033",
      applicant: "王成宇",
      maskedAccount: "w****@tsinghua.edu.cn",
      portal: "王成宇 · 计算机科学",
      institution: "清华大学",
      submittedAt: "2026-11-14 16:08",
      state: "已提交",
      orcid: "0000-0002-9071-614X",
      evidence: ["ORCID 公开档案"],
      match: 84,
      statement: "申请维护本人成果列表。",
      history: [["16:08", "申请人提交材料"]]
    },
    {
      id: "CLM-20261114-0029",
      applicant: "陈思远",
      maskedAccount: "c****@zju.edu.cn",
      portal: "陈思远 · 人工智能",
      institution: "浙江大学",
      submittedAt: "2026-11-14 13:35",
      state: "已通过",
      orcid: "0000-0003-2951-8024",
      evidence: ["ORCID 公开档案", "机构主页"],
      match: 98,
      statement: "申请认领本人学者门户。",
      history: [["13:35", "申请人提交材料"], ["14:02", "管理员通过并授予门户管理权"]]
    },
    {
      id: "CLM-20261113-0022",
      applicant: "胡云帆",
      maskedAccount: "h****@buaa.edu.cn",
      portal: "胡云帆 · 软件工程",
      institution: "北京航空航天大学",
      submittedAt: "2026-11-13 11:18",
      state: "已驳回",
      orcid: "0000-0002-9930-2218",
      evidence: ["代表性论文 DOI"],
      match: 62,
      statement: "申请认领本人门户。",
      history: [["11:18", "申请人提交材料"], ["11:46", "管理员驳回：证明材料不足以确认本人身份"]]
    }
  ];

  const tasksSeed = [
    {
      id: "CT-20261115-018",
      name: "OpenAlex 论文增量同步",
      source: "OpenAlex",
      scope: "2026-11 增量 · 计算机科学",
      state: "运行中",
      progress: 68,
      count: "8,640 / 12,700",
      startedAt: "2026-11-15 09:40",
      operator: "管理员 02",
      duration: "42 分钟"
    },
    {
      id: "CT-20261115-017",
      name: "Crossref DOI 信息补全",
      source: "Crossref",
      scope: "缺失 DOI 记录 · 全领域",
      state: "成功",
      progress: 100,
      count: "3,218 / 3,218",
      startedAt: "2026-11-15 08:12",
      operator: "管理员 01",
      duration: "31 分钟"
    },
    {
      id: "CT-20261114-016",
      name: "国家自然科学基金项目采集",
      source: "NSFC",
      scope: "2024-2026 · 面上项目",
      state: "失败",
      progress: 37,
      count: "4,210 / 11,500",
      startedAt: "2026-11-14 21:05",
      operator: "管理员 02",
      duration: "18 分钟后中断"
    },
    {
      id: "CT-20261114-015",
      name: "专利著录项批量更新",
      source: "CNIPA",
      scope: "2025 授权专利",
      state: "待执行",
      progress: 0,
      count: "0 / 2,850",
      startedAt: "计划 2026-11-16 02:00",
      operator: "管理员 01",
      duration: "-"
    },
    {
      id: "CT-20261113-014",
      name: "学会获奖数据采集",
      source: "CIE",
      scope: "2022-2026 · 电子学会",
      state: "已停止",
      progress: 52,
      count: "682 / 1,310",
      startedAt: "2026-11-13 15:30",
      operator: "管理员 03",
      duration: "27 分钟后停止"
    },
    {
      id: "CT-20261113-013",
      name: "机构名称规范化补跑",
      source: "Internal",
      scope: "机构别名映射规则 v3",
      state: "重试",
      progress: 12,
      count: "1,280 / 10,000",
      startedAt: "计划 2026-11-15 16:00",
      operator: "管理员 02",
      duration: "等待退避"
    },
    {
      id: "CT-20261112-012",
      name: "OpenAlex 全量阶段快照",
      source: "OpenAlex",
      scope: "计算机科学 · 2018-2025",
      state: "成功",
      progress: 100,
      count: "42,186 / 42,186",
      startedAt: "2026-11-12 02:00",
      operator: "调度器",
      duration: "2 小时 18 分"
    }
  ];

  const state = {
    route: "search",
    query: "",
    selectedTypes: [],
    selectedYears: [],
    field: "all",
    institution: "all",
    sort: "relevance",
    page: 1,
    pageSize: 5,
    currentAchievement: "A-2026-001",
    portalTab: "overview",
    claimStep: 1,
    claimForm: {
      applicant: "张知远",
      orcid: "",
      doi: "10.1360/SSI-2026-0142",
      evidenceUrl: "",
      statement: "",
      consent: false
    },
    claimStatus: "none",
    reviewNote: "",
    claimPageMode: "form",
    tasks: tasksSeed.map((item) => ({ ...item })),
    taskState: "all",
    taskQuery: "",
    taskPage: 1,
    selectedTask: null,
    createTaskDrawer: false,
    claims: claimsSeed.map((item) => ({ ...item })),
    claimQueueState: "待审核",
    selectedClaimId: "CLM-20261115-0037",
    demoOpen: false
  };

  const app = document.getElementById("app");
  const overlayRoot = document.getElementById("overlay-root");
  const toastRoot = document.getElementById("toast-root");
  const demoPanel = document.getElementById("demo-panel");
  const demoLauncher = document.getElementById("demo-launcher");

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatNumber(value) {
    return Number(value || 0).toLocaleString("zh-CN");
  }

  function iconSearch(size = 18) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" stroke-width="1.8"/><path d="m16 16 4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
  }

  function iconInfo(size = 15) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="M12 10.5v6M12 7.3v.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;
  }

  function iconExternal(size = 13) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 5h5v5M19 5l-7.5 7.5M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  function brandMarkup() {
    return `<a class="brand" href="#search" data-go="search" aria-label="ScholarFlow 首页">
      <span class="brand-mark"><span></span></span>
      <span>ScholarFlow</span>
    </a>`;
  }

  function siteHeader(active) {
    return `<header class="site-header">
      <div class="header-inner">
        ${brandMarkup()}
        <nav class="main-nav" aria-label="主导航">
          <a href="#search" data-go="search" class="${active === "search" ? "active" : ""}">成果检索</a>
          <a href="#scholar" data-go="scholar" class="${active === "scholar" ? "active" : ""}">学者门户</a>
          <a href="#search" data-suggest-query="知识图谱">数据洞察</a>
        </nav>
        <div class="header-actions">
          <a class="button ghost small" href="#admin-tasks" data-go="admin-tasks">管理后台</a>
          <span class="header-user"><span class="avatar">张</span>张知远</span>
        </div>
      </div>
    </header>`;
  }

  function typeIcon(type) {
    return `<span class="type-icon ${type}">${TYPE_SYMBOL[type] || "成"}</span>`;
  }

  function statusBadge(status) {
    return `<span class="status-badge ${STATUS_CLASS[status] || "waiting"}">${escapeHtml(status)}</span>`;
  }

  function routeFromHash() {
    const route = window.location.hash.replace(/^#/, "").split("?")[0];
    const allowed = ["search", "scholar", "detail", "claim", "admin-tasks", "admin-claims"];
    return allowed.includes(route) ? route : "search";
  }

  function normalizeQuery(value) {
    return String(value || "").trim().replace(/\s+/g, " ").toLocaleLowerCase("zh-CN");
  }

  function filteredAchievements() {
    const query = normalizeQuery(state.query);
    let rows = achievements.filter((item) => {
      const typeOk = !state.selectedTypes.length || state.selectedTypes.includes(item.type);
      const yearOk = !state.selectedYears.length || state.selectedYears.includes(String(item.year));
      const fieldOk = state.field === "all" || item.field === state.field;
      const institutionOk = state.institution === "all" || item.institution === state.institution;
      const haystack = normalizeQuery([
        item.id,
        item.title,
        item.authors.join(" "),
        item.summary,
        item.keywords.join(" "),
        item.field,
        item.institution,
        item.venue,
        item.doi
      ].join(" "));
      const queryOk = !query || haystack.includes(query);
      return typeOk && yearOk && fieldOk && institutionOk && queryOk;
    });

    if (state.sort === "year") {
      rows = rows.slice().sort((a, b) => b.year - a.year || b.citations - a.citations);
    } else if (state.sort === "cited") {
      rows = rows.slice().sort((a, b) => b.citations - a.citations || b.year - a.year);
    } else if (state.sort === "title") {
      rows = rows.slice().sort((a, b) => a.title.localeCompare(b.title, "zh-CN"));
    } else {
      const exact = query ? rows.filter((item) => normalizeQuery(item.title).includes(query) || normalizeQuery(item.id) === query) : [];
      const rest = rows.filter((item) => !exact.includes(item));
      rows = exact.concat(rest);
    }
    return rows;
  }

  function resultsForType(type) {
    return achievements.filter((item) => item.type === type).length;
  }

  function uniqueYears() {
    return [...new Set(achievements.map((item) => String(item.year)))].sort((a, b) => Number(b) - Number(a));
  }

  function uniqueInstitutions() {
    return [...new Set(achievements.map((item) => item.institution))].sort((a, b) => a.localeCompare(b, "zh-CN"));
  }

  function activeFilterMarkup() {
    const chips = [];
    if (state.query) chips.push({ key: "query", label: `关键词：${state.query}` });
    state.selectedTypes.forEach((type) => chips.push({ key: `type:${type}`, label: `类型：${TYPE_LABEL[type]}` }));
    state.selectedYears.forEach((year) => chips.push({ key: `year:${year}`, label: `年份：${year}` }));
    if (state.field !== "all") chips.push({ key: "field", label: `领域：${state.field}` });
    if (state.institution !== "all") chips.push({ key: "institution", label: `机构：${state.institution}` });
    if (!chips.length) return `<div class="active-filters"></div>`;
    return `<div class="active-filters visible">
      ${chips.map((chip) => `<span class="filter-chip">${escapeHtml(chip.label)}<button type="button" data-clear-filter="${chip.key}" aria-label="移除筛选">×</button></span>`).join("")}
      <button class="button text small" type="button" data-clear-all>清除全部</button>
    </div>`;
  }

  function resultCard(item) {
    return `<article class="result-card">
      ${typeIcon(item.type)}
      <div class="result-main">
        <div class="result-eyebrow">
          <span>${TYPE_LABEL[item.type]}</span>
          <span>·</span>
          <span>${escapeHtml(item.year)}</span>
          <span>·</span>
          <span>${escapeHtml(item.field)}</span>
        </div>
        <a class="result-title" href="#detail" data-open-detail="${item.id}">${escapeHtml(item.title)}</a>
        <div class="result-authors">
          ${item.authors.map((author, index) => `${index ? '<span>、</span>' : ""}<button type="button" class="author-link button text small" data-go="scholar">${escapeHtml(author)}</button>`).join("")}
          <span>· ${escapeHtml(item.institution)}</span>
        </div>
        <p class="result-summary">${escapeHtml(item.summary)}</p>
        <div class="tag-row">
          ${item.keywords.map((keyword) => `<span class="tag">${escapeHtml(keyword)}</span>`).join("")}
          <span class="tag green">来源已核验</span>
        </div>
      </div>
      <div class="result-aside">
        <span class="source-badge">${escapeHtml(item.source)} ${iconExternal(11)}</span>
        <div style="text-align:right">
          <div><span class="tag blue">被引 ${item.citations}</span></div>
          <div class="date-label" style="margin-top:7px">${escapeHtml(item.updated)}</div>
        </div>
      </div>
    </article>`;
  }

  function paginationMarkup(total, page, pageSize, target) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const pages = [];
    for (let i = 1; i <= totalPages; i += 1) pages.push(i);
    const from = total ? (page - 1) * pageSize + 1 : 0;
    const to = Math.min(page * pageSize, total);
    return `<div class="pagination">
      <span>第 ${from}-${to} 条，共 ${formatNumber(total)} 条</span>
      <div class="page-buttons">
        <button class="page-button" type="button" data-${target}-page="${page - 1}" ${page <= 1 ? "disabled" : ""} aria-label="上一页">‹</button>
        ${pages.map((number) => `<button class="page-button ${number === page ? "active" : ""}" type="button" data-${target}-page="${number}" ${number === page ? 'aria-current="page"' : ""}>${number}</button>`).join("")}
        <button class="page-button" type="button" data-${target}-page="${page + 1}" ${page >= totalPages ? "disabled" : ""} aria-label="下一页">›</button>
      </div>
    </div>`;
  }

  function renderSearch() {
    const rows = filteredAchievements();
    const totalPages = Math.max(1, Math.ceil(rows.length / state.pageSize));
    if (state.page > totalPages) state.page = totalPages;
    const pageRows = rows.slice((state.page - 1) * state.pageSize, state.page * state.pageSize);

    return `${siteHeader("search")}
      <section class="search-hero">
        <div class="page-wrap hero-inner">
          <div class="eyebrow">可信学术知识入口</div>
          <h1>发现可信的学术成果</h1>
          <p class="hero-subtitle">汇聚论文、专利、科研项目与获奖信息。检索结果经过公开范围复核，并保留来源与更新时间，便于判断“查到的是哪项成果、属于谁、来自哪里”。</p>
          <form class="search-bar" id="search-form" role="search">
            <span class="search-bar-icon">${iconSearch(20)}</span>
            <input id="search-query" name="query" value="${escapeHtml(state.query)}" autocomplete="off" placeholder="输入成果标题、作者、关键词或 DOI" aria-label="检索关键词">
            <button class="button primary" type="submit">检索</button>
          </form>
          <div class="search-suggestions">
            <span>热门：</span>
            <button type="button" data-suggest-query="大模型">大模型</button>
            <button type="button" data-suggest-query="知识图谱">知识图谱</button>
            <button type="button" data-suggest-query="软件工程">软件工程</button>
            <button type="button" data-suggest-query="张知远">张知远</button>
          </div>
        </div>
      </section>
      <main class="page-wrap search-layout">
        <aside class="filter-panel" aria-label="筛选条件">
          <div class="filter-head">
            <strong>筛选条件</strong>
            <button class="button text small" type="button" data-clear-all>重置</button>
          </div>
          <div class="filter-body">
            <div class="filter-section">
              <div class="filter-label">成果类型 <span>多选</span></div>
              ${Object.entries(TYPE_LABEL).map(([type, label]) => `<label class="check-row">
                <span class="check-left"><input type="checkbox" data-filter-type="${type}" ${state.selectedTypes.includes(type) ? "checked" : ""}>${label}</span>
                <span class="check-count">${resultsForType(type)}</span>
              </label>`).join("")}
            </div>
            <div class="filter-section">
              <div class="filter-label">成果年份 <span>多选</span></div>
              ${uniqueYears().map((year) => `<label class="check-row">
                <span class="check-left"><input type="checkbox" data-filter-year="${year}" ${state.selectedYears.includes(year) ? "checked" : ""}>${year}</span>
                <span class="check-count">${achievements.filter((item) => String(item.year) === year).length}</span>
              </label>`).join("")}
            </div>
            <div class="filter-section">
              <div class="filter-label">学术领域</div>
              <select class="field-select" id="filter-field" aria-label="学术领域">
                <option value="all">全部领域</option>
                ${[...new Set(achievements.map((item) => item.field))].map((field) => `<option value="${escapeHtml(field)}" ${state.field === field ? "selected" : ""}>${escapeHtml(field)}</option>`).join("")}
              </select>
            </div>
            <div class="filter-section">
              <div class="filter-label">所属机构</div>
              <select class="field-select" id="filter-institution" aria-label="所属机构">
                <option value="all">全部机构</option>
                ${uniqueInstitutions().map((institution) => `<option value="${escapeHtml(institution)}" ${state.institution === institution ? "selected" : ""}>${escapeHtml(institution)}</option>`).join("")}
              </select>
            </div>
          </div>
        </aside>
        <section aria-labelledby="results-title">
          <div class="results-header">
            <div>
              <h2 class="results-title" id="results-title">${state.query ? `“${escapeHtml(state.query)}”的检索结果` : "近期公开成果"}</h2>
              <div class="results-meta">找到 <strong>${formatNumber(rows.length)}</strong> 项匹配结果 · 当前为公开可见范围</div>
            </div>
            <div class="results-controls">
              <select class="compact-select" id="sort-select" aria-label="排序方式">
                <option value="relevance" ${state.sort === "relevance" ? "selected" : ""}>相关性优先</option>
                <option value="year" ${state.sort === "year" ? "selected" : ""}>年份从新到旧</option>
                <option value="cited" ${state.sort === "cited" ? "selected" : ""}>被引次数最多</option>
                <option value="title" ${state.sort === "title" ? "selected" : ""}>标题排序</option>
              </select>
              <div class="view-toggle" aria-label="视图切换">
                <button type="button" class="active" aria-label="列表视图">☷</button>
                <button type="button" aria-label="网格视图（演示占位）">▦</button>
              </div>
            </div>
          </div>
          <div class="snapshot-note">${iconInfo(15)}使用同一检索快照翻页；结果返回前仍会按当前公开范围复核，隐私收紧即时生效。</div>
          ${activeFilterMarkup()}
          <div class="result-list" id="result-list">
            ${pageRows.length ? pageRows.map(resultCard).join("") : `<div class="empty-state">
              <div>
                <div class="empty-illustration">⌕</div>
                <h3>没有找到匹配成果</h3>
                <p>这是正常的空结果。可减少筛选条件或换一个更宽泛的关键词。</p>
                <button class="button secondary" type="button" data-clear-all>清除筛选条件</button>
              </div>
            </div>`}
          </div>
          ${rows.length ? paginationMarkup(rows.length, state.page, state.pageSize, "search") : ""}
        </section>
      </main>`;
  }

  function renderPortalAchievement(item) {
    return `<article class="achievement-mini">
      <span class="mini-icon">${TYPE_SYMBOL[item.type]}</span>
      <div>
        <h3><a href="#detail" data-open-detail="${item.id}">${escapeHtml(item.title)}</a></h3>
        <div class="mini-meta">
          <span>${TYPE_LABEL[item.type]}</span>
          <span>${item.year}</span>
          <span>${escapeHtml(item.venue)}</span>
          <span>被引 ${item.citations}</span>
        </div>
      </div>
    </article>`;
  }

  function renderScholar() {
    const scholarItems = achievements.filter((item) => item.scholarId === "S-001");
    const tabs = [
      ["overview", "概览"],
      ["paper", "论文 8"],
      ["project", "科研项目 3"],
      ["patent", "专利 2"],
      ["award", "获奖 1"]
    ];
    let tabItems = scholarItems;
    if (state.portalTab !== "overview") tabItems = scholarItems.filter((item) => item.type === state.portalTab);
    if (!tabItems.length) tabItems = scholarItems.slice(0, 2);
    const claimApproved = state.claimStatus === "approved";

    return `${siteHeader("scholar")}
      <main class="page-wrap">
        <div class="breadcrumb"><a href="#search" data-go="search">成果检索</a><span class="sep">/</span><span>学者门户</span></div>
        <section class="portal-hero">
          <div class="portal-cover"></div>
          <div class="portal-head">
            <div class="portal-identity">
              <div class="portal-avatar">张</div>
              <div class="portal-name-block">
                <h1>张知远 <span class="verified-dot" title="身份已核验">✓</span></h1>
                <div class="portal-subtitle">教授 · 博士生导师　北京航空航天大学 · 计算机学院</div>
                <div class="portal-tags">
                  <span class="tag blue">知识工程</span>
                  <span class="tag blue">可信人工智能</span>
                  <span class="tag green">ORCID 已核验</span>
                  <span class="tag">计算机科学</span>
                </div>
              </div>
            </div>
            <div class="portal-actions">
              <button class="button secondary" type="button" data-toast="已复制门户链接">分享门户</button>
              ${claimApproved
                ? '<button class="button primary" type="button" data-toast="已进入门户成果管理">管理门户</button>'
                : '<button class="button primary" href="#claim" data-go="claim">认领此门户</button>'}
            </div>
          </div>
          <div class="portal-stats">
            <div class="stat-cell"><div class="stat-value">14</div><div class="stat-label">公开成果</div></div>
            <div class="stat-cell"><div class="stat-value">2,486</div><div class="stat-label">总被引</div></div>
            <div class="stat-cell"><div class="stat-value">h-index 26</div><div class="stat-label">学术影响力</div></div>
            <div class="stat-cell"><div class="stat-value">2026-11-12</div><div class="stat-label">最近更新</div></div>
          </div>
        </section>
        <div class="portal-layout">
          <section>
            ${!claimApproved ? `<div class="claim-banner">
              <div><strong>该学者门户尚未被本人认领</strong><span>当前展示内容来自公开数据；本人可提交 ORCID、机构主页或代表性成果作为认领证据。</span></div>
              <button class="button small secondary" type="button" data-go="claim">申请认领</button>
            </div>` : ""}
            <div class="content-card" style="margin-top:${claimApproved ? "0" : "16px"}">
              <div class="tabs">
                ${tabs.map(([id, label]) => `<button type="button" class="tab ${state.portalTab === id ? "active" : ""}" data-portal-tab="${id}">${label}</button>`).join("")}
              </div>
              ${state.portalTab === "overview" ? `
                <div class="content-card-head"><h2>学者简介</h2><span class="tag green">数据更新于 3 天前</span></div>
                <div class="content-card-body">
                  <p class="section-copy">围绕知识图谱、可解释人工智能与可信知识计算开展研究，关注学术数据的实体消歧、来源追溯和知识驱动推理。主持国家自然科学基金项目，在相关领域发表多篇论文。</p>
                </div>
                <div class="content-card-head" style="border-top:1px solid #edf0f5"><h2>代表性成果</h2><a class="button text small" href="#search" data-suggest-query="张知远">查看全部</a></div>
                <div class="achievement-mini-list">${scholarItems.slice(0, 4).map(renderPortalAchievement).join("")}</div>
              ` : `
                <div class="content-card-head"><h2>${escapeHtml(tabs.find((item) => item[0] === state.portalTab)?.[1] || "成果")}</h2><span class="tag green">仅展示公开成果</span></div>
                <div class="achievement-mini-list">${tabItems.map(renderPortalAchievement).join("")}</div>
              `}
            </div>
          </section>
          <aside class="side-stack">
            <div class="side-card">
              <h3>学术档案</h3>
              <div class="info-row"><span class="info-label">ORCID</span><span class="info-value">0000-0002-1825-0097</span></div>
              <div class="info-row"><span class="info-label">电子邮箱</span><span class="info-value">z****@buaa.edu.cn <span class="tag">受保护</span></span></div>
              <div class="info-row"><span class="info-label">所属机构</span><span class="info-value">北京航空航天大学</span></div>
              <div class="info-row"><span class="info-label">研究领域</span><span class="info-value">知识工程、可信 AI</span></div>
              <div class="info-row"><span class="info-label">门户状态</span><span class="info-value">${claimApproved ? '<span class="tag green">已认领</span>' : '<span class="tag">待认领</span>'}</span></div>
            </div>
            <div class="side-card">
              <h3>研究主题分布</h3>
              <div class="topic-bars">
                <div><div class="topic-bar-head"><span>知识图谱</span><b>42%</b></div><div class="bar-track"><div class="bar-fill" style="width:42%"></div></div></div>
                <div><div class="topic-bar-head"><span>可信 AI</span><b>31%</b></div><div class="bar-track"><div class="bar-fill" style="width:31%"></div></div></div>
                <div><div class="topic-bar-head"><span>大模型评测</span><b>18%</b></div><div class="bar-track"><div class="bar-fill" style="width:18%"></div></div></div>
                <div><div class="topic-bar-head"><span>科研数据治理</span><b>9%</b></div><div class="bar-track"><div class="bar-fill" style="width:9%"></div></div></div>
              </div>
            </div>
            <div class="side-card">
              <h3>发现信息有误？</h3>
              <p style="margin-bottom:12px;color:#667085;font-size:11px">可提交纠错或发起归属申诉，管理员会保留修改前后值与理由。</p>
              <button class="button secondary small" type="button" data-toast="纠错入口已记录为演示动作">提交纠错</button>
            </div>
          </aside>
        </div>
      </main>`;
  }

  function currentAchievement() {
    return achievements.find((item) => item.id === state.currentAchievement) || achievements[0];
  }

  function renderDetail() {
    const item = currentAchievement();
    const metadataLabel = item.type === "paper"
      ? ["期刊", "卷期", "页码", "DOI"]
      : item.type === "project"
        ? ["资助来源", "批准号", "项目周期", "项目类别"]
        : item.type === "patent"
          ? ["申请机构", "申请号", "法律状态", "专利类型"]
          : ["颁奖机构", "奖项编号", "获奖等级", "获奖年度"];
    const metadataValues = [item.venue, item.volume, item.pages, item.doi];

    return `${siteHeader("search")}
      <main class="page-wrap">
        <div class="breadcrumb">
          <a href="#search" data-go="search">成果检索</a><span class="sep">/</span>
          <span>${TYPE_LABEL[item.type]}</span><span class="sep">/</span><span>成果详情</span>
        </div>
        <div class="detail-layout">
          <article class="detail-main">
            <header class="detail-heading">
              <div class="detail-type"><span class="type-pill">${TYPE_LABEL[item.type]}</span><span>${escapeHtml(item.field)}</span><span>·</span><span>${escapeHtml(item.year)}</span><span>·</span><span>${escapeHtml(item.review)}</span></div>
              <h1>${escapeHtml(item.title)}</h1>
              <div class="detail-authors">
                ${item.authors.map((author, index) => `${index ? '<span class="author-separator">·</span>' : ""}<a href="#scholar" data-go="scholar">${escapeHtml(author)}</a>`).join("")}
                <span class="author-separator">·</span><span>${escapeHtml(item.institution)}</span>
              </div>
              <div class="detail-actions">
                <button class="button primary" type="button" data-toast="引用信息已复制">复制引用</button>
                <button class="button secondary" type="button" data-toast="已加入收藏">收藏</button>
                <button class="button ghost" type="button" data-toast="纠错表单已打开（演示）">报告信息问题</button>
              </div>
            </header>
            <div class="detail-body">
              <section class="detail-section">
                <h2>摘要</h2>
                <p>${escapeHtml(item.summary)} 本页展示元数据与来源证据，正式公开范围以当前审核状态与字段策略为准。页面中的作者关系不等同于门户认领授权。</p>
              </section>
              <section class="detail-section">
                <h2>著录信息</h2>
                <div class="metadata-grid">
                  ${metadataLabel.map((label, index) => `<div class="metadata-cell"><span>${escapeHtml(label)}</span><strong>${escapeHtml(metadataValues[index] || "—")}</strong></div>`).join("")}
                </div>
              </section>
              <section class="detail-section">
                <h2>关键词</h2>
                <div class="tag-row">${item.keywords.map((keyword) => `<span class="tag blue">${escapeHtml(keyword)}</span>`).join("")}</div>
              </section>
              <section class="detail-section">
                <h2>推荐引用</h2>
                <div class="citation-box">
                  ${escapeHtml(item.authors.join(", "))}. ${escapeHtml(item.title)}[${TYPE_LABEL[item.type]}]. ${escapeHtml(item.venue)}, ${escapeHtml(item.year)}, ${escapeHtml(item.volume)}: ${escapeHtml(item.pages)}. DOI: ${escapeHtml(item.doi)}.
                  <button class="icon-button" type="button" data-toast="引用信息已复制" aria-label="复制引用">⧉</button>
                </div>
              </section>
              <section class="detail-section">
                <h2>来源与追溯</h2>
                <div class="source-trace">
                  <div class="source-item">
                    <span class="source-logo">${escapeHtml(item.source.slice(0, 4))}</span>
                    <div><strong>${escapeHtml(item.source)} 公开元数据</strong><span>采集于 2026-11-12 · 许可摘要：公开元数据 · 快照已保存</span><br><a href="#search" data-go="search">查看来源记录 ${iconExternal(10)}</a></div>
                  </div>
                  <div class="source-item">
                    <span class="source-logo">稽</span>
                    <div><strong>平台审核记录</strong><span>记录审核状态：reviewed / public · 字段级公开策略已通过</span><br><a href="#admin-tasks" data-go="admin-tasks">查看处理批次 CT-20261112-012</a></div>
                  </div>
                </div>
                <div class="integrity-box">${iconInfo(13)} 来源原值与规范值分开保存；技术采集成功不代表人工审核通过，当前记录已满足公开条件。</div>
              </section>
            </div>
          </article>
          <aside class="side-stack">
            <div class="side-card">
              <h3>成果状态</h3>
              <div class="info-row"><span class="info-label">审核状态</span><span class="info-value"><span class="tag green">已审核公开</span></span></div>
              <div class="info-row"><span class="info-label">数据来源</span><span class="info-value">${escapeHtml(item.source)}</span></div>
              <div class="info-row"><span class="info-label">更新时间</span><span class="info-value">2026-11-12 08:42</span></div>
              <div class="info-row"><span class="info-label">来源版本</span><span class="info-value mono">SRC-v2026.11.12-03</span></div>
            </div>
            <div class="side-card">
              <h3>作者门户</h3>
              <div class="selected-portal" style="padding:13px;background:#fbfcff">
                <span class="avatar">张</span>
                <div><strong>张知远</strong><span>北京航空航天大学 · 计算机学院</span></div>
              </div>
              <p style="margin:13px 0 0;color:#667085;font-size:11px">认领门户用于维护个人展示信息，不会自动确认本文的所有作者关系。</p>
              <button class="button secondary small" style="width:100%;margin-top:12px" type="button" data-go="claim">申请认领该学者门户</button>
            </div>
            <div class="side-card">
              <h3>相关成果</h3>
              <div class="achievement-mini-list">
                ${achievements.filter((candidate) => candidate.id !== item.id && candidate.field === item.field).slice(0, 2).map((candidate) => `<article class="achievement-mini" style="padding:12px 0 12px 36px">
                  <span class="mini-icon" style="top:12px;left:0">${TYPE_SYMBOL[candidate.type]}</span>
                  <div><h3><a href="#detail" data-open-detail="${candidate.id}">${escapeHtml(candidate.title)}</a></h3><div class="mini-meta"><span>${candidate.year}</span><span>被引 ${candidate.citations}</span></div></div>
                </article>`).join("")}
              </div>
            </div>
          </aside>
        </div>
      </main>`;
  }

  function claimStepsMarkup() {
    return `<div class="steps" aria-label="认领申请步骤">
      ${["选择门户", "填写证明材料", "确认并提交"].map((label, index) => `<div class="step ${state.claimStep === index + 1 ? "active" : ""} ${state.claimStep > index + 1 ? "done" : ""}">
        <span class="step-number">${state.claimStep > index + 1 ? "✓" : index + 1}</span><span>${label}</span>
      </div>`).join("")}
    </div>`;
  }

  function claimSummaryMarkup() {
    return `<aside class="side-summary">
      <div class="side-summary-head">申请摘要</div>
      <div class="side-summary-body">
        <div class="summary-row"><span>目标门户</span><strong>张知远 · 计算机科学</strong></div>
        <div class="summary-row"><span>申请账号</span><strong>z****@buaa.edu.cn</strong></div>
        <div class="summary-row"><span>ORCID</span><strong>${escapeHtml(state.claimForm.orcid || "待填写")}</strong></div>
        <div class="summary-row"><span>证据材料</span><strong>${state.claimForm.evidenceUrl || state.claimForm.doi ? "已填写" : "待填写"}</strong></div>
        <div class="policy-note">认领通过仅授予本人门户的管理权，不自动确认所有成果署名。证明材料仅向有审核权限的管理员开放。</div>
        <div class="review-steps-note">
          <h4>提交后的审核路径</h4>
          <div class="mini-timeline">
            <div class="timeline-item active">已提交</div>
            <div class="timeline-item">验证中 · 系统核验材料</div>
            <div class="timeline-item">审核中 · 管理员人工决定</div>
            <div class="timeline-item">审核结果 · 站内通知</div>
          </div>
        </div>
      </div>
    </aside>`;
  }

  function claimFormStepMarkup() {
    if (state.claimStep === 1) {
      return `<div class="claim-form">
        <div class="form-section-head"><span class="form-section-index">01</span><div><h2>确认目标学者门户</h2><p>请确认这是您的个人学者档案，申请通过后可管理公开展示信息。</p></div></div>
        <div class="selected-portal">
          <span class="avatar">张</span>
          <div style="flex:1"><strong>张知远 · 计算机科学</strong><span>北京航空航天大学 · 计算机学院　ORCID 0000-0002-1825-0097</span></div>
          <span class="tag green">待认领</span>
        </div>
        <div class="form-grid" style="margin-top:20px">
          <div class="form-group"><label class="form-label">申请账号</label><input class="input" value="z****@buaa.edu.cn" disabled><span class="form-help">身份取自当前登录会话，不可手工填写。</span></div>
          <div class="form-group"><label class="form-label">门户现有状态</label><input class="input" value="未认领 · 无管理所有者" disabled><span class="form-help">若已被认领，可进入申诉流程。</span></div>
        </div>
        <label class="check-row" style="margin-top:22px;padding:13px;border:1px solid var(--line);border-radius:9px">
          <span class="check-left"><input type="checkbox" id="portal-confirm" checked>我确认选择的是本人学者门户</span>
        </label>
        <div class="claim-footer"><span></span><div class="claim-footer-right"><button class="button primary" type="button" data-claim-next="2">下一步：填写材料</button></div></div>
      </div>`;
    }
    if (state.claimStep === 2) {
      return `<div class="claim-form">
        <div class="form-section-head"><span class="form-section-index">02</span><div><h2>提交身份与归属证据</h2><p>至少提供一种可公开核验的身份证据；材料不完整时可保存草稿。</p></div></div>
        <div class="form-grid">
          <div class="form-group"><label class="form-label" for="claim-orcid">ORCID<span class="required">*</span></label><input class="input" id="claim-orcid" value="${escapeHtml(state.claimForm.orcid)}" placeholder="0000-0000-0000-0000"><span class="form-help">用于与公开 ORCID 档案交叉核验。</span></div>
          <div class="form-group"><label class="form-label" for="claim-doi">代表性成果 DOI / 编号</label><input class="input" id="claim-doi" value="${escapeHtml(state.claimForm.doi)}" placeholder="例如 10.1360/SSI-2026-0142"><span class="form-help">作为身份关联的补充证据，不自动确认全部署名。</span></div>
          <div class="form-group full"><label class="form-label" for="claim-url">机构主页或个人主页</label><input class="input" id="claim-url" value="${escapeHtml(state.claimForm.evidenceUrl)}" placeholder="https://"><span class="form-help">页面应包含姓名、任职机构与至少一项代表性成果。</span></div>
          <div class="form-group full"><label class="form-label">补充证明材料</label><div class="upload-zone" id="upload-evidence"><span style="font-size:23px">⇧</span><div><strong>点击上传或拖放文件</strong><span>PDF / JPG / PNG，单个文件不超过 10 MB</span></div></div>
            <div class="uploaded-file"><span class="file-icon">PDF</span><span>ORCID-public-record.pdf</span><button class="button text small" style="margin-left:auto" type="button" data-remove-file>移除</button></div>
          </div>
          <div class="form-group full"><label class="form-label" for="claim-statement">申请说明<span class="required">*</span></label><textarea class="textarea" id="claim-statement" placeholder="简要说明您与该门户的对应关系">${escapeHtml(state.claimForm.statement)}</textarea></div>
        </div>
        <div class="claim-footer">
          <button class="button ghost" type="button" data-claim-prev="1">← 上一步</button>
          <div class="claim-footer-right"><button class="button secondary" type="button" data-save-draft>保存草稿</button><button class="button primary" type="button" data-claim-next="3">下一步：确认提交</button></div>
        </div>
      </div>`;
    }
    return `<div class="claim-form">
      <div class="form-section-head"><span class="form-section-index">03</span><div><h2>确认申请信息</h2><p>提交后申请进入“已提交 → 验证中 → 审核中”，审核期间可查询进度或撤回。</p></div></div>
      <div class="metadata-grid">
        <div class="metadata-cell"><span>目标门户</span><strong>张知远 · 计算机科学</strong></div>
        <div class="metadata-cell"><span>申请账号</span><strong>z****@buaa.edu.cn</strong></div>
        <div class="metadata-cell"><span>ORCID</span><strong>${escapeHtml(state.claimForm.orcid || "未填写")}</strong></div>
        <div class="metadata-cell"><span>补充证据</span><strong>ORCID 公开档案 + ${escapeHtml(state.claimForm.doi || "代表性成果")}</strong></div>
        <div class="metadata-cell" style="grid-column:1/-1"><span>申请说明</span><strong style="line-height:1.7">${escapeHtml(state.claimForm.statement || "未填写")}</strong></div>
      </div>
      <label class="check-row" style="margin-top:20px;padding:13px;border:1px solid var(--line);border-radius:9px">
        <span class="check-left"><input type="checkbox" id="claim-consent" ${state.claimForm.consent ? "checked" : ""}>我确认材料真实，并同意管理员在审核范围内核验</span>
      </label>
      <div class="claim-footer"><button class="button ghost" type="button" data-claim-prev="2">← 修改材料</button><div class="claim-footer-right"><button class="button primary" type="button" data-submit-claim>提交认领申请</button></div></div>
    </div>`;
  }

  function claimResultMarkup() {
    const status = state.claimStatus;
    const isApproved = status === "approved";
    const isRejected = status === "rejected";
    const statusLabel = isApproved ? "已通过" : isRejected ? "已驳回" : "审核中";
    return `<div class="claim-result">
      <div class="result-icon ${isApproved ? "" : isRejected ? "rejected" : "pending"}">${isApproved ? "✓" : isRejected ? "!" : "⌛"}</div>
      <h2>${isApproved ? "认领申请已通过" : isRejected ? "认领申请未通过" : "申请已提交，正在审核"}</h2>
      <p>${isApproved
        ? "您已获得该学者门户的管理权限，可维护公开简介、展示成果与联系方式。认领通过不会自动确认成果署名关系。"
        : isRejected
          ? `管理员已驳回本次申请。${escapeHtml(state.reviewNote || "证明材料不足以确认本人身份，请补充后再提交。")}`
          : "系统已完成提交受理。材料将先经过自动验证，再进入管理员人工审核；结果会通过站内消息反馈。"}</p>
      <div class="application-receipt">
        <div class="receipt-cell"><span>申请编号</span><strong>CLM-20261115-0037</strong></div>
        <div class="receipt-cell"><span>当前状态</span><strong>${statusLabel}</strong></div>
        <div class="receipt-cell"><span>提交时间</span><strong>2026-11-15 10:24</strong></div>
      </div>
      <div class="review-feedback-timeline">
        <div class="feedback-line"><time>2026-11-15 10:24</time><div><strong>已提交</strong><br>申请与材料版本已保存</div></div>
        <div class="feedback-line"><time>2026-11-15 10:25</time><div><strong>验证中</strong><br>ORCID 与代表性成果编号格式校验通过</div></div>
        <div class="feedback-line"><time>2026-11-15 10:27</time><div><strong>${isApproved || isRejected ? statusLabel : "审核中"}</strong><br>${isApproved ? "管理员通过申请，门户管理权已开通" : isRejected ? "管理员填写驳回原因并发送站内通知" : "管理员正在核对身份与材料证据"}</div></div>
      </div>
      <div style="display:flex;gap:9px">
        ${isApproved
          ? '<button class="button primary" type="button" data-go="scholar">进入门户管理</button>'
          : isRejected
            ? '<button class="button primary" type="button" data-new-claim>补充材料并重新提交</button>'
            : '<button class="button secondary" type="button" data-go="admin-claims">演示：切换到管理员审核</button>'}
        <button class="button ghost" type="button" data-new-claim>查看申请详情</button>
      </div>
    </div>`;
  }

  function renderClaim() {
    const showResult = state.claimPageMode === "result" || (state.claimStatus !== "none" && state.claimPageMode !== "form");
    return `${siteHeader("scholar")}
      <main class="page-wrap">
        <div class="breadcrumb"><a href="#scholar" data-go="scholar">学者门户</a><span class="sep">/</span><span>认领申请</span></div>
        <div style="margin-bottom:22px">
          <h1 style="margin-bottom:5px;font-size:27px">认领学者门户</h1>
          <p style="margin:0;color:#667085">核验本人身份，获得“张知远 · 计算机科学”的公开信息管理权。</p>
        </div>
        <div class="claim-layout">
          <section class="claim-card">
            ${showResult ? claimResultMarkup() : claimStepsMarkup() + claimFormStepMarkup()}
          </section>
          ${claimSummaryMarkup()}
        </div>
      </main>`;
  }

  function adminSidebar(active) {
    return `<aside class="admin-sidebar">
      <a class="admin-brand" href="#admin-tasks" data-go="admin-tasks">
        <span class="brand-mark"><span></span></span><span>ScholarFlow</span>
      </a>
      <div class="admin-console-label">Management console</div>
      <nav class="admin-nav" aria-label="管理后台导航">
        <a href="#admin-tasks" data-go="admin-tasks" class="${active === "tasks" ? "active" : ""}"><span class="nav-symbol">采</span>采集任务管理</a>
        <a href="#admin-claims" data-go="admin-claims" class="${active === "claims" ? "active" : ""}"><span class="nav-symbol">审</span>认领审核 <span style="margin-left:auto;font-size:9px;background:#315fc9;padding:1px 5px;border-radius:9px">3</span></a>
        <a href="#admin-claims" data-go="admin-claims"><span class="nav-symbol">纠</span>纠错处理</a>
        <a href="#admin-tasks" data-go="admin-tasks"><span class="nav-symbol">数</span>数据治理</a>
        <a href="#admin-claims" data-go="admin-claims"><span class="nav-symbol">审</span>审计日志</a>
      </nav>
      <div class="admin-sidebar-bottom">
        <div class="admin-user"><span class="avatar">管</span><div><strong>管理员 02</strong><span>数据治理管理员</span></div></div>
      </div>
    </aside>`;
  }

  function adminTopbar(section) {
    return `<header class="admin-topbar">
      <div class="admin-breadcrumb">管理后台 <span style="margin:0 6px;color:#c1c8d2">/</span><strong>${section}</strong></div>
      <div class="admin-top-actions">
        <a class="button ghost small" href="#search" data-go="search">返回前台</a>
        <span class="notification-dot" title="待办通知">♢</span>
        <span class="avatar" style="width:31px;height:31px">管</span>
      </div>
    </header>`;
  }

  function filteredTasks() {
    const query = normalizeQuery(state.taskQuery);
    return state.tasks.filter((task) => {
      const stateOk = state.taskState === "all" || task.state === state.taskState;
      const queryOk = !query || normalizeQuery([task.id, task.name, task.source, task.scope].join(" ")).includes(query);
      return stateOk && queryOk;
    });
  }

  function taskRow(task) {
    return `<tr>
      <td><div class="task-name"><strong>${escapeHtml(task.name)}</strong><span class="mono" style="color:#98a2b3">${escapeHtml(task.id)}</span></div></td>
      <td><span class="tag">${escapeHtml(task.source)}</span></td>
      <td>${statusBadge(task.state)}</td>
      <td><div class="progress-block"><div class="progress-text"><span>${task.progress}%</span><span>${escapeHtml(task.count)}</span></div><div class="progress-track"><div class="progress-fill" style="width:${task.progress}%"></div></div></div></td>
      <td><span class="mono">${escapeHtml(task.startedAt)}</span></td>
      <td><div class="action-group">
        <button class="action-link" type="button" data-task-detail="${task.id}">详情</button>
        ${task.state === "运行中" ? `<button class="action-link danger" type="button" data-task-action="stop" data-task-id="${task.id}">停止</button>` : ""}
        ${task.state === "失败" ? `<button class="action-link" type="button" data-task-action="retry" data-task-id="${task.id}">重试</button>` : ""}
        ${task.state === "待执行" ? `<button class="action-link" type="button" data-task-action="start" data-task-id="${task.id}">启动</button>` : ""}
      </div></td>
    </tr>`;
  }

  function renderAdminTasks() {
    const rows = filteredTasks();
    const pageSize = 5;
    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    if (state.taskPage > totalPages) state.taskPage = totalPages;
    const pageRows = rows.slice((state.taskPage - 1) * pageSize, state.taskPage * pageSize);
    const counts = {
      running: state.tasks.filter((item) => item.state === "运行中").length,
      failed: state.tasks.filter((item) => item.state === "失败").length,
      waiting: state.tasks.filter((item) => item.state === "待执行" || item.state === "重试").length
    };
    return `<div class="admin-shell">
      ${adminSidebar("tasks")}
      <div class="admin-main">
        ${adminTopbar("采集任务管理")}
        <main class="admin-content">
          <div class="admin-page-head">
            <div><h1>采集任务管理</h1><p>按统一来源、范围与游标配置任务；失败可有限重试，停止在当前页提交边界生效。</p></div>
            <div class="admin-actions"><button class="button secondary" type="button" data-toast="任务报表已导出">导出报表</button><button class="button primary" type="button" data-create-task>＋ 新建采集任务</button></div>
          </div>
          <div class="stat-grid">
            <div class="admin-stat"><div class="admin-stat-top"><span>今日任务</span><span class="tag blue">实时</span></div><div class="admin-stat-value">18</div><div class="admin-stat-sub"><span class="trend-up">↑ 12.5%</span> 较昨日</div></div>
            <div class="admin-stat"><div class="admin-stat-top"><span>运行中</span><span style="color:#175cd3">●</span></div><div class="admin-stat-value">${counts.running}</div><div class="admin-stat-sub">当前吞吐 246 条/分钟</div></div>
            <div class="admin-stat"><div class="admin-stat-top"><span>待处理 / 重试</span><span style="color:#a84e0b">●</span></div><div class="admin-stat-value">${counts.waiting}</div><div class="admin-stat-sub">下次调度 16:00</div></div>
            <div class="admin-stat"><div class="admin-stat-top"><span>需处理失败</span><span style="color:#b42318">●</span></div><div class="admin-stat-value">${counts.failed}</div><div class="admin-stat-sub">最近一次：21:23</div></div>
          </div>
          <section class="table-card">
            <div class="table-toolbar">
              <div class="table-search"><span>${iconSearch(14)}</span><input class="input" id="task-search" value="${escapeHtml(state.taskQuery)}" placeholder="搜索任务名称、来源或编号"></div>
              <select class="compact-select" id="task-state-filter" aria-label="任务状态">
                <option value="all" ${state.taskState === "all" ? "selected" : ""}>全部状态</option>
                ${["待执行", "运行中", "成功", "失败", "重试", "已停止"].map((status) => `<option value="${status}" ${state.taskState === status ? "selected" : ""}>${status}</option>`).join("")}
              </select>
              <span class="toolbar-spacer"></span>
              <button class="button ghost small" type="button" data-toast="任务列表已刷新">刷新列表</button>
            </div>
            <div class="data-table-wrap">
              <table class="data-table">
                <thead><tr><th>任务名称 / 编号</th><th>数据来源</th><th>状态</th><th>处理进度</th><th>开始时间</th><th>操作</th></tr></thead>
                <tbody>${pageRows.length ? pageRows.map(taskRow).join("") : `<tr><td colspan="6" style="height:220px;text-align:center;color:#98a2b3">没有符合条件的任务</td></tr>`}</tbody>
              </table>
            </div>
            <div class="table-footer">
              <span>共 ${rows.length} 条任务，每页 5 条</span>
              ${paginationMarkup(rows.length, state.taskPage, pageSize, "task")}
            </div>
          </section>
        </main>
      </div>
    </div>`;
  }

  function queueMatches(claim) {
    if (state.claimQueueState === "待审核") return ["已提交", "验证中", "审核中"].includes(claim.state);
    return claim.state === state.claimQueueState;
  }

  function renderClaimQueue() {
    const rows = state.claims.filter(queueMatches);
    if (!rows.some((item) => item.id === state.selectedClaimId) && rows.length) state.selectedClaimId = rows[0].id;
    return `<aside class="review-queue">
      <div class="queue-head">
        <div class="queue-head-row"><strong>认领申请</strong><span class="tag blue">${rows.length} 条</span></div>
        <select class="queue-filter" id="claim-queue-filter">
          ${["待审核", "已通过", "已驳回"].map((option) => `<option value="${option}" ${state.claimQueueState === option ? "selected" : ""}>${option}</option>`).join("")}
        </select>
      </div>
      <div class="queue-list">
        ${rows.map((claim) => `<button type="button" class="queue-item ${claim.id === state.selectedClaimId ? "active" : ""}" data-select-claim="${claim.id}">
          <div class="queue-item-top"><strong>${escapeHtml(claim.applicant)}</strong>${statusBadge(claim.state)}</div>
          <p>${escapeHtml(claim.portal)}</p>
          <div class="queue-item-meta"><span>${escapeHtml(claim.id)}</span><span>${escapeHtml(claim.submittedAt.slice(5))}</span></div>
        </button>`).join("") || '<div style="padding:28px;text-align:center;color:#98a2b3;font-size:11px">当前筛选下没有申请</div>'}
      </div>
    </aside>`;
  }

  function selectedClaim() {
    return state.claims.find((item) => item.id === state.selectedClaimId) || state.claims[0];
  }

  function reviewedBlock(claim) {
    if (!["已通过", "已驳回"].includes(claim.state)) return "";
    return `<div class="review-block">
      <div class="review-block-title">审核结果 <span class="status-badge ${STATUS_CLASS[claim.state]}">${claim.state}</span></div>
      <div class="review-note">${claim.state === "已通过" ? "审核通过，门户 owner 与审计日志已在同一提交边界保存。通知失败不回滚本次授权。" : `驳回原因：${escapeHtml(state.reviewNote || "证明材料不足以确认本人身份")}。申请人可补充材料后重新提交。`}</div>
    </div>`;
  }

  function renderClaimReview() {
    const claim = selectedClaim();
    return `<div class="admin-shell">
      ${adminSidebar("claims")}
      <div class="admin-main">
        ${adminTopbar("认领审核")}
        <main class="admin-content">
          <div class="admin-page-head">
            <div><h1>认领审核</h1><p>区分目标门户、申请人账号与成果证据；通过后仅授予本人门户管理权。</p></div>
            <div class="admin-actions"><button class="button secondary" type="button" data-toast="审核规则说明已打开">审核规则</button><button class="button ghost" type="button" data-toast="已刷新待审核队列">刷新队列</button></div>
          </div>
          <div class="review-shell-layout">
            ${renderClaimQueue()}
            <section class="review-detail">
              <div class="review-detail-head">
                <div><h2>${escapeHtml(claim.applicant)} <span class="status-badge ${STATUS_CLASS[claim.state]}">${claim.state}</span></h2><p>${escapeHtml(claim.id)} · 提交于 ${escapeHtml(claim.submittedAt)}</p></div>
                <button class="button ghost small" type="button" data-toast="申请详情已复制">•••</button>
              </div>
              <div class="review-detail-body">
                <div class="applicant-grid">
                  <div class="applicant-cell"><span>申请目标</span><strong>${escapeHtml(claim.portal)}</strong></div>
                  <div class="applicant-cell"><span>申请人账号</span><strong>${escapeHtml(claim.maskedAccount)}</strong></div>
                  <div class="applicant-cell"><span>所在机构</span><strong>${escapeHtml(claim.institution)}</strong></div>
                </div>
                <div class="review-block">
                  <div class="review-block-title">身份与归属核验 <span class="tag green">自动校验通过</span></div>
                  <div class="match-meter"><span class="match-ring">${claim.match}%</span><div><strong>证据匹配度较高，仍需人工确认</strong><span>ORCID 格式有效；代表性成果与门户署名存在交集。匹配分数只提供候选，不自动通过。</span></div></div>
                  <div class="evidence-list">
                    <div class="evidence-item"><div class="evidence-info"><span class="evidence-icon">ID</span><div><strong>${escapeHtml(claim.orcid)}</strong><span>ORCID 公开档案 · 姓名与机构一致</span></div></div><button class="action-link" type="button" data-preview-evidence="ORCID 公开档案">查看 ${iconExternal(10)}</button></div>
                    <div class="evidence-item"><div class="evidence-info"><span class="evidence-icon">DOI</span><div><strong>10.1360/SSI-2026-0142</strong><span>代表性成果 · 申请人位于作者列表第 1 位</span></div></div><button class="action-link" type="button" data-preview-evidence="代表性论文证据">查看 ${iconExternal(10)}</button></div>
                    <div class="evidence-item"><div class="evidence-info"><span class="evidence-icon">PDF</span><div><strong>ORCID-public-record.pdf</strong><span>2.4 MB · 提交于 2026-11-15 10:24</span></div></div><button class="action-link" type="button" data-preview-evidence="申请材料 ORCID-public-record.pdf">预览</button></div>
                  </div>
                </div>
                <div class="review-block">
                  <div class="review-block-title">申请说明</div>
                  <p style="margin:0;padding:12px 14px;border-radius:9px;background:#f8fafc;color:#536176;font-size:11px;line-height:1.8">${escapeHtml(claim.statement)}</p>
                </div>
                <div class="review-block">
                  <div class="review-block-title">冲突与并发检查 <span class="tag green">通过</span></div>
                  <div class="review-note">该门户当前无 owner，且无其他未完成认领。提交审核决定时将再次校验 expected_version，防止两位管理员并发覆盖。</div>
                </div>
                <div class="review-block">
                  <div class="review-block-title">审核历史</div>
                  <div class="reviewed-list">${claim.history.map(([time, text]) => `<div class="reviewed-item"><span>${escapeHtml(text)}</span><span class="mono">${escapeHtml(time)}</span></div>`).join("")}</div>
                </div>
                ${reviewedBlock(claim)}
              </div>
              <div class="review-footer">
                <span class="review-footer-note">审核人身份取自会话；通过、门户授权与审计日志将一致提交。</span>
                <div class="review-footer-actions">
                  ${["已通过", "已驳回"].includes(claim.state)
                    ? '<button class="button secondary small" type="button" data-toast="已返回申请详情">查看审核记录</button>'
                    : `<button class="button danger small" type="button" data-review-action="reject">驳回申请</button><button class="button success small" type="button" data-review-action="approve">通过并授权</button>`}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>`;
  }

  function render() {
    state.route = routeFromHash();
    if (state.route === "search") app.innerHTML = renderSearch();
    else if (state.route === "scholar") app.innerHTML = renderScholar();
    else if (state.route === "detail") app.innerHTML = renderDetail();
    else if (state.route === "claim") app.innerHTML = renderClaim();
    else if (state.route === "admin-tasks") app.innerHTML = renderAdminTasks();
    else app.innerHTML = renderClaimReview();
    closeDemoPanel();
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function navigate(route) {
    if (window.location.hash === `#${route}`) {
      render();
    } else {
      window.location.hash = route;
    }
  }

  function persistClaim() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        claimStatus: state.claimStatus,
        reviewNote: state.reviewNote,
        claimForm: state.claimForm
      }));
    } catch (error) {
      // Local storage can be disabled for file URLs; the prototype still works in memory.
    }
  }

  function restoreClaim() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!saved) return;
      state.claimStatus = saved.claimStatus || "none";
      state.reviewNote = saved.reviewNote || "";
      state.claimForm = { ...state.claimForm, ...(saved.claimForm || {}) };
      if (state.claimStatus !== "none") state.claimPageMode = "result";
    } catch (error) {
      // Ignore malformed prototype state.
    }
  }

  function resetClaim() {
    state.claimStatus = "none";
    state.reviewNote = "";
    state.claimPageMode = "form";
    state.claimStep = 1;
    state.claimForm = { applicant: "张知远", orcid: "", doi: "10.1360/SSI-2026-0142", evidenceUrl: "", statement: "", consent: false };
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      // Ignore.
    }
  }

  function syncClaimFormFromDom() {
    const orcid = document.getElementById("claim-orcid");
    const doi = document.getElementById("claim-doi");
    const url = document.getElementById("claim-url");
    const statement = document.getElementById("claim-statement");
    if (orcid) state.claimForm.orcid = orcid.value.trim();
    if (doi) state.claimForm.doi = doi.value.trim();
    if (url) state.claimForm.evidenceUrl = url.value.trim();
    if (statement) state.claimForm.statement = statement.value.trim();
  }

  function validateClaimMaterials() {
    syncClaimFormFromDom();
    let valid = true;
    const orcid = document.getElementById("claim-orcid");
    const statement = document.getElementById("claim-statement");
    [orcid, statement].forEach((element) => element?.classList.remove("error"));
    if (!/^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/i.test(state.claimForm.orcid)) {
      valid = false;
      orcid?.classList.add("error");
    }
    if (state.claimForm.statement.length < 10) {
      valid = false;
      statement?.classList.add("error");
    }
    if (!valid) toast("请补全申请材料", "ORCID 格式应为 0000-0000-0000-0000，申请说明至少 10 个字。", "error");
    return valid;
  }

  function showToast(title, message = "", type = "success") {
    const element = document.createElement("div");
    element.className = `toast ${type}`;
    element.innerHTML = `<span class="toast-mark">${type === "error" ? "!" : "✓"}</span><div><strong>${escapeHtml(title)}</strong><span>${escapeHtml(message)}</span></div>`;
    toastRoot.appendChild(element);
    window.setTimeout(() => {
      element.style.opacity = "0";
      element.style.transform = "translateY(-5px)";
      window.setTimeout(() => element.remove(), 180);
    }, 3000);
  }

  function toast(title, message = "", type = "success") {
    showToast(title, message, type);
  }

  function openOverlay(markup, type = "modal") {
    overlayRoot.innerHTML = `<div class="${type === "drawer" ? "drawer-overlay" : "modal-overlay"}" data-overlay-backdrop>${markup}</div>`;
    document.body.style.overflow = "hidden";
    const focusTarget = overlayRoot.querySelector("button, input, textarea, select");
    focusTarget?.focus();
  }

  function closeOverlay() {
    overlayRoot.innerHTML = "";
    document.body.style.overflow = "";
  }

  function openTaskDrawer(taskId) {
    const task = state.tasks.find((item) => item.id === taskId);
    if (!task) return;
    state.selectedTask = taskId;
    const canStop = task.state === "运行中";
    const canRetry = task.state === "失败" || task.state === "重试";
    const canStart = task.state === "待执行";
    openOverlay(`<aside class="drawer" role="dialog" aria-modal="true" aria-label="任务详情">
      <div class="drawer-head"><div><h2>任务详情</h2><p class="mono">${escapeHtml(task.id)}</p></div><button class="icon-button" type="button" data-close-overlay aria-label="关闭">×</button></div>
      <div class="drawer-body">
        <div class="task-detail-hero"><h3>${escapeHtml(task.name)}</h3><div class="task-detail-meta"><span>${statusBadge(task.state)}</span><span>来源 ${escapeHtml(task.source)}</span><span>${escapeHtml(task.scope)}</span></div></div>
        <div class="drawer-section">
          <h3>处理进度</h3>
          <div class="task-progress-large"><div class="progress-text"><span>${task.progress}%</span><span>${escapeHtml(task.count)}</span></div><div class="progress-track"><div class="progress-fill" style="width:${task.progress}%"></div></div></div>
          <div class="kv-grid">
            <div class="kv-item"><span>开始时间</span><strong>${escapeHtml(task.startedAt)}</strong></div>
            <div class="kv-item"><span>已运行</span><strong>${escapeHtml(task.duration)}</strong></div>
            <div class="kv-item"><span>操作人</span><strong>${escapeHtml(task.operator)}</strong></div>
            <div class="kv-item"><span>重试次数</span><strong>${task.state === "失败" ? "2 / 3" : "0 / 3"}</strong></div>
          </div>
        </div>
        <div class="drawer-section">
          <h3>任务配置</h3>
          <div class="kv-grid">
            <div class="kv-item"><span>采集范围</span><strong>${escapeHtml(task.scope)}</strong></div>
            <div class="kv-item"><span>增量游标</span><strong class="mono">cursor_20261115_03</strong></div>
            <div class="kv-item"><span>幂等键</span><strong class="mono">ct-20261115-018-a1</strong></div>
            <div class="kv-item"><span>调度策略</span><strong>每日 02:00</strong></div>
          </div>
        </div>
        <div class="drawer-section">
          <h3>运行日志</h3>
          <div class="task-logs">
            <div class="task-log"><time>09:40:12</time><div>任务取得租约并进入运行中</div></div>
            <div class="task-log"><time>09:41:03</time><div>分页拉取 cursor_20261115_03，读取 500 条</div></div>
            <div class="task-log"><time>09:42:47</time><div>完成清洗、去重和领域分类，写入暂存队列</div></div>
            <div class="task-log"><time>现在</time><div>正在同步索引；已处理 ${task.progress}%</div></div>
          </div>
        </div>
      </div>
      <div class="drawer-footer">
        <button class="button secondary small" type="button" data-close-overlay>关闭</button>
        ${canStop ? `<button class="button danger small" type="button" data-task-action="stop" data-task-id="${task.id}">请求停止</button>` : ""}
        ${canRetry ? `<button class="button primary small" type="button" data-task-action="retry" data-task-id="${task.id}">重新执行</button>` : ""}
        ${canStart ? `<button class="button primary small" type="button" data-task-action="start" data-task-id="${task.id}">立即启动</button>` : ""}
      </div>
    </aside>`, "drawer");
  }

  function openCreateTask() {
    openOverlay(`<aside class="drawer" role="dialog" aria-modal="true" aria-label="新建采集任务">
      <form id="create-task-form">
        <div class="drawer-head"><div><h2>新建采集任务</h2><p>配置来源、范围与调度；“覆盖”类采集需额外审批。</p></div><button class="icon-button" type="button" data-close-overlay aria-label="关闭">×</button></div>
        <div class="drawer-body">
          <div class="form-grid">
            <div class="form-group full"><label class="form-label">数据来源<span class="required">*</span></label><select class="select" name="source" required><option>OpenAlex</option><option>Crossref</option><option>NSFC</option><option>CNIPA</option><option>CIE</option></select></div>
            <div class="form-group full"><label class="form-label">任务名称<span class="required">*</span></label><input class="input" name="name" required value="OpenAlex 论文增量同步"></div>
            <div class="form-group"><label class="form-label">采集模式</label><select class="select" name="mode"><option>增量同步</option><option>按范围补采</option><option>全量重建（需审批）</option></select></div>
            <div class="form-group"><label class="form-label">领域范围</label><select class="select" name="scope"><option>计算机科学</option><option>软件工程</option><option>全部领域</option></select></div>
            <div class="form-group full"><label class="form-label">执行时间</label><select class="select" name="schedule"><option>立即执行</option><option>今日 02:00</option><option>下一调度窗口</option></select></div>
            <div class="form-group full"><div class="review-note">创建前会校验来源授权、范围与游标。新增记录默认 pending，任务技术成功不代表成果已公开。</div></div>
          </div>
        </div>
        <div class="drawer-footer"><button class="button secondary small" type="button" data-close-overlay>取消</button><button class="button primary small" type="submit">创建任务</button></div>
      </form>
    </aside>`, "drawer");
  }

  function openApproveModal() {
    const claim = selectedClaim();
    openOverlay(`<section class="modal" role="dialog" aria-modal="true" aria-labelledby="approve-title">
      <div class="modal-head"><div><h2 id="approve-title">通过认领申请</h2><p>申请人：${escapeHtml(claim.applicant)} · ${escapeHtml(claim.id)}</p></div><button class="icon-button" type="button" data-close-overlay aria-label="关闭">×</button></div>
      <div class="modal-body">
        <div class="modal-icon">✓</div>
        <p>通过后，系统将在同一提交边界内保存“已通过”、门户 owner 与审核日志，并向申请人发送站内反馈。</p>
        <div class="modal-alert">${iconInfo(14)}提交时将再次校验申请状态、expected_version 与门户归属。若申请人已撤回或另一管理员已决定，本次操作返回冲突。</div>
        <label class="check-row"><span class="check-left"><input type="checkbox" id="approve-confirm">已核验 ORCID、机构与代表性成果证据</span></label>
      </div>
      <div class="modal-footer"><button class="button secondary" type="button" data-close-overlay>取消</button><button class="button success" type="button" data-confirm-approve>确认通过并授权</button></div>
    </section>`);
  }

  function openRejectModal() {
    const claim = selectedClaim();
    openOverlay(`<section class="modal" role="dialog" aria-modal="true" aria-labelledby="reject-title">
      <div class="modal-head"><div><h2 id="reject-title">驳回认领申请</h2><p>申请人：${escapeHtml(claim.applicant)} · ${escapeHtml(claim.id)}</p></div><button class="icon-button" type="button" data-close-overlay aria-label="关闭">×</button></div>
      <div class="modal-body">
        <div class="modal-icon danger">!</div>
        <p>必须填写具体驳回原因。申请人可查看原因、补充材料并重新提交；通知失败不会回滚已保存的驳回决定。</p>
        <div class="reason-chips">
          ${["身份证据不足", "成果归属冲突", "材料无法核验", "重复申请", "其他"].map((reason) => `<button type="button" class="reason-chip" data-reject-reason="${reason}">${reason}</button>`).join("")}
        </div>
        <label class="form-label" for="reject-note">驳回原因<span class="required">*</span></label>
        <textarea class="textarea" id="reject-note" style="margin-top:7px;min-height:90px" placeholder="请说明缺失或冲突的证据，以及申请人可如何补充"></textarea>
        <div class="field-error" id="reject-error">请填写至少 10 个字的驳回原因。</div>
      </div>
      <div class="modal-footer"><button class="button secondary" type="button" data-close-overlay>取消</button><button class="button danger" type="button" data-confirm-reject>确认驳回</button></div>
    </section>`);
  }

  function approveSelectedClaim() {
    const confirm = document.getElementById("approve-confirm");
    if (!confirm?.checked) {
      toast("请先完成核验确认", "通过前请勾选已核验身份与归属证据。", "error");
      return;
    }
    const claim = selectedClaim();
    claim.state = "已通过";
    claim.history.push(["现在", "管理员 02 通过申请；门户 owner、审核日志一致提交"]);
    if (claim.id === "CLM-20261115-0037") {
      state.claimStatus = "approved";
      state.claimPageMode = "result";
      persistClaim();
    }
    closeOverlay();
    render();
    toast("审核已通过", "门户管理权、申请状态与审计日志已一致保存。");
  }

  function rejectSelectedClaim() {
    const note = document.getElementById("reject-note");
    const reason = note?.value.trim() || "";
    if (reason.length < 10) {
      document.getElementById("reject-error")?.classList.add("visible");
      note?.classList.add("error");
      return;
    }
    const claim = selectedClaim();
    claim.state = "已驳回";
    claim.history.push(["现在", `管理员 02 驳回：${reason}`]);
    if (claim.id === "CLM-20261115-0037") {
      state.claimStatus = "rejected";
      state.reviewNote = reason;
      state.claimPageMode = "result";
      persistClaim();
    }
    closeOverlay();
    render();
    toast("申请已驳回", "驳回原因已保存，并已创建站内反馈通知。");
  }

  function handleSearchAction(action, element) {
    if (action === "clear-filter") {
      const key = element.dataset.clearFilter;
      if (key === "query") state.query = "";
      else if (key.startsWith("type:")) state.selectedTypes = state.selectedTypes.filter((item) => item !== key.split(":")[1]);
      else if (key.startsWith("year:")) state.selectedYears = state.selectedYears.filter((item) => item !== key.split(":")[1]);
      else if (key === "field") state.field = "all";
      else if (key === "institution") state.institution = "all";
      state.page = 1;
      render();
    }
    if (action === "clear-all") {
      state.query = "";
      state.selectedTypes = [];
      state.selectedYears = [];
      state.field = "all";
      state.institution = "all";
      state.page = 1;
      render();
    }
  }

  function handleTaskAction(action, id) {
    const task = state.tasks.find((item) => item.id === id);
    if (!task) return;
    if (action === "stop") {
      task.state = "已停止";
      task.duration = `${task.duration} 后停止`;
      toast("停止请求已受理", "将在当前页提交边界生效，已提交页不会回滚。");
      closeOverlay();
      render();
    } else if (action === "retry") {
      task.state = "重试";
      task.progress = Math.max(3, task.progress);
      toast("已进入重试队列", "退避完成后重新执行；首次执行不计重试次数。");
      closeOverlay();
      render();
      window.setTimeout(() => {
        if (task.state === "重试") task.state = "运行中";
        if (state.route === "admin-tasks") render();
      }, 1400);
    } else if (action === "start") {
      task.state = "运行中";
      task.startedAt = "2026-11-15 现在";
      task.progress = 2;
      task.count = "12 / 2,850";
      toast("任务已启动", "任务已取得租约，正在后台分页采集。");
      closeOverlay();
      render();
    }
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("button, a");
    if (!target) return;

    if (target.id === "demo-launcher") {
      const willOpen = !demoPanel.classList.contains("open");
      demoPanel.classList.toggle("open", willOpen);
      demoLauncher.setAttribute("aria-expanded", String(willOpen));
      return;
    }
    if (target.id === "demo-close") {
      closeDemoPanel();
      return;
    }
    if (target.matches("[data-go]")) {
      event.preventDefault();
      navigate(target.dataset.go);
      return;
    }
    if (target.matches("[data-scenario]")) {
      if (target.dataset.scenario === "search-flow") {
        state.query = "大模型";
        state.selectedTypes = [];
        state.selectedYears = [];
        state.page = 1;
        navigate("search");
        toast("检索场景已载入", "可继续勾选类型/年份并切换分页。");
      } else {
        resetClaim();
        navigate("claim");
        toast("认领闭环已重置", "依次填写材料、提交，再从“原型页面”进入管理员审核。");
      }
      return;
    }
    if (target.matches("[data-reset-prototype]")) {
      resetClaim();
      state.claims = claimsSeed.map((item) => ({ ...item, history: item.history.map((entry) => [...entry]) }));
      state.tasks = tasksSeed.map((item) => ({ ...item }));
      state.query = "";
      state.selectedTypes = [];
      state.selectedYears = [];
      state.field = "all";
      state.institution = "all";
      state.taskState = "all";
      state.taskQuery = "";
      navigate("search");
      toast("原型状态已重置", "认领、任务和筛选数据已恢复到初始演示状态。");
      return;
    }
    if (target.matches("[data-suggest-query]")) {
      state.query = target.dataset.suggestQuery;
      state.page = 1;
      navigate("search");
      return;
    }
    if (target.matches("[data-open-detail]")) {
      event.preventDefault();
      state.currentAchievement = target.dataset.openDetail;
      navigate("detail");
      return;
    }
    if (target.matches("[data-clear-filter], [data-clear-all]")) {
      handleSearchAction(target.matches("[data-clear-all]") ? "clear-all" : "clear-filter", target);
      return;
    }
    if (target.matches("[data-search-page]")) {
      state.page = Number(target.dataset.searchPage);
      render();
      return;
    }
    if (target.matches("[data-portal-tab]")) {
      state.portalTab = target.dataset.portalTab;
      render();
      return;
    }
    if (target.matches("[data-claim-next]")) {
      if (state.claimStep === 2 && !validateClaimMaterials()) return;
      state.claimStep = Number(target.dataset.claimNext);
      render();
      return;
    }
    if (target.matches("[data-claim-prev]")) {
      syncClaimFormFromDom();
      state.claimStep = Number(target.dataset.claimPrev);
      render();
      return;
    }
    if (target.matches("[data-save-draft]")) {
      syncClaimFormFromDom();
      persistClaim();
      toast("草稿已保存", "已保存当前材料版本，后续可继续填写。");
      return;
    }
    if (target.matches("[data-remove-file]")) {
      target.closest(".uploaded-file")?.remove();
      toast("附件已移除");
      return;
    }
    if (target.matches("[data-submit-claim]")) {
      syncClaimFormFromDom();
      const consent = document.getElementById("claim-consent");
      state.claimForm.consent = Boolean(consent?.checked);
      if (!state.claimForm.consent) {
        toast("请确认材料真实", "提交前需勾选真实性声明。", "error");
        return;
      }
      state.claimStatus = "reviewing";
      state.claimPageMode = "result";
      state.claims[0].state = "审核中";
      state.claims[0].statement = state.claimForm.statement;
      state.claims[0].orcid = state.claimForm.orcid;
      persistClaim();
      navigate("claim");
      toast("申请已提交", "申请编号 CLM-20261115-0037；当前进入审核中。");
      return;
    }
    if (target.matches("[data-new-claim]")) {
      if (state.claimStatus === "rejected") {
        state.claimPageMode = "form";
        state.claimStep = 2;
      } else {
        state.claimPageMode = "form";
        state.claimStep = 1;
      }
      render();
      return;
    }
    if (target.matches("[data-toast]")) {
      toast(target.dataset.toast);
      return;
    }
    if (target.matches("[data-create-task]")) {
      openCreateTask();
      return;
    }
    if (target.matches("[data-task-detail]")) {
      openTaskDrawer(target.dataset.taskDetail);
      return;
    }
    if (target.matches("[data-task-action]")) {
      handleTaskAction(target.dataset.taskAction, target.dataset.taskId);
      return;
    }
    if (target.matches("[data-task-page]")) {
      state.taskPage = Number(target.dataset.taskPage);
      render();
      return;
    }
    if (target.matches("[data-select-claim]")) {
      state.selectedClaimId = target.dataset.selectClaim;
      render();
      return;
    }
    if (target.matches("[data-preview-evidence]")) {
      toast("证据预览", target.dataset.previewEvidence);
      return;
    }
    if (target.matches("[data-review-action]")) {
      if (target.dataset.reviewAction === "approve") openApproveModal();
      else openRejectModal();
      return;
    }
    if (target.matches("[data-reject-reason]")) {
      document.querySelectorAll("[data-reject-reason]").forEach((chip) => chip.classList.remove("active"));
      target.classList.add("active");
      const note = document.getElementById("reject-note");
      if (note) note.value = `${target.dataset.rejectReason}。请核对后补充可公开验证的身份或归属证据，再重新提交。`;
      return;
    }
    if (target.matches("[data-confirm-approve]")) {
      approveSelectedClaim();
      return;
    }
    if (target.matches("[data-confirm-reject]")) {
      rejectSelectedClaim();
      return;
    }
    if (target.matches("[data-close-overlay]")) {
      closeOverlay();
      return;
    }
  });

  overlayRoot.addEventListener("click", (event) => {
    if (event.target.matches("[data-overlay-backdrop]")) closeOverlay();
  });

  app.addEventListener("click", (event) => {
    const upload = event.target.closest("#upload-evidence");
    if (upload) toast("已选择示例文件", "原型中使用 ORCID-public-record.pdf 模拟上传。");
  });

  document.addEventListener("submit", (event) => {
    event.preventDefault();
    if (event.target.id === "search-form") {
      const input = document.getElementById("search-query");
      state.query = input?.value.trim() || "";
      state.page = 1;
      render();
      return;
    }
    if (event.target.id === "create-task-form") {
      const data = new FormData(event.target);
      const count = state.tasks.length + 1;
      const task = {
        id: `CT-20261115-${String(count + 18).padStart(3, "0")}`,
        name: data.get("name") || "新建采集任务",
        source: data.get("source") || "OpenAlex",
        scope: `${data.get("scope") || "全部领域"} · ${data.get("mode") || "增量同步"}`,
        state: data.get("schedule") === "立即执行" ? "运行中" : "待执行",
        progress: data.get("schedule") === "立即执行" ? 2 : 0,
        count: data.get("schedule") === "立即执行" ? "24 / 待估算" : "0 / 待估算",
        startedAt: data.get("schedule") === "立即执行" ? "2026-11-15 现在" : "计划 2026-11-16 02:00",
        operator: "管理员 02",
        duration: data.get("schedule") === "立即执行" ? "刚刚开始" : "-"
      };
      state.tasks.unshift(task);
      state.taskPage = 1;
      closeOverlay();
      render();
      toast("采集任务已创建", `${task.id} 已保存配置并进入${task.state}。`);
    }
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (target.matches("[data-filter-type]")) {
      const type = target.dataset.filterType;
      state.selectedTypes = target.checked ? [...new Set([...state.selectedTypes, type])] : state.selectedTypes.filter((item) => item !== type);
      state.page = 1;
      render();
      return;
    }
    if (target.matches("[data-filter-year]")) {
      const year = target.dataset.filterYear;
      state.selectedYears = target.checked ? [...new Set([...state.selectedYears, year])] : state.selectedYears.filter((item) => item !== year);
      state.page = 1;
      render();
      return;
    }
    if (target.id === "filter-field") {
      state.field = target.value;
      state.page = 1;
      render();
      return;
    }
    if (target.id === "filter-institution") {
      state.institution = target.value;
      state.page = 1;
      render();
      return;
    }
    if (target.id === "sort-select") {
      state.sort = target.value;
      state.page = 1;
      render();
      return;
    }
    if (target.id === "task-state-filter") {
      state.taskState = target.value;
      state.taskPage = 1;
      render();
      return;
    }
    if (target.id === "claim-queue-filter") {
      state.claimQueueState = target.value;
      render();
    }
  });

  document.addEventListener("input", (event) => {
    if (event.target.id === "task-search") {
      state.taskQuery = event.target.value;
      state.taskPage = 1;
      render();
      const input = document.getElementById("task-search");
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }
    if (["claim-orcid", "claim-doi", "claim-url", "claim-statement"].includes(event.target.id)) {
      syncClaimFormFromDom();
    }
  });

  function closeDemoPanel() {
    demoPanel.classList.remove("open");
    demoLauncher.setAttribute("aria-expanded", "false");
  }

  window.addEventListener("hashchange", render);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeOverlay();
      closeDemoPanel();
    }
  });

  restoreClaim();
  if (!window.location.hash) window.history.replaceState(null, "", "#search");
  render();
})();
