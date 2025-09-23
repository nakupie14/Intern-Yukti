import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const [filter, setFilter] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());

  const activityTypes = [
    { value: 'all', label: 'All Activities', count: activities?.length },
    { value: 'user_registration', label: 'Registrations', count: activities?.filter(a => a?.type === 'user_registration')?.length },
    { value: 'internship_posting', label: 'Internships', count: activities?.filter(a => a?.type === 'internship_posting')?.length },
    { value: 'user_report', label: 'Reports', count: activities?.filter(a => a?.type === 'user_report')?.length },
    { value: 'system_update', label: 'System', count: activities?.filter(a => a?.type === 'system_update')?.length }
  ];

  const severityConfig = {
    info: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      dot: 'bg-blue-400'
    },
    success: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-200',
      dot: 'bg-green-400'
    },
    warning: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      border: 'border-yellow-200',
      dot: 'bg-yellow-400'
    },
    error: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-200',
      dot: 'bg-red-400'
    }
  };

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.type === filter);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = Math.abs(now - new Date(timestamp));
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const toggleExpanded = (activityId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded?.has(activityId)) {
      newExpanded?.delete(activityId);
    } else {
      newExpanded?.add(activityId);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Recent Activities</h2>
          <p className="text-sm text-muted-foreground">Latest platform events and updates</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={20} className="text-primary" />
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      {/* Activity Type Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {activityTypes?.map((type) => (
          <button
            key={type?.value}
            onClick={() => setFilter(type?.value)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
              filter === type?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {type?.label}
            {type?.count > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-current/20 rounded-full">
                {type?.count}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Activity List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredActivities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No activities found</p>
          </div>
        ) : (
          filteredActivities?.map((activity) => {
            const config = severityConfig?.[activity?.severity] || severityConfig?.info;
            const isExpanded = expandedItems?.has(activity?.id);
            
            return (
              <div
                key={activity?.id}
                className={`
                  relative p-4 rounded-lg border transition-all duration-200
                  ${config?.bg} ${config?.border}
                  hover:shadow-md cursor-pointer
                `}
                onClick={() => toggleExpanded(activity?.id)}
              >
                <div className="flex items-start space-x-3">
                  {/* Activity Icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config?.bg?.replace('-50', '-100')}`}>
                    <Icon name={activity?.icon} size={16} className={config?.text} />
                  </div>
                  
                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${config?.text}`}>
                        {activity?.message}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(activity?.timestamp)}
                      </span>
                    </div>
                    
                    {/* Severity Badge */}
                    <div className="flex items-center justify-between mt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
                        <div className={`w-2 h-2 ${config?.dot} rounded-full mr-1`}></div>
                        {activity?.severity?.charAt(0)?.toUpperCase() + activity?.severity?.slice(1)}
                      </span>
                      
                      {/* Expand Icon */}
                      <Icon 
                        name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
                        size={16} 
                        className={`${config?.text} transition-transform duration-200`}
                      />
                    </div>
                    
                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-current/20 animate-slide-down">
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Type:</span>
                            <span className="ml-2">{activity?.type?.replace('_', ' ')}</span>
                          </div>
                          <div>
                            <span className="font-medium">Time:</span>
                            <span className="ml-2">{new Date(activity?.timestamp)?.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="font-medium">ID:</span>
                            <span className="ml-2 font-mono text-xs">{activity?.id}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={14} />
          <span>Auto-refresh every 30 seconds</span>
        </div>
        <button className="flex items-center space-x-1 hover:text-foreground transition-colors duration-200">
          <Icon name="ExternalLink" size={14} />
          <span>View all logs</span>
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;