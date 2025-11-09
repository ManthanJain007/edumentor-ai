// src/App.tsx
import { AppProvider } from './contexts/AppContext';
import { Header } from './components/layout/Header';
import { NeuroNavbar } from './components/layout/NeuroNavbar';
import { AdaptiveDial } from './components/learning/AdaptiveDial';
import { QuantumChat } from './components/chat/QuantumChat';
import { ProgressDashboard } from './components/dashboard/ProgressDashboard';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-purple-900/20 to-cyber-dark">
        <Header />
        <NeuroNavbar />
        
        <div className="container mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Sidebar - Learning Tools */}
            <div className="lg:col-span-1 space-y-6">
              <AdaptiveDial />
              <ProgressDashboard />
            </div>
            
            {/* Main Chat Area */}
            <div className="lg:col-span-2">
              <QuantumChat />
            </div>
          </div>
        </div>

        {/* Floating AI Assistant */}
        <div className="fixed bottom-6 right-6">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-gemini-blue to-ai-purple rounded-full flex items-center justify-center shadow-2xl animate-float cursor-pointer hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">🤖</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-quantum-green rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    </AppProvider>
  );
}

export default App; // Make sure this line exists!