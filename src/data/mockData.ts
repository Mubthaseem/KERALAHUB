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

export const INITIAL_SOS_REQUESTS: SOSRequest[] = [
  {
    id: 'sos-101',
    created_at: new Date(Date.now() - 15 * 60000).toISOString(),
    name: 'Anil Kumar',
    phone: '+91 94471 23456',
    district: 'Wayanad',
    location_name: 'Chooralmala Near Bridge',
    lat: 11.5367,
    lng: 76.1724,
    category: 'Rescue Boat',
    urgency: 'CRITICAL',
    details: 'Water level rising rapidly. 5 adults and 2 children stranded on terrace top. Need rescue team with boat urgently.',
    status: 'PENDING',
    people_count: 7
  },
  {
    id: 'sos-102',
    created_at: new Date(Date.now() - 40 * 60000).toISOString(),
    name: 'Mariyam Varghese',
    phone: '+91 98460 98765',
    district: 'Alappuzha',
    location_name: 'Kuttanad Kainakary Ward 4',
    lat: 9.4981,
    lng: 76.3888,
    category: 'Medical Emergency',
    urgency: 'CRITICAL',
    details: 'Dialysis patient needs transportation to District Hospital. Local roads flooded up to waist height.',
    status: 'IN_PROGRESS',
    people_count: 2
  },
  {
    id: 'sos-103',
    created_at: new Date(Date.now() - 90 * 60000).toISOString(),
    name: 'Sujith Nair',
    phone: '+91 97455 11223',
    district: 'Ernakulam',
    location_name: 'Aluva Manappuram Road',
    lat: 10.1090,
    lng: 76.3570,
    category: 'Food & Clean Water',
    urgency: 'HIGH',
    details: 'Power outage since yesterday night. 12 elderly residents need drinking water packets and dry rations.',
    status: 'PENDING',
    people_count: 12
  },
  {
    id: 'sos-104',
    created_at: new Date(Date.now() - 120 * 60000).toISOString(),
    name: 'Dr. Rahul Mohan',
    phone: '+91 94462 88990',
    district: 'Idukki',
    location_name: 'Munnar Colony Road',
    lat: 10.0889,
    lng: 77.0595,
    category: 'Elderly / Infant Evacuation',
    urgency: 'HIGH',
    details: 'Landslide threat near mud slope. 4 senior citizens need safe transfer to closest relief shelter.',
    status: 'PENDING',
    people_count: 4
  }
];

export const INITIAL_DISASTER_REPORTS: DisasterReport[] = [
  {
    id: 'rep-201',
    created_at: new Date(Date.now() - 25 * 60000).toISOString(),
    district: 'Wayanad',
    location_name: 'Meppadi Chooralmala Road',
    lat: 11.5450,
    lng: 76.1650,
    water_level: 'Waist Level',
    description: 'Road completely washed out by heavy mudslide. Only military personnel & specialized rescue teams can pass.',
    image_url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    reporter_contact: '+91 91234 56789',
    upvotes: 42
  },
  {
    id: 'rep-202',
    created_at: new Date(Date.now() - 65 * 60000).toISOString(),
    district: 'Alappuzha',
    location_name: 'AC Road (Alappuzha - Changanassery)',
    lat: 9.4920,
    lng: 76.4350,
    water_level: 'Chest Level',
    description: 'Vehicle traffic suspended. Water flowing heavily over the main road near Mankotta bridge.',
    image_url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80',
    reporter_contact: '+91 94470 00111',
    upvotes: 89
  },
  {
    id: 'rep-203',
    created_at: new Date(Date.now() - 110 * 60000).toISOString(),
    district: 'Ernakulam',
    location_name: 'Periyar River Banks Aluva',
    lat: 10.1150,
    lng: 76.3500,
    water_level: 'Knee Level',
    description: 'Shutter opening alert. Water rising gradually near Shiva Temple causeway. Warning issued to low lying houses.',
    image_url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80',
    reporter_contact: '+91 98950 44332',
    upvotes: 31
  }
];

