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

// Official August 2026 KSDMA & DEOC Verified Emergency Control Point Data
export const INITIAL_SOS_REQUESTS: SOSRequest[] = [
  {
    id: 'sos-ksdma-01',
    created_at: new Date('2026-08-04T10:30:00Z').toISOString(),
    name: 'District Emergency Operations Centre (DEOC)',
    phone: '04936 204151',
    district: 'Wayanad',
    location_name: 'Chooralmala - Mundakkai Rescue Zone',
    lat: 11.5367,
    lng: 76.1724,
    category: 'Rescue Boat',
    urgency: 'CRITICAL',
    details: 'DEOC Wayanad Active Control Point. NDRF & Army personnel deployed. Emergency evacuation hotline: 8078409770.',
    status: 'IN_PROGRESS',
    people_count: 0
  },
  {
    id: 'sos-ksdma-02',
    created_at: new Date('2026-08-04T11:15:00Z').toISOString(),
    name: 'Kuttanad Taluk Emergency Control Desk',
    phone: '0477 2702221',
    district: 'Alappuzha',
    location_name: 'Kuttanad Canal Belt (Champakulam / Pulinkunnoo)',
    lat: 9.4981,
    lng: 76.3888,
    category: 'Medical Emergency',
    urgency: 'CRITICAL',
    details: 'DEOC Alappuzha Emergency Boat Patrol. Dial 0477-2238630 or 9495003640 for water transport & medical transfers.',
    status: 'IN_PROGRESS',
    people_count: 0
  },
  {
    id: 'sos-ksdma-03',
    created_at: new Date('2026-08-04T14:00:00Z').toISOString(),
    name: 'Ernakulam River Safety Control Room',
    phone: '0484 2423001',
    district: 'Ernakulam',
    location_name: 'Periyar River Banks, Aluva Shiva Temple Area',
    lat: 10.1090,
    lng: 76.3570,
    category: 'Power & Signal Outage',
    urgency: 'HIGH',
    details: 'Aluva Flood Control Desk. Water level monitoring along Periyar banks. Emergency hotline: 0484-2423001.',
    status: 'IN_PROGRESS',
    people_count: 0
  }
];

export const INITIAL_DISASTER_REPORTS: DisasterReport[] = [
  {
    id: 'rep-aug2026-01',
    created_at: new Date('2026-08-04T09:00:00Z').toISOString(),
    district: 'Wayanad',
    location_name: 'Meppadi - Chooralmala Ghat Road',
    lat: 11.5450,
    lng: 76.1650,
    water_level: 'Road Blocked',
    description: 'Meppadi - Chooralmala bridge access restricted to emergency & NDRF vehicles. Heavy rain warning issued by IMD.',
    image_url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
    reporter_contact: 'DEOC Wayanad (04936-204151)',
    upvotes: 120
  },
  {
    id: 'rep-aug2026-02',
    created_at: new Date('2026-08-04T12:30:00Z').toISOString(),
    district: 'Alappuzha',
    location_name: 'AC Road (Alappuzha - Changanassery Highway)',
    lat: 9.4920,
    lng: 76.4350,
    water_level: 'Waist Level',
    description: 'Water flowing across AC Road low-lying segments near Mankotta. KSRTC boat buses operational in Kuttanad.',
    image_url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80',
    reporter_contact: 'DEOC Alappuzha (0477-2238630)',
    upvotes: 95
  }
];

export const INITIAL_RELIEF_CAMPS: ReliefCamp[] = [
  {
    id: 'camp-ksdma-01',
    name: 'St. Joseph Higher Secondary School Emergency Shelter',
    district: 'Wayanad',
    location_name: 'Meppadi Town, Wayanad',
    lat: 11.5520,
    lng: 76.1280,
    contact_person: 'Camp Officer / Vythiri Tehsildar',
    phone: '04936 255229',
    current_occupancy: 280,
    max_capacity: 400,
    needed_supplies: ['Clean Drinking Water', 'Blankets', 'Baby Milk Powder', 'ORRS Packets', 'Sanitary Pads'],
    status: 'OPEN'
  },
  {
    id: 'camp-ksdma-02',
    name: 'Government UP School Kuttanad Relief Haven',
    district: 'Alappuzha',
    location_name: 'Champakulam, Kuttanad',
    lat: 9.4230,
    lng: 76.4150,
    contact_person: 'Ambalapuzha Relief Officer',
    phone: '0477 2253771',
    current_occupancy: 350,
    max_capacity: 500,
    needed_supplies: ['Drinking Water Cans', 'Dry Biscuits', 'First Aid Kits', 'Clean Clothes'],
    status: 'OPEN'
  },
  {
    id: 'camp-ksdma-03',
    name: 'Aluva Town Hall Emergency Shelter',
    district: 'Ernakulam',
    location_name: 'Near Pump Junction, Aluva',
    lat: 10.1050,
    lng: 76.3550,
    contact_person: 'District Control Desk',
    phone: '0484 2423001',
    current_occupancy: 150,
    max_capacity: 350,
    needed_supplies: ['Sleeping Mats', 'Prescription Medicines', 'Power Banks'],
    status: 'OPEN'
  }
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-ksdma-01',
    created_at: new Date('2026-08-04T08:00:00Z').toISOString(),
    district: 'Wayanad',
    category: 'Emergency Alert',
    author_name: 'KSDMA Official Control Desk',
    title: '⚠️ Wayanad District Control Room Hotline & Red Alert Warning',
    content: 'State Emergency Operations Centre (SEOC) Active 24x7. For rescue assistance in Wayanad, call DEOC: 04936-204151 or Mobile: 8078409770 / 9526804151. Universal Emergency Helpline: 112.',
    is_verified: true,
    upvotes: 310,
    comments: []
  },
  {
    id: 'post-ksdma-02',
    created_at: new Date('2026-08-04T11:00:00Z').toISOString(),
    district: 'Alappuzha',
    category: 'Emergency Alert',
    author_name: 'Alappuzha DEOC Official',
    title: '📢 Kuttanad & Coastal Alappuzha Emergency Helpline Numbers',
    content: 'DEOC Alappuzha: 0477-2238630 / 1077 (Toll-Free). Taluk Control Rooms: Kuttanad: 0477-2702221, Ambalapuzha: 0477-2253771, Cherthala: 0478-2813103, Chengannur: 0479-2452334.',
    is_verified: true,
    upvotes: 245,
    comments: []
  }
];

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
    district: 'Wayanad',
    title: 'Vythiri Taluk Control Room',
    phone: '04936 255229',
    role: 'Meppadi & Chooralmala Rescue Desk'
  },
  {
    district: 'Wayanad',
    title: 'Sulthan Bathery Taluk Control Room',
    phone: '04936 220296',
    role: 'Bathery Region Emergency Desk'
  },
  {
    district: 'Alappuzha',
    title: 'Alappuzha District Control Room (DEOC)',
    phone: '1077',
    secondary_phone: '0477 2238630',
    role: 'DEOC Alappuzha • Mobile: 9495003640'
  },
  {
    district: 'Alappuzha',
    title: 'Kuttanad Taluk Control Room',
    phone: '0477 2702221',
    role: 'Kuttanad Canal & Water Rescue Desk'
  },
  {
    district: 'Alappuzha',
    title: 'Chengannur Taluk Control Room',
    phone: '0479 2452334',
    role: 'Pampa River Safety Cell'
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
    secondary_phone: '0471 2730045',
    role: 'DEOC Collectorate Kudappanakunnu'
  }
];
