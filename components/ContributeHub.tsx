import React, { useState } from 'react';
import { DONATION_OPTIONS, VOLUNTEER_OPPORTUNITIES } from '../constants';
import { HandSparklesIcon, CheckCircleIcon, UsersIcon } from './icons/Icons';

const ContributeHub: React.FC = () => {
    const [showThanks, setShowThanks] = useState<string | null>(null);
    
    const handleActionClick = (message: string) => {
        setShowThanks(message);
        setTimeout(() => setShowThanks(null), 3000);
    }

    return (
        <div className="p-4 space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-sahaara-blue-dark">Contribute & Help</h2>
                <p className="text-gray-600 mt-1">Your support can change a life. Here’s how you can help.</p>
            </div>
            
            {/* Donation Section */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
                    <HandSparklesIcon className="h-6 w-6 mr-2 text-sahaara-green-dark" />
                    Donate
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {DONATION_OPTIONS.map(option => (
                        <div key={option.id} className="bg-white p-4 rounded-lg shadow space-y-2 flex flex-col justify-between">
                            <div>
                                <h4 className="font-bold text-lg text-sahaara-blue-dark">{option.title}</h4>
                                <p className="text-sm text-gray-600">{option.description}</p>
                            </div>
                            <button 
                                onClick={() => handleActionClick(`Thank you for your donation of $${option.amount}!`)}
                                className="w-full mt-2 bg-sahaara-green hover:bg-sahaara-green-dark text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                Donate ${option.amount}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Volunteer Section */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
                    <UsersIcon className="h-6 w-6 mr-2 text-sahaara-amber-dark" />
                    Volunteer
                </h3>
                <div className="space-y-4">
                     {VOLUNTEER_OPPORTUNITIES.map(opp => (
                        <div key={opp.id} className="bg-white p-4 rounded-lg shadow flex items-center justify-between flex-wrap">
                            <div className="flex-grow mb-2 sm:mb-0">
                                <h4 className="font-bold text-lg text-sahaara-blue-dark">{opp.title}</h4>
                                <p className="text-sm text-gray-600">{opp.description}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {opp.skills.map(skill => (
                                        <span key={skill} className="text-xs bg-sahaara-blue-light text-sahaara-blue-dark font-medium px-2 py-1 rounded-full">{skill}</span>
                                    ))}
                                </div>
                            </div>
                            <button 
                                onClick={() => handleActionClick("Thank you! We've received your interest and will be in touch.")}
                                className="bg-sahaara-amber hover:bg-sahaara-amber-dark text-white font-bold py-2 px-4 rounded-lg transition-colors whitespace-nowrap ml-auto sm:ml-4">
                                I'm Interested
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Thank you Modal */}
            {showThanks && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-8 max-w-sm w-full text-center shadow-2xl">
                        <CheckCircleIcon className="h-16 w-16 text-sahaara-green mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Thank You!</h3>
                        <p className="text-gray-600">{showThanks}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContributeHub;
