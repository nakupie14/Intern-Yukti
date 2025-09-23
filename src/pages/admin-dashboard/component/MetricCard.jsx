import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon, 
  color = 'blue' 
}) => {
  const colorVariants = {
    blue: {
      bg: 'bg-blue-50',
      icon: 'text-blue-600',
      border: 'border-blue-200'
    },
    green: {
      bg: 'bg-green-50',
      icon: 'text-green-600',
      border: 'border-green-200'
    },
    purple: {
      bg: 'bg-purple-50',
      icon: 'text-purple-600',
      border: 'border-purple-200'
    },
    orange: {
      bg: 'bg-orange-50',
      icon: 'text-orange-600',
      border: 'border-orange-200'
    }
  };

  const currentColor = colorVariants?.[color] || colorVariants?.blue;

  const formatChange = (changeValue) => {
    if (!changeValue && changeValue !== 0) return null;
    const isPositive = changeValue >= 0;
    return {
      value: Math.abs(changeValue),
      isPositive,
      text: `${isPositive ? '+' : '-'}${Math.abs(changeValue)}%`
    };
  };

  const changeData = formatChange(change);

  return (
    <div className={`bg-card rounded-xl border ${currentColor?.border} p-6 hover:shadow-lg transition-all duration-200 animate-fade-in`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${currentColor?.bg} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} className={currentColor?.icon} />
        </div>
        {changeData && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            changeData?.isPositive 
              ? 'bg-green-100 text-green-800' :'bg-red-100 text-red-800'
          }`}>
            <Icon 
              name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
              size={12} 
            />
            <span>{changeData?.text}</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {/* Real-time indicator */}
      <div className="mt-4 flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-muted-foreground">Real-time</span>
      </div>
    </div>
  );
};

export default MetricCard;