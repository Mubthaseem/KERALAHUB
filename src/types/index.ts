export type UrgencyLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM';

export type SOSCategory = 'Rescue Boat' | 'Food & Clean Water' | 'Medical Emergency' | 'Elderly / Infant Evacuation' | 'Power & Signal Outage' | 'General';

export type WaterLevel = 'Knee Level' | 'Waist Level' | 'Chest Level' | 'Submerged Roof' | 'Road Blocked';

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
  urgency: UrgencyLevel;
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
  status: 'OPEN' | 'FULL' | 'CLOSING';
}

export interface ForumComment {
  id: string;
  author: string;
  content: string;
  created_at: string;
}

export interface ForumPost {
  id: string;
  created_at: string;
  district: DistrictName;
  category: 'Emergency Alert' | 'Volunteer Task' | 'Supplies Needed' | 'Road Update' | 'General';
  author_name: string;
  title: string;
  content: string;
  image_url?: string;
  upvotes: number;
  is_verified?: boolean;
  comments: ForumComment[];
}

export interface EmergencyContact {
  district: DistrictName | 'Statewide';
  title: string;
  phone: string;
  secondary_phone?: string;
  role: string;
}
