const domains = [
  {
    name: '移动互联',
    summary: '覆盖移动端获客、渠道经营与客户服务的智能化运营。',
    subdomains: ['获客经营', '渠道运营', '客户服务'],
  },
  {
    name: '运营业务',
    summary: '聚焦日常运营、服务承接与运营风险管理。',
    subdomains: ['渠道运营', '客户服务', '操作风险'],
  },
  {
    name: '综合业务',
    summary: '整合企业与机构客户的多类综合金融服务。',
    subdomains: ['企业金融', '供应链金融', '机构业务'],
  },
  {
    name: '公司业务',
    summary: '服务公司客户的账户、授信与供应链金融需求。',
    subdomains: ['企业金融', '供应链金融', '机构业务'],
  },
  {
    name: '零售业务',
    summary: '覆盖财富管理、消费信贷与线上线下渠道经营。',
    subdomains: ['财富管理', '消费信贷', '渠道运营'],
  },
  {
    name: '金融市场',
    summary: '支持资产管理、交易银行与同业合作。',
    subdomains: ['资产管理', '交易银行', '同业合作'],
  },
  {
    name: '信用卡',
    summary: '围绕信用卡获客、经营、风险与客户体验推进智能化运营。',
    subdomains: ['获客经营', '风险控制', '客户服务'],
  },
  {
    name: '分行业务',
    summary: '支持分支机构渠道运营、客户服务与操作风险管控。',
    subdomains: ['渠道运营', '客户服务', '操作风险'],
  },
  {
    name: '海外业务',
    summary: '支持跨境交易、同业合作与海外合规内控。',
    subdomains: ['交易银行', '同业合作', '合规内控'],
  },
  {
    name: '负债业务',
    summary: '围绕负债产品、流动性与信用风险开展智能化运营。',
    subdomains: ['财富管理', '交易银行', '信用风险'],
  },
  {
    name: '资产业务',
    summary: '覆盖资产管理、信用风险与供应链金融。',
    subdomains: ['资产管理', '信用风险', '供应链金融'],
  },
  {
    name: '支付业务',
    summary: '支持支付渠道运营、操作风险与交易结算。',
    subdomains: ['渠道运营', '操作风险', '交易银行'],
  },
];

const roles = {
  获客经营: [
    ['客户画像', '完善客户分层与偏好标签'],
    ['渠道投放', '优化线上渠道获客策略'],
    ['活动运营', '设计信用卡促活活动'],
    ['转化分析', '跟踪申请到激活转化链路'],
  ],
  风险控制: [
    ['申请反欺诈', '识别并拦截异常申请'],
    ['额度策略', '动态调整授信额度'],
    ['交易监控', '监控异常交易行为'],
    ['贷后预警', '建立逾期风险预警机制'],
  ],
  客户服务: [
    ['智能客服', '提升常见问题自助解决率'],
    ['投诉治理', '压缩投诉处理周期'],
    ['权益运营', '提升客户权益使用体验'],
    ['服务质检', '保证服务标准一致执行'],
  ],
  财富管理: [
    ['客群经营', '建立重点客群经营策略'],
    ['产品配置', '优化理财产品组合'],
    ['投顾服务', '完善投顾建议生成'],
    ['资产检视', '跟踪客户资产配置变化'],
  ],
  消费信贷: [
    ['产品准入', '优化消费贷准入规则'],
    ['额度测算', '提升额度测算准确性'],
    ['放款流程', '缩短申请到放款时长'],
    ['还款提醒', '完善贷后还款触达'],
  ],
  渠道运营: [
    ['网点运营', '提升网点服务效率'],
    ['手机银行', '优化重点功能转化'],
    ['远程银行', '完善远程服务承接'],
    ['渠道协同', '打通线上与线下服务'],
  ],
  企业金融: [
    ['账户管理', '优化企业账户服务流程'],
    ['授信管理', '完善对公授信审批'],
    ['客户经理', '辅助客户经理日常作业'],
    ['产品推荐', '提升对公产品匹配度'],
  ],
  供应链金融: [
    ['核心企业', '梳理核心企业信用链'],
    ['融资审核', '优化链上融资审核'],
    ['物流协同', '接入仓单与物流信息'],
    ['风险追踪', '监控供应链交易风险'],
  ],
  机构业务: [
    ['同业营销', '完善同业客户经营'],
    ['项目协同', '跟踪重点项目推进'],
    ['监管报送', '保障监管数据及时准确'],
    ['合作管理', '维护外部合作机构关系'],
  ],
  资产管理: [
    ['资产配置', '优化大类资产配置'],
    ['净值跟踪', '跟踪产品净值波动'],
    ['投研支持', '汇总重点投研信息'],
    ['持仓分析', '分析组合持仓风险'],
  ],
  交易银行: [
    ['现金管理', '提升企业现金管理效率'],
    ['支付结算', '保障支付结算稳定性'],
    ['外汇服务', '优化跨境与外汇服务'],
    ['流动性管理', '完善流动性监测与安排'],
  ],
  同业合作: [
    ['授信额度', '管理同业授信额度'],
    ['业务对接', '推进同业业务落地'],
    ['风险监测', '监控同业风险变化'],
    ['合作评估', '评估合作机构综合表现'],
  ],
  信用风险: [
    ['风险画像', '完善客户风险画像'],
    ['预警模型', '提升风险预警准确性'],
    ['压力测试', '执行关键场景压力测试'],
    ['敞口管理', '跟踪重点风险敞口'],
  ],
  操作风险: [
    ['流程检查', '识别操作流程薄弱点'],
    ['事件管理', '跟踪操作风险事件'],
    ['整改推进', '推动整改措施落地'],
    ['指标监测', '监测关键风险指标'],
  ],
  合规内控: [
    ['制度梳理', '梳理并更新合规制度'],
    ['检查执行', '开展专项合规检查'],
    ['问题整改', '跟踪问题整改闭环'],
    ['培训宣导', '组织合规培训与宣导'],
  ],
};

