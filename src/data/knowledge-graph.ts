/**
 * Knowledge graph — edge definitions for the KB Learning Map canvas.
 *
 * Two edge types:
 *   path    — recommended reading order (solid teal arrow, directed)
 *   related — conceptually linked (dashed grey, undirected)
 *
 * Slugs use the full Astro content collection ID: folder/filename-without-extension
 * e.g. "azure/azure-landing-zones"
 *
 * To add or change a connection: edit the `edges` array below.
 * Build-time validation (validateEdges) is called from the KB index page
 * and will throw during `npm run build` if any slug does not match a real article.
 */

export type EdgeType = 'path' | 'related';

export interface Edge {
  from: string;
  to: string;
  type: EdgeType;
}

export const edges: Edge[] = [
  // ── Entry / orientation ──────────────────────────────────────────────────
  { from: 'multicloud/how-to-learn-azure-and-oci-without-stale-lists',           to: 'multicloud/iaas-paas-saas-without-marketing-layer',                       type: 'path' },
  { from: 'multicloud/iaas-paas-saas-without-marketing-layer',                   to: 'multicloud/shared-responsibility-for-people-who-stopped-believing-marketing', type: 'path' },
  { from: 'multicloud/iaas-paas-saas-without-marketing-layer',                   to: 'multicloud/regions-zones-availability-domains-where-your-data-lives',     type: 'path' },

  // ── Governance track ─────────────────────────────────────────────────────
  { from: 'multicloud/iaas-paas-saas-without-marketing-layer',                   to: 'multicloud/landing-zones-what-they-solve-and-the-honest-catch',            type: 'path' },
  { from: 'multicloud/landing-zones-what-they-solve-and-the-honest-catch',       to: 'multicloud/tenant-subscription-management-group-compartment',              type: 'path' },
  { from: 'multicloud/tenant-subscription-management-group-compartment',         to: 'azure/azure-landing-zones',                                                type: 'path' },
  { from: 'multicloud/tenant-subscription-management-group-compartment',         to: 'multicloud/naming-conventions-azure-oci',                                  type: 'path' },
  { from: 'multicloud/naming-conventions-azure-oci',                             to: 'multicloud/tagging-metadata-earn-their-keep',                              type: 'path' },
  { from: 'multicloud/landing-zones-what-they-solve-and-the-honest-catch',       to: 'multicloud/sandboxes-environments-you-will-probably-set-up-wrong',         type: 'path' },

  // ── Identity & policy track ──────────────────────────────────────────────
  { from: 'multicloud/landing-zones-what-they-solve-and-the-honest-catch',       to: 'identity/rbac-and-iam-authorisation-models-that-look-similar',             type: 'path' },
  { from: 'identity/rbac-and-iam-authorisation-models-that-look-similar',        to: 'security/policy-as-code-and-quotas-where-governance-stops-being-wiki',     type: 'path' },

  // ── Networking track ─────────────────────────────────────────────────────
  { from: 'multicloud/regions-zones-availability-domains-where-your-data-lives', to: 'networking/hub-and-spoke-virtual-wan-and-drg-three-topology-choices',      type: 'path' },
  { from: 'networking/hub-and-spoke-virtual-wan-and-drg-three-topology-choices', to: 'networking/address-plans-designing-ip-space-for-three-clouds',             type: 'path' },
  { from: 'networking/address-plans-designing-ip-space-for-three-clouds',        to: 'networking/ipam-ip-address-management-before-you-wish-you-had-done-it',    type: 'path' },
  { from: 'networking/hub-and-spoke-virtual-wan-and-drg-three-topology-choices', to: 'networking/hybrid-connectivity-expressroute-fastconnect-vpn-reality',      type: 'path' },

  // ── FinOps track ─────────────────────────────────────────────────────────
  { from: 'multicloud/tenant-subscription-management-group-compartment',         to: 'finops/budgets-cost-caps-and-the-lie-of-spending-limits',                  type: 'path' },
  { from: 'finops/budgets-cost-caps-and-the-lie-of-spending-limits',             to: 'finops/discounts-and-commitments-math-the-salespeople-hope-you-wont-do',   type: 'path' },

  // ── DevOps / operations track ────────────────────────────────────────────
  { from: 'multicloud/landing-zones-what-they-solve-and-the-honest-catch',       to: 'devops/source-of-truth-where-does-your-cloud-actually-live',               type: 'path' },
  { from: 'devops/source-of-truth-where-does-your-cloud-actually-live',          to: 'devops/gitops-with-argocd',                                                type: 'path' },

  // ── Related edges ────────────────────────────────────────────────────────
  { from: 'azure/azure-landing-zones',                                            to: 'multicloud/landing-zones-what-they-solve-and-the-honest-catch',            type: 'related' },
  { from: 'azure/azure-landing-zones',                                            to: 'multicloud/tenant-subscription-management-group-compartment',              type: 'related' },
  { from: 'azure/azure-landing-zones',                                            to: 'identity/rbac-and-iam-authorisation-models-that-look-similar',             type: 'related' },
  { from: 'azure/azure-landing-zones',                                            to: 'networking/hub-and-spoke-virtual-wan-and-drg-three-topology-choices',      type: 'related' },
  { from: 'azure/azure-landing-zones',                                            to: 'security/policy-as-code-and-quotas-where-governance-stops-being-wiki',    type: 'related' },
  { from: 'multicloud/tagging-metadata-earn-their-keep',                          to: 'multicloud/documentation-ccoe-why-both-decay-faster-than-you-think',       type: 'related' },
  { from: 'multicloud/naming-conventions-azure-oci',                              to: 'multicloud/documentation-ccoe-why-both-decay-faster-than-you-think',       type: 'related' },
  { from: 'networking/ipam-ip-address-management-before-you-wish-you-had-done-it', to: 'networking/address-plans-designing-ip-space-for-three-clouds',           type: 'related' },
  { from: 'networking/hybrid-connectivity-expressroute-fastconnect-vpn-reality',  to: 'azure/azure-landing-zones',                                               type: 'related' },
  { from: 'devops/status-pages-service-health-things-they-wont-show',             to: 'multicloud/service-availability-by-region-why-you-cannot-trust-the-map',  type: 'related' },
  { from: 'finops/cloud-support-what-you-are-actually-paying-for',                to: 'devops/status-pages-service-health-things-they-wont-show',                type: 'related' },
  { from: 'finops/cloud-support-what-you-are-actually-paying-for',                to: 'finops/discounts-and-commitments-math-the-salespeople-hope-you-wont-do',  type: 'related' },
  { from: 'devops/gitops-with-argocd',                                            to: 'devops/source-of-truth-where-does-your-cloud-actually-live',              type: 'related' },
  { from: 'devops/source-of-truth-where-does-your-cloud-actually-live',           to: 'azure/azure-landing-zones',                                               type: 'related' },
  { from: 'multicloud/sandboxes-environments-you-will-probably-set-up-wrong',    to: 'identity/rbac-and-iam-authorisation-models-that-look-similar',             type: 'related' },
  { from: 'multicloud/regions-zones-availability-domains-where-your-data-lives',  to: 'multicloud/service-availability-by-region-why-you-cannot-trust-the-map',  type: 'related' },
];

/**
 * Validates all edge slugs against the provided set of known article slugs.
 * Throws at build time if any slug is unknown, preventing broken graph edges from shipping.
 */
export function validateEdges(validSlugs: Set<string>): void {
  const unknown = new Set<string>();
  for (const edge of edges) {
    if (!validSlugs.has(edge.from)) unknown.add(edge.from);
    if (!validSlugs.has(edge.to))   unknown.add(edge.to);
  }
  if (unknown.size > 0) {
    throw new Error(
      'Knowledge graph — unknown slugs (check filenames match exactly):\n' +
      [...unknown].map(s => `  · ${s}`).join('\n')
    );
  }
}
