import { BrowserRouter } from 'react-router-dom'

import { useState } from 'react'
import './App.css'
import Routing from './routing/routing'
function App() {

  





  return (
  
      <BrowserRouter>
        <Routing  />
      </BrowserRouter>
  )
}

export default App


// lazy img

'use client';
import { APP_TITLE, DEFAULT_IMAGE } from '@/constants';
import React, { useState, useEffect } from 'react';

const ImageError = ({ message }) => {
    const styles = {
        height: '200px',
        width: '100%',
        background: 'tomato',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
    };
    return <div style={styles}>{message}</div>;
};

const LazyImg = ({ src = DEFAULT_IMAGE, alt = APP_TITLE, placeholder, title = APP_TITLE, ...props }) => {
    const [imageSrc, setImageSrc] = useState(placeholder || src);
    const [imageRef, setImageRef] = useState();

    const onLoad = () => {
        setImageSrc(src);
    };

    const handleError = (e) => {
        e.target.src = '/assets/services/image.png';
    };

    useEffect(() => {
        let observer;
        let didCancel = false;

        if (imageRef && imageSrc !== src) {
            if (IntersectionObserver) {
                observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (!didCancel && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
                                setImageSrc(src);
                                observer.unobserve(imageRef);
                            }
                        });
                    },
                    { rootMargin: '100px' }
                );
                observer.observe(imageRef);
            } else {
                // Fallback for older browsers
                setImageSrc(src);
            }
        }
        return () => {
            didCancel = true;
            if (observer && observer.unobserve) {
                observer.unobserve(imageRef);
            }
        };
    }, [src, imageSrc, imageRef]);

    if (alt === true || !alt) {
        return <ImageError message="alt attribute must contain string value on LazyImg component." />;
    }

    if (title === true || !title) {
        return <ImageError message="title attribute must contain string value on LazyImg component." />;
    }

    return <img ref={setImageRef} onError={handleError} loading="lazy" src={imageSrc} onLoad={onLoad} alt={alt} {...props} />;
};

export default LazyImg;



// components/GooglePlaceSearch.tsx
import React, { useEffect, useState, useRef } from 'react';

type PlaceResult = {
  description: string;
  place_id: string;
};

type Props = {
  className?: string;
  onChange: (value: {
    fullAddress: string;
    formattedAddress: string;
    lat: number;
    lng: number;
  }) => void;
};

const GooglePlaceSearch: React.FC<Props> = ({ className, onChange }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<PlaceResult[]>([]);
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autocompleteServiceRef.current && window.google) {
      autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
    }

    if (!placesServiceRef.current && window.google && containerRef.current) {
      placesServiceRef.current = new window.google.maps.places.PlacesService(containerRef.current);
    }
  }, []);

  useEffect(() => {
    if (input && autocompleteServiceRef.current) {
      autocompleteServiceRef.current.getPlacePredictions(
        { input, types: ['geocode'] },
        (predictions) => {
          if (predictions) {
            setSuggestions(
              predictions.map((p) => ({
                description: p.description,
                place_id: p.place_id,
              }))
            );
          }
        }
      );
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const handleSelect = (placeId: string) => {
    if (!placesServiceRef.current) return;

    placesServiceRef.current.getDetails({ placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const formattedAddress = place.formatted_address || '';
        const fullAddress = place.name || formattedAddress;

        onChange({
          fullAddress,
          formattedAddress,
          lat,
          lng,
        });

        setInput(formattedAddress);
        setSuggestions([]);
      }
    });
  };

  return (
    <div className={className}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full"
        placeholder="Search address..."
      />
      <div ref={containerRef} style={{ display: 'none' }} /> {/* Needed for PlacesService */}
      {suggestions.length > 0 && (
        <ul className="bg-white shadow-md border rounded mt-1 max-h-60 overflow-auto z-10">
          {suggestions.map((s, index) => (
            <li
              key={index}
              onClick={() => handleSelect(s.place_id)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {s.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GooglePlaceSearch;


    //map

// components/CustomGoogleMap.tsx
import React, { useState } from 'react';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';

type Clinic = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

type Props = {
  className?: string;
  selectedLocation: { lat: number; lng: number };
  clinicData: Clinic[];
};

const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY_HERE';

const CustomGoogleMap: React.FC<Props> = ({ className, selectedLocation, clinicData }) => {
  const [activeClinic, setActiveClinic] = useState<Clinic | null>(null);

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div className={className}>
        <Map
          center={selectedLocation}
          zoom={12}
          style={{ width: '100%', height: '400px' }}
        >
          {clinicData.map((clinic) => (
            <Marker
              key={clinic.id}
              position={{ lat: clinic.lat, lng: clinic.lng }}
              onClick={() => setActiveClinic(clinic)}
              onMouseOver={() => setActiveClinic(clinic)}
            />
          ))}

          {activeClinic && (
            <InfoWindow position={{ lat: activeClinic.lat, lng: activeClinic.lng }} onCloseClick={() => setActiveClinic(null)}>
              <div>{activeClinic.name}</div>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default CustomGoogleMap;


  export const getStoredForm = () => {
  const data = localStorage.getItem('treatmentForm');
  return data ? JSON.parse(data) : null;
};

export const storeForm = (values: any) => {
  localStorage.setItem('treatmentForm', JSON.stringify(values));
};


  import { Formik, Form } from 'formik';
import { getStoredForm } from './utils/localStorage';
import PetInfo from './components/PetInfo';
import TreatmentInfo from './components/TreatmentInfo';
import ClinicInfo from './components/ClinicInfo';

const initialFormValues = {
  petType: '',
  petName: '',
  treatmentName: '',
  serviceProvider: '',
  clinicAddress: '',
};

const SearchTreatmentForm = () => {
  const storedValues = getStoredForm();

  return (
    <Formik initialValues={storedValues || initialFormValues} onSubmit={console.log}>
      <Form className="flex flex-col gap-4">
        <PetInfo />
        <TreatmentInfo />
        <ClinicInfo />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Submit</button>
      </Form>
    </Formik>
  );
};

export default SearchTreatmentForm;
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { storeForm } from '../utils/localStorage';

const PetInfo = () => {
  const { values, handleChange } = useFormikContext<any>();

  // Persist pet fields on change
  useEffect(() => {
    storeForm(values);
  }, [values.petType, values.petName]);

  return (
    <div className="flex gap-4">
      <input
        type="text"
        name="petType"
        placeholder="Pet Type"
        value={values.petType}
        onChange={handleChange}
      />
      <input
        type="text"
        name="petName"
        placeholder="Pet Name"
        value={values.petName}
        onChange={handleChange}
      />
    </div>
  );
};

export default PetInfo;
//second


    // hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn('Error reading localStorage', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn('Error setting localStorage', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
};
import React from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';

const SearchTreatmentForm = () => {
  const [formValues, setFormValues] = useLocalStorage('treatmentForm', {
    petType: '',
    petName: '',
    treatmentName: '',
    serviceProvider: '',
    clinicAddress: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form className="flex gap-4">
      <input
        type="text"
        name="petType"
        placeholder="Pet Type"
        value={formValues.petType}
        onChange={handleChange}
      />
      <input
        type="text"
        name="petName"
        placeholder="Pet Name"
        value={formValues.petName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="treatmentName"
        placeholder="Treatment Name"
        value={formValues.treatmentName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="serviceProvider"
        placeholder="Service Provider"
        value={formValues.serviceProvider}
        onChange={handleChange}
      />
      <input
        type="text"
        name="clinicAddress"
        placeholder="Clinic Address"
        value={formValues.clinicAddress}
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchTreatmentForm;


