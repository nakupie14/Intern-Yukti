import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InterestsStep = ({ selectedInterests, onInterestsChange, onNext, onPrevious }) => {
  const [flippedCard, setFlippedCard] = useState(null);

  const interestCards = [
    {
      id: 'technology',
      title: 'Technology',
      description: 'Software development, AI, cybersecurity, and emerging tech',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      icon: 'Laptop',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'design',
      title: 'Design & Creative',
      description: 'UI/UX design, graphic design, branding, and visual arts',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=400&h=300&fit=crop',
      icon: 'Palette',
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 'marketing',
      title: 'Marketing & Sales',
      description: 'Digital marketing, content creation, social media, and sales',
      image: 'https://images.pixabay.com/photo/2017/01/14/12/59/iceland-1979445_1280.jpg?w=400&h=300&fit=crop',
      icon: 'TrendingUp',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'business',
      title: 'Business & Finance',
      description: 'Business analysis, consulting, finance, and entrepreneurship',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      icon: 'Briefcase',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Life Sciences',
      description: 'Medical research, healthcare technology, and life sciences',
      image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?w=400&h=300&fit=crop',
      icon: 'Heart',
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 'education',
      title: 'Education & Training',
      description: 'Teaching, curriculum development, and educational technology',
      image: 'https://images.pixabay.com/photo/2015/07/17/22/43/student-849825_1280.jpg?w=400&h=300&fit=crop',
      icon: 'BookOpen',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      id: 'media',
      title: 'Media & Communications',
      description: 'Journalism, content creation, broadcasting, and PR',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop',
      icon: 'Video',
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 'engineering',
      title: 'Engineering & Manufacturing',
      description: 'Mechanical, electrical, civil engineering, and manufacturing',
      image: 'https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?w=400&h=300&fit=crop',
      icon: 'Settings',
      color: 'from-gray-500 to-slate-600'
    }
  ];

  const handleInterestToggle = (interestId) => {
    const updatedInterests = selectedInterests?.includes(interestId)
      ? selectedInterests?.filter(id => id !== interestId)
      : [...selectedInterests, interestId];
    onInterestsChange(updatedInterests);
  };

  const handleCardHover = (cardId) => {
    setFlippedCard(cardId);
  };

  const handleCardLeave = () => {
    setFlippedCard(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          What interests you most?
        </h2>
        <p className="text-muted-foreground">
          Select the fields that excite you. You can choose multiple areas!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {interestCards?.map((card) => (
          <div
            key={card?.id}
            className="relative h-64 cursor-pointer group"
            onMouseEnter={() => handleCardHover(card?.id)}
            onMouseLeave={handleCardLeave}
            onClick={() => handleInterestToggle(card?.id)}
          >
            <div className={`absolute inset-0 rounded-xl transition-all duration-500 transform-gpu ${
              flippedCard === card?.id ? 'rotate-y-180' : ''
            } ${
              selectedInterests?.includes(card?.id)
                ? 'ring-4 ring-primary ring-offset-2 shadow-xl scale-105'
                : 'hover:scale-105 hover:shadow-lg'
            }`}>
              {/* Front of card */}
              <div className={`absolute inset-0 rounded-xl overflow-hidden backface-hidden ${
                flippedCard === card?.id ? 'opacity-0' : 'opacity-100'
              } transition-opacity duration-300`}>
                <div className="relative h-full">
                  <Image
                    src={card?.image}
                    alt={card?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${card?.color} opacity-80`} />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name={card?.icon} size={24} />
                      <h3 className="text-lg font-bold">{card?.title}</h3>
                    </div>
                  </div>
                  
                  {selectedInterests?.includes(card?.id) && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Icon name="Check" size={18} className="text-primary" />
                    </div>
                  )}
                </div>
              </div>

              {/* Back of card */}
              <div className={`absolute inset-0 rounded-xl bg-white border border-border p-4 backface-hidden rotate-y-180 ${
                flippedCard === card?.id ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-300`}>
                <div className="h-full flex flex-col justify-center text-center space-y-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${card?.color} flex items-center justify-center`}>
                    <Icon name={card?.icon} size={32} color="white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{card?.title}</h3>
                  <p className="text-sm text-muted-foreground">{card?.description}</p>
                  
                  {selectedInterests?.includes(card?.id) && (
                    <div className="flex items-center justify-center space-x-2 text-primary">
                      <Icon name="Check" size={16} />
                      <span className="text-sm font-medium">Selected</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedInterests?.length > 0 && (
        <div className="bg-primary/5 rounded-lg p-4 max-w-4xl mx-auto">
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Selected Interests ({selectedInterests?.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedInterests?.map((interestId) => {
              const interest = interestCards?.find(c => c?.id === interestId);
              return interest ? (
                <span
                  key={interestId}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium"
                >
                  <Icon name={interest?.icon} size={12} />
                  <span>{interest?.title}</span>
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}
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
          onClick={onNext}
          disabled={selectedInterests?.length === 0}
          iconName="ChevronRight"
          iconPosition="right"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default InterestsStep;