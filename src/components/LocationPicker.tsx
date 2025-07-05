"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import { useEffect, useRef } from "react";

export interface LocationValue {
  lat: number;
  lng: number;
}

interface LocationPickerProps {
  value?: LocationValue | null;
  onChange?: (location: LocationValue) => void;
  defaultCenter?: [number, number];
}

export default function LocationPicker({
  value,
  onChange,
  defaultCenter = [125.365847, 6.74468],
}: LocationPickerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  // This effect handles the one-time initialization of the map.
  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    mapboxgl.accessToken = process.env
      .NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

    const initialCenter: [number, number] = value
      ? [value.lng, value.lat]
      : defaultCenter;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: initialCenter,
      zoom: 13,
      style: "mapbox://styles/rogenecarl/cmcoe04d8008l01sq35v2hqdt",
    });

    mapRef.current = map;

    // --- BEST PRACTICE: ALL MAP INTERACTIONS SHOULD HAPPEN AFTER THE 'LOAD' EVENT ---
    map.on("load", () => {
      // Add navigation controls once the map is loaded.
      map.addControl(new mapboxgl.NavigationControl());

      // 1. Create the initial marker if a value is provided on load.
      if (value) {
        const lngLat: [number, number] = [value.lng, value.lat];
        markerRef.current = new mapboxgl.Marker({ color: "#6366F1" })
          .setLngLat(lngLat)
          .addTo(map);
      }

      // 2. Set up the click handler for user interaction.
      if (onChange) {
        map.on("click", (e) => {
          const { lng, lat } = e.lngLat;
          const newLngLat: [number, number] = [lng, lat];

          // Notify the parent component first.
          onChange({ lat, lng });

          // Optimistically update the UI for instant feedback.
          if (markerRef.current) {
            markerRef.current.setLngLat(newLngLat);
          } else {
            markerRef.current = new mapboxgl.Marker({ color: "#6366F1" })
              .setLngLat(newLngLat)
              .addTo(map);
          }
        });
      }
    });

    return () => {
      // The map.remove() call will also clean up all attached listeners.
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // This effect MUST run only once.

  // This separate effect is still needed to handle updates to the `value` prop
  // that happen *after* the initial load (e.g., from manual input).
  useEffect(() => {
    // Only run this if the map has already been loaded.
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) return;

    if (value) {
      const lngLat: [number, number] = [value.lng, value.lat];
      if (markerRef.current) {
        markerRef.current.setLngLat(lngLat);
      } else {
        // If the marker was removed and a value is re-added, create it.
        markerRef.current = new mapboxgl.Marker({ color: "#6366F1" })
          .setLngLat(lngLat)
          .addTo(mapRef.current);
      }
      // Animate the map to the new location.
      mapRef.current.flyTo({ center: lngLat, zoom: 14 });
    } else if (markerRef.current) {
      // If the value is cleared, remove the marker.
      markerRef.current.remove();
      markerRef.current = null;
    }
  }, [value]); // This is now solely responsible for syncing with the parent state.

  return (
    <div className="w-full h-full rounded-lg overflow-hidden border">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
