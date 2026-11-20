// Precompute land dots for the hero globe (run once: node scripts/globe-points.mjs)
import { readFileSync, writeFileSync } from "node:fs";
import { feature } from "topojson-client";
import { geoContains } from "d3-geo";
const topo = JSON.parse(readFileSync(new URL("../node_modules/world-atlas/land-110m.json", import.meta.url)));
const land = feature(topo, topo.objects.land);
const N = 16000, pts = [], golden = Math.PI * (3 - Math.sqrt(5));
for (let i = 0; i < N; i++) {
  const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = golden * i;
  const lat = Math.asin(y) * 180 / Math.PI;
  const lng = ((Math.atan2(Math.sin(th) * r, Math.cos(th) * r) * 180 / Math.PI));
  if (lat < -58) continue;
  if (geoContains(land, [lng, lat])) pts.push(+lat.toFixed(2), +lng.toFixed(2));
}
writeFileSync(new URL("../src/components/globe/land-points.json", import.meta.url), JSON.stringify(pts));
console.log("points", pts.length / 2);
