export type DistrictName = 
  | 'All Districts'
  | 'Wayanad'
  | 'Idukki'
  | 'Alappuzha'
  | 'Ernakulam'
  | 'Thrissur'
  | 'Kozhikode'
  | 'Malappuram'
  | 'Kottayam'
  | 'Pathanamthitta'
  | 'Palakkad'
  | 'Kannur'
  | 'Kasaragod'
  | 'Kollam'
  | 'Thiruvananthapuram';

export type UserRole = 
  | 'Citizen'
  | 'Verified Citizen'
  | 'Volunteer'
  | 'Doctor'
  | 'NGO'
  | 'Business'
  | 'Govt Official'
  | 'Admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  district: DistrictName;
  panchayat?: string;
  role: UserRole;
  trust_score: number;
  badges: string[];
  is_verified: boolean;
}

export type SOSCategory = 
  | 'Evacuation'
  | 'Medical Emergency'
  | 'Food & Water'
  | 'Rescue Boat'
  | 'Power & Signal Outage';

export type SOSUrgency = 'CRITICAL' | 'HIGH' | 'MEDIUM';
export type UrgencyLevel = SOSUrgency;
export type WaterLevel = 'Critical Flood' | 'Waist Level' | 'Knee Level' | 'Road Blocked' | 'Normal';

export interface SOSRequest {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  district: DistrictName;
  location_name: string;
  lat: number;
  lng: number;
  category: SOSCategory;
  urgency: SOSUrgency;
  details: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
  people_count?: number;
}

export interface DisasterReport {
  id: string;
  created_at: string;
  district: DistrictName;
  location_name: string;
  lat: number;
  lng: number;
  water_level: WaterLevel;
  description: string;
  image_url?: string;
  reporter_contact?: string;
  upvotes: number;
}

export interface ReliefCamp {
  id: string;
  name: string;
  district: DistrictName;
  location_name: string;
  lat: number;
  lng: number;
  contact_person: string;
  phone: string;
  current_occupancy: number;
  max_capacity: number;
  needed_supplies: string[];
  status: 'OPEN' | 'FULL' | 'CLOSED';
}

export interface ForumComment {
  id: string;
  author?: string;
  author_name: string;
  created_at: string;
  content: string;
}

export interface ForumPost {
  id: string;
  created_at: string;
  district: DistrictName;
  category: string;
  author_name: string;
  title: string;
  content: string;
  image_url?: string;
  is_verified?: boolean;
  upvotes: number;
  comments: ForumComment[];
}

export interface EmergencyContact {
  district: DistrictName | 'Statewide';
  title: string;
  phone: string;
  secondary_phone?: string;
  role: string;
}

export interface Job {
  id: string;
  company_name: string;
  title: string;
  district: DistrictName;
  job_type: 'Government' | 'Private' | 'Part-time' | 'Freelance' | 'Remote';
  salary: string;
  description: string;
  contact_email: string;
  contact_phone?: string;
  created_at: string;
}

export interface MarketplaceItem {
  id: string;
  seller_name: string;
  seller_phone: string;
  district: DistrictName;
  title: string;
  category: 'Free Goods' | 'Rentals' | 'Used Goods' | 'PG & Hostels' | 'Vehicles';
  price: string;
  description: string;
  image_url?: string;
  created_at: string;
}

export interface EventItem {
  id: string;
  title: string;
  district: DistrictName;
  category: 'Festival' | 'Tech Meetup' | 'Sports' | 'Volunteer Drive' | 'Tourism';
  event_date: string;
  location_name: string;
  description: string;
  organizer_name: string;
  image_url?: string;
}
