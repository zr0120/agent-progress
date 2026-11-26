export function countDomainAgents(domain) {
  return domain.subdomains.reduce((sum, subdomain) => sum + subdomain.agentCount, 0);
}
