import AtlanteanCity from './AtlanteanCity';
import LightRays from './LightRays';
import Bubbles from './Bubbles';
import Creatures from './Creatures';

export default function OceanBackground() {
  return (
    /*
     * transform:translateZ(0) promotes this element to its own GPU compositing
     * layer so the browser can composite it without repainting on every scroll.
     * will-change:transform keeps it warm on the GPU between frames.
     */
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
        /* Ocean gradient lives here (not on body) so it stays fixed without
           background-attachment:fixed, which causes scroll-repaint jank. */
        background: 'radial-gradient(ellipse at 50% -10%, #0d2a4d 0%, #050a1a 45%, #020611 100%)',
      }}
      aria-hidden
    >
      <LightRays />
      <AtlanteanCity />
      <Creatures />
      <Bubbles />
      <div className="deep-vignette" />
    </div>
  );
}
