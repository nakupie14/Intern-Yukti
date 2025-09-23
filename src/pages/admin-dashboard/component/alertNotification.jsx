import React from 'react';
import Icon from '../../../components/AppIcon';

const AlertNotifications = ({ alerts, onDismiss }) => {
  const priorityConfig = {
    high: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: 'AlertCircle',
      iconColor: 'text-red-500'
    },
    medium: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: 'AlertTriangle',
      iconColor: 'text-yellow-500'
    },
    low: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'Info',
      iconColor: 'text-blue-500'
    }
  };

  const typeConfig = {
    performance: {
      label: 'Performance',
      color: 'bg-red-100 text-red-800'
    },
    content: {
      label: 'Content',
      color: 'bg-yellow-100 text-yellow-800'
    },
    security: {
      label: 'Security',
      color: 'bg-purple-100 text-purple-800'
    },
    system: {
      label: 'System',
      color: 'bg-blue-100 text-blue-800'
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = Math.abs(now - new Date(timestamp));
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  if (!alerts || alerts?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 animate-slide-down">
      {alerts?.map((alert) => {
        const priorityStyles = priorityConfig?.[alert?.priority] || priorityConfig?.medium;
        const typeStyles = typeConfig?.[alert?.type] || typeConfig?.system;
        
        return (
          <div
            key={alert?.id}
            className={`
              relative rounded-lg border p-4 shadow-sm
              ${priorityStyles?.bg} ${priorityStyles?.border}
              animate-fade-in
            `}
          >
            <div className="flex items-start space-x-3">
              {/* Alert Icon */}
              <div className={`flex-shrink-0 ${priorityStyles?.iconColor}`}>
                <Icon name={priorityStyles?.icon} size={20} />
              </div>
              
              {/* Alert Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`text-sm font-semibold ${priorityStyles?.text}`}>
                    {alert?.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {/* Type Badge */}
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${typeStyles?.color}`}>
                      {typeStyles?.label}
                    </span>
                    {/* Priority Badge */}
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium uppercase ${
                      alert?.priority === 'high' ? 'bg-red-100 text-red-800' :
                      alert?.priority === 'medium'? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {alert?.priority}
                    </span>
                  </div>
                </div>
                
                <p className={`text-sm ${priorityStyles?.text} opacity-90`}>
                  {alert?.message}
                </p>
                
                {/* Alert Footer */}
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-xs ${priorityStyles?.text} opacity-75`}>
                    {formatTimeAgo(alert?.timestamp)}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      className={`text-xs font-medium ${priorityStyles?.text} hover:opacity-80 transition-opacity duration-200`}
                    >
                      View Details
                    </button>
                    <div className={`w-px h-4 ${priorityStyles?.border}`}></div>
                    <button
                      onClick={() => onDismiss(alert?.id)}
                      className={`text-xs font-medium ${priorityStyles?.text} hover:opacity-80 transition-opacity duration-200`}
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => onDismiss(alert?.id)}
                className={`flex-shrink-0 ${priorityStyles?.text} hover:opacity-80 transition-opacity duration-200`}
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            {/* Progress Bar for Time-sensitive Alerts */}
            {alert?.priority === 'high' && (
              <div className="mt-3">
                <div className="w-full bg-red-200 rounded-full h-1">
                  <div 
                    className="bg-red-500 h-1 rounded-full animate-pulse" 
                    style={{ width: '75%' }}
                  ></div>
                </div>
                <p className="text-xs text-red-700 mt-1">Requires immediate attention</p>
              </div>
            )}
          </div>
        );
      })}
      {/* Alert Summary */}
      {alerts?.length > 1 && (
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Bell" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {alerts?.length} active alert{alerts?.length !== 1 ? 's' : ''}
              </span>
            </div>
            <button
              onClick={() => alerts?.forEach(alert => onDismiss(alert?.id))}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Dismiss All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertNotifications;