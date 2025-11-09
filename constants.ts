import { SafetyLocation, LocationType, JobPosting, TrainingModule, Story, DonationOption, VolunteerOpportunity, AnonymousReport } from './types';
import { BuildingShelterIcon, HospitalIcon, SoupIcon, UsersIcon, SewingPinIcon, ComputerIcon, BookOpenIcon } from './components/icons/Icons';

export const LOCATIONS: SafetyLocation[] = [
  { id: 1, name: 'Asha Kiran Shelter', type: LocationType.Shelter, description: 'Safe shelter for women and children.', contact: '123-456-7890', verified: true, status: 'Open', position: { top: '15%', left: '20%' } },
  { id: 2, name: 'City General Hospital', type: LocationType.Hospital, description: '24/7 emergency medical services.', contact: '123-456-7891', verified: true, status: 'Open', position: { top: '30%', left: '70%' } },
  { id: 3, name: 'Seva Community Kitchen', type: LocationType.Kitchen, description: 'Free meals served daily from 12pm-2pm.', contact: '123-456-7892', verified: true, status: 'Open', position: { top: '60%', left: '10%' } },
  { id: 4, name: 'Naya Savera NGO', type: LocationType.NGO, description: 'Legal and psychological support.', contact: '123-456-7893', verified: true, status: 'Emergency Only', position: { top: '75%', left: '80%' } },
  { id: 5, name: 'Suraksha Home', type: LocationType.Shelter, description: 'Temporary housing for individuals.', contact: '123-456-7894', verified: false, status: 'Full', position: { top: '45%', left: '40%' } },
];

export const JOBS: JobPosting[] = [
  { id: 1, title: 'Data Entry Operator', organization: 'Partner Corp', description: 'Basic computer skills required. Flexible hours.' },
  { id: 2, title: 'Kitchen Assistant', organization: 'Seva Community Kitchen', description: 'Assist with meal preparation and distribution.' },
  { id: 3, title: 'Tailoring Assistant', organization: 'Umeed Foundation', description: 'Looking for individuals with basic sewing skills.' },
  { id: 4, title: 'Packaging Associate', organization: 'SafeDeliveries Inc.', description: 'No prior experience needed. On-the-job training.' },
];

export const TRAININGS: TrainingModule[] = [
  { id: 1, title: 'Digital Literacy', category: 'Computers', icon: ComputerIcon },
  { id: 2, title: 'Basic Sewing', category: 'Crafts', icon: SewingPinIcon },
  { id: 3, title: 'Reading & Writing', category: 'Education', icon: BookOpenIcon },
  { id: 4, title: 'Community Leadership', category: 'Social', icon: UsersIcon },
];

export const STORIES: Story[] = [
    {
        id: 1,
        author: 'Anonymous',
        content: "Leaving was the hardest part, but every day feels a little bit brighter now. I'm learning to trust again, one step at a time.",
        replies: [
            { id: 1, author: 'Mentor Priya', isMentor: true, content: "Your courage is inspiring. Remember to be patient with yourself. Healing is a journey, not a race." }
        ]
    },
    {
        id: 2,
        author: 'A Survivor',
        content: "I found a job through this app and it's given me a new sense of purpose. It's not just about the money, it's about standing on my own feet.",
        replies: [
             { id: 2, author: 'Mentor Amit', isMentor: true, content: "That's wonderful to hear! Financial independence is a powerful step forward. Keep up the great work." },
             { id: 3, author: 'Anonymous', isMentor: false, content: "Thank you for sharing, this gives me hope." }
        ]
    }
];

export const DONATION_OPTIONS: DonationOption[] = [
    { id: 1, title: 'Sponsor a Meal', description: 'Provide a warm, nutritious meal for one person.', amount: 5 },
    { id: 2, title: 'Hygiene Kit', description: 'Supply essential toiletries for one month.', amount: 15 },
    { id: 3, title: 'Skill Training', description: 'Fund one module of a skill-building course.', amount: 50 },
    { id: 4, title: 'Emergency Shelter', description: 'Cover one night of safe shelter for an individual.', amount: 25 },
];

export const VOLUNTEER_OPPORTUNITIES: VolunteerOpportunity[] = [
    { id: 1, title: 'Digital Mentor', description: 'Provide remote guidance and support via chat.', skills: ['Empathy', 'Communication'] },
    { id: 2, title: 'Community Kitchen Helper', description: 'Assist in preparing and serving meals.', skills: ['Teamwork', 'Physical Stamina'] },
    { id: 3, title: 'Workshop Facilitator', description: 'Lead a skill-building session in your area of expertise.', skills: ['Public Speaking', 'Teaching'] },
];

export const ANONYMOUS_REPORTS: AnonymousReport[] = [
    { id: 1, position: { top: '35%', left: '65%' } },
    { id: 2, position: { top: '32%', left: '75%' } },
    { id: 3, position: { top: '28%', left: '68%' } },
    { id: 4, position: { top: '70%', left: '15%' } },
    { id: 5, position: { top: '78%', left: '12%' } },
];
