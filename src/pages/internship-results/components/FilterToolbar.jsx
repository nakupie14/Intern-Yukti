import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterToolbar = ({ 
  onFilterChange, 
  onSortChange, 
  totalResults = 0,
  showSavedOnly = false,
  onToggleSavedOnly 
}) => {
  const [activeFilters, setActiveFilters] = useState({
    location: '',
    duration: '',
    stipend: '',
    workMode: ''
  });
  const [sortBy, setSortBy] = useState('relevance');

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'pune', label: 'Pune' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'remote', label: 'Remote' }
  ];

  const durationOptions = [
    { value: '', label: 'Any Duration' },
    { value: '1-3', label: '1-3 months' },
    { value: '3-6', label: '3-6 months' },
    { value: '6+', label: '6+ months' }
  ];

  const stipendOptions = [
    { value: '', label: 'Any Stipend' },
    { value: 'unpaid', label: 'Unpaid' },
    { value: '1-10k', label: '₹1,000 - ₹10,000' },
    { value: '10-25k', label: '₹10,000 - ₹25,000' },
    { value: '25k+', label: '₹25,000+' }
  ];

  const workModeOptions = [
    { value: '', label: 'Any Work Mode' },
    { value: 'remote', label: 'Remote' },
    { value: 'onsite', label: 'On-site' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'match-score', label: 'Highest Match' },
    { value: 'stipend-high', label: 'Highest Stipend' },
    { value: 'deadline', label: 'Application Deadline' },
    { value: 'recent', label: 'Recently Posted' }
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onSortChange(value);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      location: '',
      duration: '',
      stipend: '',
      workMode: ''
    };
    setActiveFilters(clearedFilters);
    setSortBy('relevance');
    onFilterChange(clearedFilters);
    onSortChange('relevance');
  };

  const hasActiveFilters = Object.values(activeFilters)?.some(value => value !== '') || sortBy !== 'relevance';

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-card-foreground">
            {totalResults} Internship{totalResults !== 1 ? 's' : ''} Found
          </h2>
          {showSavedOnly && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
              Saved Only
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleSavedOnly}
            iconName={showSavedOnly ? "BookmarkCheck" : "Bookmark"}
            iconPosition="left"
          >
            {showSavedOnly ? "Show All" : "Saved Only"}
          </Button>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Select
          placeholder="Location"
          options={locationOptions}
          value={activeFilters?.location}
          onChange={(value) => handleFilterChange('location', value)}
          className="w-full"
        />
        
        <Select
          placeholder="Duration"
          options={durationOptions}
          value={activeFilters?.duration}
          onChange={(value) => handleFilterChange('duration', value)}
          className="w-full"
        />
        
        <Select
          placeholder="Stipend Range"
          options={stipendOptions}
          value={activeFilters?.stipend}
          onChange={(value) => handleFilterChange('stipend', value)}
          className="w-full"
        />
        
        <Select
          placeholder="Work Mode"
          options={workModeOptions}
          value={activeFilters?.workMode}
          onChange={(value) => handleFilterChange('workMode', value)}
          className="w-full"
        />
        
        <Select
          placeholder="Sort by"
          options={sortOptions}
          value={sortBy}
          onChange={handleSortChange}
          className="w-full"
        />
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          {Object.entries(activeFilters)?.map(([key, value]) => {
            if (!value) return null;
            
            const getFilterLabel = (filterKey, filterValue) => {
              const optionsMap = {
                location: locationOptions,
                duration: durationOptions,
                stipend: stipendOptions,
                workMode: workModeOptions
              };
              const option = optionsMap?.[filterKey]?.find(opt => opt?.value === filterValue);
              return option ? option?.label : filterValue;
            };

            return (
              <span
                key={key}
                className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
              >
                <span>{getFilterLabel(key, value)}</span>
                <button
                  onClick={() => handleFilterChange(key, '')}
                  className="hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            );
          })}
          
          {sortBy !== 'relevance' && (
            <span className="inline-flex items-center space-x-1 px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full">
              <span>Sort: {sortOptions?.find(opt => opt?.value === sortBy)?.label}</span>
              <button
                onClick={() => handleSortChange('relevance')}
                className="hover:bg-secondary/20 rounded-full p-0.5 transition-colors duration-200"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;