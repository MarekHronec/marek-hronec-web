# -*- coding: utf-8 -*-
"""Enforce the repo rule in .claude/rules/content-files.md: "Code blocks must specify language".

Scans every knowledge-base article and reports opening fences with no language tag.
Exits non-zero if any are found, so it can gate a commit the way
check-cidr-alignment.py does for address arithmetic.
"""
import glob, io, os, sys

bad, blocks = [], 0
for path in sorted(glob.glob('src/content/knowledge-base/**/*.md', recursive=True)):
    rel = os.path.relpath(path, 'src/content/knowledge-base').replace(os.sep, '/')
    inside = False
    for lineno, line in enumerate(io.open(path, encoding='utf-8').read().split('\n'), 1):
        if not line.startswith('```'):
            continue
        if not inside:
            blocks += 1
            if line.strip() == '```':
                bad.append((rel, lineno))
        inside = not inside

print('fenced blocks scanned: %d' % blocks)
if bad:
    print('\nOPENING FENCES WITH NO LANGUAGE TAG:')
    for rel, lineno in bad:
        print('  %-58s :%d' % (rel, lineno))
    sys.exit(1)
print('\nEvery fenced block specifies a language.')
