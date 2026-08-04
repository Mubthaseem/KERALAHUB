import React, { useState } from 'react';
import { Job, MarketplaceItem, DistrictName } from '../types';
import { Briefcase, ShoppingBag, PlusCircle, Search, MapPin, Tag, Phone, Mail, Building, DollarSign, Gift } from 'lucide-react';
import { Language, TRANSLATIONS } from '../data/translations';

interface MarketplaceJobsProps {
  selectedDistrict: DistrictName;
  onSelectDistrict: (district: DistrictName) => void;
  language: Language;
  currentUser?: { email: string; name?: string } | null;
  onOpenAuthModal?: () => void;
}

const INITIAL_JOBS: Job[] = [
  {
    id: 'job-01',
    company_name: 'Kerala State IT Mission',
    title: 'Disaster Relief Data Coordinator',
    district: 'Thiruvananthapuram',
    job_type: 'Government',
    salary: '₹35,000 / month',
    description: 'Manage real-time district GIS mapping & community response logs.',
    contact_email: 'careers@kerala.gov.in',
    contact_phone: '0471 2778800',
    created_at: new Date().toISOString()
  },
  {
    id: 'job-02',
    company_name: 'Technopark Tech Solutions',
    title: 'Full Stack React & Node Developer',
    district: 'Ernakulam',
    job_type: 'Remote',
    salary: '₹60,000 - ₹90,000 / month',
    description: 'Build high-concurrency emergency software & Web GIS dashboards.',
    contact_email: 'hr@techkerala.io',
    contact_phone: '9847012345',
    created_at: new Date().toISOString()
  }
];

const INITIAL_MARKETPLACE: MarketplaceItem[] = [
  {
    id: 'market-01',
    seller_name: 'Kochi Relief Foundation',
    seller_phone: '9846011223',
    district: 'Ernakulam',
    title: 'Free Emergency Drinking Water Filters (10 Units)',
    category: 'Free Goods',
    price: 'FREE',
    description: 'Distributing high-capacity gravity water purifiers for disaster affected families in Kuttanad.',
    image_url: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    created_at: new Date().toISOString()
  },
  {
    id: 'market-02',
    seller_name: 'Waynad Hostels Desk',
    seller_phone: '9526804151',
    district: 'Wayanad',
    title: 'Emergency Relief Accommodation / PG Rooms',
    category: 'PG & Hostels',
    price: '₹1,500 / month',
    description: 'Safe, clean rooms available near Kalpetta for displaced families & volunteers.',
    image_url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    created_at: new Date().toISOString()
  }
];

export const MarketplaceJobs: React.FC<MarketplaceJobsProps> = ({
  selectedDistrict,
  onSelectDistrict,
  language,
  currentUser,
  onOpenAuthModal
}) => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'marketplace'>('jobs');
  const [jobsList, setJobsList] = useState<Job[]>(INITIAL_JOBS);
  const [marketList, setMarketList] = useState<MarketplaceItem[]>(INITIAL_MARKETPLACE);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobsList.filter(
    (j) => (selectedDistrict === 'All Districts' || j.district === selectedDistrict) &&
           (j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.company_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredMarket = marketList.filter(
    (m) => (selectedDistrict === 'All Districts' || m.district === selectedDistrict) &&
           (m.title.toLowerCase().includes(searchQuery.toLowerCase()) || m.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 font-sans space-y-4">
      
      {/* Header & Sub-Navigation */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
            {activeTab === 'jobs' ? <Briefcase className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5 text-amber-400" />}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase">
              {activeTab === 'jobs' ? 'Kerala Jobs & Employment' : 'Community Marketplace & Free Items'}
            </h2>
            <p className="text-xs text-slate-500">
              {activeTab === 'jobs' ? 'Government & Private Jobs across all 14 districts' : 'Free relief supplies, rentals, used items & PG accommodation'}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'jobs' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Jobs Portal</span>
          </button>

          <button
            onClick={() => setActiveTab('marketplace')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'marketplace' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>Marketplace</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex items-center gap-2">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder={activeTab === 'jobs' ? 'Search job title, company or role...' : 'Search marketplace items, free goods, rentals...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs bg-transparent focus:outline-none text-slate-900"
        />
      </div>

      {/* Content Rendering */}
      {activeTab === 'jobs' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:border-slate-300 transition space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="bg-red-50 text-red-700 font-bold text-[10px] px-2 py-0.5 rounded border border-red-200 uppercase">
                    {job.job_type}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-1">{job.title}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" /> {job.company_name}
                  </p>
                </div>
                <span className="font-bold text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg">
                  {job.salary}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{job.description}</p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-600" /> {job.district}
                </span>
                <a
                  href={`mailto:${job.contact_email}`}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" /> Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredMarket.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-slate-300 transition flex flex-col">
              {item.image_url && (
                <img src={item.image_url} alt={item.title} className="w-full h-40 object-cover" />
              )}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="bg-blue-50 text-blue-700 font-bold text-[10px] px-2 py-0.5 rounded border border-blue-200">
                      {item.category}
                    </span>
                    <span className={`font-bold text-xs px-2 py-0.5 rounded ${
                      item.price === 'FREE' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-900'
                    }`}>
                      {item.price}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">{item.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1">{item.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 truncate max-w-[120px]">📍 {item.district}</span>
                  <a
                    href={`tel:${item.seller_phone}`}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1.5 rounded-lg text-[11px] flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3" /> Call Seller
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
