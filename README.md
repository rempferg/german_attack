# German Attack

A static Phaser 3 game scaffold, derived from the `math_attack` engine setup. It
currently renders a Hello World scene; the game itself will be built on top of
it.

```
index.html                  page shell (Phaser canvas + fullscreen button)
style.css                   page layout and pixel-font setup
js/config.js                canvas size, font, title, asset version
js/main.js                  Phaser bootstrap, scaling, fullscreen
js/ui.js                    small text/starfield helpers for scenes
js/stars.js                 animated page background
js/scenes/hello.js          Hello World scene
js/phaser.min.js            Phaser 3.85.2
fonts/PressStart2P.woff2    pixel font
deployment/nginx.container.conf  nginx config inside the container
```

## Run locally

Docker:

```sh
WEB_PORT=8000 docker compose up --build
```

Then open <http://127.0.0.1:8000>.

Without Docker, serve the repository root with any static file server, for
example `python3 -m http.server 8000`.

## Preview deployment

The `web-app-deployment` preview system allocates `WEB_PORT`, builds the
Compose stack and serves it at a `*.team-a.net` URL:

```sh
git push origin preview/hello-world
```

The hook prints the preview URL. Delete the branch to tear the preview down.

For that to work, the repository's bare repo on the preview host needs the hook:

```sh
ln -sf ~/web-app-deployment/post-receive_web-app-repos \
    ~/german_attack.git/hooks/post-receive
```

## Asset caching

`style.css`, `fonts/` and `js/` are served with a one-year immutable cache,
while `index.html` is served `no-store`. Bump `VERSION` in `js/config.js` when
changing those assets; the Dockerfile appends it to their URLs during the build.

## License

GPL-3.0, see [LICENSE](LICENSE).
