import React, { useState } from 'react';
import { sfx } from '../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onResetData }) => {
  const [soundEnabled, setSoundEnabled] = useState(sfx.enabled);

  if (!isOpen) return null;

  const toggleSound = () => {
    sfx.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      sfx.playChime(580, 0.2);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#fbfaf1] w-full max-w-[390px] rounded-2xl p-5 shadow-xl border border-[#e5dec9] text-[#1b1c17] relative">
        <div className="flex items-center justify-between pb-3 border-b border-[#e5dec9]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#434843] text-[22px]">settings</span>
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

        <div className="mt-4 flex flex-col gap-3">
          {/* Sound Effect Toggle */}
          <div className="bg-[#ffffff] p-3 rounded-xl border border-[#e5dec9] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#4c6150] text-[20px]">
                {soundEnabled ? 'volume_up' : 'volume_off'}
              </span>
              <div>
                <p className="text-[13px] font-bold text-[#1b1c17]">포근한 효과음</p>
                <p className="text-[11px] text-[#737872]">터치 및 교감 오디오 피드백</p>
              </div>
            </div>
            <button
              onClick={toggleSound}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                soundEnabled ? 'bg-[#4c6150]' : 'bg-[#c3c8c1]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-[#ffffff] transition-transform shadow-xs ${
                  soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Sanctuary Caregiver profile */}
          <div className="bg-[#ffffff] p-3 rounded-xl border border-[#e5dec9]">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#4c6150] flex items-center justify-center text-[#ffffff]">
                <span className="material-symbols-outlined text-[20px]">person</span>
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#1b1c17]">오두막의 관리자</p>
                <p className="text-[11px] text-[#737872]">구름꼬리의 다정한 보호자</p>
              </div>
            </div>
          </div>

          {/* App Info */}
          <div className="bg-[#f5f4eb] p-3 rounded-xl border border-[#e5dec9] text-[11px] text-[#737872] leading-relaxed">
            <p className="font-bold text-[#434843] mb-0.5">달의 오두막 (Moonlit Hearth)</p>
            <p>동화책 속 오두막에서 아기 솜용과 나누는 따뜻하고 느긋한 일상 힐링 샌드박스입니다.</p>
          </div>

          {/* Reset button */}
          <button
            onClick={() => {
              if (confirm('오두막의 데이터를 초기 상태로 되돌리시겠습니까?')) {
                onResetData();
                onClose();
              }
            }}
            className="w-full py-2 border border-[#ba1a1a]/30 text-[#ba1a1a] rounded-xl text-[12px] font-semibold hover:bg-[#ba1a1a]/5 transition-colors"
          >
            오두막 일기 초기화
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2 bg-[#efeee5] text-[#434843] rounded-xl font-bold text-[12px] hover:bg-[#e4e3da] transition-colors"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
