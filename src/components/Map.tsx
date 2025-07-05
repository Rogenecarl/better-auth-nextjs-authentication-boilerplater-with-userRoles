"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import { useEffect, useRef } from "react";

interface MapProps {
  center?: [number, number];
  onLocationSelect?: (lat: number, lng: number) => void;
}

export default function Map({ 
  center = [125.365847, 6.74468],
  onLocationSelect 
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (mapRef.current) return;
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: 13,
      style: "mapbox://styles/rogenecarl/cmcoe04d8008l01sq35v2hqdt",
    });

    mapRef.current = map;

    // Create a marker at the center
    if (center[0] !== 125.365847 || center[1] !== 6.74468) {
      markerRef.current = new mapboxgl.Marker()
        .setLngLat(center)
        .addTo(map);
    }

    if (onLocationSelect) {
      map.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        
        // Update marker position
        if (markerRef.current) {
          markerRef.current.setLngLat([lng, lat]);
        } else {
          markerRef.current = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map);
        }

        onLocationSelect(lat, lng);
      });
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
      }
      map.remove();
      mapRef.current = null;
    };
  }, [center, onLocationSelect]);

  // Update marker position when center changes
  useEffect(() => {
    if (!mapRef.current || !markerRef.current) return;

    markerRef.current.setLngLat(center);
    mapRef.current.setCenter(center);
  }, [center]);

  return (
    <div className="w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
