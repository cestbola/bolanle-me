// Approximate planet positions from Keplerian elements (E.M. Standish, JPL,
// "Keplerian Elements for Approximate Positions of the Major Planets", Table 1,
// valid 1800–2050). Accurate to a fraction of a degree: plenty for a diagram,
// not for pointing a telescope. Heliocentric ecliptic coordinates, in AU.

// [a, e, I, L, ϖ, Ω] at J2000, then their rates per Julian century (a/e in AU, angles in degrees)
const EL = {
  Mercury: [0.38709927, 0.20563593, 7.00497902, 252.2503235, 77.45779628, 48.33076593, 0.00000037, 0.00001906, -0.00594749, 149472.67411175, 0.16047689, -0.12534081],
  Venus: [0.72333566, 0.00677672, 3.39467605, 181.9790995, 131.60246718, 76.67984255, 0.0000039, -0.00004107, -0.0007889, 58517.81538729, 0.00268329, -0.27769418],
  Earth: [1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0, 0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0],
  Mars: [1.52371034, 0.0933941, 1.84969142, -4.55343205, -23.94362959, 49.55953891, 0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343],
  Jupiter: [5.202887, 0.04838624, 1.30439695, 34.39644051, 14.72847983, 100.47390909, -0.00011607, -0.00013253, -0.00183714, 3034.74612775, 0.21252668, 0.20469106],
  Saturn: [9.53667594, 0.05386179, 2.48599187, 49.95424423, 92.59887831, 113.66242448, -0.0012506, -0.00050991, 0.00193609, 1222.49362201, -0.41897216, -0.28867794],
};
export const PLANETS = Object.keys(EL);
export const AU_MKM = 149.5978707; // million km per AU

const rad = (d) => (d * Math.PI) / 180;

function solveKepler(M, e) {
  let E = M + e * Math.sin(M);
  for (let i = 0; i < 12; i++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  return E;
}

// position at Julian century T since J2000; `meanAnomaly` overrides M (used to trace an orbit)
export function position(name, T, meanAnomaly) {
  const k = EL[name];
  const v = (i) => k[i] + k[i + 6] * T;
  const a = v(0), e = v(1), I = rad(v(2)), L = v(3), w = v(4), node = rad(v(5));
  const M = meanAnomaly ?? rad((((L - w) % 360) + 540) % 360 - 180);
  const E = solveKepler(M, e);
  const xp = a * (Math.cos(E) - e);
  const yp = a * Math.sqrt(1 - e * e) * Math.sin(E);
  const om = rad(w) - node;
  const [co, so, cn, sn, ci] = [Math.cos(om), Math.sin(om), Math.cos(node), Math.sin(node), Math.cos(I)];
  return {
    x: (co * cn - so * sn * ci) * xp + (-so * cn - co * sn * ci) * yp,
    y: (co * sn + so * cn * ci) * xp + (-so * sn + co * cn * ci) * yp,
    z: so * Math.sin(I) * xp + co * Math.sin(I) * yp,
  };
}

export const centuries = (ms) => (ms / 86400000 - 10957.5) / 36525; // since J2000.0 (2000-01-01 12:00 UTC)

// Earth–planet distance (million km) and the Sun–Earth–planet angle (180° = opposition)
export function sightLine(name, T) {
  const e = position('Earth', T), p = position(name, T);
  const d = [p.x - e.x, p.y - e.y, p.z - e.z];
  const s = [-e.x, -e.y, -e.z];
  const dot = d[0] * s[0] + d[1] * s[1] + d[2] * s[2];
  const dist = Math.hypot(...d);
  return { au: dist, mkm: dist * AU_MKM, elongation: (Math.acos(dot / (dist * Math.hypot(...s))) * 180) / Math.PI };
}
