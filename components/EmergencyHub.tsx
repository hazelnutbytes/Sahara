
import React, { useState } from 'react';
import { analyzeTextForRisk } from '../services/geminiService';
import { RiskAnalysisResult, RiskLevel } from '../types';

const RiskIndicator: React.FC<{ result: RiskAnalysisResult | null }> = ({ result }) => {
    if (!result) return null;

    const riskColorClasses = {
        [RiskLevel.High]: 'bg-sahaara-red-light text-sahaara-red-dark border-sahaara-red',
        [RiskLevel.Medium]: 'bg-sahaara-amber-light text-sahaara-amber-dark border-sahaara-amber',
        [RiskLevel.Low]: 'bg-sahaara-green-light text-sahaara-green-dark border-sahaara-green',
        [RiskLevel.None]: 'bg-blue-100 text-blue-800 border-blue-300',
    };
    
    return (
        <div className={`p-3 mt-4 border-l-4 rounded-r-lg ${riskColorClasses[result.riskLevel]}`}>
            <p className="font-bold">AI Risk Assessment: {result.riskLevel}</p>
            <p className="text-sm">{result.summary}</p>
             {result.riskLevel === RiskLevel.High && <p className="text-sm font-bold mt-1">High risk detected. Simulating auto-alert to authorities.</p>}
        </div>
    );
};


const EmergencyHub: React.FC = () => {
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [riskResult, setRiskResult] = useState<RiskAnalysisResult | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!description) return;
        
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setRiskResult(null);

        // AI Risk Analysis
        const analysisResult = await analyzeTextForRisk(description);
        setRiskResult(analysisResult);
        
        // Simulate submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setDescription('');
            setFiles([]);
        }, 2000);
    };

    return (
        <div className="p-4 space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-sahaara-blue-dark">Emergency Hub</h2>
                <p className="text-gray-600 mt-1">Report an incident anonymously. Your safety is our priority.</p>
            </div>
            {submitStatus === 'success' && (
                <div className="bg-sahaara-green-light text-sahaara-green-dark p-4 rounded-lg text-center">
                    <p className="font-semibold">Report Submitted Successfully</p>
                    <p className="text-sm">Your report and evidence have been securely backed up. Trusted organizations have been notified.</p>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Describe the situation (be as detailed as possible)
                    </label>
                    <textarea
                        id="description"
                        rows={6}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-sahaara-blue focus:border-sahaara-blue"
                        placeholder="e.g., location, people involved, time of incident..."
                    />
                </div>
                <div>
                    <label htmlFor="evidence" className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Evidence (Photos, Screenshots)
                    </label>
                    <input
                        type="file"
                        id="evidence"
                        multiple
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sahaara-blue-light file:text-sahaara-blue-dark hover:file:bg-sahaara-blue"
                    />
                    {files.length > 0 && (
                        <ul className="mt-2 text-xs text-gray-500 list-disc list-inside">
                            {files.map(file => <li key={file.name}>{file.name}</li>)}
                        </ul>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting || !description}
                    className="w-full bg-sahaara-red hover:bg-sahaara-red-dark text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-gray-400 flex items-center justify-center"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Submitting & Analyzing...
                        </>
                    ) : 'Submit Anonymous Report'}
                </button>
            </form>

            <RiskIndicator result={riskResult} />
        </div>
    );
};

export default EmergencyHub;
