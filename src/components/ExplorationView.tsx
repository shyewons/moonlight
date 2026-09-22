import React, { useState } from 'react';
import { InventoryItem } from '../types';
import { sfx } from '../utils/audio';

interface ExplorationViewProps {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  onGoHome: () => void;
}

export const ExplorationView: React.FC<ExplorationViewProps> = ({
  inventory,
  setInventory,
  onGoHome,
}) => {
  const [foragingLocation, setForagingLocation] = useState<string | null>(null);
  const [forageMessage, setForageMessage] = useState<string | null>(null);

  const locations = [
    {
      id: 'cottage',
      name: '달의 오두막',
      tag: '아늑한 쉼터',
      desc: '구름꼬리가 곤히 잠들어 있는 우리의 따뜻한 둥지',
      icon: 'cottage',
      color: '#4c6150',
      isHome: true,
    },
    {
      id: 'berry_glade',
      name: '열매 공터',
      tag: '풍성한 수확지',
      desc: '햇살을 받아 달콤한 별빛 산딸기가 알알이 영그는 들판',
      icon: 'forest',
      color: '#7e5713',
      reward: '산딸기 2~3개 채집 가능',
    },
    {
      id: 'blue_roof',
      name: '파란 지붕의 집',
      tag: '숲의 우체국',
      desc: '우편 배달부 다람쥐 솔이가 머물며 소식을 전하는 곳',
      icon: 'mail',
      color: '#394b3d',
      reward: '새로운 숲의 편지와 이야기',
    },
    {
      id: 'moon_spring',
      name: '달빛 샘물',
      tag: '청량한 이슬',
      desc: '신비로운 푸른 빛을 내뿜는 맑은 샘터, 깃털 방울을 주울 수 있어요',
      icon: 'water_drop',
      color: '#4e6052',
      reward: '달콤한 이슬풀 & 깃털 방울',
    },
  ];

  const handleForage = (locName: string, locId: string) => {
    if (locId === 'cottage') {
      onGoHome();
      return;
    }

    setForagingLocation(locId);
    sfx.playSparkle();

    setTimeout(() => {
      setForagingLocation(null);
      if (locId === 'berry_glade') {
        const count = 2;
        setInventory((prev) =>
          prev.map((item) =>
            item.id === 'berries' ? { ...item, count: item.count + count } : item
          )
        );
        setForageMessage(`열매 공터에서 신선한 별빛 산딸기 ${count}개를 바구니에 담았습니다!`);
      } else if (locId === 'moon_spring') {
        setInventory((prev) =>
          prev.map((item) => {
            if (item.id === 'feather_bell') return { ...item, count: item.count + 1 };
            if (item.id === 'dew_grass') return { ...item, count: item.count + 2 };
            return item;
          })
        );
        setForageMessage(`달빛 샘물에서 맑은 이슬풀과 깃털 방울 1개를 건져 올렸습니다!`);
      } else {
        setForageMessage(`파란 지붕의 집 솔이에게 따뜻한 도토리 차 한 잔을 대접받았습니다.`);
      }

      setTimeout(() => setForageMessage(null), 3000);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full pb-6 gap-3.5 animate-in fade-in">
      {/* Toast message */}
      {forageMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#30312b] text-[#f2f1e8] px-4 py-2 rounded-full shadow-lg text-xs font-medium flex items-center gap-1.5 animate-bounce">
          <span className="material-symbols-outlined text-[16px] text-[#fec97b]">check_circle</span>
          <span>{forageMessage}</span>
        </div>
      )}

      {/* Header Card */}
      <div className="bg-[#f5f4eb] rounded-xl p-3.5 shadow-sm border border-[#e5dec9]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7e5713] text-[20px]">explore</span>
            <h2 className="font-['Literata',serif] font-bold text-[18px] text-[#1b1c17]">
              숲과 마을 지도
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-[#4c6150] bg-[#d1e9d3] px-2 py-0.5 rounded-full">
            탐험 및 산책
          </span>
        </div>
        <p className="text-[12px] text-[#434843] mt-1">
          구름꼬리와 함께 거닐 수 있는 솔바람 숲의 비밀스러운 장소들입니다.
        </p>
      </div>

      {/* Locations Grid */}
      <div className="flex flex-col gap-2.5">
        {locations.map((loc) => {
          const isBusy = foragingLocation === loc.id;
          return (
            <div
              key={loc.id}
              className="bg-[#ffffff] rounded-xl p-3.5 shadow-sm border border-[#e5dec9] flex flex-col gap-2 transition-all hover:border-[#718775]/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[#ffffff]"
                    style={{ backgroundColor: loc.color }}
                  >
                    <span className="material-symbols-outlined text-[20px]">{loc.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-[14px] text-[#1b1c17]">{loc.name}</h3>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full font-semibold bg-[#efeee5] text-[#434843]">
                        {loc.tag}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#737872] mt-0.5">{loc.desc}</p>
                  </div>
                </div>
              </div>

              {loc.reward && (
                <div className="bg-[#f5f4eb] px-2.5 py-1.5 rounded-lg text-[11px] text-[#7e5713] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">eco</span>
                  <span>{loc.reward}</span>
                </div>
              )}

              <button
                onClick={() => handleForage(loc.name, loc.id)}
                disabled={isBusy}
                className={`w-full mt-1 py-2 rounded-xl text-[12px] font-bold transition-all flex items-center justify-center gap-1.5 ${
                  loc.isHome
                    ? 'bg-[#4c6150] text-[#ffffff] hover:bg-[#3d4f40]'
                    : 'bg-[#ffddb1] text-[#291800] hover:bg-[#fec97b]'
                } active:scale-98`}
              >
                {isBusy ? (
                  <>
                    <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
                    <span>채집 및 산책 중...</span>
                  </>
                ) : loc.isHome ? (
                  <>
                    <span className="material-symbols-outlined text-[16px]">cottage</span>
                    <span>오두막으로 돌아가기</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">hiking</span>
                    <span>이곳으로 산책 떠나기</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
