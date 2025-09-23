import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const InternshipCard = ({ internship, onSave, onApply, onShare, isSaved = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await onSave(internship?.id);
    setIsLoading(false);
  };

  const handleApply = async () => {
    setIsLoading(true);
    await onApply(internship?.id);
    setIsLoading(false);
  };

  const handleShare = () => {
    onShare(internship);
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 ${
        isHovered ? 'transform -translate-y-1' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with Company Logo and Basic Info */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={internship?.companyLogo}
            alt={`${internship?.company} logo`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-card-foreground mb-1 line-clamp-2">
            {internship?.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{internship?.company}</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="MapPin" size={12} />
              <span>{internship?.location}</span>
            </span>
            <span className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Clock" size={12} />
              <span>{internship?.duration}</span>
            </span>
            {internship?.stipend && (
              <span className="flex items-center space-x-1 text-success">
                <Icon name="IndianRupee" size={12} />
                <span>{internship?.stipend}</span>
              </span>
            )}
          </div>
        </div>
        {isSaved && (
          <div className="flex-shrink-0">
            <Icon name="Bookmark" size={16} className="text-primary" />
          </div>
        )}
      </div>
      {/* Skills Tags */}
      {internship?.skills && internship?.skills?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {internship?.skills?.slice(0, 4)?.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
            >
              {skill}
            </span>
          ))}
          {internship?.skills?.length > 4 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              +{internship?.skills?.length - 4} more
            </span>
          )}
        </div>
      )}
      {/* Why This For You Section */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-card-foreground mb-2 flex items-center space-x-1">
          <Icon name="Lightbulb" size={14} className="text-accent" />
          <span>Why this for you?</span>
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {internship?.whyForYou}
        </p>
      </div>
      {/* Match Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-card-foreground">Match Score</span>
          <span className="text-xs font-bold text-primary">{internship?.matchScore}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${internship?.matchScore}%` }}
          />
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-2">
        <Button
          variant={isSaved ? "default" : "outline"}
          size="sm"
          onClick={handleSave}
          loading={isLoading}
          iconName={isSaved ? "BookmarkCheck" : "Bookmark"}
          iconPosition="left"
          className="flex-1"
        >
          {isSaved ? "Saved" : "Save"}
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={handleApply}
          loading={isLoading}
          iconName="ExternalLink"
          iconPosition="left"
          className="flex-1"
        >
          Apply
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          iconName="Share2"
          className="px-3"
        />
      </div>
      {/* Application Deadline */}
      {internship?.deadline && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Calendar" size={12} />
            <span>Apply by: {internship?.deadline}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipCard;