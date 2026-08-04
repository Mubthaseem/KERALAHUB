import { SOSRequest, DisasterReport, ReliefCamp, ForumPost, EmergencyContact } from '../types';

export const KERALA_DISTRICTS = [
  'All Districts',
  'Wayanad',
  'Idukki',
  'Alappuzha',
  'Ernakulam',
  'Thrissur',
  'Kozhikode',
  'Malappuram',
  'Kottayam',
  'Pathanamthitta',
  'Palakkad',
  'Kannur',
  'Kasaragod',
  'Kollam',
  'Thiruvananthapuram'
] as const;

// Live user data starts completely empty
export const INITIAL_SOS_REQUESTS: SOSRequest[] = [];
export const INITIAL_DISASTER_REPORTS: DisasterReport[] = [];
export const INITIAL_RELIEF_CAMPS: ReliefCamp[] = [];
export const INITIAL_FORUM_POSTS: ForumPost[] = [];

// Official 24x7 Kerala Emergency Helplines across all 14 Districts
export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    district: 'Statewide',
    title: 'National Universal Emergency Helpline',
    phone: '112',
    role: '24x7 Universal Emergency Support (Police / Fire / Ambulance)'
  },
  {
    district: 'Statewide',
    title: 'State Emergency Operations Centre (SEOC KSDMA)',
    phone: '1070',
    secondary_phone: '0471 2778800',
    role: 'State Disaster Management Control Room'
  },
  {
    district: 'Statewide',
    title: 'Kerala Fire & Rescue Operations',
    phone: '101',
    role: '24x7 State Fire & Rescue Desk'
  },
  {
    district: 'Statewide',
    title: 'Kerala Medical Emergency Ambulance',
    phone: '108',
    role: '24x7 Emergency Ambulance Helpline'
  },
  {
    district: 'Statewide',
    title: 'KSEB Electrical Disaster Helpline',
    phone: '1912',
    role: 'Kerala State Electricity Board Emergency'
  },
  {
    district: 'Statewide',
    title: 'Kerala Water Authority (KWA)',
    phone: '1916',
    role: 'Drinking Water Supply Control Desk'
  },
  {
    district: 'Wayanad',
    title: 'Wayanad District Control Room (DEOC)',
    phone: '1077',
    secondary_phone: '04936 204151',
    role: 'DEOC Kalpetta • Mobile: 8078409770 / 9526804151'
  },
  {
    district: 'Alappuzha',
    title: 'Alappuzha District Control Room (DEOC)',
    phone: '1077',
    secondary_phone: '0477 2238630',
    role: 'DEOC Alappuzha • Mobile: 9495003640'
  },
  {
    district: 'Ernakulam',
    title: 'Ernakulam District Control Room (DEOC)',
    phone: '1077',
    secondary_phone: '0484 2423001',
    role: 'DEOC Civil Station Kakkanad'
  },
  {
    district: 'Idukki',
    title: 'Idukki District Control Room (DEOC)',
    phone: '1077',
    secondary_phone: '04862 233111',
    role: 'DEOC Painavu • Hilly Landslide Desk'
  },
  {
    district: 'Thrissur',
    title: 'Thrissur District Control Room (DEOC)',
    phone: '1077',
    secondary_phone: '0487 2362424',
    role: 'DEOC Civil Station Thrissur'
  },
  {
    district: 'Kozhikode',
    title: 'Kozhikode District Control Room (DEOC)',
    phone: '1077',
    secondary_phone: '0495 2371000',
    role: 'DEOC Civil Station Kozhikode'
  },
  {
    district: 'Kottayam',
    title: 'Kottayam District Control Room (DEOC)',
    phone: '1077',
    secondary_phone: '0481 2562201',
    role: 'DEOC Collectorate Kottayam'
  },
  {
    district: 'Malappuram',
    title: 'Malappuram District Control Room (DEOC)',
    phone: '1077',
    secondary_phone: '0483 2736320',
    role: 'DEOC Collectorate Malappuram'
  },
  {
    district: 'Pathanamthitta',
    title: 'Pathanamthitta District Control Room (DEOC)',
    phone: '1077',
    secondary_phone: '0468 2222515',
    role: 'DEOC Collectorate Pathanamthitta'
  },
  {
    district: 'Palakkad',
    title: 'Palakkad District Control Room (DEOC)',
    phone: '1077',
    secondary_phone: '0491 2505356',
    role: 'DEOC Civil Station Palakkad'
  },
  {
    district: 'Kannur',
    title: 'Kannur District Control Room (DEOC)',
    phone: '1077',
    secondary_phone: '0497 2713232',
    role: 'DEOC Collectorate Kannur'
  },
  {
    district: 'Kasaragod',
    title: 'Kasaragod District Control Room (DEOC)',
    phone: '1077',
    secondary_phone: '04994 255010',
    role: 'DEOC Collectorate Kasaragod'
  },
  {
    district: 'Kollam',
    title: 'Kollam District Control Room (DEOC)',
    phone: '1077',
    secondary_phone: '0474 2794002',
    role: 'DEOC Collectorate Kollam'
  },
  {
    district: 'Thiruvananthapuram',
    title: 'Thiruvananthapuram District Control Room (DEOC)',
    phone: '1077',
    secondary_phone: '0471 2778800',
    role: 'DEOC Collectorate Kudappanakunnu'
  }
];
