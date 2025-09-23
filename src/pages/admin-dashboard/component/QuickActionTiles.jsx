import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActionTiles = () => {
  const quickActions = [
    {
      id: 'user-management',
      title: 'User Management',
      description: 'Manage user accounts, permissions, and profiles',
      icon: 'Users',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      hoverColor: 'hover:bg-blue-100',
      badge: '15,847 users'
    },
    {
      id: 'internship-moderation',
      title: 'Internship Moderation',
      description: 'Review and approve internship postings',
      icon: 'Briefcase',
      color: 'bg-green-50 text-green-600 border-green-200',
      hoverColor: 'hover:bg-green-100',
      badge: '23 pending'
    },
    {
      id: 'content-approval',
      title: 'Content Approval',
      description: 'Moderate user-generated content and reports',
      icon: 'FileCheck',
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      hoverColor: 'hover:bg-purple-100',
      badge: '8 reviews'
    },
    {
      id: 'system-settings',
      title: 'System Settings',
      description: 'Configure platform settings and preferences',
      icon: 'Settings',
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      hoverColor: 'hover:bg-orange-100',
      badge: null
    }
  ];

  const handleActionClick = (actionId) => {
    // Future implementation: Navigate to specific admin sections
    console.log(`Navigate to ${actionId}`);
    
    // For now, show a notification
    const actionTitles = {
      'user-management': 'User Management',
      'internship-moderation': 'Internship Moderation', 
      'content-approval': 'Content Approval',
      'system-settings': 'System Settings'
    };
    
    alert(`${actionTitles?.[actionId]} feature coming soon!`);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
          <p className="text-sm text-muted-foreground">One-click access to admin functions</p>
        </div>
        <Icon name="Zap" size={20} className="text-primary" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action?.id)}
            className={`
              relative p-4 rounded-lg border-2 transition-all duration-200 text-left
              ${action?.color} ${action?.hoverColor}
              hover:shadow-md hover:scale-105 active:scale-100
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            `}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action?.color?.replace('text-', 'bg-')?.replace('-600', '-100')}`}>
                <Icon name={action?.icon} size={20} />
              </div>
              {action?.badge && (
                <span className="px-2 py-1 bg-white/80 border border-current rounded-full text-xs font-medium">
                  {action?.badge}
                </span>
              )}
            </div>
            
            <h3 className="font-semibold mb-1">{action?.title}</h3>
            <p className="text-sm opacity-80">{action?.description}</p>
            
            {/* Arrow indicator */}
            <div className="absolute bottom-4 right-4 opacity-50 group-hover:opacity-100 transition-opacity duration-200">
              <Icon name="ArrowRight" size={16} />
            </div>
          </button>
        ))}
      </div>

      {/* Bottom info */}
      <div className="mt-6 pt-6 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={14} />
          <span>Role-based access control enabled</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>All systems operational</span>
        </div>
      </div>
    </div>
  );
};

export default QuickActionTiles;