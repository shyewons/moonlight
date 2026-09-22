import React, { useState, useEffect } from 'react';
import { TabType, TimeOfDay, PetStatus, InventoryItem, Quest, Expedition } from './types';
import {
  initialPetStatus,
  initialInventory,
  activeQuest,
  currentExpedition,
} from './data/sanctuaryData';
import { CottageView } from './components/CottageView';
import { ExplorationView } from './components/ExplorationView';
import { PetSanctuaryView } from './components/PetSanctuaryView';
import { TomeView } from './components/TomeView';
import { TuneModal } from './components/TuneModal';
import { QuestModal } from './components/QuestModal';
import { ExpeditionModal } from './components/ExpeditionModal';
import { SettingsModal } from './components/SettingsModal';
import { sfx } from './utils/audio';

const STORAGE_KEY = 'moonlit_hearth_data_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('afternoon');
  const [aroma, setAroma] = useState<string>('달콤한 산딸기 꽃향');

  // Modals
  const [isTuneOpen, setIsTuneOpen] = useState(false);
  const [isQuestOpen, setIsQuestOpen] = useState(false);
  const [isExpeditionOpen, setIsExpeditionOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Core State with localStorage recovery
  const [pet, setPet] = useState<PetStatus>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_pet');
      return saved ? JSON.parse(saved) : initialPetStatus;
    } catch {
      return initialPetStatus;
    }
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_inv');
      return saved ? JSON.parse(saved) : initialInventory;
    } catch {
      return initialInventory;
    }
  });

  const [quest, setQuest] = useState<Quest>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_quest');
      return saved ? JSON.parse(saved) : activeQuest;
    } catch {
      return activeQuest;
    }
  });

  const [expedition, setExpedition] = useState<Expedition>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_exp');
      return saved ? JSON.parse(saved) : currentExpedition;
    } catch {
      return currentExpedition;
    }
  });

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_pet', JSON.stringify(pet));
    } catch {
      // ignore
    }
  }, [pet]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_inv', JSON.stringify(inventory));
    } catch {
      // ignore
    }
  }, [inventory]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_quest', JSON.stringify(quest));
    } catch {
      // ignore
    }
  }, [quest]);

  const handleResetData = () => {
    setPet(initialPetStatus);
    setInventory(initialInventory);
    setQuest(activeQuest);
    setExpedition(currentExpedition);
    try {
      localStorage.removeItem(STORAGE_KEY + '_pet');
      localStorage.removeItem(STORAGE_KEY + '_inv');
      localStorage.removeItem(STORAGE_KEY + '_quest');
      localStorage.removeItem(STORAGE_KEY + '_exp');
    } catch {
      // ignore
    }
    sfx.playSparkle();
  };

  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'home', label: '집', icon: 'cottage' },
    { id: 'map', label: '지도', icon: 'explore' },
    { id: 'pets', label: '펫', icon: 'pets' },
    { id: 'tome', label: '도감', icon: 'menu_book' },
  ];

  const handleNavClick = (tabId: TabType) => {
    if (tabId !== activeTab) {
      sfx.playChime(tabId === 'home' ? 520 : 600, 0.15);
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#fbfaf1] text-[#1b1c17] min-h-screen flex flex-col font-['Nunito_Sans',sans-serif]">
      {/* Fixed Top Header */}
      <header className="fixed top-0 w-full z-40 bg-[#fbfaf1]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(57,58,52,0.04)] border-b border-[#e5dec9]/40">
        <div className="h-14 px-5 flex items-center justify-between max-w-[430px] mx-auto">
          {/* Header Title */}
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7e5713] text-[20px] select-none">
              {timeOfDay === 'night' ? 'bedtime' : 'dark_mode'}
            </span>
            <span className="font-['Literata',serif] font-semibold text-[18px] text-[#1b1c17] tracking-tight truncate max-w-[200px]">
              {activeTab === 'home'
                ? 'Home'
                : activeTab === 'map'
                ? '지도'
                : activeTab === 'pets'
                ? '펫'
                : '도감'}
            </span>
          </div>

          {/* Header Right Actions */}
          <div className="flex items-center gap-1.5">
            <button
              id="header-settings-btn"
              onClick={() => {
                sfx.playChime(500, 0.2);
                setIsSettingsOpen(true);
              }}
              aria-label="설정"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#434843] hover:text-[#1b1c17] hover:bg-[#efeee5]/50 transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">settings</span>
            </button>
            <button
              id="header-profile-btn"
              onClick={() => {
                sfx.playChime(560, 0.2);
                setIsSettingsOpen(true);
              }}
              aria-label="내 프로필"
              className="w-8 h-8 rounded-full bg-[#4c6150] flex items-center justify-center shadow-[0_2px_6px_rgba(57,58,52,0.08)] active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[#ffffff] text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[430px] mx-auto px-4 sm:px-5 pt-16 pb-24 flex flex-col relative min-h-screen">
        {activeTab === 'home' && (
          <CottageView
            pet={pet}
            setPet={setPet}
            inventory={inventory}
            setInventory={setInventory}
            quest={quest}
            expedition={expedition}
            timeOfDay={timeOfDay}
            onOpenTune={() => setIsTuneOpen(true)}
            onOpenQuest={() => setIsQuestOpen(true)}
            onOpenExpedition={() => setIsExpeditionOpen(true)}
          />
        )}

        {activeTab === 'map' && (
          <ExplorationView
            inventory={inventory}
            setInventory={setInventory}
            onGoHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'pets' && (
          <PetSanctuaryView pet={pet} setPet={setPet} />
        )}

        {activeTab === 'tome' && <TomeView />}
      </main>

      {/* Fixed Bottom Navigation Dock */}
      <nav className="fixed bottom-0 w-full z-40 bg-[#ffffff]/92 backdrop-blur-xl shadow-[0_-2px_12px_rgba(57,58,52,0.05)] border-t border-[#e5dec9]/60">
        <div className="h-16 max-w-[430px] mx-auto px-1 flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-1 py-1 rounded-xl transition-all active:scale-95 ${
                  isActive
                    ? 'text-[#4c6150] font-bold'
                    : 'text-[#434843] hover:text-[#1b1c17]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                <span className="text-[11px] mt-0.5 tracking-tight font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Modals */}
      <TuneModal
        isOpen={isTuneOpen}
        onClose={() => setIsTuneOpen(false)}
        timeOfDay={timeOfDay}
        setTimeOfDay={setTimeOfDay}
        aroma={aroma}
        setAroma={setAroma}
      />

      <QuestModal
        isOpen={isQuestOpen}
        onClose={() => setIsQuestOpen(false)}
        quest={quest}
        setQuest={setQuest}
        setInventory={setInventory}
      />

      <ExpeditionModal
        isOpen={isExpeditionOpen}
        onClose={() => setIsExpeditionOpen(false)}
        expedition={expedition}
        setExpedition={setExpedition}
        setInventory={setInventory}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onResetData={handleResetData}
      />
    </div>
  );
}
