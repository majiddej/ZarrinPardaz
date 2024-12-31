import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

interface Option {
  id: number;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: number | '';
  onChange: (value: number) => void;
  placeholder?: string;
  label: string;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'جستجو...',
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedOption = options.find((option) => option.id === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          type="text"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
          placeholder={placeholder}
          value={isOpen ? search : selectedOption?.label || ''}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onClick={(e) => e.stopPropagation()}
          onFocus={() => setIsOpen(true)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
          {filteredOptions.length === 0 ? (
            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
              نتیجه‌ای یافت نشد
            </div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option.id}
                className={`relative cursor-pointer select-none py-2 px-4 hover:bg-blue-50 ${
                  value === option.id ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                }`}
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                  setSearch('');
                }}
              >
                {option.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};