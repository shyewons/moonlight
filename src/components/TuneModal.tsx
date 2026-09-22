import React from 'react';
import { TimeOfDay } from '../types';
import { sfx } from '../utils/audio';

interface TuneModalProps {
  isOpen: boolean;
  onClose: () => void;
  timeOfDay: TimeOfDay;
  setTimeOfDay: (time: TimeOfDay) => void;
  aroma: string;
  setAroma: (aroma: string) => void;
}

export const TuneModal: React.FC<TuneModalProps> = ({
  isOpen,
  onClose,
  timeOfDay,
  setTimeOfDay,
  aroma,
  setAroma,
}) => {
  if (!isOpen) return null;

  const times: { id: TimeOfDay; title: string; desc: string; icon: string }[] = [
    { id: 'morning', title: '아침 이슬 햇살', desc: '새들의 지저귐과 맑은 바람', icon: 'wb_sunny' },
    { id: 'afternoon', title: '따스한 오후 햇살', desc: '나른하고 포근한 솜용의 낮잠 시간', icon: 'sunny' },
    { id: 'sunset', title: '황금빛 노을빛', desc: '창틀을 물들이는 부드러운 호박빛', icon: 'wb_twilight' },
    { id: 'night', title: '별빛 쏟아지는 밤', desc: '고요한 초승달과 은하수', icon: 'bedtime' },
  ];

  const aromas = [
    { name: '달콤한 산딸기 꽃향', icon: 'eco', note: '구름꼬리가 가장 좋아하는 상큼달콤한 향기' },
    { name: '말린 솔잎과 모닥불 향', icon: 'local_fire_department', note: '마음이 차분해지는 따뜻한 숲의 온기' },
    { name: '은은한 캐모마일 허브차', icon: 'emoji_food_beverage', note: '나른한 휴식을 부르는 포근한 꽃차 향' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#fbfaf1] w-full max-w-[390px] rounded-2xl p-5 shadow-xl border border-[#e5dec9] text-[#1b1c17] relative">
        <div className="flex items-center justify-between pb-3 border-b border-[#e5dec9]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7e5713] text-[22px]">tune</span>
            <h2 className="font-['Literata',serif] font-bold text-[18px]">오두막 환경 설정</h2>
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

        {/* Time of day selection */}
        <div className="mt-4">
          <p className="text-[12px] font-bold text-[#4c6150] mb-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">schedule</span>
            창밖 풍경과 햇살
          </p>
          <div className="grid grid-cols-2 gap-2">
            {times.map((t) => {
              const active = timeOfDay === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    sfx.playChime(active ? 500 : 600, 0.25);
                    setTimeOfDay(t.id);
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all flex flex-col gap-1 ${
                    active
                      ? 'bg-[#d1e9d3]/40 border-[#4c6150] text-[#0c1f13] shadow-xs'
                      : 'bg-[#ffffff] border-[#e5dec9] text-[#434843] hover:bg-[#f5f4eb]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#7e5713]">
                      {t.icon}
                    </span>
                    <span className="text-[12px] font-bold">{t.title}</span>
                  </div>
                  <span className="text-[10px] text-[#737872] line-clamp-1">{t.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Incense / Herbal Aroma */}
        <div className="mt-4">
          <p className="text-[12px] font-bold text-[#4c6150] mb-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">spa</span>
            오두막에 피운 은은한 향
          </p>
          <div className="flex flex-col gap-1.5">
            {aromas.map((a) => {
              const active = aroma === a.name;
              return (
                <button
                  key={a.name}
                  onClick={() => {
                    sfx.playChime(560, 0.2);
                    setAroma(a.name);
                  }}
                  className={`px-3 py-2 rounded-xl text-left border flex items-center justify-between transition-all ${
                    active
                      ? 'bg-[#ffddb1]/35 border-[#7e5713] text-[#291800]'
                      : 'bg-[#ffffff] border-[#e5dec9] text-[#434843] hover:bg-[#f5f4eb]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#7e5713]">
                      {a.icon}
                    </span>
                    <div>
                      <p className="text-[12px] font-bold">{a.name}</p>
                      <p className="text-[10px] text-[#737872]">{a.note}</p>
                    </div>
                  </div>
                  {active && (
                    <span className="material-symbols-outlined text-[#7e5713] text-[18px]">
                      check_circle
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Confirm */}
        <button
          onClick={() => {
            sfx.playSparkle();
            onClose();
          }}
          className="w-full mt-5 py-2.5 bg-[#4c6150] text-[#ffffff] rounded-xl font-bold text-[13px] hover:bg-[#3d4f40] transition-colors shadow-sm"
        >
          오두막에 적용하기
        </button>
      </div>
    </div>
  );
};
