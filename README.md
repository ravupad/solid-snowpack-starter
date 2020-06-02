# solid-snowpack-starter

This is template for getting started with `solid` using `snowpack` build.
`Snowpack` is a great build and development alternative to webpack. 
`Solid` gives react like jsx development with pinpoint dom updates, no overhead of virtual dom and great performance.

This template uses a custom router (path based), which I have created without much thought into it, as I couldn't 
find a good router for solid, so decided to write one on my own quickly.

Styling is done with a css in js library `nano-css` with it's `jsx` addon.

Currently there is no HMR support for solid in snowpack. Currently snowpack will run in watch mode, and reload the
files in browser on change.
