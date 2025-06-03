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


    ------------------new-------------------

    import { useEffect, useRef } from "react";

export function useFormAutoSync(formData: any, userId: string) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ API Call Function
  const saveToServer = () => {
    if (formData) {
      fetch("/api/save-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, formData }),
      });
    }
  };

  // ✅ Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // ✅ Inactivity logic (1 minute)
  useEffect(() => {
    const resetTimer = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        saveToServer();
      }, 60000); // 1 minute
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("mousedown", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("touchstart", resetTimer);

    resetTimer(); // Start the initial timer

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("mousedown", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, [formData]);

  // ✅ Before unload
  useEffect(() => {
    const handleUnload = () => saveToServer();
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [formData]);
}
-----------------
    import { useEffect, useState, useRef } from "react";

interface FormData {
  petType: string;
  petName: string;
  treatmentName: string;
  clinicName: string;
  clinicAddress: string;
}

const initialFormData: FormData = {
  petType: "",
  petName: "",
  treatmentName: "",
  clinicName: "",
  clinicAddress: "",
};

export default function FormComponent() {
  const [formData, setFormData] = useState<FormData>(() => {
    const saved = localStorage.getItem("formData");
    return saved ? JSON.parse(saved) : initialFormData;
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ फॉर्म चेंज हैंडलर
  const handleChange = (name: keyof FormData, value: string) => {
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    localStorage.setItem("formData", JSON.stringify(updated));
  };

  // ✅ API कॉल फंक्शन (reuseable)
  const saveToServer = () => {
    const data = localStorage.getItem("formData");
    if (data) {
      fetch("/api/save-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "user123",
          formData: JSON.parse(data),
        }),
      });
    }
  };

  // ✅ जब टैब बंद हो, ब्राउज़र बंद हो, या पेज reload हो
  useEffect(() => {
    const handleUnload = () => saveToServer();
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  // ✅ 1 मिनट inactivity पर API कॉल
  useEffect(() => {
    const resetTimer = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        saveToServer(); // 1 मिनट inactivity पर API कॉल
      }, 60000); // 60 सेकंड = 1 मिनट
    };

    // कुछ भी activity हुई तो टाइमर रीसेट करो
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("mousedown", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("touchstart", resetTimer);

    resetTimer(); // शुरुआती कॉल

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("mousedown", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Example Input */}
      <input
        type="text"
        value={formData.petName}
        placeholder="Pet Name"
        onChange={(e) => handleChange("petName", e.target.value)}
        className="border px-3 py-2"
      />

      <input
        type="text"
        value={formData.clinicAddress}
        placeholder="Clinic Address"
        onChange={(e) => handleChange("clinicAddress", e.target.value)}
        className="border px-3 py-2"
      />

      {/* बाकी फील्ड्स भी ऐसे ही */}
    </div>
  );
}
--------------
    import { useEffect } from "react";

export const useDebouncedSave = (data: FormData, userId: string, delay = 1500) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      // 1. LocalStorage में सेव करें
      localStorage.setItem("formData", JSON.stringify(data));

      // 2. Backend पर API कॉल करें
      fetch("/api/save-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, formData: data }),
      });
    }, delay);

    return () => clearTimeout(handler); // हर बार पुराने टाइमर को क्लियर करें
  }, [data, delay, userId]);
};
-----------

    import React, { useState } from "react";
import { FormData } from "./types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const initialFormState: FormData = {
  petType: "",
  petName: "",
  treatmentName: "",
  clinicName: "",
  clinicAddress: "",
};

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(() => {
    const saved = localStorage.getItem("formData");
    return saved ? JSON.parse(saved) : initialFormState;
  });

  const handleChange = (name: keyof FormData, value: string) => {
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    localStorage.setItem("formData", JSON.stringify(updated));
  };

  return (
    <div className="space-y-4 max-w-md mx-auto p-4">
      {/* Pet Type */}
      <Select
        value={formData.petType}
        onValueChange={(val) => handleChange("petType", val)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Pet Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Dog">Dog</SelectItem>
          <SelectItem value="Cat">Cat</SelectItem>
        </SelectContent>
      </Select>

      {/* Pet Name */}
      <Select
        value={formData.petName}
        onValueChange={(val) => handleChange("petName", val)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Pet Name" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Tommy">Tommy</SelectItem>
          <SelectItem value="Kitty">Kitty</SelectItem>
        </SelectContent>
      </Select>

      {/* Treatment Name */}
      <Select
        value={formData.treatmentName}
        onValueChange={(val) => handleChange("treatmentName", val)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Treatment" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Vaccination">Vaccination</SelectItem>
          <SelectItem value="Surgery">Surgery</SelectItem>
        </SelectContent>
      </Select>

      {/* Clinic Name */}
      <Select
        value={formData.clinicName}
        onValueChange={(val) => handleChange("clinicName", val)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Clinic" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Happy Pets">Happy Pets</SelectItem>
          <SelectItem value="Care Clinic">Care Clinic</SelectItem>
        </SelectContent>
      </Select>

      {/* Clinic Address */}
      <Input
        type="text"
        placeholder="Enter Clinic Address"
        value={formData.clinicAddress}
        onChange={(e) => handleChange("clinicAddress", e.target.value)}
      />
    </div>
  );
};

export default FormComponent;



