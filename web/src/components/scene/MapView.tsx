import { useMemo } from "react";
import { useSession } from "../../session";
import { sceneFromOutputs } from "../../checker";
import { CITIES, SL_PATH } from "../../geo";
import { SceneHead, useSelected } from "./Hotspot";

export function MapView() {
  const sel = useSelected("map");
  const { view } = useSession();
  const s = useMemo(() => sceneFromOutputs(view.outs), [view.outs]);
  return (
    <div className={"sc-box sc-map" + sel} data-box="map">
      <SceneHead id="map" label="LIVING LANKA MAP"></SceneHead>
      <div className="mapbox">
        <div className="lane" aria-hidden="true">
          <svg className="compass" viewBox="-20 -20 40 40">
            <g fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle r="14" />
              <path d="M0-18 L4 0 L0 18 L-4 0Z M-18 0 L0-3 L18 0 L0 3Z" />
            </g>
            <text y="-21" fontSize="7" textAnchor="middle" fill="currentColor">
              N
            </text>
          </svg>
          <span className="coord">6.93°N 79.86°E</span>
          <svg className="mpin" viewBox="0 0 12 16">
            <path
              d="M6 15 C2 9 1 7 1 5.5 A5 5 0 0 1 11 5.5 C11 7 10 9 6 15Z M6 3.5 a2 2 0 1 0 .01 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
          <div className="mover">
            <svg className="snakeart" viewBox="0 0 124 40">
              <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M2 22 C14 8 26 34 40 20 S66 6 80 20 S100 30 110 21" />
                <circle cx="114" cy="19" r="5" />
                <path d="M119 19 l4 -1 M119 19 l4 2" strokeWidth="1.2" />
              </g>
              <circle cx="115.5" cy="17.5" r="1" fill="currentColor" />
            </svg>
          </div>
        </div>
        <div className="signcol">
          {s.facts.map((f, i) => (
            <p className="fact" id={"fact" + (i + 1)} key={f}>
              {i ? "🧮" : "🗺️"} {f}
            </p>
          ))}
          <div className="signboard" id="sign">
            <small>WELCOME TO</small>
            <b id="signTxt">{s.sign ?? "? ? ?"}</b>
          </div>
          <div className="post" aria-hidden="true" />
        </div>
        <svg
          viewBox="212 4 176 254"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Map of Sri Lanka with city pins"
        >
          <path
            d={SL_PATH}
            fill="var(--land)"
            stroke="var(--ink)"
            strokeWidth="1.2"
            strokeLinejoin="round"
            fillRule="evenodd"
          />
          <g id="pins">
            {Object.entries(CITIES).map(([name, [x, y]]) => (
              <g
                key={name}
                className={"pin" + (s.pins.includes(name) ? " on" : "")}
                transform={`translate(${x} ${y})`}
              >
                <title>{name}</title>
                <circle r="12" className="ring" />
                <circle r="4" />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
