# portfolio

My personal site. Plain HTML/CSS/JS, with [GSAP](https://gsap.com) + ScrollTrigger for the animations and [Lenis](https://lenis.darkroom.engineering) for smooth scrolling.

## Run locally

No build step. Open `index.html`, or:

```
python -m http.server
```

Add `?nointro` to skip the loader.

## Structure

```
index.html
css/style.css
js/main.js         interactions + scroll animations
js/projects.js     data for the work section
js/vendor/         gsap, scrolltrigger, lenis
assets/projects/   screenshots, named after the project id
```

Illustrations are inline SVG, loosely based on mid-century poster art.
