# Level art

Optional art for levels lives here. Nothing in this folder is required; the
game draws procedural placeholders when an image is missing.

Suggested layout:

```
assets/
  levels/
    old-road/
      background.png     960x540 ground underlay
      tree.png
      rock.png
```

Use an image from level data:

```js
MB.Levels.define({
  id: "old-road",
  background: "assets/levels/old-road/background.png",
  preload: [
    { key: "old-tree", url: "assets/levels/old-road/tree.png" }
  ],
  scenery: [
    { texture: "old-tree", x: 240, y: 120, scale: 1.2 }
  ]
});
```

- Backgrounds should be 960x540 PNGs; the game scales them to that size.
- Props should point to the right, since units are rotated along the road.
- Transparent PNGs work best.
- `assets/` is copied into the Docker image by the Dockerfile, so new files
  under here are served automatically.
