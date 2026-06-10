/**
 * Knowledge graph — edge definitions for the KB Learning Map canvas.
 *
 * The canvas renders a curated four-branch learning tree:
 *   Cloud Reality & Thinking  |  Platform Organisation & Governance  |  Network Architecture  |  EU Cloud Compliance
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

  // ── EU Cloud Compliance ───────────────────────────────────────────────────
  // Entry: start node → compliance group, group → overview article
  { from: 'multicloud/how-to-learn-azure-and-oci-without-stale-lists',                   to: 'group:compliance',                                                                   type: 'path' },
  { from: 'group:compliance',                                                             to: 'compliance/cloud-data-security-eu-national-frameworks-overview',                    type: 'path' },
  // Overview → all 3 sub-group headers as siblings (same rank = horizontal columns)
  { from: 'compliance/cloud-data-security-eu-national-frameworks-overview',              to: 'group:compliance-national',                                                          type: 'path' },
  { from: 'compliance/cloud-data-security-eu-national-frameworks-overview',              to: 'group:compliance-cross',                                                             type: 'path' },
  { from: 'compliance/cloud-data-security-eu-national-frameworks-overview',              to: 'group:compliance-decision',                                                          type: 'path' },

  // National Frameworks column — vertical chain, related = parallel reference articles
  { from: 'group:compliance-national',                                                   to: 'compliance/slovakia-ksvc-mirri-government-cloud',                                    type: 'related' },
  { from: 'compliance/slovakia-ksvc-mirri-government-cloud',                             to: 'compliance/germany-bsi-c5-cloud-attestation',                                        type: 'related' },
  { from: 'compliance/germany-bsi-c5-cloud-attestation',                                 to: 'compliance/france-anssi-secnumcloud-qualification',                                   type: 'related' },
  { from: 'compliance/france-anssi-secnumcloud-qualification',                            to: 'compliance/spain-ens-national-security-framework',                                   type: 'related' },
  { from: 'compliance/spain-ens-national-security-framework',                             to: 'compliance/netherlands-bio2-baseline',                                               type: 'related' },
  { from: 'compliance/netherlands-bio2-baseline',                                         to: 'compliance/italy-acn-cloud-qualification',                                           type: 'related' },
  { from: 'compliance/italy-acn-cloud-qualification',                                     to: 'compliance/finland-pitukri-cloud-assessment',                                        type: 'related' },
  { from: 'compliance/finland-pitukri-cloud-assessment',                                  to: 'compliance/czechia-nukib-cybersecurity-act',                                         type: 'related' },
  { from: 'compliance/czechia-nukib-cybersecurity-act',                                   to: 'compliance/poland-ksc-cybersecurity-system',                                         type: 'related' },
  { from: 'compliance/poland-ksc-cybersecurity-system',                                   to: 'compliance/united-kingdom-ncsc-cloud-security-principles',                           type: 'related' },
  { from: 'compliance/united-kingdom-ncsc-cloud-security-principles',                     to: 'compliance/switzerland-finma-cloud-frameworks',                                      type: 'related' },
  { from: 'compliance/switzerland-finma-cloud-frameworks',                                to: 'compliance/norway-nsm-cloud-frameworks',                                             type: 'related' },

  // Cross-Cutting Baselines column — vertical chain, related
  { from: 'group:compliance-cross',                                                       to: 'compliance/iso-27001-27017-27018-27701-cloud-baselines',                             type: 'related' },
  { from: 'compliance/iso-27001-27017-27018-27701-cloud-baselines',                       to: 'compliance/soc-2-reports-how-to-actually-read-them',                                 type: 'related' },
  { from: 'compliance/soc-2-reports-how-to-actually-read-them',                           to: 'compliance/csa-star-registry-cross-cutting-trust-layer',                             type: 'related' },
  { from: 'compliance/csa-star-registry-cross-cutting-trust-layer',                       to: 'compliance/dora-for-cloud-financial-sector-overlay',                                 type: 'related' },
  { from: 'compliance/dora-for-cloud-financial-sector-overlay',                           to: 'compliance/dora-ctpp-regime-direct-esa-supervision',                                 type: 'path'    },
  { from: 'compliance/dora-ctpp-regime-direct-esa-supervision',                           to: 'compliance/dora-article-30-contracts-and-exit-strategies',                           type: 'path'    },
  { from: 'compliance/dora-article-30-contracts-and-exit-strategies',                     to: 'compliance/gdpr-article-28-and-eu-cloud-code-of-conduct',                            type: 'related' },
  { from: 'compliance/gdpr-article-28-and-eu-cloud-code-of-conduct',                      to: 'compliance/nis2-supply-chain-cloud-providers',                                       type: 'related' },
  { from: 'compliance/nis2-supply-chain-cloud-providers',                                  to: 'compliance/sovereign-cloud-products-2026-landscape',                                 type: 'related' },
  { from: 'compliance/sovereign-cloud-products-2026-landscape',                            to: 'compliance/eu-native-cloud-providers-landscape',                                     type: 'related' },
  { from: 'compliance/eu-native-cloud-providers-landscape',                                to: 'compliance/hyperscaler-eu-data-boundary-commitments',                                type: 'related' },
  { from: 'compliance/hyperscaler-eu-data-boundary-commitments',                           to: 'compliance/cloud-encryption-key-custody-byok-hyok',                                  type: 'related' },
  { from: 'compliance/cloud-encryption-key-custody-byok-hyok',                             to: 'compliance/eucs-watch-political-tracking-2026',                                      type: 'related' },
  { from: 'compliance/eucs-watch-political-tracking-2026',                                 to: 'compliance/eu-ai-act-and-cloud-provider-obligations',                                type: 'related' },

  // Decision Support column
  { from: 'group:compliance-decision',                                                    to: 'compliance/cloud-compliance-decision-framework',                                     type: 'related' },
  { from: 'compliance/cloud-compliance-decision-framework',                               to: 'compliance/reading-cloud-attestation-reports-practitioner-guide',                    type: 'related' },
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