const metricNames = ['重点任务', '风险事项', '服务客户'];

const timelineSteps = [
  '需求确认',
  '方案评审',
  '模型开发',
  '试点验证',
  '全量推广',
  '效果复盘',
  '持续运营',
];

function pad(value) {
  return String(value).padStart(2, '0');
}

function formatDate(baseDate, offsetDays) {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + offsetDays);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function timelineFor(agentIndex, subdomainName) {
  const count = 3 + ((agentIndex + subdomainName.length) % 4);
  const baseDate = new Date('2026-09-01');

  return Array.from({ length: count }, (_, index) => {
    const status = index < count - 2 ? 'done' : index === count - 2 ? 'current' : 'todo';
    const step = timelineSteps[index % timelineSteps.length];

    return {
      id: `${subdomainName}-${agentIndex}-${index}`,
      date: formatDate(baseDate, index * 8 + agentIndex * 2),
      title: step,
      description:
        status === 'done'
          ? `${step}已完成并形成阶段性交付。`
          : status === 'current'
            ? `${step}正在推进，重点事项持续跟踪。`
            : `${step}尚未启动，后续按计划推进。`,
      status,
    };
  });
}

function buildAgents(subdomainName, domainIndex, subdomainIndex, agentCount) {
  const baseRoles = roles[subdomainName];
  const extraRoles = Array.from(
    { length: Math.max(0, agentCount - baseRoles.length) },
    (_, index) => [
      `${subdomainName}优化项${index + 1}`,
      `围绕${subdomainName}推进专项优化与效果跟踪`,
    ],
  );
  const selectedRoles = baseRoles.slice(0, agentCount).concat(extraRoles);

  return selectedRoles.map(([name, description], agentIndex) => {
    const progress = 16 + ((domainIndex * 9 + subdomainIndex * 13 + agentIndex * 17) % 78);
    const status =
      progress >= 92 ? 'completed' : progress > 55 ? 'running' : progress < 34 ? 'planned' : 'running';

    return {
      id: `${domainIndex}-${subdomainIndex}-${agentIndex}`,
      name,
      role: description,
      description: `负责${subdomainName}中的${name}，围绕${description}推进业务落地。`,
      progress,
      status,
      metrics: [
        { label: metricNames[0], value: `${4 + ((agentIndex * 5) % 8)}` },
        { label: metricNames[1], value: `${(agentIndex + domainIndex) % 4}` },
        { label: metricNames[2], value: `${12 + ((agentIndex * 7 + subdomainIndex) % 29)}` },
      ],
      timeline: timelineFor(agentIndex, subdomainName),
    };
  });
}

export function buildMockReport() {
  const builtDomains = domains.map((domain, domainIndex) => {
    const domainAgentCount = 5 + ((domainIndex * 7) % 16);

    const subdomains = domain.subdomains.map((name, subdomainIndex) => {
      const agentCount =
        Math.floor(domainAgentCount / domain.subdomains.length) +
        (subdomainIndex < domainAgentCount % domain.subdomains.length ? 1 : 0);
      const agents = buildAgents(name, domainIndex, subdomainIndex, agentCount);
      const averageProgress = Math.round(
        agents.reduce((sum, agent) => sum + agent.progress, 0) / agents.length,
      );

      return {
        id: `${domainIndex}-${subdomainIndex}`,
        name,
        summary: `${domain.name}下的${name}，共承载 ${agents.length} 个智能体。`,
        agentCount: agents.length,
        averageProgress,
        agents,
      };
    });

    const averageProgress = Math.round(
      subdomains.reduce((sum, subdomain) => sum + subdomain.averageProgress, 0) / subdomains.length,
    );

    return {
      id: String(domainIndex),
      name: domain.name,
      summary: domain.summary,
      subdomainCount: subdomains.length,
      averageProgress,
      subdomains,
    };
  });

  return {
    title: '智能体进展全景报告',
    extractedAt: '2026-11-17 10:58',
    sourceName: '民生银行业务进展汇报.docx',
    domains: builtDomains,
  };
}
