import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsChart = ({ 
  data, 
  selectedTimeRange, 
  onTimeRangeChange 
}) => {
  const [chartType, setChartType] = useState('line');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const chartTypes = [
    { value: 'line', label: 'Line Chart', icon: 'TrendingUp' },
    { value: 'bar', label: 'Bar Chart', icon: 'BarChart3' }
  ];

  const metrics = [
    { value: 'all', label: 'All Metrics' },
    { value: 'engagement', label: 'User Engagement' },
    { value: 'applications', label: 'Applications' },
    { value: 'placements', label: 'Placements' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg shadow-modal p-4">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (chartType === 'line') {
      return (
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis 
            dataKey="period" 
            className="text-muted-foreground"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            className="text-muted-foreground"
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {(selectedMetric === 'all' || selectedMetric === 'engagement') && (
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#3B82F6" 
              strokeWidth={2}
              name="User Engagement"
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
            />
          )}
          {(selectedMetric === 'all' || selectedMetric === 'applications') && (
            <Line 
              type="monotone" 
              dataKey="applications" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Applications"
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
            />
          )}
          {(selectedMetric === 'all' || selectedMetric === 'placements') && (
            <Line 
              type="monotone" 
              dataKey="placements" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              name="Placements"
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2 }}
            />
          )}
        </LineChart>
      );
    } else {
      return (
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis 
            dataKey="period" 
            className="text-muted-foreground"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            className="text-muted-foreground"
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {(selectedMetric === 'all' || selectedMetric === 'engagement') && (
            <Bar 
              dataKey="value" 
              fill="#3B82F6" 
              name="User Engagement"
              radius={[2, 2, 0, 0]}
            />
          )}
          {(selectedMetric === 'all' || selectedMetric === 'applications') && (
            <Bar 
              dataKey="applications" 
              fill="#10B981" 
              name="Applications"
              radius={[2, 2, 0, 0]}
            />
          )}
          {(selectedMetric === 'all' || selectedMetric === 'placements') && (
            <Bar 
              dataKey="placements" 
              fill="#8B5CF6" 
              name="Placements"
              radius={[2, 2, 0, 0]}
            />
          )}
        </BarChart>
      );
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Analytics Overview</h2>
          <p className="text-sm text-muted-foreground">Platform performance metrics and trends</p>
        </div>
        
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4 mt-4 sm:mt-0">
          {/* Time Range Selector */}
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <select
              value={selectedTimeRange}
              onChange={(e) => onTimeRangeChange(e?.target?.value)}
              className="px-3 py-1 bg-popover border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {timeRanges?.map(range => (
                <option key={range?.value} value={range?.value}>
                  {range?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Metric Selector */}
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e?.target?.value)}
              className="px-3 py-1 bg-popover border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {metrics?.map(metric => (
                <option key={metric?.value} value={metric?.value}>
                  {metric?.label}
                </option>
              ))}
            </select>
          </div>

          {/* Chart Type Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {chartTypes?.map(type => (
              <button
                key={type?.value}
                onClick={() => setChartType(type?.value)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                  chartType === type?.value
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={type?.icon} size={14} />
                <span className="hidden sm:inline">{type?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      {/* Chart Info */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">
            {data?.reduce((sum, item) => sum + item?.value, 0)?.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Total Engagement</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">
            {data?.reduce((sum, item) => sum + item?.applications, 0)?.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Total Applications</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600">
            {data?.reduce((sum, item) => sum + item?.placements, 0)?.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">Total Placements</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;