"use client";

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import { useEffect } from "react";

interface LocationSearchProps {
    onSelect: (address: string, lat: number, lng: number) => void;
    defaultValue?: string;
}

export default function LocationSearch({ onSelect, defaultValue }: LocationSearchProps) {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 300,
        defaultValue: defaultValue || "",
    });

    useEffect(() => {
        if (defaultValue) {
            setValue(defaultValue, false);
        }
    }, [defaultValue, setValue]);

    const handleSelect = async (address: string) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            onSelect(address, lat, lng);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <div className="relative">
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Search for a location..."
            />
            {status === "OK" && (
                <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-zinc-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {data.map(({ place_id, description }) => (
                        <li
                            key={place_id}
                            onClick={() => handleSelect(description)}
                            className="relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white text-gray-900 dark:text-gray-200"
                        >
                            {description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
