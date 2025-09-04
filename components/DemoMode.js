import { useState } from "react";

export default function DemoMode({ children }) {
  const [demoMode, setDemoMode] = useState(false);
  
  return (
    <div className="relative">
      {/* Demo Mode Banner */}
      {demoMode && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white text-center py-2 text-sm font-medium z-50">
          Demo Mode Active - This is a preview of the template
        </div>
      )}
      
      {/* Demo Mode Toggle */}
      <button 
        onClick={() => setDemoMode(!demoMode)}
        className="fixed bottom-4 right-4 z-50 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm shadow-lg hover:bg-blue-700 transition-colors"
        aria-label={demoMode ? "Exit demo mode" : "Enter demo mode"}
      >
        {demoMode ? "Exit Demo" : "Demo Mode"}
      </button>
      
      {/* Content with adjusted top padding when demo mode is active */}
      <div className={demoMode ? "pt-10" : ""}>
        {children}
      </div>
    </div>
  );
}