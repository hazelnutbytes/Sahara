
import React, { useState } from 'react';
import { STORIES } from '../constants';
import { analyzeTextForRisk } from '../services/geminiService';
import { RiskLevel } from '../types';

const VoiceAndMentorship: React.FC = () => {
    const [stories, setStories] = useState(STORIES);
    const [newStory, setNewStory] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleStorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newStory.trim()) return;

        setIsSubmitting(true);
        const analysisResult = await analyzeTextForRisk(newStory);

        if(analysisResult.riskLevel === RiskLevel.High) {
            // In a real app, this would trigger a more robust alert.
            alert("High risk detected in your story. A mentor will be alerted to review this immediately. Please use the SOS button if you are in immediate danger.");
        }
        
        const newStoryObject = {
            id: Date.now(),
            author: 'Anonymous',
            content: newStory,
            replies: []
        };
        setStories([newStoryObject, ...stories]);
        setNewStory('');
        setIsSubmitting(false);
    };

    return (
        <div className="p-4 space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-sahaara-blue-dark">Voice & Mentorship</h2>
                <p className="text-gray-600 mt-1">Share your story, find strength in community.</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
                <form onSubmit={handleStorySubmit}>
                    <textarea
                        value={newStory}
                        onChange={(e) => setNewStory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        rows={3}
                        placeholder="Share your thoughts anonymously..."
                    />
                    <button type="submit" disabled={isSubmitting} className="mt-2 w-full bg-sahaara-green hover:bg-sahaara-green-dark text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400">
                        {isSubmitting ? 'Sharing...' : 'Share Story'}
                    </button>
                </form>
            </div>

            <div className="space-y-4">
                {stories.map(story => (
                    <div key={story.id} className="bg-white p-4 rounded-lg shadow">
                        <p className="text-gray-800 italic">"{story.content}"</p>
                        <p className="text-right text-sm font-medium text-gray-500 mt-2">- {story.author}</p>
                        <div className="mt-3 pt-3 border-t space-y-2">
                            {story.replies.map(reply => (
                                <div key={reply.id} className={`p-2 rounded-md ${reply.isMentor ? 'bg-sahaara-blue-light' : 'bg-gray-100'}`}>
                                    <p className="text-sm text-gray-700">{reply.content}</p>
                                    <p className={`text-right text-xs font-bold ${reply.isMentor ? 'text-sahaara-blue-dark' : 'text-gray-500'}`}>- {reply.author}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VoiceAndMentorship;
