import React from 'react';
import Icon from '../../../components/AppIcon';

const NavigationSidebar = ({ isOpen, onClose }) => {
  const navigationSections = [
    {
      title: 'Dashboard',
      items: [
        { id: 'overview', label: 'Overview', icon: 'BarChart3', active: true },
        { id: 'analytics', label: 'Analytics', icon: 'TrendingUp' },
        { id: 'reports', label: 'Reports', icon: 'FileText' }
      ]
    },
    {
      title: 'User Management',
      items: [
        { id: 'users', label: 'All Users', icon: 'Users', badge: '15.8k' },
        { id: 'students', label: 'Students', icon: 'GraduationCap', badge: '12.3k' },
        { id: 'employers', label: 'Employers', icon: 'Building', badge: '234' },
        { id: 'permissions', label: 'Permissions', icon: 'Shield' }
      ]
    },
    {
      title: 'Content Management',
      items: [
        { id: 'internships', label: 'Internships', icon: 'Briefcase', badge: '342' },
        { id: 'moderation', label: 'Moderation', icon: 'Eye', badge: '23' },
        { id: 'approvals', label: 'Approvals', icon: 'CheckCircle', badge: '8' },
        { id: 'categories', label: 'Categories', icon: 'Tag' }
      ]
    },
    {
      title: 'System',
      items: [
        { id: 'settings', label: 'Settings', icon: 'Settings' },
        { id: 'integrations', label: 'Integrations', icon: 'Link' },
        { id: 'logs', label: 'System Logs', icon: 'FileSearch' },
        { id: 'backups', label: 'Backups', icon: 'Database' }
      ]
    }
  ];

  const handleNavigationClick = (itemId) => {
    console.log(`Navigate to ${itemId}`);
    // Future: Implement navigation logic
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 md:hidden animate-fade-in"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-16 bottom-0 w-80 bg-card border-r border-border z-50 overflow-y-auto animate-slide-in-left md:hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Admin Panel</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-muted transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Manage your platform</p>
        </div>

        {/* Navigation Sections */}
        <div className="p-4 space-y-6">
          {navigationSections?.map((section) => (
            <div key={section?.title}>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {section?.title}
              </h3>
              <div className="space-y-1">
                {section?.items?.map((item) => (
                  <button
                    key={item?.id}
                    onClick={() => handleNavigationClick(item?.id)}
                    className={`
                      flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${item?.active 
                        ? 'bg-primary text-primary-foreground shadow-sm' 
                        : 'text-foreground hover:bg-muted hover:text-primary'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </div>
                    {item?.badge && (
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${item?.active 
                          ? 'bg-primary-foreground/20 text-primary-foreground' 
                          : 'bg-muted-foreground/10 text-muted-foreground'
                        }
                      `}>
                        {item?.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border mt-auto">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">System Status</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-600 font-medium">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="text-foreground">Just now</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationSidebar;