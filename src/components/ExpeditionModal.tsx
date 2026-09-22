import React, { useState } from 'react';
import { Expedition, InventoryItem } from '../types';
import { sfx } from '../utils/audio';

interface ExpeditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  expedition: Expedition;
  setExpedition: React.Dispatch<React.SetStateAction<Expedition>>;
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}

export const ExpeditionModal: React.FC<ExpeditionModalProps> = ({
  isOpen,
  onClose,
  expedition,
  setExpedition,
  setInventory,
}) => {
  const [collected, setCollected] = useState(false);

  if (!isOpen) return null;

  const handleCollect = () => {
    sfx.playSparkle();
    setCollected(true);

    // Give 2 berries and 1 feather bell
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === 'berries') {
          return { ...item, count: item.count + 2 };
        }
        if (item.id === 'feather_bell') {
          return { ...item, count: item.count + 1 };
        }
        return item;
      })
    );

    setExpedition((prev) => ({
      ...prev,
      progressPercent: 20,
      statusText: "밤빛 솔이가 새로운 '이슬 계곡'으로 산책을 떠났습니다.",
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#fbfaf1] w-full max-w-[390px] rounded-2xl p-5 shadow-xl border border-[#e5dec9] text-[#1b1c17] relative">
        <div className="flex items-center justify-between pb-3 border-b border-[#e5dec9]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7e5713] text-[22px]">explore</span>
            <h2 className="font-['Literata',serif] font-bold text-[18px]">동반자 산책 소식</h2>
          </div>
          <button
            onClick={() => {
              sfx.playChime(480, 0.2);
              onClose();
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#737872] hover:bg-[#efeee5] transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-3.5">
          {/* Companion card */}
          <div className="bg-[#ffffff] p-3.5 rounded-xl border border-[#e5dec9] shadow-xs flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#fec97b]/40 border border-[#d4a359]/30 flex items-center justify-center text-[#7e5713]">
              <span className="material-symbols-outlined text-[24px]">forest</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[14px] text-[#1b1c17]">{expedition.companion}</span>
                <span className="bg-[#d3e8d5] text-[#0e1f14] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  산책 중
                </span>
              </div>
              <p className="text-[12px] text-[#737872]">탐험 지역: {expedition.location}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-[#ffffff] p-3 rounded-xl border border-[#e5dec9]">
            <div className="flex justify-between text-[11px] font-semibold text-[#434843] mb-1.5">
              <span>산책 및 채집 진행도</span>
              <span>{expedition.progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#efeee5] overflow-hidden">
              <div
                className="h-full bg-[#7e5713] rounded-full transition-all duration-500"
                style={{ width: `${expedition.progressPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-[#737872] mt-2 italic">
              "바스락바스락... 수풀 사이에서 잘 익은 산딸기와 반짝이는 깃털을 발견했어요!"
            </p>
          </div>

          {/* Found items list */}
          <div className="bg-[#f5f4eb] p-3 rounded-xl border border-[#e5dec9]">
            <p className="text-[11px] font-bold text-[#4c6150] mb-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">backpack</span>
              솔이의 도토리 보따리 속 수집품
            </p>
            <ul className="flex flex-col gap-1.5">
              {expedition.foundItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-1.5 text-[12px] text-[#434843]">
                  <span className="text-[#7e5713] text-[14px]">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Collect button */}
          {!collected ? (
            <button
              onClick={handleCollect}
              className="w-full py-2.5 bg-[#7e5713] text-[#ffffff] rounded-xl font-bold text-[13px] hover:bg-[#614000] transition-colors shadow-xs flex items-center justify-center gap-1.5 active:scale-98"
            >
              <span className="material-symbols-outlined text-[16px]">redeem</span>
              수집품 오두막 바구니에 담기
            </button>
          ) : (
            <div className="w-full py-2 bg-[#d1e9d3] text-[#0c1f13] rounded-xl font-bold text-[12px] text-center">
              ✓ 오두막 바구니로 보따리를 챙겨왔습니다!
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-3 py-2 bg-[#efeee5] text-[#434843] rounded-xl font-bold text-[12px] hover:bg-[#e4e3da] transition-colors"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
