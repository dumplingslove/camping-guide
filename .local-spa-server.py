import http.server, urllib.parse, os
ROOT='/tmp/www'
class H(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, p):
        p = urllib.parse.urlparse(p).path
        fs = os.path.join(ROOT, p.lstrip('/'))
        if os.path.isdir(fs): fs = os.path.join(fs, 'index.html')
        if not os.path.exists(fs) and p.startswith('/camping-guide/'):
            fs = os.path.join(ROOT, 'camping-guide/index.html')
        return fs
    def log_message(self, *a): pass
http.server.ThreadingHTTPServer(('127.0.0.1',8932), H).serve_forever()
