# Składa aplikację:
#  1) Ukrainski_dla_Polaka.html – jeden plik do otwierania na komputerze,
#  2) docs/ – wersja PWA (instalowana na telefonie) do opublikowania na GitHub Pages.
import os, json, hashlib, shutil
D = os.path.dirname(os.path.abspath(__file__))
S = os.path.join(D, 'src')
r = lambda f: open(os.path.join(S, f), encoding='utf-8').read()

JS = ['words.js', 'content.js', 'core.js', 'app.js']

def bundle(pwa):
    html = r('index.html')
    html = html.replace('<!--CSS-->', '<style>\n' + r('style.css') + '\n</style>')
    html = html.replace('<!--JS-->', '\n'.join('<script>\n' + r(f).replace('</script', '<\\/script') + '\n</script>' for f in JS))
    if pwa:
        html = html.replace('<!--PWA-->', '<link rel="manifest" href="manifest.webmanifest">\n<link rel="apple-touch-icon" href="apple-touch-icon.png">')
        html = html.replace('</body>', "<script>if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) navigator.serviceWorker.register('sw.js');</script>\n</body>")
    else:
        html = html.replace('<!--PWA-->', '')
    return html

single = bundle(False)
out = os.path.join(D, 'Ukrainski_dla_Polaka.html')
open(out, 'w', encoding='utf-8').write(single)
print('OK', out, round(len(single.encode('utf-8')) / 1024), 'KB')

docs = os.path.join(D, 'docs')
os.makedirs(docs, exist_ok=True)
html = bundle(True)
open(os.path.join(docs, 'index.html'), 'w', encoding='utf-8').write(html)
ver = hashlib.sha1(html.encode('utf-8')).hexdigest()[:10]
open(os.path.join(docs, 'sw.js'), 'w', encoding='utf-8').write(r('sw.js').replace('__VERSION__', ver))
manifest = {
    'name': 'Ukraiński dla Polaka', 'short_name': 'Ukraiński', 'lang': 'pl',
    'description': 'Nauka języka ukraińskiego dla osób polskojęzycznych.',
    'start_url': './', 'scope': './', 'display': 'standalone', 'orientation': 'portrait',
    'background_color': '#f6f3ec', 'theme_color': '#1f4fa3',
    'icons': [
        {'src': 'icon-192.png', 'sizes': '192x192', 'type': 'image/png'},
        {'src': 'icon-512.png', 'sizes': '512x512', 'type': 'image/png'},
        {'src': 'icon-maskable-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'maskable'}
    ]
}
open(os.path.join(docs, 'manifest.webmanifest'), 'w', encoding='utf-8').write(json.dumps(manifest, ensure_ascii=False, indent=1))
open(os.path.join(docs, '.nojekyll'), 'w').write('')
for f in ['icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png']:
    src = os.path.join(S, 'icons', f)
    if os.path.exists(src): shutil.copy(src, os.path.join(docs, f))
print('OK docs/ (PWA), wersja', ver)
