import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import VoiceInputToggle from '../../components/ui/VoiceInputToggle';
import MetricCard from "./component/MetricCard.jsx";
import AnalyticsChart from "./component/AnalyticsChart.jsx";
import QuickActionTiles from "./component/QuickActionTiles.jsx";
import ActivityFeed from './component/ActivityFeed';
import AlertNotifications from './component/alertNotification';
import NavigationSidebar from './component/NavigationSidebar.jsx';
import AIAllocationPortal from './component/AIAllocationPortal';
import Icon from '../../components/AppIcon';



const AdminDashboard = () => {
const [students, setStudents] = useState([]);
const [internships, setInternships] = useState([]);
const [allocations, setAllocations] = useState([]);
const [showAIPortal, setShowAIPortal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [metricsData, setMetricsData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  // Check admin authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('userData');
    
    if (!isAuthenticated || isAuthenticated !== 'true') {
      navigate('/login');
      return;
    }

    // Check if user is admin
    if (userData) {
      const user = JSON.parse(userData);
      if (!user?.email?.includes('admin')) {
        navigate('/admin-dashboard');
        return;
      }
    }

    // Load saved language
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API calls with delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock metrics data
      const mockMetrics = {
        totalUsers: {
          value: 15847,
          change: 12.5,
          trend: 'up'
        },
        activeInternships: {
          value: 342,
          change: 8.2,
          trend: 'up'
        },
        successfulPlacements: {
          value: 1284,
          change: 15.7,
          trend: 'up'
        },
        systemHealth: {
          value: 98.7,
          change: 0.3,
          trend: 'up',
          unit: '%'
        }
      };

      // Mock analytics data
      const mockAnalytics = {
        userEngagement: [
          { period: 'Week 1', value: 4500, applications: 1200, placements: 89 },
          { period: 'Week 2', value: 5200, applications: 1400, placements: 102 },
          { period: 'Week 3', value: 4800, applications: 1350, placements: 95 },
          { period: 'Week 4', value: 6100, applications: 1650, placements: 124 },
          { period: 'Week 5', value: 5800, applications: 1580, placements: 118 },
          { period: 'Week 6', value: 6400, applications: 1720, placements: 135 },
          { period: 'Week 7', value: 7200, applications: 1890, placements: 147 }
        ]
      };

      // Mock recent activities
      const mockActivities = [
        {
          id: 1,
          type: 'user_registration',
          message: 'New student registered: Priya Sharma',
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          severity: 'info',
          icon: 'UserPlus'
        },
        {
          id: 2,
          type: 'internship_posting',
          message: 'New internship posted: Frontend Developer at TechCorp',
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
          severity: 'success',
          icon: 'Briefcase'
        },
        {
          id: 3,
          type: 'user_report',
          message: 'Content violation reported by user: spam_detection',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          severity: 'warning',
          icon: 'AlertTriangle'
        },
        {
          id: 4,
          type: 'system_update',
          message: 'Database backup completed successfully',
          timestamp: new Date(Date.now() - 1000 * 60 * 45),
          severity: 'info',
          icon: 'Database'
        },
        {
          id: 5,
          type: 'placement_success',
          message: 'Student placement confirmed: Raj Kumar at StartupXYZ',
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          severity: 'success',
          icon: 'CheckCircle'
        }
      ];

      // Mock alerts
      const mockAlerts = [
        {
          id: 1,
          title: 'High Server Load',
          message: 'API response time increased by 25% in the last hour',
          priority: 'high',
          timestamp: new Date(Date.now() - 1000 * 60 * 10),
          type: 'performance'
        },
        {
          id: 2,
          title: 'Pending Content Reviews',
          message: '23 internship postings awaiting moderation approval',
          priority: 'medium',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          type: 'content'
        }
      ];

      setMetricsData(mockMetrics);
      setAnalyticsData(mockAnalytics);
      setActivities(mockActivities);
      setAlerts(mockAlerts);
      // Mock students data
// Mock students data for AI allocation
      const mockStudents = Array.from({ length: 50 }, (_, i) => ({
        id: `S${i + 1}`,
        name: `Student ${i + 1}`,
        email: `student${i + 1}@example.com`,
        phone: `+91 ${9000000000 + i}`,
        qualification: ['B.Tech', 'BBA', 'B.Com', 'B.Sc', 'MBA'][i % 5],
        cgpa: (7 + Math.random() * 3).toFixed(2),
        district: ['Mumbai', 'Aspirational District A', 'Delhi', 'Aspirational District B', 'Bangalore', 'Rural District C'][i % 6],
        isFromRural: i % 3 === 0,
        socialCategory: ['General', 'OBC', 'SC', 'ST'][i % 4],
        gender: ['Male', 'Female', 'Other'][i % 3],
        skills: ['Python', 'JavaScript', 'Communication', 'Data Analysis', 'React', 'Node.js'].slice(0, 2 + Math.floor(Math.random() * 3)),
        sectorInterest: ['Technology', 'Finance', 'Healthcare', 'Marketing', 'Manufacturing'].slice(i % 2, (i % 2) + 2),
        locationPreference: ['Mumbai', 'Delhi', 'Bangalore', 'Any'][i % 4],
        resumeText: `Experienced in technology with various skills`,
        hasParticipated: i > 45
      }));

      const mockInternships = Array.from({ length: 15 }, (_, i) => ({
        id: `I${i + 1}`,
        title: `${['Technology', 'Finance', 'Healthcare', 'Marketing', 'Manufacturing'][i % 5]} Intern`,
        company: `Company ${String.fromCharCode(65 + i)}`,
        sector: ['Technology', 'Finance', 'Healthcare', 'Marketing', 'Manufacturing'][i % 5],
        location: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune'][i % 5],
        slots: 3 + Math.floor(Math.random() * 3),
        duration: '3 months',
        stipend: `₹${(10000 + Math.random() * 15000).toFixed(0)}`,
        requiredSkills: ['Python', 'JavaScript', 'Communication', 'Excel', 'Marketing'].slice(0, 2 + Math.floor(Math.random() * 2)),
        preferredQualification: ['B.Tech', 'BBA', 'B.Com', 'B.Sc', 'MBA'][i % 5],
        description: `Exciting opportunity in the field`
      }));

      setStudents(mockStudents);
      setInternships(mockInternships);


// Mock internships data


setStudents(mockStudents);
setInternships(mockInternships);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeRangeChange = (range) => {
    setSelectedTimeRange(range);
    // Reload analytics data for new time range
    loadDashboardData();
  };

  const handleVoiceResult = (transcript) => {
    const lowerTranscript = transcript?.toLowerCase();
    if (lowerTranscript?.includes('refresh') || lowerTranscript?.includes('reload')) {
      loadDashboardData();
    } else if (lowerTranscript?.includes('users') || lowerTranscript?.includes('user management')) {
      // Future: Navigate to user management
      console.log('Navigate to user management');
    } else if (lowerTranscript?.includes('internships') || lowerTranscript?.includes('internship moderation')) {
      // Future: Navigate to internship moderation
      console.log('Navigate to internship moderation');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(4)]?.map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
              <div className="h-96 bg-gray-200 rounded-xl mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-64 bg-gray-200 rounded-xl"></div>
                <div className="h-64 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Monitor system performance and manage platform activities
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <LanguageSwitcher />
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 rounded-md bg-card border border-border hover:bg-muted transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Alert Notifications */}
          {alerts?.length > 0 && (
            <div className="mb-8">
              <AlertNotifications alerts={alerts} onDismiss={(id) => setAlerts(alerts?.filter(alert => alert?.id !== id))} />
            </div>
          )}

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Users"
              value={metricsData?.totalUsers?.value?.toLocaleString()}
              change={metricsData?.totalUsers?.change}
              trend={metricsData?.totalUsers?.trend}
              icon="Users"
              color="blue"
            />
            <MetricCard
              title="Active Internships"
              value={metricsData?.activeInternships?.value?.toLocaleString()}
              change={metricsData?.activeInternships?.change}
              trend={metricsData?.activeInternships?.trend}
              icon="Briefcase"
              color="green"
            />
            <MetricCard
              title="Successful Placements"
              value={metricsData?.successfulPlacements?.value?.toLocaleString()}
              change={metricsData?.successfulPlacements?.change}
              trend={metricsData?.successfulPlacements?.trend}
              icon="Trophy"
              color="purple"
            />
            <MetricCard
              title="System Health"
              value={`${metricsData?.systemHealth?.value}${metricsData?.systemHealth?.unit || ''}`}
              change={metricsData?.systemHealth?.change}
              trend={metricsData?.systemHealth?.trend}
              icon="Activity"
              color="orange"
            />
          </div>

          {/* Analytics Chart */}
          <div className="mb-8">
            <AnalyticsChart
              data={analyticsData?.userEngagement}
              selectedTimeRange={selectedTimeRange}
              onTimeRangeChange={handleTimeRangeChange}
            />
          </div>
          {/* AI Allocation Portal Section */}
{/* AI Allocation Portal */}
          {!showAIPortal && (
            <div className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <Icon name="Brain" size={24} />
                    AI-Powered Internship Allocation
                  </h3>
                  <p className="text-purple-700">
                    Use machine learning to match {students.length} students with {internships.length} internships
                  </p>
                </div>
                <button
                  onClick={() => setShowAIPortal(true)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
                >
                  <Icon name="Sparkles" size={20} />
                  Launch AI Portal
                </button>
              </div>
            </div>
          )}

          {showAIPortal && (
            <div className="mb-8 animate-fade-in">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Icon name="Brain" size={28} className="text-purple-600" />
                  AI Allocation Engine
                </h2>
                <button
                  onClick={() => setShowAIPortal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <Icon name="ArrowLeft" size={16} />
                  Back to Dashboard
                </button>
              </div>
              <AIAllocationPortal
                students={students}
                internships={internships}
                onAllocationsUpdate={(newAllocations) => {
                  setAllocations(newAllocations);
                  console.log('Allocations completed:', newAllocations.length);
                }}
              />
            </div>
          )}

{/* AI Allocation Portal */}
{showAIPortal && (
  <div className="mb-8 animate-fade-in">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
        <Icon name="Brain" size={28} className="text-purple-600" />
        AI Allocation Engine
      </h2>
      <button
        onClick={() => setShowAIPortal(false)}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
      >
        <Icon name="ArrowLeft" size={16} />
        Back to Dashboard
      </button>
    </div>
    <AIAllocationPortal
      students={students}
      internships={internships}
      onAllocationsUpdate={(newAllocations) => {
        setAllocations(newAllocations);
        console.log('Allocations completed:', newAllocations.length);
      }}
    />
  </div>
)}

          {/* Quick Actions and Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
<QuickActionTiles onAIAllocationClick={() => setShowAIPortal(true)} />            <ActivityFeed activities={activities} />
          </div>
        </div>
      </main>

      {/* Navigation Sidebar for Mobile */}
     <NavigationSidebar
  isOpen={isSidebarOpen}
  onClose={() => setIsSidebarOpen(false)}
  onNavigate={(itemId) => {
    if (itemId === 'ai-allocation') {
      setShowAIPortal(true);
    }
  }}
/>

      {/* Voice Input Toggle */}
      <VoiceInputToggle 
        onVoiceResult={handleVoiceResult}
        onVoiceStart={() => {}}
        onVoiceEnd={() => {}}
        position="fixed"
      />
    </div>
  );
};

export default AdminDashboard;