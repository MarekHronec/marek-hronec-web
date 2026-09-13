# -*- coding: utf-8 -*-
"""Exhaustively check every CIDR literal in the knowledge base for prefix alignment."""
import re, io, glob, os, sys
import ipaddress as ip

bad, total = [], 0
for p in glob.glob('src/content/knowledge-base/**/*.md', recursive=True):
    rel = os.path.relpath(p, 'src/content/knowledge-base').replace(os.sep, '/')
    t = io.open(p, encoding='utf-8').read()
    for m in re.finditer(r'\b(\d{1,3}(?:\.\d{1,3}){3})/(\d{1,2})\b', t):
        addr, pl = m.group(1), int(m.group(2))
        if pl > 32:
            continue
        total += 1
        try:
            n = ip.ip_network('%s/%d' % (addr, pl), strict=False)
        except ValueError:
            continue
        if str(n.network_address) != addr:
            bad.append((rel, t[:m.start()].count('\n') + 1, m.group(0), str(n)))

print('CIDR literals scanned across the whole knowledge base: %d' % total)
if bad:
    print('\nMISALIGNED (network address does not sit on the prefix boundary):')
    for f, l, s, real in bad:
        print('  %-56s :%-4d %-18s -> really %s' % (f, l, s, real))
    sys.exit(1)
print('\nAll CIDR literals are correctly aligned.')
