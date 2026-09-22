import React, { useState } from 'react';
import { tomeEntries } from '../data/sanctuaryData';
import { sfx } from '../utils/audio';

export const TomeView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const categories = ['전체', '신비한 생명체', '숲의 탐험가', '신비한 식물'];

  const filteredEntries =
    selectedCategory === '전체'
      ? tomeEntries
      : tomeEntries.filter((e) => e.category === selectedCategory);

  return (
    <div className="flex flex-col w-full pb-6 gap-3.5 animate-in fade-in">
      {/* Header */}
      <div className="bg-[#f5f4eb] rounded-xl p-3.5 shadow-sm border border-[#e5dec9]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#7e5713] text-[20px]">menu_book</span>
            <h2 className="font-['Literata',serif] font-bold text-[18px] text-[#1b1c17]">
              오두막 동화 도감
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-[#4c6150] bg-[#d1e9d3] px-2 py-0.5 rounded-full">
            발견한 기록 3종
          </span>
        </div>
        <p className="text-[12px] text-[#434843] mt-1">
          달의 오두막을 둘러싼 신비한 숲의 생명체들과 식물들의 기록입니다.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-0.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sfx.playChime(520, 0.15);
              setSelectedCategory(cat);
            }}
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#4c6150] text-[#ffffff] shadow-xs'
                : 'bg-[#ffffff] text-[#434843] border border-[#e5dec9] hover:bg-[#f5f4eb]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Entry Cards */}
      <div className="flex flex-col gap-3">
        {filteredEntries.map((entry) => (
          <div
            key={entry.id}
            className="bg-[#ffffff] rounded-xl p-3.5 shadow-sm border border-[#e5dec9] flex flex-col gap-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-['Literata',serif] font-bold text-[15px] text-[#1b1c17]">
                  {entry.name}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-semibold bg-[#ffddb1] text-[#291800]">
                  {entry.badge}
                </span>
              </div>
              <span className="text-[10px] text-[#737872]">{entry.rarity}</span>
            </div>

            {entry.image && (
              <div className="w-full h-36 rounded-lg overflow-hidden border border-[#e5dec9]">
                <img src={entry.image} alt={entry.name} className="w-full h-full object-cover" />
              </div>
            )}

            <p className="text-[12px] text-[#434843] leading-relaxed">{entry.desc}</p>

            <div className="bg-[#f5f4eb] p-2 rounded-lg text-[11px] text-[#7e5713] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">favorite</span>
              <span>
                <strong>선호:</strong> {entry.likes}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
