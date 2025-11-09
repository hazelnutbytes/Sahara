
import React, { useState } from 'react';
import { JOBS, TRAININGS } from '../constants';

const JobsSection: React.FC = () => (
    <div className="space-y-4">
        {JOBS.map(job => (
            <div key={job.id} className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-bold text-lg text-sahaara-blue-dark">{job.title}</h4>
                <p className="text-sm font-medium text-gray-600 mb-2">{job.organization}</p>
                <p className="text-gray-700">{job.description}</p>
            </div>
        ))}
    </div>
);

const ResumeBuilder: React.FC = () => {
    const [name, setName] = useState('');
    const [skills, setSkills] = useState('');
    const [experience, setExperience] = useState('');

    return (
        <div className="space-y-4">
            <p className="text-sm text-center text-gray-600 bg-sahaara-amber-light p-3 rounded-md">
                Create an anonymous resume using initials or a pseudonym to protect your identity.
            </p>
            <div className="space-y-3">
                <input type="text" placeholder="Your Name or Pseudonym" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded-md"/>
                <textarea placeholder="List your skills (e.g., sewing, basic computer, cooking)" value={skills} onChange={e => setSkills(e.target.value)} className="w-full p-2 border rounded-md" rows={3}></textarea>
                <textarea placeholder="Describe any previous experience" value={experience} onChange={e => setExperience(e.target.value)} className="w-full p-2 border rounded-md" rows={4}></textarea>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-inner border mt-4">
                <h4 className="font-bold text-xl border-b pb-2 mb-2">{name || "Your Name"}</h4>
                <div className="space-y-3">
                    <div>
                        <h5 className="font-semibold">Skills</h5>
                        <p className="text-gray-700 whitespace-pre-wrap">{skills || "Your skills will appear here."}</p>
                    </div>
                    <div>
                        <h5 className="font-semibold">Experience</h5>
                        <p className="text-gray-700 whitespace-pre-wrap">{experience || "Your experience will appear here."}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const TrainingPortal: React.FC = () => (
    <div className="grid grid-cols-2 gap-4">
        {TRAININGS.map(training => (
            <div key={training.id} className="bg-white p-4 rounded-lg shadow flex flex-col items-center text-center">
                <div className="p-3 bg-sahaara-blue-light rounded-full mb-2">
                    <training.icon className="h-8 w-8 text-sahaara-blue-dark" />
                </div>
                <h4 className="font-bold text-gray-800">{training.title}</h4>
                <p className="text-sm text-gray-500">{training.category}</p>
            </div>
        ))}
    </div>
);

type RestartTab = 'Jobs' | 'Resume' | 'Training';

const RestartHub: React.FC = () => {
    const [activeTab, setActiveTab] = useState<RestartTab>('Jobs');

    const renderContent = () => {
        switch (activeTab) {
            case 'Jobs': return <JobsSection />;
            case 'Resume': return <ResumeBuilder />;
            case 'Training': return <TrainingPortal />;
            default: return null;
        }
    };
    
    const TabButton: React.FC<{tab: RestartTab, children: React.ReactNode}> = ({ tab, children }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === tab ? 'bg-sahaara-blue-dark text-white' : 'bg-gray-200 text-gray-700'}`}
        >
            {children}
        </button>
    );

    return (
        <div className="p-4 space-y-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-sahaara-blue-dark">Restart Hub</h2>
                <p className="text-gray-600 mt-1">Tools and opportunities for a new beginning.</p>
            </div>
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                <TabButton tab="Jobs">Job Opportunities</TabButton>
                <TabButton tab="Resume">Resume Builder</TabButton>
                <TabButton tab="Training">Training</TabButton>
            </div>
            <div className="pt-2">{renderContent()}</div>
        </div>
    );
};

export default RestartHub;
