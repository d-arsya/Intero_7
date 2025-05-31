'use client'; // kalau pakai App Router
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: 'Mark.svg',
  shadowUrl: '/leaflet/marker-shadow.png',
});

function LocationMarker({ setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
}

export default function MapPicker({ position, setPosition }) {
  return (
    <MapContainer center={position} zoom={13} className='w-full h-full shadow-md rounded-2xl'>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker setPosition={setPosition} />
      <Marker position={position} />
    </MapContainer>
  );
}
