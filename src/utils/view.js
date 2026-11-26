export function resolveView(report, state) {
  if (state.type === 'overview') {
    return { type: 'overview' };
  }

  const domain = report.domains.find((item) => item.id === state.domainId);
  if (!domain) {
    return { type: 'overview' };
  }

  if (state.type === 'domain') {
    return { type: 'domain', domain };
  }

  const subdomain = domain.subdomains.find((item) => item.id === state.subdomainId);
  if (!subdomain) {
    return { type: 'domain', domain };
  }

  if (state.type === 'subdomain') {
    return { type: 'subdomain', domain, subdomain };
  }

  const agent = subdomain.agents.find((item) => item.id === state.agentId);
  if (!agent) {
    return { type: 'subdomain', domain, subdomain };
  }

  return { type: 'agent', domain, subdomain, agent };
}
