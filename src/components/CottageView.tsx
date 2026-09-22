import React, { useState } from 'react';
import { PetStatus, InventoryItem, Quest, Expedition, TimeOfDay } from '../types';
import { sfx } from '../utils/audio';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  scale: number;
}

interface CottageViewProps {
  pet: PetStatus;
  setPet: React.Dispatch<React.SetStateAction<PetStatus>>;
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  quest: Quest;
  expedition: Expedition;
  timeOfDay: TimeOfDay;
  onOpenTune: () => void;
  onOpenQuest: () => void;
  onOpenExpedition: () => void;
}

export const CottageView: React.FC<CottageViewProps> = ({
  pet,
  setPet,
  inventory,
  setInventory,
  quest,
  expedition,
  timeOfDay,
  onOpenTune,
  onOpenQuest,
  onOpenExpedition,
}) => {
  const [currentDialogue, setCurrentDialogue] = useState<string>(
    '"주인님, 창틀에 놓아둔 열매 꽃향기가 참 달콤해요. 오늘은 어디로 나들이 가나요?"'
  );
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [isPetting, setIsPetting] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const berries = inventory.find((i) => i.id === 'berries')?.count ?? 0;
  const bells = inventory.find((i) => i.id === 'feather_bell')?.count ?? 0;

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => {
      setActionNotice(null);
    }, 2400);
  };

  const triggerHeartBurst = (e?: React.MouseEvent) => {
    sfx.playSparkle();
    const newHearts: FloatingHeart[] = [];
    for (let i = 0; i < 4; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 60,
        y: -10 - Math.random() * 40,
        scale: 0.8 + Math.random() * 0.5,
      });
    }
    setHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 1200);
  };

  const handlePetDragon = (e: React.MouseEvent) => {
    setIsPetting(true);
    triggerHeartBurst(e);
    sfx.playPurr();

    const petLines = [
      '"손길이 닿을 때마다 솜털이 퐁실퐁실 피어오르는 기분이에요..."',
      '"그릉그릉... 주인님의 따뜻한 손바닥이 세상에서 제일 좋아요."',
      '"헤헤, 턱 밑을 긁어주시면 기분 좋아서 잠이 솔솔 와요."',
      '"주인님 곁에 있으면 언제나 마음이 봄날처럼 따뜻해요."',
    ];
    const line = petLines[Math.floor(Math.random() * petLines.length)];
    setCurrentDialogue(line);

    setPet((prev) => ({
      ...prev,
      bond: Math.min(100, prev.bond + 2),
      happiness: Math.min(100, prev.happiness + 3),
      mood: '행복에 포근함',
    }));

    setTimeout(() => setIsPetting(false), 500);
  };

  const handleTalk = () => {
    triggerHeartBurst();
    const talkLines = [
      '"오늘 밤하늘엔 반달이 제일 예쁘게 뜰 거래요. 밤 산책도 함께해 주실 거죠?"',
      '"따뜻한 차 한 잔 하실래요? 창가에 달콤한 풀잎을 우려두었어요."',
      '"바깥 숲에서 방울새가 노래를 불러요. 같이 들으러 가요!"',
      '"후아암... 졸리면 언제든 구름꼬리의 폭신한 털을 베고 누우셔도 돼요."',
      '"주인님과 이야기할 때가 하루 중 가장 소중한 시간이에요."',
    ];
    const randomLine = talkLines[Math.floor(Math.random() * talkLines.length)];
    setCurrentDialogue(randomLine);

    setPet((prev) => ({
      ...prev,
      bond: Math.min(100, prev.bond + 1),
    }));
    showNotice('구름꼬리와 정답게 교감을 나누었습니다 (+1 친밀도)');
  };

  const handleFeed = () => {
    if (berries <= 0) {
      setCurrentDialogue('"우웅... 바구니에 산딸기가 다 떨어졌나 봐요. 탐험에서 조금 따와 주실 수 있나요?"');
      showNotice('산딸기가 부족합니다! 지도에서 탐험해보세요.');
      return;
    }

    triggerHeartBurst();
    sfx.playSparkle();

    setInventory((prev) =>
      prev.map((item) => (item.id === 'berries' ? { ...item, count: item.count - 1 } : item))
    );

    setPet((prev) => ({
      ...prev,
      fullness: Math.min(100, prev.fullness + 12),
      happiness: Math.min(100, prev.happiness + 8),
      bond: Math.min(100, prev.bond + 2),
      energyDots: Math.min(4, prev.energyDots + 1),
    }));

    setCurrentDialogue('"오물오물... 달콤한 별빛 산딸기예요! 꼬리가 기분 좋게 둥실 떠올라요!"');
    showNotice('달콤한 산딸기를 먹였습니다! (포근함 +12, 에너지 충전)');
  };

  const handlePlay = () => {
    if (bells <= 0) {
      setCurrentDialogue('"깃털 방울이 어디 갔지? 방울을 찾아주시면 신나게 잡기 놀이 할래요!"');
      showNotice('깃털 방울이 없습니다.');
      return;
    }

    triggerHeartBurst();
    sfx.playChime(640, 0.4);

    setPet((prev) => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 15),
      bond: Math.min(100, prev.bond + 3),
      energyDots: Math.max(1, prev.energyDots - 1),
    }));

    setCurrentDialogue('"방울이 짤랑짤랑! 제가 솜발로 톡 쳐볼게요, 놓치지 마세요!"');
    showNotice('깃털 방울로 신나게 놀아주었습니다! (기쁨 +15)');
  };

  const timeLabel =
    timeOfDay === 'morning'
      ? '상쾌한 아침 이슬'
      : timeOfDay === 'afternoon'
      ? '따스한 오후 햇살'
      : timeOfDay === 'sunset'
      ? '황금빛 노을빛'
      : '별빛 쏟아지는 밤';

  return (
    <div className="flex flex-col w-full pb-6 gap-3.5">
      {/* Action Notification Toast */}
      {actionNotice && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#30312b] text-[#f2f1e8] px-4 py-2 rounded-full shadow-lg text-xs font-medium flex items-center gap-1.5 animate-bounce">
          <span className="material-symbols-outlined text-[16px] text-[#fec97b]">sparkles</span>
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Top Location & Pet Header Card */}
      <div className="bg-[#f5f4eb] rounded-xl p-3.5 shadow-sm flex items-center justify-between border border-[#e5dec9]/60">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#7e5713] text-[18px]">cottage</span>
            <span className="font-['Literata',serif] font-semibold text-[18px] text-[#1b1c17] truncate">
              달의 오두막
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-[#434843]">
            <span className="text-[11px] font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#4c6150]">pets</span>
              구름꼬리 솜용
            </span>
            <span className="text-[#c3c8c1] text-[10px]">●</span>
            <span className="text-[11px] font-semibold flex items-center gap-1 text-[#7e5713]">
              <span className="material-symbols-outlined text-[14px]">
                {timeOfDay === 'night' ? 'bedtime' : 'sunny'}
              </span>
              {timeLabel}
            </span>
          </div>
        </div>
        <button
          id="btn-cottage-tune"
          aria-label="오두막 환경 설정"
          onClick={onOpenTune}
          className="w-9 h-9 rounded-full bg-[#ffffff] border border-[#e5dec9] flex items-center justify-center text-[#434843] shadow-sm hover:bg-[#fbfaf1] active:scale-95 transition-transform"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
        </button>
      </div>

      {/* Central Visual Area: Picture Book Window & Cloudtail Dragon */}
      <div
        className="relative w-full rounded-xl overflow-hidden shadow-sm bg-[#efeee5] aspect-[4/3] flex flex-col justify-end group cursor-pointer border border-[#e5dec9]"
        onClick={handlePetDragon}
        title="구름꼬리를 살포시 쓰다듬어 보세요"
      >
        {/* Visual Scene Image Hotlinked */}
        <img
          className={`absolute inset-0 w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ${
            isPetting ? 'scale-105' : 'scale-100'
          }`}
          alt="따뜻한 나무 오두막 창가에서 포근히 잠든 어린 구름꼬리 솜용 수채화 일러스트"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-LCqReguHaIZT-RNFytSKU48I8KzHNnhOFsIfwavJGYEpSAfAh0bL_ymEwA-EsBQUohF99FT77XYzQjvMqAq_FNskFIMmcRLEdQ33sF45jUg1PAj-tRNRihKbPNtHgJfbQ20yOI4WUacDQSg9IHOCmkqQZ9SklOQWPdM12JUmYvf_wZRYBRqXNuP3DcJ7nkbgyNs2x8rHA82RogZo5SmG6MqAPPgfxNsAV8fv6XGeYdv6P6KIUh7W"
        />

        {/* Ambient Gradient Scrim for Warm Atmosphere */}
        <div
          className={`absolute inset-0 transition-colors duration-500 pointer-events-none ${
            timeOfDay === 'night'
              ? 'bg-[#1a2238]/40'
              : timeOfDay === 'sunset'
              ? 'bg-[#e07a5f]/20'
              : 'bg-gradient-to-t from-[#30312b]/40 via-transparent to-transparent'
          }`}
        />

        {/* Subtle breathing glow */}
        <div className="absolute inset-0 pointer-events-none bg-radial from-amber-100/10 via-transparent to-transparent opacity-60" />

        {/* Petting prompt tooltip when hovering/touching */}
        <div className="absolute top-2.5 right-2.5 z-10 bg-[#ffffff]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-medium text-[#434843] flex items-center gap-1 shadow-sm opacity-90">
          <span className="material-symbols-outlined text-[12px] text-[#4c6150]">touch_app</span>
          <span>톡 건드려 쓰다듬기</span>
        </div>

        {/* Floating Heart Burst Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {hearts.map((heart) => (
            <span
              key={heart.id}
              className="material-symbols-outlined text-[#7e5713] absolute bottom-12 right-6 text-[22px] transition-all duration-700 ease-out select-none"
              style={{
                fontVariationSettings: "'FILL' 1",
                transform: `translate(${heart.x}px, ${heart.y}px) scale(${heart.scale})`,
                opacity: 0,
                animation: 'fadeFloat 0.9s forwards ease-out',
              }}
            >
              favorite
            </span>
          ))}
        </div>

        {/* Pet Status Badge Floating on Visual */}
        <div className="relative z-10 p-3 flex justify-between items-end">
          <div className="bg-[#ffffff]/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-[#e5dec9]/60">
            <span
              className="material-symbols-outlined text-[#4c6150] text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              spa
            </span>
            <span className="text-[11px] font-semibold text-[#1b1c17]">{pet.mood}</span>
            <span className="bg-[#ffddb1] text-[#291800] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {pet.tag}
            </span>
          </div>

          {/* Whimsical Interactive Hint / Heart Button */}
          <div className="relative" id="heartBurstSlot">
            <button
              id="btn-pet-heart"
              aria-label="구름꼬리 교감하기"
              onClick={(e) => {
                e.stopPropagation();
                handlePetDragon(e);
              }}
              className="w-8 h-8 rounded-full bg-[#ffffff]/95 backdrop-blur-sm text-[#7e5713] border border-[#e5dec9] flex items-center justify-center shadow-sm active:scale-90 transition-transform hover:bg-[#ffffff]"
              type="button"
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Dialogue & Narrative Card */}
      <div className="bg-[#ffffff] rounded-xl p-3.5 shadow-sm relative border border-[#e5dec9]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-['Literata',serif] font-semibold text-[18px] text-[#1b1c17]">
            {pet.name}
          </span>
          <span className="text-[11px] font-semibold text-[#4c6150] flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[13px]">arrow_back_ios_new</span>
            {pet.title}
          </span>
        </div>
        <p
          id="dialogueText"
          className="text-[14px] leading-relaxed text-[#434843] min-h-[44px] transition-all"
        >
          {currentDialogue}
        </p>

        {/* Subtle Pet Whispers / Thoughts Bar */}
        <div className="mt-3 pt-2.5 flex items-center justify-between text-[#737872] border-t border-[#e5dec9]/50">
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#434843]/85">
            <span className="material-symbols-outlined text-[15px] text-[#7e5713]">wb_twilight</span>
            <span>{pet.napStatus}</span>
          </div>
          <div className="flex items-center gap-1" title={`에너지: ${pet.energyDots}/4`}>
            {[1, 2, 3, 4].map((dot) => (
              <span
                key={dot}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  dot <= pet.energyDots ? 'bg-[#4c6150]' : 'bg-[#c3c8c1]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Cozy Actions */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Action 1: Talk */}
        <button
          id="actionTalk"
          onClick={handleTalk}
          className="bg-[#ffffff] hover:bg-[#f5f4eb] active:scale-98 rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-sm transition-all border border-[#e5dec9]"
          type="button"
        >
          <div className="w-10 h-10 rounded-full bg-[#d1e9d3] flex items-center justify-center text-[#0c1f13]">
            <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
          </div>
          <span className="text-[13px] font-bold text-[#1b1c17]">이야기하기</span>
          <span className="text-[11px] font-semibold text-[#4c6150]">교감 나누기</span>
        </button>

        {/* Action 2: Feed */}
        <button
          id="actionFeed"
          onClick={handleFeed}
          className="bg-[#ffffff] hover:bg-[#f5f4eb] active:scale-98 rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-sm transition-all border border-[#e5dec9]"
          type="button"
        >
          <div className="w-10 h-10 rounded-full bg-[#ffddb1] flex items-center justify-center text-[#291800]">
            <span className="material-symbols-outlined text-[20px]">bakery_dining</span>
          </div>
          <span className="text-[13px] font-bold text-[#1b1c17]">먹이 주기</span>
          <span className="text-[11px] font-semibold text-[#7e5713] flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[12px]">eco</span>
            산딸기 {berries}개
          </span>
        </button>

        {/* Action 3: Play */}
        <button
          id="actionPlay"
          onClick={handlePlay}
          className="bg-[#ffffff] hover:bg-[#f5f4eb] active:scale-98 rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 shadow-sm transition-all border border-[#e5dec9]"
          type="button"
        >
          <div className="w-10 h-10 rounded-full bg-[#d3e8d5] flex items-center justify-center text-[#0e1f14]">
            <span className="material-symbols-outlined text-[20px]">toys</span>
          </div>
          <span className="text-[13px] font-bold text-[#1b1c17]">놀아주기</span>
          <span className="text-[11px] font-semibold text-[#4e6052] flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[12px]">sports_volleyball</span>
            깃털 방울 {bells}개
          </span>
        </button>
      </div>

      {/* Auxiliary Story & Expedition Feeds */}
      <div className="flex flex-col gap-2">
        {/* Tutorial / Quest Guide Card */}
        <div
          id="card-quest-guide"
          onClick={onOpenQuest}
          className="bg-[#f5f4eb] hover:bg-[#efeee5] rounded-xl px-3.5 py-3 shadow-sm flex items-center gap-3 cursor-pointer active:scale-98 transition-all border border-[#e5dec9]"
        >
          <div className="w-7 h-7 rounded-full bg-[#4c6150] text-[#ffffff] flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[16px]">menu_book</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-[11px] font-bold text-[#4c6150]">{quest.title}</p>
              {quest.completed && (
                <span className="bg-[#d1e9d3] text-[#0c1f13] text-[9px] px-1 rounded font-bold">완료</span>
              )}
            </div>
            <p className="text-[12px] text-[#434843] truncate">{quest.summary}</p>
          </div>
          <span className="material-symbols-outlined text-[#c3c8c1] text-[18px] flex-shrink-0">
            chevron_right
          </span>
        </div>

        {/* Auto Exploration Companion Feed Banner */}
        <div
          id="banner-expedition-feed"
          onClick={onOpenExpedition}
          className="bg-[#fec97b]/40 hover:bg-[#fec97b]/55 rounded-xl px-3.5 py-2.5 shadow-sm flex items-center gap-2.5 cursor-pointer active:scale-98 transition-transform border border-[#d4a359]/30"
        >
          <div className="w-2 h-2 rounded-full bg-[#7e5713] animate-pulse flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-[11px] text-[#78520e]">
              {expedition.companion}이 <strong>'{expedition.location}'</strong>를 샅샅이 산책 중입니다 (눌러서 소식 확인)
            </span>
          </div>
          <span className="material-symbols-outlined text-[#78520e] text-[16px] flex-shrink-0">
            open_in_new
          </span>
        </div>
      </div>
    </div>
  );
};
