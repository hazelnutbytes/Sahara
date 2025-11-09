import React from 'react';
import { Tab } from '../types';
import { ShieldIcon, MapPinIcon, BriefcaseIcon, HeartIcon, HandSparklesIcon } from './icons/Icons';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const navItems = [
  { tab: Tab.Emergency, Icon: ShieldIcon, label: 'Emergency' },
  { tab: Tab.Map, Icon: MapPinIcon, label: 'Map' },
  { tab: Tab.Restart, Icon: BriefcaseIcon, label: 'Restart' },
  { tab: Tab.Voice, Icon: HeartIcon, label: 'Voice' },
  { tab: Tab.Contribute, Icon: HandSparklesIcon, label: 'Contribute' },
];

const NavItem: React.FC<{
  item: typeof navItems[0];
  isActive: boolean;
  onClick: () => void;
}> = ({ item, isActive, onClick }) => {
  const activeClasses = 'text-sahaara-blue-dark';
  const inactiveClasses = 'text-gray-500 hover:text-sahaara-blue-dark';
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-1/5 transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
    >
      <item.Icon className="h-6 w-6 mb-1" />
      <span className="text-xs font-medium">{item.label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-t-lg z-20">
      <div className="max-w-4xl mx-auto flex h-16">
        {navItems.map((item) => (
          <NavItem
            key={item.tab}
            item={item}
            isActive={activeTab === item.tab}
            onClick={() => setActiveTab(item.tab)}
          />
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;