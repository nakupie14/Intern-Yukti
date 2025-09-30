import React, { useState } from 'react';
import { Settings, Brain, Sparkles, Mail, BarChart3, RefreshCw, ArrowLeft } from 'lucide-react';
import { BarChart, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { NotificationService } from './NotificationService'; // Import the service

// AI Matching Engine based on the Problem Statement
const AIMatchingEngine = {
  calculateMatchScore: (student, internship, fairnessWeights) => {
    let score = 0;
    let breakdown = { skills: 0, qualifications: 0, location: 0, sector: 0, affirmativeAction: 0 };

    // 1. Skills Matching (40 points)
    const studentSkills = new Set(student.skills.map(s => s.toLowerCase()));
    const requiredSkills = new Set(internship.requiredSkills.map(s => s.toLowerCase()));
    const matchedSkills = [...studentSkills].filter(skill => requiredSkills.has(skill));
    if (requiredSkills.size > 0) {
      breakdown.skills = (matchedSkills.length / requiredSkills.size) * 40;
    }
    score += breakdown.skills;

    // 2. Qualifications Matching (15 points)
    if (student.qualification.toLowerCase() === internship.preferredQualification.toLowerCase()) {
      breakdown.qualifications = 15;
    } else {
      breakdown.qualifications = 5;
    }
    score += breakdown.qualifications;

    // 3. Location Preference (15 points)
    if (student.locationPreference.includes(internship.location) || student.locationPreference.includes('Any')) {
      breakdown.location = 15;
    }
    score += breakdown.location;

    // 4. Sector Interest (15 points)
    if (student.sectorInterest.some(sector => sector === internship.sector)) {
      breakdown.sector = 15;
    }
    score += breakdown.sector;

    // 5. Affirmative Action Boost (Up to 15 points bonus)
    let affirmativeActionScore = 0;
    if (student.isFromRural && fairnessWeights.ruralBoost) {
        affirmativeActionScore += 5;
    }
    if (student.socialCategory !== 'General' && fairnessWeights.socialCategoryBoost) {
        affirmativeActionScore += 5;
    }
    if (student.gender === 'Female' && fairnessWeights.genderBalance) {
        affirmativeActionScore += 5;
    }
    breakdown.affirmativeAction = affirmativeActionScore;
    score += affirmativeActionScore;
    
    return {
      score: Math.min(Math.round(score), 100),
      breakdown,
      confidence: score > 75 ? 'High' : score > 50 ? 'Medium' : 'Low'
    };
  },

  allocateInternships: (students, internships, fairnessWeights, constraints = {}) => {
    const allocations = [];
    const internshipSlots = internships.reduce((acc, int) => ({ ...acc, [int.id]: int.slots }), {});
    const allocatedStudents = new Set();

    const potentialMatches = [];
    students.forEach(student => {
      // Requirement: Check for past participation
      if (student.hasParticipated) {
        return;
      }

      internships.forEach(internship => {
        // Requirement: Check internship capacity
        if (internshipSlots[internship.id] <= 0) {
            return;
        }

        const { score, breakdown, confidence } = AIMatchingEngine.calculateMatchScore(student, internship, fairnessWeights);
        if (!constraints.minScore || score >= constraints.minScore) {
          potentialMatches.push({ student, internship, score, breakdown, confidence });
        }
      });
    });

    // Sort by highest score first to give best matches priority
    potentialMatches.sort((a, b) => b.score - a.score);

    potentialMatches.forEach(match => {
      const { student, internship, score, breakdown, confidence } = match;

      if (!allocatedStudents.has(student.id) && internshipSlots[internship.id] > 0) {
        allocations.push({
          id: `ALLOC-${Date.now()}-${student.id}`,
          studentId: student.id,
          studentName: student.name,
          internshipId: internship.id,
          internshipTitle: internship.title,
          company: internship.company,
          score,
          breakdown,
          confidence,
        });

        allocatedStudents.add(student.id);
        internshipSlots[internship.id]--;
      }
    });

    return { allocations };
  }
};

const AIAllocationPortal = ({ students = [], internships = [], onBack }) => {
  const [allocations, setAllocations] = useState([]);
  const [notificationStatus, setNotificationStatus] = useState(null);
  const [fairnessWeights, setFairnessWeights] = useState({
    ruralBoost: true,
    socialCategoryBoost: true,
    genderBalance: true
  });
  const [constraints, setConstraints] = useState({ minScore: 50 });
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');
  
  const runAllocation = async () => {
    setSimulationRunning(true);
    setNotificationStatus(null);
    setAllocations([]);

    // Stage 1: Running AI Matching
    setCurrentStage('Running AI Matching Engine...');
    for (let i = 0; i <= 50; i++) {
      await new Promise(resolve => setTimeout(resolve, 20));
      setSimulationProgress(i);
    }

    const { allocations: results } = AIMatchingEngine.allocateInternships(
      students, internships, fairnessWeights, constraints
    );
    setAllocations(results);

    // Stage 2: Sending Notifications
    setCurrentStage(`Sending ${results.length} email notifications...`);
    for (let i = 51; i <= 100; i++) {
      await new Promise(resolve => setTimeout(resolve, 20));
      setSimulationProgress(i);
    }
    
    const notificationResults = await NotificationService.sendAllNotifications(results, students, internships);
    setNotificationStatus(notificationResults);
    
    setSimulationRunning(false);
    setSelectedTab('allocations');
  };
  
  return (
    <div className="space-y-6">
       {simulationRunning && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full text-center">
            <Brain className="w-16 h-16 mx-auto text-primary mb-4 animate-pulse" />
            <h3 className="text-xl font-bold">{currentStage}</h3>
            <div className="w-full bg-gray-200 rounded-full h-3 my-4">
              <div
                className="bg-primary h-3 rounded-full"
                style={{ width: `${simulationProgress}%` }}
              />
            </div>
            <p className="text-sm">{simulationProgress}% Complete</p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-primary"/> AI Allocation Engine
        </h2>
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium hover:text-primary">
            <ArrowLeft size={16}/> Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Settings /> Allocation Configuration (For MoCA)
          </h3>
          <button
            onClick={runAllocation}
            disabled={simulationRunning}
            className="bg-primary text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
          >
            {simulationRunning ? <RefreshCw className="animate-spin" /> : <Sparkles />}
            Run Allocation & Notify
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="font-medium mb-3">Affirmative Action Weights</p>
            <div className="space-y-3">
              <label className="flex items-center gap-3"><input type="checkbox" checked={fairnessWeights.ruralBoost} onChange={(e) => setFairnessWeights({...fairnessWeights, ruralBoost: e.target.checked})} /> Rural/Aspirational District Boost</label>
              <label className="flex items-center gap-3"><input type="checkbox" checked={fairnessWeights.socialCategoryBoost} onChange={(e) => setFairnessWeights({...fairnessWeights, socialCategoryBoost: e.target.checked})} /> Social Category Boost</label>
              <label className="flex items-center gap-3"><input type="checkbox" checked={fairnessWeights.genderBalance} onChange={(e) => setFairnessWeights({...fairnessWeights, genderBalance: e.target.checked})} /> Gender Balance Boost</label>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="font-medium mb-3">Matching Parameters</p>
            <label className="text-sm">Minimum Match Score: {constraints.minScore}</label>
            <input type="range" min="0" max="100" value={constraints.minScore} onChange={(e) => setConstraints({...constraints, minScore: parseInt(e.target.value)})} className="w-full mt-2" />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="border-b p-2 flex">
            {['overview', 'allocations', 'analytics'].map(tab => (
              <button key={tab} onClick={() => setSelectedTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedTab === tab ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
        </div>

        <div className="p-6">
          {selectedTab === 'overview' && (
            <div className="text-center p-6">
                <h3 className="font-semibold">Allocation Results</h3>
                <p className="text-sm text-gray-500 mt-1">Run the allocation to see results.</p>
                {notificationStatus && (
                    <div className="mt-4 bg-green-50 border border-green-200 p-4 rounded-lg text-left">
                        <h4 className="font-semibold flex items-center gap-2"><Mail /> Notification Summary</h4>
                        <p>Emails Sent: {notificationStatus.email.success}</p>
                        <p>Emails Failed: {notificationStatus.email.failed}</p>
                    </div>
                )}
            </div>
          )}

          {selectedTab === 'allocations' && (
             <div className="space-y-3">
                {allocations.length === 0 ? (
                    <p className="text-center text-gray-500 py-6">No allocations yet. Run the engine.</p>
                ) : (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                    {allocations.map(alloc => (
                      <div key={alloc.id} className="border rounded-lg p-3 flex justify-between items-center">
                        <p className="font-medium">{alloc.studentName} → {alloc.internshipTitle} @ {alloc.company}</p>
                        <span className="font-bold text-primary">{alloc.score}</span>
                      </div>
                    ))}
                  </div>
                )}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAllocationPortal;