# -*- coding: utf-8 -*-
"""Verify every internal /knowledge-base/... link resolves to a real article.

Catches links to renamed or deleted slugs, which build cleanly in Astro but
404 for a reader. Exits non-zero if any target is missing.
"""
import glob, io, os, re, sys

articles = set()
for path in glob.glob('src/content/knowledge-base/**/*.md', recursive=True):
    rel = os.path.relpath(path, 'src/content/knowledge-base').replace(os.sep, '/')
    articles.add(rel[:-3])                     # category/slug

pages = {os.path.basename(p)[:-6] for p in glob.glob('src/pages/*.astro')}

broken, checked = [], 0
sources = glob.glob('src/content/knowledge-base/**/*.md', recursive=True) + glob.glob('src/pages/*.astro')
for path in sources:
    rel = path.replace(os.sep, '/')
    text = io.open(path, encoding='utf-8').read()
    for m in re.finditer(r'\]\((/[^)\s#]*)(#[^)\s]*)?\)', text):
        target = m.group(1).rstrip('/')
        checked += 1
        if target.startswith('/knowledge-base/'):
            slug = target[len('/knowledge-base/'):]
            if slug and slug not in articles:
                broken.append((rel, text[:m.start()].count('\n') + 1, m.group(1)))
        elif target and target.count('/') == 1:
            if target[1:] not in pages:
                broken.append((rel, text[:m.start()].count('\n') + 1, m.group(1)))

print('internal links checked: %d' % checked)
if broken:
    print('\nBROKEN INTERNAL LINKS:')
    for f, n, t in broken:
        print('  %-64s :%-4d %s' % (f.replace('src/content/knowledge-base/', ''), n, t))
    sys.exit(1)
print('\nEvery internal link resolves.')
