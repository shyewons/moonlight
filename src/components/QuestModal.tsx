import React from 'react';
import { Quest, InventoryItem } from '../types';
import { sfx } from '../utils/audio';

interface QuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  quest: Quest;
  setQuest: React.Dispatch<React.SetStateAction<Quest>>;
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}

export const QuestModal: React.FC<QuestModalProps> = ({
  isOpen,
  onClose,
  quest,
  setQuest,
  setInventory,
}) => {
  if (!isOpen) return null;

  const handleComplete = () => {
    sfx.playSparkle();
    setQuest((prev) => ({ ...prev, completed: true }));
    // Add reward berries to inventory
    setInventory((prev) =>
      prev.map((item) =>
        item.id === 'berries' ? { ...item, count: item.count + quest.reward.count } : item
      )
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#fbfaf1] w-full max-w-[390px] rounded-2xl p-5 shadow-xl border border-[#e5dec9] text-[#1b1c17] relative">
        <div className="flex items-center justify-between pb-3 border-b border-[#e5dec9]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4c6150] text-[22px]">menu_book</span>
            <h2 className="font-['Literata',serif] font-bold text-[18px]">{quest.title}</h2>
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

        <div className="mt-4 flex flex-col gap-3">
          <div className="bg-[#ffffff] p-3.5 rounded-xl border border-[#e5dec9] shadow-xs">
            <div className="flex items-center justify-between text-[11px] text-[#737872] mb-1.5">
              <span className="flex items-center gap-1 font-semibold text-[#7e5713]">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                {quest.location}
              </span>
              <span className="font-semibold text-[#4c6150]">만날 친구: {quest.npc}</span>
            </div>
            <p className="text-[13px] text-[#434843] leading-relaxed">{quest.detail}</p>
          </div>

          {/* Letter / Dialogue Box */}
          <div className="bg-[#f5f4eb] p-3 rounded-xl border border-[#e5dec9]">
            <p className="text-[11px] font-bold text-[#7e5713] mb-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">mail</span>
              우편 배달부 솔이의 쪽지
            </p>
            <p className="text-[12px] text-[#434843] italic leading-normal">
              "달의 오두막에 새끼 솜용이 찾아왔다는 소문을 들었어요! 오두막 창가에 둘 달콤한 산딸기 한 바구니를 전해드려요."
            </p>
          </div>

          {/* Quest Reward */}
          <div className="bg-[#ffddb1]/30 p-2.5 rounded-xl border border-[#d4a359]/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#7e5713] text-[20px]">card_giftcard</span>
              <div>
                <span className="text-[11px] text-[#7e5713] font-bold block">여정 완료 보상</span>
                <span className="text-[12px] font-bold text-[#1b1c17]">{quest.reward.item} +{quest.reward.count}개</span>
              </div>
            </div>
            {quest.completed ? (
              <span className="bg-[#d1e9d3] text-[#0c1f13] text-[11px] px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check</span>
                수령 완료
              </span>
            ) : (
              <button
                onClick={handleComplete}
                className="bg-[#7e5713] text-[#ffffff] text-[12px] px-3 py-1.5 rounded-xl font-bold hover:bg-[#614000] active:scale-95 transition-all shadow-xs"
              >
                안부 전하고 받기
              </button>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 bg-[#4c6150] text-[#ffffff] rounded-xl font-bold text-[13px] hover:bg-[#3d4f40] transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
};
