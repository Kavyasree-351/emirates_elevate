import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { OverviewView } from './components/overview/OverviewView';
import { FleetExplorer } from './components/fleet/FleetExplorer';
import { RetrofitProgressView } from './components/progress/RetrofitProgressView';
import { ProductCabinView } from './components/cabin/ProductCabinView';
import { ScenarioLabView } from './components/scenario/ScenarioLabView';
import { AboutView } from './components/about/AboutView';
import { ShieldCheck } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Dynamically update document title based on active module
  useEffect(() => {
    const titles: Record<string, string> = {
      overview: 'Overview | Emirates Fleet Intelligence',
      fleet: 'Fleet Explorer | Emirates Fleet Intelligence',
      progress: 'Retrofit Progress | Emirates Fleet Intelligence',
      cabin: 'Product & Cabin | Emirates Fleet Intelligence',
      scenario: 'Scenario Lab | Emirates Fleet Intelligence',
      about: 'Data & Methodology | Emirates Fleet Intelligence'
    };
    document.title = titles[activeTab] || 'Emirates Fleet Intelligence';
  }, [activeTab]);

  const handleGlobalSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0 && activeTab !== 'fleet') {
      setActiveTab('fleet');
    }
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView onNavigateTab={(tab) => setActiveTab(tab)} />;
      case 'fleet':
        return <FleetExplorer initialSearch={searchQuery} />;
      case 'progress':
        return <RetrofitProgressView />;
      case 'cabin':
        return <ProductCabinView />;
      case 'scenario':
        return <ScenarioLabView />;
      case 'about':
        return <AboutView />;
      default:
        return <OverviewView onNavigateTab={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-emirates-red selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={handleGlobalSearch}
        onOpenMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Dynamic View Container */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
          <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
            {renderActiveView()}

            {/* Bottom Global Footer & Disclaimer */}
            <footer className="mt-12 pt-6 border-t border-navy-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans">
              <div className="flex items-center gap-2 text-center sm:text-left">
                <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
                <span>
                  <strong className="text-slate-300">Emirates Fleet Intelligence</strong> • Independent portfolio prototype for Emirates Group Elevate Internship (Strategy, Data & Tech track).
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Not affiliated with Emirates. Built with public facts & calibrated demo models.
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
