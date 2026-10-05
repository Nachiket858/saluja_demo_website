import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './CampusMap.css';

export const HOME = [19.842, 75.236];
const VIEW = [19.83, 75.33];
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${HOME[0]},${HOME[1]}`;

export const MAP_PLACES = {
  midc: { n: 'Waluj MIDC', c: [19.856, 75.218], t: 'industry', drive: 'Adjacent', dist: '2 km' },
  city: { n: 'City centre', c: [19.876, 75.343], t: 'city', drive: '≈ 30 min', dist: '12 km' },
  rail: { n: 'Railway stn', c: [19.862, 75.316], t: 'transport', drive: '≈ 25 min', dist: '9 km' },
  samruddhi: { n: 'Samruddhi access', c: [19.935, 75.255], t: 'transport', drive: '≈ 25 min', dist: '11 km' },
  chik: { n: 'Chikalthana MIDC', c: [19.878, 75.382], t: 'industry', drive: '≈ 40 min', dist: '16 km' },
  air: { n: 'Airport', c: [19.863, 75.398], t: 'transport', drive: '≈ 45 min', dist: '17 km' },
  shendra: { n: 'Shendra · AURIC', c: [19.885, 75.475], t: 'industry', drive: '≈ 55 min', dist: '25 km' },
  bidkin: { n: 'AURIC Bidkin', c: [19.725, 75.36], t: 'industry', drive: '≈ 50 min', dist: '18 km' },
};

export function distanceKm(key) {
  const p = MAP_PLACES[key];
  if (!p) return 0;
  const rad = (d) => (d * Math.PI) / 180;
  const [la1, lo1] = HOME;
  const [la2, lo2] = p.c;
  const a = Math.sin(rad(la2 - la1) / 2) ** 2 + Math.cos(rad(la1)) * Math.cos(rad(la2)) * Math.sin(rad(lo2 - lo1) / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Category icons for pins
const PIN_ICONS = {
  industry: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>`,
  transport: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  city: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`,
};

export default function CampusMap({ pick = 'city', filter = 'all', onPick, label }) {
  const elRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const onPickRef = useRef(onPick);
  const firstPick = useRef(true);
  const [zoomArmed, setZoomArmed] = useState(false);
  onPickRef.current = onPick;

  useEffect(() => {
    if (!elRef.current) return;

    // OpenStreetMap standard tiles: no API key needed (CARTO basemaps now require one)
    const map = L.map(elRef.current, {
      scrollWheelZoom: false,
      zoomControl: false,
    }).setView(VIEW, 11);
    map.attributionControl.setPrefix(false);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Subtle radius rings
    [10, 20, 30].forEach((km) => {
      L.circle(HOME, {
        radius: km * 1000,
        color: '#E0662F',
        weight: 1,
        opacity: 0.25,
        fill: false,
        dashArray: '4 8',
        interactive: false,
      }).addTo(map);

      L.marker([HOME[0] + km / 111, HOME[1]], {
        icon: L.divIcon({
          className: '',
          html: `<span class="map-ring-label">${km} km radius</span>`,
          iconSize: [0, 0],
        }),
        interactive: false,
        keyboard: false,
      }).addTo(map);
    });

    // Saluja Home Beacon (Waluj Campus)
    L.marker(HOME, {
      icon: L.divIcon({
        className: '',
        html: `
          <div class="map-home-beacon">
            <span class="beacon-wave"></span>
            <span class="beacon-core"><i></i></span>
            <div class="beacon-label">
              <strong>Saluja Waluj Campus</strong>
              <small>1,50,000 sq ft</small>
            </div>
          </div>
        `,
        iconSize: [0, 0],
      }),
      keyboard: false,
      zIndexOffset: 1200,
    }).addTo(map);

    // Place Markers with smart anti-collision badges
    const markers = {};
    Object.entries(MAP_PLACES).forEach(([k, p]) => {
      const isInitialActive = k === pick;
      const marker = L.marker(p.c, {
        icon: L.divIcon({
          className: '',
          html: `
            <div class="map-smart-pin map-pin--${p.t}${isInitialActive ? ' is-active' : ''}" data-k="${k}">
              <div class="pin-icon">${PIN_ICONS[p.t] || ''}</div>
              <div class="pin-bubble">
                <span class="pin-bubble-title">${p.n}</span>
                <span class="pin-bubble-time">${p.drive}</span>
              </div>
            </div>
          `,
          iconSize: [0, 0],
        }),
        title: `${p.n} (${p.drive})`,
      })
        .addTo(map)
        .on('click', () => onPickRef.current?.(k));

      // Connecting highway route line
      marker.line = L.polyline([HOME, p.c], {
        className: 'map-route-line',
        color: '#E0662F',
        weight: 3,
        opacity: isInitialActive ? 0.95 : 0,
        dashArray: '6 8',
        interactive: false,
      }).addTo(map);

      markers[k] = marker;
    });

    // Smooth scroll wheel zoom enablement
    const arm = () => {
      map.scrollWheelZoom.enable();
      setZoomArmed(true);
    };
    const disarm = () => {
      map.scrollWheelZoom.disable();
      setZoomArmed(false);
    };
    map.on('click', arm);
    map.on('focus', arm);
    map.getContainer().addEventListener('mouseleave', disarm);
    map.on('blur', disarm);

    mapRef.current = map;
    markersRef.current = markers;

    return () => {
      map.remove();
      mapRef.current = null;
      firstPick.current = true;
    };
  }, []);

  // Update selection
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    Object.entries(markersRef.current).forEach(([k, m]) => {
      const on = k === pick;
      const pinEl = m.getElement()?.querySelector('.map-smart-pin');
      if (pinEl) pinEl.classList.toggle('is-active', on);
      m.setZIndexOffset(on ? 1000 : 100);
      m.line?.setStyle({ opacity: on ? 0.95 : 0 });
    });

    if (firstPick.current) {
      firstPick.current = false;
      return;
    }

    if (MAP_PLACES[pick]) {
      map.flyToBounds(L.latLngBounds([HOME, MAP_PLACES[pick].c]).pad(0.65), {
        duration: 1,
        maxZoom: 13,
      });
    }
  }, [pick]);

  // Update filter
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([k, m]) => {
      const el = m.getElement();
      if (el) {
        const matches = filter === 'all' || MAP_PLACES[k].t === filter;
        el.classList.toggle('is-dimmed', !matches);
      }
    });
  }, [filter]);

  const reset = () => mapRef.current?.flyTo(VIEW, 11, { duration: 1 });

  return (
    <div className="campus-map-wrap">
      <div ref={elRef} className="campus-map" role="application" aria-label={label} />

      <div className="map-tools">
        <button type="button" className="map-tool" onClick={reset} aria-label="Reset map view">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" />
          </svg>
          <span>Overview</span>
        </button>
        <a className="map-tool map-tool--accent" href={DIRECTIONS} target="_blank" rel="noreferrer">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
          </svg>
          <span>Get Directions</span>
        </a>
      </div>

      <span className={`map-hint${zoomArmed ? ' is-hidden' : ''}`} aria-hidden="true">
        Click map to zoom with mouse wheel
      </span>
    </div>
  );
}
