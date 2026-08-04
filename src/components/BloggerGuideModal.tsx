import React, { useState } from 'react';
import { HelpCircle, X, Copy, Check, ExternalLink, Zap } from 'lucide-react';

interface BloggerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BloggerGuideModal: React.FC<BloggerGuideModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const bloggerSnippet = `<!-- 
  KERALAHUB.ONLINE - Google Blogger $0 Deployment Theme
  1. Go to Blogger.com -> Theme -> Edit HTML
  2. Replace all XML content with this clean single-page theme wrapper:
-->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>KeralaHub.online | Disaster Management & Emergency Portal</title>
  <b:skin><![CDATA[
    body { margin: 0; padding: 0; background: #f8fafc; font-family: sans-serif; }
    .blogger-app-container { width: 100%; min-height: 100vh; }
  ]]></b:skin>
</head>
<body>
  <div class="blogger-app-container" id="root">
    <!-- Production App Bundle Embeds Here -->
  </div>
</body>
</html>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(bloggerSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 font-sans my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 font-mono">
                GOOGLE BLOGGER $0 HOSTING GUIDE
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Deploy www.keralahub.online for $0 monthly costs
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 bg-slate-100 p-1.5 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions */}
        <div className="space-y-4 text-xs text-slate-700 leading-relaxed mb-6 font-mono">
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900">
            <strong>Why Blogger + Supabase?</strong> Google Blogger provides 100% free unlimited web traffic hosting, custom SSL, and custom domain mapping (`www.keralahub.online`), while Supabase handles PostgreSQL database queries and live WebSocket map pins for $0.
          </div>

          <ol className="list-decimal list-inside space-y-2 text-slate-800">
            <li>Create a free blog on <a href="https://blogger.com" target="_blank" rel="noreferrer" className="text-blue-600 underline">Blogger.com</a>.</li>
            <li>Go to <strong>Settings</strong> ➔ <strong>Custom Domain</strong> ➔ enter <code>www.keralahub.online</code>.</li>
            <li>Go to <strong>Theme</strong> ➔ Click the dropdown next to Customize ➔ Select <strong>Edit HTML</strong>.</li>
            <li>Copy the XML theme code below, paste into Blogger, and save!</li>
          </ol>

          {/* Snippet box */}
          <div className="relative">
            <pre className="bg-slate-900 text-slate-200 p-3.5 rounded-xl text-[11px] overflow-x-auto font-mono max-h-48 border border-slate-800">
              {bloggerSnippet}
            </pre>

            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 bg-slate-800 hover:bg-slate-700 text-white font-mono text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1 border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied XML!' : 'Copy Code'}</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 text-white font-mono text-xs font-bold px-4 py-2 rounded-xl"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
