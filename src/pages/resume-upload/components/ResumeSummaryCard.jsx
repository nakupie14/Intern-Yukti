import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResumeSummaryCard = ({ resumeData, onEdit, onConfirm, className = '' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(resumeData);

  const handleEdit = () => {
    setIsEditing(true);
    onEdit?.();
  };

  const handleSave = () => {
    setIsEditing(false);
    onConfirm?.(editedData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(resumeData);
  };

  const handleSkillAdd = (skill) => {
    if (skill?.trim() && !editedData?.skills?.includes(skill?.trim())) {
      setEditedData(prev => ({
        ...prev,
        skills: [...prev?.skills, skill?.trim()]
      }));
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setEditedData(prev => ({
      ...prev,
      skills: prev?.skills?.filter(skill => skill !== skillToRemove)
    }));
  };

  const confidenceColors = {
    high: 'bg-success text-success-foreground',
    medium: 'bg-warning text-warning-foreground',
    low: 'bg-error text-error-foreground'
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-sm ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Resume Summary</h3>
              <p className="text-sm text-muted-foreground">
                AI-extracted information from your resume
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${confidenceColors?.[resumeData?.confidence]}`}>
              {resumeData?.confidence} confidence
            </div>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                iconName="Edit"
                iconPosition="left"
                onClick={handleEdit}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Personal Information */}
        <div>
          <h4 className="text-sm font-semibold text-card-foreground mb-3 flex items-center">
            <Icon name="User" size={16} className="mr-2" />
            Personal Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData?.name}
                  onChange={(e) => setEditedData(prev => ({ ...prev, name: e?.target?.value }))}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              ) : (
                <p className="text-sm text-card-foreground mt-1">{resumeData?.name}</p>
              )}
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedData?.email}
                  onChange={(e) => setEditedData(prev => ({ ...prev, email: e?.target?.value }))}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              ) : (
                <p className="text-sm text-card-foreground mt-1">{resumeData?.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <h4 className="text-sm font-semibold text-card-foreground mb-3 flex items-center">
            <Icon name="GraduationCap" size={16} className="mr-2" />
            Education
          </h4>
          <div className="space-y-3">
            {resumeData?.education?.map((edu, index) => (
              <div key={index} className="p-3 bg-surface rounded-md">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">{edu?.degree}</p>
                    <p className="text-xs text-muted-foreground">{edu?.institution}</p>
                    <p className="text-xs text-muted-foreground">{edu?.year}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${confidenceColors?.[edu?.confidence]}`}>
                    {edu?.confidence}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h4 className="text-sm font-semibold text-card-foreground mb-3 flex items-center">
            <Icon name="Zap" size={16} className="mr-2" />
            Identified Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {(isEditing ? editedData?.skills : resumeData?.skills)?.map((skill, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                <span>{skill}</span>
                {isEditing && (
                  <button
                    onClick={() => handleSkillRemove(skill)}
                    className="ml-1 hover:text-error transition-colors"
                  >
                    <Icon name="X" size={12} />
                  </button>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                onClick={() => {
                  const newSkill = prompt('Add a skill:');
                  if (newSkill) handleSkillAdd(newSkill);
                }}
                className="flex items-center space-x-1 px-3 py-1 border border-dashed border-primary text-primary rounded-full text-sm font-medium hover:bg-primary/5 transition-colors"
              >
                <Icon name="Plus" size={12} />
                <span>Add Skill</span>
              </button>
            )}
          </div>
        </div>

        {/* Projects */}
        <div>
          <h4 className="text-sm font-semibold text-card-foreground mb-3 flex items-center">
            <Icon name="Briefcase" size={16} className="mr-2" />
            Projects & Experience
          </h4>
          <div className="space-y-3">
            {resumeData?.projects?.map((project, index) => (
              <div key={index} className="p-3 bg-surface rounded-md">
                <div className="flex items-start justify-between mb-2">
                  <h5 className="text-sm font-medium text-card-foreground">{project?.title}</h5>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${confidenceColors?.[project?.confidence]}`}>
                    {project?.confidence}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{project?.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project?.technologies?.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Language Detection */}
        {resumeData?.originalLanguage !== 'en' && (
          <div className="p-4 bg-accent/10 border border-accent/20 rounded-md">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Languages" size={16} className="text-accent" />
              <span className="text-sm font-medium text-accent">Multi-language Processing</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Original language detected: {resumeData?.originalLanguage?.toUpperCase()}. 
              Content has been automatically translated for analysis.
            </p>
          </div>
        )}
      </div>
      {/* Actions */}
      {isEditing ? (
        <div className="p-6 border-t border-border bg-surface/50">
          <div className="flex items-center justify-end space-x-3">
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              iconName="Check"
              iconPosition="left"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-6 border-t border-border bg-surface/50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Review the extracted information and proceed to get recommendations
            </p>
            <Button
              variant="default"
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
              onClick={() => onConfirm?.(resumeData)}
            >
              Get Recommendations
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeSummaryCard;