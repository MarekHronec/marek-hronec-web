/**
 * Knowledge graph — edge definitions for the KB Learning Map canvas.
 *
 * The canvas renders a curated three-branch learning tree:
 *   Cloud Reality & Thinking  |  Platform Organisation & Governance  |  Network Architecture
 *
 * "group:" prefixed IDs are synthetic group-header nodes (not real articles).
 * validateEdges() skips them automatically.
 */

export type EdgeType = 'path' | 'related';

export interface Edge {
  from: string;
  to: string;
  type: EdgeType;
}

export const edges: Edge[] = [
  // ── START HERE → branch group headers ─────────────────────────────────────
  { from: 'multicloud/how-to-learn-azure-and-oci-without-stale-lists', to: 'group:cloud-reality', type: 'path' },
  { from: 'multicloud/how-to-learn-azure-and-oci-without-stale-lists', to: 'group:governance',    type: 'path' },
  { from: 'multicloud/how-to-learn-azure-and-oci-without-stale-lists', to: 'group:network',       type: 'path' },

  // ── Cloud Reality & Thinking ───────────────────────────────────────────────
  { from: 'group:cloud-reality',                                                          to: 'multicloud/iaas-paas-saas-without-marketing-layer',                                   type: 'path' },
  { from: 'multicloud/iaas-paas-saas-without-marketing-layer',                           to: 'multicloud/shared-responsibility-for-people-who-stopped-believing-marketing',         type: 'path' },
  { from: 'multicloud/shared-responsibility-for-people-who-stopped-believing-marketing', to: 'multicloud/regions-zones-availability-domains-where-your-data-lives',                type: 'path' },
  { from: 'multicloud/regions-zones-availability-domains-where-your-data-lives',         to: 'multicloud/service-availability-by-region-why-you-cannot-trust-the-map',             type: 'path' },

  // ── Platform Organisation & Governance ────────────────────────────────────
  { from: 'group:governance',                                                             to: 'multicloud/tenant-subscription-management-group-compartment',                        type: 'path' },
  { from: 'multicloud/tenant-subscription-management-group-compartment',                 to: 'multicloud/landing-zones-what-they-solve-and-the-honest-catch',                      type: 'path' },
  { from: 'multicloud/landing-zones-what-they-solve-and-the-honest-catch',               to: 'multicloud/sandboxes-environments-you-will-probably-set-up-wrong',                   type: 'path' },
  { from: 'multicloud/sandboxes-environments-you-will-probably-set-up-wrong',            to: 'multicloud/naming-conventions-azure-oci',                                             type: 'path' },
  { from: 'multicloud/naming-conventions-azure-oci',                                     to: 'multicloud/tagging-metadata-earn-their-keep',                                         type: 'path' },
  { from: 'multicloud/tagging-metadata-earn-their-keep',                                 to: 'security/policy-as-code-and-quotas-where-governance-stops-being-wiki',                type: 'path' },
  { from: 'security/policy-as-code-and-quotas-where-governance-stops-being-wiki',        to: 'multicloud/documentation-ccoe-why-both-decay-faster-than-you-think',                 type: 'path' },

  // ── Network Architecture ───────────────────────────────────────────────────
  { from: 'group:network',                                                                to: 'networking/address-plans-designing-ip-space-for-three-clouds',                       type: 'path' },
  { from: 'networking/address-plans-designing-ip-space-for-three-clouds',                to: 'networking/ipam-ip-address-management-before-you-wish-you-had-done-it',              type: 'path' },
  { from: 'networking/ipam-ip-address-management-before-you-wish-you-had-done-it',       to: 'networking/hub-and-spoke-virtual-wan-and-drg-three-topology-choices',                type: 'path' },
  { from: 'networking/hub-and-spoke-virtual-wan-and-drg-three-topology-choices',         to: 'networking/hybrid-connectivity-expressroute-fastconnect-vpn-reality',                type: 'path' },
];

/**
 * Validates all edge slugs against the provided set of known article slugs.
 * "group:" prefixed IDs are synthetic (not from the content collection) and are skipped.
 * Throws at build time if any real slug is unknown.
 */
export function validateEdges(validSlugs: Set<string>): void {
  const unknown = new Set<string>();
  for (const edge of edges) {
    if (!edge.from.startsWith('group:') && !validSlugs.has(edge.from)) unknown.add(edge.from);
    if (!edge.to.startsWith('group:')   && !validSlugs.has(edge.to))   unknown.add(edge.to);
  }
  if (unknown.size > 0) {
    throw new Error(
      'Knowledge graph — unknown slugs (check filenames match exactly):\n' +
      [...unknown].map(s => `  · ${s}`).join('\n')
    );
  }
}
