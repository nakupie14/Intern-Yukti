import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillsPickerStep = ({ selectedSkills, onSkillsChange, onNext, onPrevious }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const skillCategories = [
    {
      category: 'Technical Skills',
      skills: [
        { id: 'python', name: 'Python', icon: 'Code', color: 'bg-blue-100 text-blue-700' },
        { id: 'javascript', name: 'JavaScript', icon: 'Globe', color: 'bg-yellow-100 text-yellow-700' },
        { id: 'react', name: 'React', icon: 'Zap', color: 'bg-cyan-100 text-cyan-700' },
        { id: 'java', name: 'Java', icon: 'Coffee', color: 'bg-red-100 text-red-700' },
        { id: 'sql', name: 'SQL', icon: 'Database', color: 'bg-green-100 text-green-700' },
        { id: 'html-css', name: 'HTML/CSS', icon: 'Layout', color: 'bg-orange-100 text-orange-700' }
      ]
    },
    {
      category: 'Design & Creative',
      skills: [
        { id: 'photoshop', name: 'Photoshop', icon: 'Image', color: 'bg-purple-100 text-purple-700' },
        { id: 'figma', name: 'Figma', icon: 'Pen', color: 'bg-pink-100 text-pink-700' },
        { id: 'ui-ux', name: 'UI/UX Design', icon: 'Palette', color: 'bg-indigo-100 text-indigo-700' },
        { id: 'video-editing', name: 'Video Editing', icon: 'Video', color: 'bg-teal-100 text-teal-700' },
        { id: 'graphic-design', name: 'Graphic Design', icon: 'Brush', color: 'bg-rose-100 text-rose-700' }
      ]
    },
    {
      category: 'Business & Marketing',
      skills: [
        { id: 'digital-marketing', name: 'Digital Marketing', icon: 'TrendingUp', color: 'bg-emerald-100 text-emerald-700' },
        { id: 'content-writing', name: 'Content Writing', icon: 'FileText', color: 'bg-amber-100 text-amber-700' },
        { id: 'social-media', name: 'Social Media', icon: 'Share2', color: 'bg-violet-100 text-violet-700' },
        { id: 'seo', name: 'SEO', icon: 'Search', color: 'bg-lime-100 text-lime-700' },
        { id: 'analytics', name: 'Analytics', icon: 'BarChart', color: 'bg-sky-100 text-sky-700' }
      ]
    },
    {
      category: 'Communication & Soft Skills',
      skills: [
        { id: 'communication', name: 'Communication', icon: 'MessageCircle', color: 'bg-slate-100 text-slate-700' },
        { id: 'leadership', name: 'Leadership', icon: 'Users', color: 'bg-stone-100 text-stone-700' },
        { id: 'teamwork', name: 'Teamwork', icon: 'UserCheck', color: 'bg-neutral-100 text-neutral-700' },
        { id: 'problem-solving', name: 'Problem Solving', icon: 'Lightbulb', color: 'bg-zinc-100 text-zinc-700' },
        { id: 'project-management', name: 'Project Management', icon: 'Calendar', color: 'bg-gray-100 text-gray-700' }
      ]
    }
  ];

  const allSkills = skillCategories?.flatMap(category => category?.skills);
  
  const filteredSkills = searchTerm
    ? allSkills?.filter(skill => 
        skill?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      )
    : allSkills;

  const handleSkillToggle = (skillId) => {
    const updatedSkills = selectedSkills?.includes(skillId)
      ? selectedSkills?.filter(id => id !== skillId)
      : [...selectedSkills, skillId];
    onSkillsChange(updatedSkills);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          What are your skills?
        </h2>
        <p className="text-muted-foreground">
          Select all skills that apply to you. Don't worry if you're still learning!
        </p>
      </div>
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
      <div className="space-y-6">
        {searchTerm ? (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Search Results</h3>
            <div className="flex flex-wrap gap-3">
              {filteredSkills?.map((skill) => (
                <button
                  key={skill?.id}
                  onClick={() => handleSkillToggle(skill?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all duration-200 hover:scale-105 ${
                    selectedSkills?.includes(skill?.id)
                      ? 'border-primary bg-primary text-primary-foreground shadow-md'
                      : `border-border hover:border-primary ${skill?.color}`
                  }`}
                >
                  <Icon name={skill?.icon} size={16} />
                  <span className="text-sm font-medium">{skill?.name}</span>
                  {selectedSkills?.includes(skill?.id) && (
                    <Icon name="Check" size={14} />
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          skillCategories?.map((category) => (
            <div key={category?.category}>
              <h3 className="text-lg font-semibold text-foreground mb-4">{category?.category}</h3>
              <div className="flex flex-wrap gap-3">
                {category?.skills?.map((skill) => (
                  <button
                    key={skill?.id}
                    onClick={() => handleSkillToggle(skill?.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all duration-200 hover:scale-105 ${
                      selectedSkills?.includes(skill?.id)
                        ? 'border-primary bg-primary text-primary-foreground shadow-md'
                        : `border-border hover:border-primary ${skill?.color}`
                    }`}
                  >
                    <Icon name={skill?.icon} size={16} />
                    <span className="text-sm font-medium">{skill?.name}</span>
                    {selectedSkills?.includes(skill?.id) && (
                      <Icon name="Check" size={14} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      {selectedSkills?.length > 0 && (
        <div className="bg-primary/5 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Selected Skills ({selectedSkills?.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedSkills?.map((skillId) => {
              const skill = allSkills?.find(s => s?.id === skillId);
              return skill ? (
                <span
                  key={skillId}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium"
                >
                  <Icon name={skill?.icon} size={12} />
                  <span>{skill?.name}</span>
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
          disabled={selectedSkills?.length === 0}
          iconName="ChevronRight"
          iconPosition="right"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default SkillsPickerStep;