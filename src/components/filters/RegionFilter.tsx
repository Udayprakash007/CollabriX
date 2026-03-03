import { MapPin, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <Select
          value={selectedRegion || 'all'}
          onValueChange={(value) => onRegionChange(value === 'all' ? null : value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent className="bg-popover border border-border shadow-lg z-50 max-h-[300px]">
            <SelectItem value="all">All Regions</SelectItem>
            {Object.entries(REGIONS_WITH_COUNTRIES).map(([region, countries]) => (
              <SelectGroup key={region}>
                <SelectLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{region}</SelectLabel>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedRegion && (
        <Badge variant="secondary" className="mt-2 gap-1">
          <MapPin className="h-3 w-3" />
          {selectedRegion}
          <button
            onClick={() => onRegionChange(null)}
            className="ml-1 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
    </div>
  );
};

export { REGIONS };
