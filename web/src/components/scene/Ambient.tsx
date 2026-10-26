/** Faint lat/long graticule behind the scene. The drifting contours are a CSS ::before layer on .scene. */
export function Ambient() {
  const xs = [10, 25, 40, 55, 70, 85];
  const ys = [8, 22, 36, 50, 64, 78, 92];
  return (
    <svg className="amb" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6">
        {xs.map((x) => (
          <line key={"x" + x} x1={x} y1="0" x2={x} y2="100" vectorEffect="non-scaling-stroke" />
        ))}
        {ys.map((y) => (
          <line key={"y" + y} x1="0" y1={y} x2="100" y2={y} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}
