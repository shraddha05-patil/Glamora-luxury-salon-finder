import { useEffect, useRef } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { salons } from "@/data/salons";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [12.9716, 77.5946],
      zoom: 12,
      minZoom: 11,
      maxZoom: 18,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    salons.forEach((salon) => {
      const { coords, name, location, id } = salon;
      if (!coords) return;

      L.marker([coords.lat, coords.lng], { icon: defaultIcon })
        .addTo(map)
        .bindPopup(`
          <div style="max-width: 220px;">
            <strong>${name}</strong><br />
            <span style="font-size: 0.95rem; color:#555;">${location}</span><br />
            <a href=\"/salon/${id}\" style=\"color:#b27b00; font-weight:600;\">View salon</a>
          </div>
        `);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <main className="min-h-screen bg-cream py-16">
      <div className="max-content px-6 mx-auto">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="pt-2">
            <h1 className="text-3xl font-display text-charcoal leading-tight">Bangalore</h1>
            <p className="mt-3 max-w-2xl text-base text-charcoal/80">
              Explore every salon location in the app with live map markers and quick popups.
            </p>
          </div>

        </div>

        <div className="overflow-hidden rounded-[28px] border border-charcoal/20 bg-white p-2 shadow-[0_18px_45px_rgba(43,43,43,0.12)]">
          <div ref={mapRef} className="h-[720px] w-full rounded-[22px] border border-charcoal/10" />
        </div>
      </div>
    </main>
  );
}
