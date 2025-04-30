# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

import { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export const useGoogleMapsLoader = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
      libraries: ['places'],
    });

    loader.load().then(() => {
      setLoaded(true);
    }).catch((err) => {
      console.error('Error loading Google Maps:', err);
    });
  }, []);

  return loaded;
};


//first
import React, { useRef } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';

export const ModernAddressInput = ({ onPlaceSelect }) => {
  const inputRef = useRef(null);
  const searchBoxRef = useRef(null);

  const handlePlaceChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    const place = places?.[0];

    if (place) {
      const components = place.address_components || [];

      const get = (type: string) =>
        components.find(c => c.types.includes(type))?.long_name || '';

      const address = {
        fullAddress: place.formatted_address || '',
        formattedAddress: `${get('street_number')} ${get('route')}, ${get('locality')}, ${get('administrative_area_level_1')} ${get('postal_code')}`,
        street: `${get('street_number')} ${get('route')}`,
        city: get('locality'),
        state: get('administrative_area_level_1'),
        zipCode: get('postal_code'),
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng(),
      };

      onPlaceSelect(address);
    }
  };

  return (
    <StandaloneSearchBox
      onLoad={ref => (searchBoxRef.current = ref)}
      onPlacesChanged={handlePlaceChanged}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter address"
        className="border p-2 rounded w-full"
      />
    </StandaloneSearchBox>
  );
};
// second
import React, { useEffect, useRef, useState } from 'react';
import { useGoogleMapsLoader } from './useGoogleMapsLoader';

type AddressDetails = {
  fullAddress: string;
  formattedAddress: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  lat: number;
  lng: number;
};

interface Props {
  onChangeAddress: (value: AddressDetails) => void;
}

export const GoogleAddressInput: React.FC<Props> = ({ onChangeAddress }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const mapsReady = useGoogleMapsLoader();

  useEffect(() => {
    if (!mapsReady || !inputRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current!, {
      types: ['address'],
      componentRestrictions: { country: 'us' },
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.address_components) return;

      const getComponent = (type: string) =>
        place.address_components?.find(c => c.types.includes(type))?.long_name || '';

      const street = `${getComponent('street_number')} ${getComponent('route')}`.trim();
      const city = getComponent('locality');
      const state = getComponent('administrative_area_level_1');
      const zipCode = getComponent('postal_code');
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      const fullAddress = place.formatted_address || '';
      const formattedAddress = `${street}, ${city}, ${state} ${zipCode}`;

      onChangeAddress({
        fullAddress,
        formattedAddress,
        street,
        city,
        state,
        zipCode,
        lat,
        lng,
      });

      setInputValue(fullAddress);
    });
  }, [mapsReady]);

  return (
    <input
      type="text"
      ref={inputRef}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Enter clinic address"
      className="border p-2 rounded w-full"
    />
  );
};

