import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const LocationStep = ({ selectedLocation, onLocationChange, onNext, onPrevious, onComplete }) => {
  const [customLocation, setCustomLocation] = useState('');
  const [showMap, setShowMap] = useState(false);

  const popularCities = [
    { value: 'mumbai', label: 'Mumbai, Maharashtra' },
    { value: 'delhi', label: 'New Delhi, Delhi' },
    { value: 'bangalore', label: 'Bangalore, Karnataka' },
    { value: 'hyderabad', label: 'Hyderabad, Telangana' },
    { value: 'chennai', label: 'Chennai, Tamil Nadu' },
    { value: 'kolkata', label: 'Kolkata, West Bengal' },
    { value: 'pune', label: 'Pune, Maharashtra' },
    { value: 'ahmedabad', label: 'Ahmedabad, Gujarat' },
    { value: 'jaipur', label: 'Jaipur, Rajasthan' },
    { value: 'surat', label: 'Surat, Gujarat' },
    { value: 'lucknow', label: 'Lucknow, Uttar Pradesh' },
    { value: 'kanpur', label: 'Kanpur, Uttar Pradesh' },
    { value: 'nagpur', label: 'Nagpur, Maharashtra' },
    { value: 'indore', label: 'Indore, Madhya Pradesh' },
    { value: 'thane', label: 'Thane, Maharashtra' },
    { value: 'bhopal', label: 'Bhopal, Madhya Pradesh' },
    { value: 'visakhapatnam', label: 'Visakhapatnam, Andhra Pradesh' },
    { value: 'pimpri', label: 'Pimpri-Chinchwad, Maharashtra' },
    { value: 'patna', label: 'Patna, Bihar' },
    { value: 'vadodara', label: 'Vadodara, Gujarat' },
    { value: 'custom', label: 'Other (Enter manually)' }
  ];

  const workPreferences = [
    { id: 'remote', label: 'Remote Work', icon: 'Home', description: 'Work from anywhere' },
    { id: 'hybrid', label: 'Hybrid', icon: 'Shuffle', description: 'Mix of office and remote' },
    { id: 'onsite', label: 'On-site', icon: 'Building', description: 'Work from office' }
  ];

  const [selectedWorkPreference, setSelectedWorkPreference] = useState('');

  const handleLocationSelect = (value) => {
    onLocationChange({ ...selectedLocation, city: value });
    if (value !== 'custom') {
      setCustomLocation('');
    }
    
    // Show map for demonstration
    if (value && value !== 'custom') {
      setShowMap(true);
    }
  };

  const handleCustomLocationChange = (e) => {
    const value = e?.target?.value;
    setCustomLocation(value);
    onLocationChange({ ...selectedLocation, customCity: value });
  };

  const handleWorkPreferenceSelect = (preference) => {
    setSelectedWorkPreference(preference);
    onLocationChange({ ...selectedLocation, workPreference: preference });
  };

  const getMapCoordinates = (city) => {
    const coordinates = {
      'mumbai': '19.0760,72.8777',
      'delhi': '28.7041,77.1025',
      'bangalore': '12.9716,77.5946',
      'hyderabad': '17.3850,78.4867',
      'chennai': '13.0827,80.2707',
      'kolkata': '22.5726,88.3639',
      'pune': '18.5204,73.8567',
      'ahmedabad': '23.0225,72.5714',
      'jaipur': '26.9124,75.7873',
      'surat': '21.1702,72.8311'
    };
    return coordinates?.[city] || '20.5937,78.9629'; // Default to India center
  };

  const isFormValid = () => {
    const hasLocation = selectedLocation?.city && 
      (selectedLocation?.city !== 'custom' || selectedLocation?.customCity);
    const hasWorkPreference = selectedWorkPreference;
    return hasLocation && hasWorkPreference;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Where would you like to work?
        </h2>
        <p className="text-muted-foreground">
          Tell us your location preferences to find relevant opportunities
        </p>
      </div>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Location Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Preferred City/Location
          </label>
          <Select
            options={popularCities}
            value={selectedLocation?.city || ''}
            onChange={handleLocationSelect}
            placeholder="Select your preferred city"
            searchable
            className="w-full"
          />
        </div>

        {/* Custom Location Input */}
        {selectedLocation?.city === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Enter Your City
            </label>
            <div className="relative">
              <Icon name="MapPin" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Enter your city name"
                value={customLocation}
                onChange={handleCustomLocationChange}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Work Preference */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-4">
            Work Preference
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {workPreferences?.map((preference) => (
              <div
                key={preference?.id}
                onClick={() => handleWorkPreferenceSelect(preference?.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedWorkPreference === preference?.id
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-center space-y-2">
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                    selectedWorkPreference === preference?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={preference?.icon} size={24} />
                  </div>
                  <h3 className="font-semibold text-foreground">{preference?.label}</h3>
                  <p className="text-sm text-muted-foreground">{preference?.description}</p>
                </div>
                
                {selectedWorkPreference === preference?.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={14} color="white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Map Display */}
        {showMap && selectedLocation?.city && selectedLocation?.city !== 'custom' && (
          <div className="bg-muted rounded-lg p-4">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
              <Icon name="MapPin" size={16} className="mr-2" />
              Location Preview
            </h4>
            <div className="w-full h-64 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title={`Map of ${selectedLocation?.city}`}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${getMapCoordinates(selectedLocation?.city)}&z=12&output=embed`}
                className="border-0"
              />
            </div>
          </div>
        )}

        {/* Summary */}
        {isFormValid() && (
          <div className="bg-success/5 border border-success/20 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center">
              <Icon name="CheckCircle" size={16} className="mr-2 text-success" />
              Your Preferences
            </h4>
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground">
                <span className="font-medium">Location:</span>{' '}
                {selectedLocation?.city === 'custom' 
                  ? selectedLocation?.customCity 
                  : popularCities?.find(c => c?.value === selectedLocation?.city)?.label
                }
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium">Work Style:</span>{' '}
                {workPreferences?.find(p => p?.id === selectedWorkPreference)?.label}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center pt-6">
        <Button
          variant="outline"
          onClick={onPrevious}
          iconName="ChevronLeft"
          iconPosition="left"
        >
          Previous
        </Button>
        
        <Button
          onClick={onComplete}
          disabled={!isFormValid()}
          iconName="Sparkles"
          iconPosition="right"
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
        >
          Get My Recommendations
        </Button>
      </div>
    </div>
  );
};

export default LocationStep;