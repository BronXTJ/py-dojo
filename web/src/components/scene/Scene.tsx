import { Ambient } from "./Ambient";
import { CalloutCard } from "./CalloutCard";
import { Console } from "./Console";
import { Interpreter } from "./Interpreter";
import { MapView } from "./MapView";
import { Script } from "./Script";

export function Scene() {
  return (
    <section className="card scene" aria-label="Living Lanka scene">
      <Ambient />
      <div className="sc-grid" id="stage">
        <Script />
        <div className="sc-row">
          <Console />
          <Interpreter />
        </div>
        <CalloutCard />
        <MapView />
      </div>
    </section>
  );
}
