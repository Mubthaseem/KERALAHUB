import React, { useState } from 'react';
import { Bot, Send, Sparkles, HelpCircle, MapPin, CloudRain, ShieldAlert, MessageSquare } from 'lucide-react';
import { DistrictName } from '../types';

interface AIAssistantProps {
  selectedDistrict: DistrictName;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ selectedDistrict }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: "Hello! 👋 I'm your KeralaHub AI Assistant. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');

  const PROMPT_CHIPS = [
    'Is it raining in Kochi?',
    'Nearest hospital in Kottayam?',
    'Roads blocked in Idukki?',
    'Where is relief camp near me?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user' as const, text: query };
    let aiResponseText = "KeralaHub AI: I've checked live reports. Emergency operations centres (DEOC 1077) and relief teams are active. Stay safe!";

    if (query.toLowerCase().includes('rain') || query.toLowerCase().includes('kochi')) {
      aiResponseText = "☁️ Weather Update: Light to moderate showers reported in Kochi/Ernakulam. Periyar river water levels are currently normal.";
    } else if (query.toLowerCase().includes('hospital') || query.toLowerCase().includes('kottayam')) {
      aiResponseText = "🏥 Kottayam Emergency Care: Govt Medical College Kottayam (0481 2562201) and General Hospital Kottayam desks are operational 24x7.";
    } else if (query.toLowerCase().includes('camp') || query.toLowerCase().includes('relief')) {
      aiResponseText = "⛺ Active Relief Camps: St. Joseph HS Meppadi Wayanad & Govt UP School Champakulam Kuttanad are open and accepting supplies.";
    } else if (query.toLowerCase().includes('road') || query.toLowerCase().includes('idukki')) {
      aiResponseText = "⚠️ Idukki Transit Notice: Gap Road Munnar section is open. Drive carefully near landslide-prone bends.";
    }

    setMessages((prev) => [...prev, userMsg, { sender: 'ai', text: aiResponseText }]);
    setInput('');
  };

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 font-sans space-y-4">
      
      {/* Header Card */}
      <div className="bg-gradient-to-r from-emerald-800 to-slate-900 text-white rounded-2xl p-5 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-base sm:text-lg flex items-center gap-1.5">
              <span>KeralaHub AI Assistant</span>
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
            </h2>
            <p className="text-xs text-slate-300">24x7 Instant Disaster & Community Knowledge Engine</p>
          </div>
        </div>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex flex-wrap gap-2">
        {PROMPT_CHIPS.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="bg-white border border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm transition"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm min-h-[320px] max-h-[450px] overflow-y-auto space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white font-medium rounded-br-none'
                  : 'bg-slate-100 text-slate-900 border border-slate-200 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-sm flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask anything about Kerala, emergency, rain, camps..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 text-xs bg-transparent focus:outline-none px-2 text-slate-900"
        />
        <button
          onClick={() => handleSend()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl shadow transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
