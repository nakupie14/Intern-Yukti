import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import InternshipCard from './components/InternshipCard';
import FilterToolbar from './components/FilterToolbar';
import SkeletonCard from './components/SkeletonCard';
import EmptyState from './components/EmptyState';
import ShareModal from './components/ShareModal';
import ResultsHeader from './components/ResultsHeader';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const InternshipResults = () => {
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [savedInternships, setSavedInternships] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [shareModalData, setShareModalData] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Mock internship data
  const mockInternships = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp Solutions",
      companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center",
      location: "Mumbai",
      duration: "3 months",
      stipend: "₹15,000/month",
      workMode: "hybrid",
      skills: ["React", "JavaScript", "CSS", "HTML", "Git"],
      whyForYou: `Perfect match for your frontend development skills! Your experience with React and JavaScript aligns perfectly with this role. The company values fresh perspectives and offers excellent mentorship opportunities.`,
      matchScore: 92,
      deadline: "25th October 2024",
      postedDate: "2024-09-10"
    },
    {
      id: 2,
      title: "Digital Marketing Intern",
      company: "Creative Agency Hub",
      companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=64&h=64&fit=crop&crop=center",
      location: "Bangalore",
      duration: "4 months",
      stipend: "₹12,000/month",
      workMode: "remote",
      skills: ["Social Media", "Content Writing", "Analytics", "SEO"],
      whyForYou: `Your creative thinking and communication skills make you ideal for this role. The company focuses on innovative campaigns and you'll get hands-on experience with major brands.`,
      matchScore: 88,
      deadline: "30th October 2024",
      postedDate: "2024-09-12"
    },
    {
      id: 3,
      title: "Data Science Intern",
      company: "Analytics Pro",
      companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&fit=crop&crop=center",
      location: "Pune",
      duration: "6 months",
      stipend: "₹20,000/month",
      workMode: "onsite",
      skills: ["Python", "Machine Learning", "SQL", "Pandas", "Visualization"],
      whyForYou: `Your analytical mindset and Python skills are exactly what this role needs. You'll work on real-world datasets and learn from experienced data scientists.`,
      matchScore: 85,
      deadline: "20th October 2024",
      postedDate: "2024-09-08"
    },
    {
      id: 4,
      title: "UI/UX Design Intern",
      company: "Design Studio",
      companyLogo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=center",
      location: "Delhi",
      duration: "3 months",
      stipend: "₹18,000/month",
      workMode: "hybrid",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Wireframing"],
      whyForYou: `Your design portfolio showcases excellent visual thinking. This role offers exposure to diverse projects and mentorship from senior designers.`,
      matchScore: 90,
      deadline: "28th October 2024",
      postedDate: "2024-09-14"
    },
    {
      id: 5,
      title: "Content Writing Intern",
      company: "Media House",
      companyLogo: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=64&h=64&fit=crop&crop=center",
      location: "Remote",
      duration: "2 months",
      stipend: "₹8,000/month",
      workMode: "remote",
      skills: ["Writing", "Research", "SEO", "WordPress", "Social Media"],
      whyForYou: `Your writing samples demonstrate strong storytelling abilities. You'll create content for various platforms and learn from experienced editors.`,
      matchScore: 82,
      deadline: "15th October 2024",
      postedDate: "2024-09-11"
    }
  ];

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Load saved internships from localStorage
    const saved = localStorage.getItem('savedInternships');
    if (saved) {
      setSavedInternships(new Set(JSON.parse(saved)));
    }

    // Check URL params for filter
    const urlParams = new URLSearchParams(location.search);
    const filterParam = urlParams?.get('filter');
    if (filterParam === 'saved') {
      setShowSavedOnly(true);
    }

    // Simulate loading
    loadInternships();
  }, [location?.search]);

  useEffect(() => {
    // Listen for language changes
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => {
    // Filter internships based on saved filter
    if (showSavedOnly) {
      setFilteredInternships(internships?.filter(internship => 
        savedInternships?.has(internship?.id)
      ));
    } else {
      setFilteredInternships(internships);
    }
  }, [internships, savedInternships, showSavedOnly]);

  const loadInternships = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setInternships(mockInternships);
    } catch (error) {
      setError('Failed to load internships');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshResults = async () => {
    setIsRefreshing(true);
    
    try {
      // Simulate generating new recommendations
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Shuffle the existing internships to simulate new results
      const shuffled = [...mockInternships]?.sort(() => Math.random() - 0.5);
      setInternships(shuffled);
    } catch (error) {
      setError('Failed to refresh results');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSaveInternship = async (internshipId) => {
    const newSavedInternships = new Set(savedInternships);
    
    if (newSavedInternships?.has(internshipId)) {
      newSavedInternships?.delete(internshipId);
    } else {
      newSavedInternships?.add(internshipId);
    }
    
    setSavedInternships(newSavedInternships);
    localStorage.setItem('savedInternships', JSON.stringify([...newSavedInternships]));
  };

  const handleApplyInternship = async (internshipId) => {
    const internship = internships?.find(i => i?.id === internshipId);
    if (internship) {
      // Simulate application process
      window.open(`https://example.com/apply/${internshipId}`, '_blank');
    }
  };

  const handleShareInternship = (internship) => {
    setShareModalData(internship);
  };

  const handleFilterChange = (filters) => {
    let filtered = [...internships];
    
    // Apply location filter
    if (filters?.location) {
      filtered = filtered?.filter(internship => 
        internship?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase()) ||
        (filters?.location === 'remote' && internship?.workMode === 'remote')
      );
    }
    
    // Apply duration filter
    if (filters?.duration) {
      filtered = filtered?.filter(internship => {
        const duration = parseInt(internship?.duration);
        switch (filters?.duration) {
          case '1-3':
            return duration >= 1 && duration <= 3;
          case '3-6':
            return duration >= 3 && duration <= 6;
          case '6+':
            return duration >= 6;
          default:
            return true;
        }
      });
    }
    
    // Apply stipend filter
    if (filters?.stipend) {
      filtered = filtered?.filter(internship => {
        if (!internship?.stipend) return filters?.stipend === 'unpaid';
        
        const stipendAmount = parseInt(internship?.stipend?.replace(/[^\d]/g, ''));
        switch (filters?.stipend) {
          case 'unpaid':
            return !internship?.stipend;
          case '1-10k':
            return stipendAmount >= 1000 && stipendAmount <= 10000;
          case '10-25k':
            return stipendAmount >= 10000 && stipendAmount <= 25000;
          case '25k+':
            return stipendAmount >= 25000;
          default:
            return true;
        }
      });
    }
    
    // Apply work mode filter
    if (filters?.workMode) {
      filtered = filtered?.filter(internship => 
        internship?.workMode === filters?.workMode
      );
    }
    
    // Apply saved filter
    if (showSavedOnly) {
      filtered = filtered?.filter(internship => 
        savedInternships?.has(internship?.id)
      );
    }
    
    setFilteredInternships(filtered);
  };

  const handleSortChange = (sortBy) => {
    const sorted = [...filteredInternships]?.sort((a, b) => {
      switch (sortBy) {
        case 'match-score':
          return b?.matchScore - a?.matchScore;
        case 'stipend-high':
          const aStipend = parseInt(a?.stipend?.replace(/[^\d]/g, '') || '0');
          const bStipend = parseInt(b?.stipend?.replace(/[^\d]/g, '') || '0');
          return bStipend - aStipend;
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline);
        case 'recent':
          return new Date(b.postedDate) - new Date(a.postedDate);
        default: // relevance
          return b?.matchScore - a?.matchScore;
      }
    });
    
    setFilteredInternships(sorted);
  };

  const handleToggleSavedOnly = () => {
    const newShowSavedOnly = !showSavedOnly;
    setShowSavedOnly(newShowSavedOnly);
    
    // Update URL
    const url = new URL(window.location);
    if (newShowSavedOnly) {
      url?.searchParams?.set('filter', 'saved');
    } else {
      url?.searchParams?.delete('filter');
    }
    window.history?.replaceState({}, '', url);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <EmptyState 
              type="error" 
              onRetry={loadInternships}
              onRefinePreferences={() => navigate('/questionnaire-flow')}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Results Header */}
          <ResultsHeader
            userName="Student"
            assessmentType="questionnaire"
            onRefreshResults={handleRefreshResults}
            isRefreshing={isRefreshing}
          />

          {/* Filter Toolbar */}
          {!isLoading && internships?.length > 0 && (
            <FilterToolbar
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              totalResults={filteredInternships?.length}
              showSavedOnly={showSavedOnly}
              onToggleSavedOnly={handleToggleSavedOnly}
            />
          )}

          {/* Results Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)]?.map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : filteredInternships?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredInternships?.map((internship) => (
                <InternshipCard
                  key={internship?.id}
                  internship={internship}
                  isSaved={savedInternships?.has(internship?.id)}
                  onSave={handleSaveInternship}
                  onApply={handleApplyInternship}
                  onShare={handleShareInternship}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              type={showSavedOnly ? 'no-saved' : 'no-results'}
              onRefinePreferences={() => navigate('/questionnaire-flow')}
            />
          )}

          {/* Load More Button */}
          {!isLoading && filteredInternships?.length > 0 && filteredInternships?.length >= 6 && (
            <div className="flex justify-center mt-12">
              <Button
                variant="outline"
                onClick={handleRefreshResults}
                loading={isRefreshing}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Load More Recommendations
              </Button>
            </div>
          )}

          {/* Floating Action Button for Mobile */}
          <div className="fixed bottom-6 right-6 md:hidden z-40">
            <Button
              variant="default"
              size="icon"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 rounded-full shadow-lg"
            >
              <Icon name="ArrowUp" size={20} />
            </Button>
          </div>
        </div>
      </main>
      {/* Share Modal */}
      {shareModalData && (
        <ShareModal
          internship={shareModalData}
          isOpen={!!shareModalData}
          onClose={() => setShareModalData(null)}
        />
      )}
    </div>
  );
};

export default InternshipResults;