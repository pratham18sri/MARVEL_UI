import React from 'react';
import { Search } from 'lucide-react';

export interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Search Suit Database...' }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A8A9AD]">
        <Search className="h-4.5 w-4.5" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-11 pr-4 py-2.5 bg-[#141414] border border-white/5 focus:border-[#E62429] rounded-lg text-sm text-[#F5F5F5] placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#E62429] transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] focus:shadow-[0_0_15px_rgba(230,36,41,0.25)]"
      />
    </div>
  );
};
export default SearchBar;
