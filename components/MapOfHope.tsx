import React, { useState } from 'react';
import { SafetyLocation, LocationType } from '../types';
import { LOCATIONS } from '../constants';
import { BuildingShelterIcon, HospitalIcon, SoupIcon, UsersIcon, CheckCircleIcon } from './icons/Icons';

const locationIcons: Record<LocationType, React.ComponentType<{ className?: string }>> = {
    [LocationType.Shelter]: BuildingShelterIcon,
    [LocationType.Hospital]: HospitalIcon,
    [LocationType.Kitchen]: SoupIcon,
    [LocationType.NGO]: UsersIcon,
};

const locationColors: Record<LocationType, string> = {
    [LocationType.Shelter]: 'bg-purple-500',
    [LocationType.Hospital]: 'bg-blue-500',
    [LocationType.Kitchen]: 'bg-yellow-500',
    [LocationType.NGO]: 'bg-green-500',
};

const MapOfHope: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState<SafetyLocation | null>(null);
    const [selectedHotspot, setSelectedHotspot] = useState<{ id: number; area: string } | null>(null);

    // Define high-risk zones based on report density (simulated)
    const hotspots = [
        { id: 1, position: { top: '30%', left: '70%' }, count: 3, area: 'City Center East' },
        { id: 2, position: { top: '75%', left: '10%' }, count: 2, area: 'Industrial District' },
    ];

    return (
        <div className="p-4">
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-sahaara-blue-dark">Map of Hope</h2>
                <p className="text-gray-600 mt-1">Find verified safe places and see community-reported risk areas.</p>
            </div>

            <div className="relative w-full h-96 bg-sahaara-blue-light rounded-lg overflow-hidden shadow-inner border">
                {/* Simulated map background */}
                <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('https://picsum.photos/800/600?grayscale&blur=2')"}}></div>

                {/* Render Hotspots */}
                {hotspots.map(hotspot => (
                    <button
                        key={`hotspot-${hotspot.id}`}
                        className="absolute w-24 h-24 bg-sahaara-red/20 rounded-full animate-pulse transform -translate-x-1/2 -translate-y-1/2 border-2 border-sahaara-red/50 cursor-pointer flex items-center justify-center"
                        style={{ top: hotspot.position.top, left: hotspot.position.left }}
                        onClick={() => setSelectedHotspot(hotspot)}
                        title={`Risk Zone: ${hotspot.area}`}
                    >
                      <span className="text-sahaara-red-dark font-bold text-lg">{hotspot.count}</span>
                    </button>
                ))}

                {LOCATIONS.map(loc => {
                    const Icon = locationIcons[loc.type];
                    const color = locationColors[loc.type];
                    return (
                        <button
                            key={loc.id}
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-transform hover:scale-110 ${color}`}
                            style={{ top: loc.position.top, left: loc.position.left }}
                            onClick={() => setSelectedLocation(loc)}
                            title={loc.name}
                        >
                            <Icon className="h-5 w-5 text-white" />
                        </button>
                    );
                })}
            </div>
            
            {selectedLocation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4" onClick={() => setSelectedLocation(null)}>
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full space-y-3" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-start">
                             <h3 className="text-xl font-bold text-gray-800">{selectedLocation.name}</h3>
                             <button onClick={() => setSelectedLocation(null)} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
                        </div>
                       
                        <div className="flex items-center space-x-2">
                             <span className="text-sm font-medium text-gray-600">{selectedLocation.type}</span>
                             {selectedLocation.verified && (
                                <div className="flex items-center text-sahaara-green-dark text-xs font-semibold">
                                    <CheckCircleIcon className="h-4 w-4 mr-1"/>
                                    Verified
                                </div>
                             )}
                        </div>
                        <p className="text-gray-600">{selectedLocation.description}</p>
                        <p className="text-sm text-gray-800"><strong>Contact:</strong> {selectedLocation.contact}</p>
                        <p className={`text-sm font-bold ${selectedLocation.status === 'Open' ? 'text-sahaara-green-dark' : 'text-sahaara-red-dark'}`}>
                           <strong>Status:</strong> {selectedLocation.status}
                        </p>
                    </div>
                </div>
            )}
            
            {selectedHotspot && (
                 <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4" onClick={() => setSelectedHotspot(null)}>
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full space-y-3" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-start">
                             <h3 className="text-xl font-bold text-sahaara-amber-dark">High-Risk Zone Alert</h3>
                             <button onClick={() => setSelectedHotspot(null)} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
                        </div>
                        <p className="text-gray-700">
                            Multiple anonymous reports have been filed in the <strong>{selectedHotspot.area}</strong> area. Please exercise caution.
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                           This alert is generated based on community reports to help you stay safe. It does not represent an official warning.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapOfHope;