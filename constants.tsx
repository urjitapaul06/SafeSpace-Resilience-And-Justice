
import React from 'react';
import { 
  Shield, Phone, Heart, Users, MapPin, Activity, 
  BookOpen, LayoutDashboard, MessageSquare, 
  AlertCircle, Zap, PlayCircle, Settings,
  Stethoscope, Image, Globe, Scale
} from 'lucide-react';

export const HELPLINES = [
  { name: 'Police Emergency', number: '100', icon: <Shield size={18} /> },
  { name: 'Women Helpline', number: '1091', icon: <Phone size={18} /> },
  { name: 'Child Abuse Helpline', number: '1098', icon: <Heart size={18} /> },
  { name: 'Assault Support Network', number: '1800-200-0011', icon: <Users size={18} /> },
  { name: 'Medical Emergency', number: '102', icon: <Activity size={18} /> },
];

export const DOCTORS = [
  {
    name: 'Dr. Tiyasa Kamle',
    specialty: 'Trauma Recovery & PTSD Specialist',
    experience: '10+ Years Experience',
    university: 'PhD in Clinical Psychology, Harvard University',
    bio: 'Dedicated to helping survivors reclaim their lives through specialized trauma therapy. Available for emergency consultations.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=400' 
  },
  {
    name: 'Dr. Urjita Paul',
    specialty: 'Holistic Mental Health & Empowerment',
    experience: '10+ Years Experience',
    university: 'MD in Psychiatry, Stanford University',
    bio: 'Expert in mindfulness-based stress reduction and peer support. Your journey to healing starts here.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400'
  }
];

export const NAV_ITEMS = [
  { id: 'home', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'justice', label: 'Justice Center', icon: <Scale size={20} /> },
  { id: 'stopncii', label: 'StopNCII', icon: <Globe size={20} /> },
  { id: 'helplines', label: 'Helplines', icon: <Phone size={20} /> },
  { id: 'assistant', label: 'Penny', icon: <MessageSquare size={20} /> },
  { id: 'wellness', label: 'Wellness', icon: <Activity size={20} /> },
  { id: 'learning', label: 'Inspire', icon: <BookOpen size={20} /> },
  { id: 'image-insight', label: 'Image Analysis', icon: <Image size={20} /> },
  { id: 'video', label: 'Video Insight', icon: <PlayCircle size={20} /> },
  { id: 'defense', label: 'Defense', icon: <Zap size={20} /> },
  { id: 'awareness', label: 'Awareness', icon: <AlertCircle size={20} /> },
  { id: 'support', label: 'Doc Center', icon: <Stethoscope size={20} /> },
  { id: 'tracker', label: 'Health Hub', icon: <Activity size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
];

export const MOTIVATIONAL_STORIES = [
  {
    id: '1',
    title: 'Dr. APJ Abdul Kalam',
    author: 'Admin',
    content: "Dr. Kalam rose from humble beginnings to become India's 'Missile Man'. He believed that 'Dreams are not what you see in sleep, but what don't let you sleep.'"
  },
  {
    id: '2',
    title: 'Netaji Subhash Chandra Bose',
    author: 'Admin',
    content: "Netaji was a legendary figure in India's struggle for independence. His courage was unmatched as he formed the Indian National Army."
  }
];
