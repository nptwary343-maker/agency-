"use client";

import { useEffect, useRef, useState } from "react";

export default function PluginMirrorPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);

  // Function to inject custom CSS to match Next.js dashboard
  const injectStyles = () => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument) {
      const doc = iframe.contentDocument;
      
      // Create style element
      const style = doc.createElement("style");
      style.textContent = `
        /* Hide WP Admin Bar & Sidebar if we want to embed just the content */
        #wpadminbar { display: none !important; }
        #adminmenumain { display: none !important; }
        #wpcontent { margin-left: 0 !important; padding-left: 20px !important; }
        
        /* Match Fonts */
        body { font-family: 'Geist Sans', sans-serif !important; background: #f9fafb !important; }
        
        /* Hide WP Footer */
        #wpfooter { display: none !important; }
        
        /* Modernize Buttons */
        .button-primary { 
            background: #ea580c !important; /* Orange-600 */
            border-color: #ea580c !important; 
            border-radius: 0.5rem !important;
            padding: 0.5rem 1rem !important;
            height: auto !important;
            font-weight: 500 !important;
        }
      `;
      doc.head.appendChild(style);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">Plugin Manager (Bridge)</h1>
        <p className="text-sm text-gray-500">
          Install and manage WordPress plugins directly from this secure tunnel.
        </p>
      </div>
      
      <div className="relative flex-1 bg-gray-100">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
          </div>
        )}
        
        <iframe
          ref={iframeRef}
          src="/wp-admin/plugins.php"
          className="h-full w-full border-none"
          onLoad={injectStyles}
          title="WordPress Plugin Bridge"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        />
      </div>
    </div>
  );
}
