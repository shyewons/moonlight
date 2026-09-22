import React, { useState } from 'react';
import { PetStatus } from '../types';
import { sfx } from '../utils/audio';

interface PetSanctuaryViewProps {
  pet: PetStatus;
  setPet: React.Dispatch<React.SetStateAction<PetStatus>>;
}

export const PetSanctuaryView: React.FC<PetSanctuaryViewProps> = ({ pet, setPet }) => {
  const [accessory, setAccessory] = useState<'none' | 'bell' | 'flower'>('flower');
  const [careMessage, setCareMessage] = useState<string | null>(null);

  const showMsg = (msg: string) => {
    setCareMessage(msg);
    setTimeout(() => setCareMessage(null), 2500);
  };

  const handleBrush = () => {
    sfx.playPurr();
    setPet((prev) => ({
      ...prev,
      bond: Math.min(100, prev.bond + 3),
      happiness: Math.min(100, prev.happiness + 5),
    }));
    showMsg('부드러운 빗으로 등 뒤의 구름털을 빗겨주었습니다. (친밀도 +3, 기쁨 +5)');
  };

  const handleLullaby = () => {
    sfx.playSparkle();
    setPet((prev) => ({
      ...prev,
      energyDots: Math.min(4, prev.energyDots + 1),
      happiness: Math.min(100, prev.happiness + 4),
    }));
    showMsg('다정한 자장가 멜로디에 구름꼬리가 기분 좋게 웅크립니다. (에너지 회복)');
  };

  return (
    <div className="flex flex-col w-full pb-6 gap-3.5 animate-in fade-in">
      {careMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#30312b] text-[#f2f1e8] px-4 py-2 rounded-full shadow-lg text-xs font-medium flex items-center gap-1.5 animate-bounce">
          <span className="material-symbols-outlined text-[16px] text-[#fec97b]">favorite</span>
          <span>{careMessage}</span>
        </div>
      )}

      {/* Pet Profile Header Card */}
      <div className="bg-[#f5f4eb] rounded-xl p-3.5 shadow-sm border border-[#e5dec9]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4c6150] text-[20px]">pets</span>
            <h2 className="font-['Literata',serif] font-bold text-[18px] text-[#1b1c17]">
              반려 솜용 돌보기
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-[#7e5713] bg-[#ffddb1] px-2 py-0.5 rounded-full">
            Lv. 1 어린 솜용
          </span>
        </div>
      </div>

      {/* Portrait & Stats */}
      <div className="bg-[#ffffff] rounded-xl p-4 shadow-sm border border-[#e5dec9] flex flex-col gap-3.5">
        <div className="flex items-center gap-3.5">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#efeee5] border border-[#e5dec9] flex-shrink-0 relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-LCqReguHaIZT-RNFytSKU48I8KzHNnhOFsIfwavJGYEpSAfAh0bL_ymEwA-EsBQUohF99FT77XYzQjvMqAq_FNskFIMmcRLEdQ33sF45jUg1PAj-tRNRihKbPNtHgJfbQ20yOI4WUacDQSg9IHOCmkqQZ9SklOQWPdM12JUmYvf_wZRYBRqXNuP3DcJ7nkbgyNs2x8rHA82RogZo5SmG6MqAPPgfxNsAV8fv6XGeYdv6P6KIUh7W"
              alt="구름꼬리 프로필"
              className="w-full h-full object-cover"
            />
            {accessory === 'flower' && (
              <span className="absolute top-1 right-1 text-[14px]">🌸</span>
            )}
            {accessory === 'bell' && (
              <span className="absolute top-1 right-1 text-[14px]">🔔</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-['Literata',serif] font-bold text-[16px] text-[#1b1c17]">
                {pet.name}
              </h3>
              <span className="text-[11px] text-[#4c6150] font-semibold bg-[#d1e9d3] px-1.5 py-0.2 rounded">
                솜용 종족
              </span>
            </div>
            <p className="text-[12px] text-[#737872] mt-0.5">
              하늘 구름 솜털과 따뜻한 체온을 지닌 신비로운 새끼 드래곤
            </p>
            <div className="mt-1.5 flex items-center gap-2 text-[11px] text-[#7e5713]">
              <span className="font-semibold">기분: {pet.mood}</span>
              <span>•</span>
              <span className="font-semibold">{pet.tag}</span>
            </div>
          </div>
        </div>

        {/* Vitals Progress Bars */}
        <div className="flex flex-col gap-2 pt-2 border-t border-[#e5dec9]/60">
          <div>
            <div className="flex justify-between text-[11px] font-semibold text-[#434843] mb-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#7e5713]">favorite</span>
                교감 친밀도
              </span>
              <span>{pet.bond} / 100</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#efeee5] overflow-hidden">
              <div
                className="h-full bg-[#7e5713] rounded-full transition-all duration-300"
                style={{ width: `${pet.bond}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-semibold text-[#434843] mb-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#4c6150]">spa</span>
                포근함과 행복
              </span>
              <span>{pet.happiness} / 100</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#efeee5] overflow-hidden">
              <div
                className="h-full bg-[#4c6150] rounded-full transition-all duration-300"
                style={{ width: `${pet.happiness}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-semibold text-[#434843] mb-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#7e5713]">bakery_dining</span>
                배부름
              </span>
              <span>{pet.fullness} / 100</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#efeee5] overflow-hidden">
              <div
                className="h-full bg-[#fec97b] rounded-full transition-all duration-300"
                style={{ width: `${pet.fullness}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gentle Care Actions */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={handleBrush}
          className="bg-[#ffffff] hover:bg-[#f5f4eb] active:scale-98 p-3 rounded-xl border border-[#e5dec9] shadow-xs flex flex-col items-center justify-center gap-1 transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-[#d1e9d3] flex items-center justify-center text-[#0c1f13]">
            <span className="material-symbols-outlined text-[20px]">brush</span>
          </div>
          <span className="text-[13px] font-bold text-[#1b1c17]">솜털 빗질하기</span>
          <span className="text-[11px] text-[#4c6150]">포근함 증대</span>
        </button>

        <button
          onClick={handleLullaby}
          className="bg-[#ffffff] hover:bg-[#f5f4eb] active:scale-98 p-3 rounded-xl border border-[#e5dec9] shadow-xs flex flex-col items-center justify-center gap-1 transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-[#ffddb1] flex items-center justify-center text-[#291800]">
            <span className="material-symbols-outlined text-[20px]">music_note</span>
          </div>
          <span className="text-[13px] font-bold text-[#1b1c17]">자장가 불러주기</span>
          <span className="text-[11px] text-[#7e5713]">에너지 낮잠 유도</span>
        </button>
      </div>

      {/* Accessory Dressing */}
      <div className="bg-[#ffffff] rounded-xl p-3.5 shadow-sm border border-[#e5dec9]">
        <p className="text-[12px] font-bold text-[#4c6150] mb-2 flex items-center gap-1">
          <span className="material-symbols-outlined text-[15px]">styler</span>
          구름꼬리 머리 장식하기
        </p>
        <div className="flex gap-2">
          {[
            { id: 'flower', name: '숲의 산딸기 꽃관', icon: '🌸' },
            { id: 'bell', name: '은빛 바람방울', icon: '🔔' },
            { id: 'none', name: '자연 그대로', icon: '🍃' },
          ].map((acc) => (
            <button
              key={acc.id}
              onClick={() => {
                sfx.playChime(600, 0.2);
                setAccessory(acc.id as 'none' | 'bell' | 'flower');
              }}
              className={`flex-1 py-2 px-1.5 rounded-xl border text-center transition-all text-[11px] font-bold flex flex-col items-center gap-1 ${
                accessory === acc.id
                  ? 'bg-[#d1e9d3] border-[#4c6150] text-[#0c1f13]'
                  : 'bg-[#f5f4eb] border-[#e5dec9] text-[#434843] hover:bg-[#efeee5]'
              }`}
            >
              <span className="text-[16px]">{acc.icon}</span>
              <span>{acc.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
