import { useState } from 'react';
import { MapPin, X, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const REGIONS_WITH_COUNTRIES: Record<string, string[]> = {
  'North America': ['United States', 'Canada', 'Mexico'],
  'Central America': ['Guatemala', 'Honduras', 'El Salvador', 'Nicaragua', 'Costa Rica', 'Panama', 'Belize'],
  'Caribbean': ['Jamaica', 'Cuba', 'Haiti', 'Dominican Republic', 'Trinidad and Tobago', 'Puerto Rico', 'Bahamas'],
  'South America': ['Brazil', 'Argentina', 'Colombia', 'Chile', 'Peru', 'Venezuela', 'Ecuador', 'Bolivia', 'Uruguay', 'Paraguay'],
  'Europe': ['United Kingdom', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Poland', 'Portugal', 'Switzerland', 'Austria', 'Belgium', 'Ireland', 'Czech Republic', 'Romania', 'Ukraine', 'Greece'],
  'Asia': ['India', 'China', 'Japan', 'South Korea', 'Singapore', 'Indonesia', 'Philippines', 'Vietnam', 'Thailand', 'Malaysia', 'Taiwan', 'Bangladesh', 'Pakistan', 'Sri Lanka'],
  'Middle East': ['United Arab Emirates', 'Saudi Arabia', 'Israel', 'Turkey', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Jordan', 'Lebanon', 'Egypt', 'Iraq', 'Iran'],
  'Africa': ['Nigeria', 'South Africa', 'Kenya', 'Ghana', 'Ethiopia', 'Tanzania', 'Rwanda', 'Uganda', 'Morocco', 'Tunisia', 'Senegal', 'Cameroon'],
  'Oceania': ['Australia', 'New Zealand', 'Fiji', 'Papua New Guinea'],
};

const REGIONS = Object.keys(REGIONS_WITH_COUNTRIES);

interface RegionFilterProps {
  selectedRegion: string | null;
  onRegionChange: (region: string | null) => void;
  className?: string;
}

export const RegionFilter = ({
  selectedRegion,
  onRegionChange,
  className,
}: RegionFilterProps) => {
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);

  const handleContinentChange = (value: string) => {
    if (value === 'all') {
      setSelectedContinent(null);
      onRegionChange(null);
    } else {
      setSelectedContinent(value);
      onRegionChange(null);
    }
  };

  const handleCountryChange = (value: string) => {
    if (value === 'all_countries') {
      onRegionChange(selectedContinent);
    } else {
      onRegionChange(value);
    }
  };

  const clearAll = () => {
    setSelectedContinent(null);
    onRegionChange(null);
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2 flex-wrap">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <Select
          value={selectedContinent || 'all'}
          onValueChange={handleContinentChange}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Continent" />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border shadow-lg z-50">
            <SelectItem value="all">All Regions</SelectItem>
            {REGIONS.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedContinent && (
          <>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Select
              value={selectedRegion && selectedRegion !== selectedContinent ? selectedRegion : 'all_countries'}
              onValueChange={handleCountryChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border shadow-lg z-50 max-h-[250px]">
                <SelectItem value="all_countries">All Countries</SelectItem>
                {REGIONS_WITH_COUNTRIES[selectedContinent]?.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
      </div>

      {(selectedContinent || selectedRegion) && (
        <div className="flex gap-2 mt-2 flex-wrap">
          {selectedContinent && (
            <Badge variant="secondary" className="gap-1">
              <MapPin className="h-3 w-3" />
              {selectedContinent}
              {selectedRegion && selectedRegion !== selectedContinent && ` › ${selectedRegion}`}
              <button onClick={clearAll} className="ml-1 hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export { REGIONS, REGIONS_WITH_COUNTRIES };
