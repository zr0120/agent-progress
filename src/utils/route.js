export function viewFromPath(pathname) {
  const segments = pathname.split('/').filter(Boolean);

  if (segments[0] === 'domain' && segments.length === 2) {
    return { type: 'domain', domainId: segments[1] };
  }

  if (segments[0] === 'domain' && segments[2] === 'subdomain' && segments.length === 4) {
    return {
      type: 'subdomain',
      domainId: segments[1],
      subdomainId: segments[3],
    };
  }

  if (
    segments[0] === 'domain' &&
    segments[2] === 'subdomain' &&
    segments[4] === 'agent' &&
    segments.length === 6
  ) {
    return {
      type: 'agent',
      domainId: segments[1],
      subdomainId: segments[3],
      agentId: segments[5],
    };
  }

  return { type: 'overview' };
}

export function pathForView(view) {
  if (view.type === 'domain') {
    return `/domain/${view.domainId}`;
  }

  if (view.type === 'subdomain') {
    return `/domain/${view.domainId}/subdomain/${view.subdomainId}`;
  }

  if (view.type === 'agent') {
    return `/domain/${view.domainId}/subdomain/${view.subdomainId}/agent/${view.agentId}`;
  }

  return '/domain';
}