export const INITIAL_RELIEF_CAMPS: ReliefCamp[] = [
  {
    id: 'camp-301',
    name: 'St. Joseph Higher Secondary School Camp',
    district: 'Wayanad',
    location_name: 'Meppadi Town, Wayanad',
    lat: 11.5520,
    lng: 76.1280,
    contact_person: 'Sub Inspector Mathew / Tehsildar',
    phone: '+91 94960 12001',
    current_occupancy: 240,
    max_capacity: 350,
    needed_supplies: ['Baby Food & Milk Powder', 'Blankets', 'Sanitary Pads', 'ORRS Packets', 'Torch / Power Banks'],
    status: 'OPEN'
  },
  {
    id: 'camp-302',
    name: 'Government Town UP School Relief Shelter',
    district: 'Alappuzha',
    location_name: 'Champakulam, Kuttanad',
    lat: 9.4230,
    lng: 76.4150,
    contact_person: 'Ramesh K. (Camp Officer)',
    phone: '+91 94460 33221',
    current_occupancy: 420,
    max_capacity: 450,
    needed_supplies: ['Clean Drinking Water Cans', 'Dry Biscuits', 'Dettol / Antiseptics', 'Clothes (Children & Adults)'],
    status: 'OPEN'
  },
  {
    id: 'camp-303',
    name: 'Aluva Town Hall Emergency Haven',
    district: 'Ernakulam',
    location_name: 'Near Pump Junction, Aluva',
    lat: 10.1050,
    lng: 76.3550,
    contact_person: 'District Control Officer',
    phone: '+91 0484 2422300',
    current_occupancy: 180,
    max_capacity: 300,
    needed_supplies: ['Mats / Bed Sheets', 'Charging Extensions', 'Prescription Medicines for Diabetes/BP'],
    status: 'OPEN'
  }
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-401',
    created_at: new Date(Date.now() - 30 * 60000).toISOString(),
    district: 'Wayanad',
    category: 'Emergency Alert',
    author_name: 'KSDMA Official Updates',
    title: '⚠️ Wayanad Chooralmala & Mundakkai Relief Operation Hotline Numbers',
    content: 'Control room active 24/7. Army team and NDRF 4th Battalion deployed. Please avoid non-essential travel towards Meppadi ghat road.',
    is_verified: true,
    upvotes: 154,
    comments: [
      {
        id: 'c-1',
        author: 'Vipin Raj',
        content: 'Is the road clear from Kalpetta to Meppadi now for private rescue vehicles?',
        created_at: new Date(Date.now() - 15 * 60000).toISOString()
      },
      {
        id: 'c-2',
        author: 'Volunteers Group',
        content: 'Only emergency rescue vehicles allowed by police near Kalpetta junction.',
        created_at: new Date(Date.now() - 5 * 60000).toISOString()
      }
    ]
  },
  {
    id: 'post-402',
    created_at: new Date(Date.now() - 140 * 60000).toISOString(),
    district: 'Alappuzha',
    category: 'Volunteer Task',
    author_name: 'Kuttanad Boat Rescue Union',
    title: '🛥️ 15 Country Boats Deployed in Kuttanad Inner Canals',
    content: 'We have registered 15 motorized country boats working with fire force. If any family needs evacuation in Nedumudi or Pulinkunnoo, drop exact location here.',
    is_verified: true,
    upvotes: 98,
    comments: []
  },
  {
    id: 'post-403',
    created_at: new Date(Date.now() - 220 * 60000).toISOString(),
    district: 'Ernakulam',
    category: 'Supplies Needed',
    author_name: 'Kalamassery Youth Club',
    title: '📦 Collecting Relief Materials at Kakkanad NGO Quarters',
    content: 'We are accepting: Drinking water 1L/2L bottles, biscuits, soap, toothbrush, toothpaste, new innerwear, candles & matchboxes.',
    is_verified: false,
    upvotes: 64,
    comments: []
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    district: 'Statewide',
    title: 'State Disaster Management Authority (KSDMA)',
    phone: '1077',
    secondary_phone: '0471 2331639',
    role: '24x7 State Emergency Helpline'
  },
  {
    district: 'Statewide',
    title: 'NDRF Control Room (Kerala Sector)',
    phone: '0471 2333101',
    role: 'National Disaster Response Force'
  },
  {
    district: 'Statewide',
    title: 'Fire & Rescue Emergency',
    phone: '101',
    role: 'State Fire and Rescue Operations'
  },
  {
    district: 'Statewide',
    title: 'Kerala Police Emergency Help',
    phone: '112',
    role: 'Police Control Room'
  },
  {
    district: 'Wayanad',
    title: 'Wayanad District Collectorate Control Room',
    phone: '04936 204151',
    secondary_phone: '94465 30100',
    role: 'District Disaster Management Unit'
  },
  {
    district: 'Alappuzha',
    title: 'Alappuzha Flood Emergency Room',
    phone: '0477 2238630',
    secondary_phone: '94476 70000',
    role: 'Kuttanad & Coastal Control Desk'
  },
  {
    district: 'Ernakulam',
    title: 'Ernakulam District Control Room',
    phone: '0484 2423001',
    secondary_phone: '94479 71100',
    role: 'Flood & River Safety Desk'
  },
  {
    district: 'Idukki',
    title: 'Idukki Landslide & Dam Alert Desk',
    phone: '04862 233111',
    role: 'Hilly Area Disaster Cell'
  }
];
