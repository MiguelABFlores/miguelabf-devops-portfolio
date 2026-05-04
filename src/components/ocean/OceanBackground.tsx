import AtlanteanCity from './AtlanteanCity';
import LightRays from './LightRays';
import Bubbles from './Bubbles';
import Creatures from './Creatures';

export default function OceanBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <LightRays />
      <AtlanteanCity />
      <Creatures />
      <Bubbles />
      <div className="deep-vignette" />
    </div>
  );
}
