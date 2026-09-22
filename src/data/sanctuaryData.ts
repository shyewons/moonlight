import { InventoryItem, PetStatus, Quest, Expedition } from '../types';

export const initialPetStatus: PetStatus = {
  name: '구름꼬리',
  species: '솜용',
  title: '어린 솜용',
  mood: '마음이 따스함',
  tag: '호기심 가득',
  bond: 68,
  fullness: 75,
  happiness: 84,
  energyDots: 3,
  napStatus: '오후 3시의 고요한 낮잠 주기',
};

export const initialInventory: InventoryItem[] = [
  {
    id: 'berries',
    name: '산딸기',
    count: 3,
    iconName: 'eco',
    color: '#7e5713',
    desc: '달콤한 햇살을 머금고 자란 신선한 숲의 붉은 열매',
  },
  {
    id: 'feather_bell',
    name: '깃털 방울',
    count: 2,
    iconName: 'sports_volleyball',
    color: '#4e6052',
    desc: '바람이 불면 짤랑이는 소리가 나는 부드러운 깃털 장난감',
  },
  {
    id: 'dew_grass',
    name: '달콤한 이슬풀',
    count: 5,
    iconName: 'spa',
    color: '#4c6150',
    desc: '오두막 창가에 말려둔 은은한 허브차 잎사귀',
  },
];

export const petDialogues: string[] = [
  '"주인님, 창틀에 놓아둔 열매 꽃향기가 참 달콤해요. 오늘은 어디로 나들이 가나요?"',
  '"주인님 손길이 닿으면 등 뒤의 솜털이 퐁실퐁실 피어나는 기분이에요."',
  '"따뜻한 차 한 잔 하실래요? 창가에 달콤한 풀잎을 우려두었어요."',
  '"바람이 산들산들 부니 낮잠 자기 정말 포근한 날이에요..."',
  '"바깥 숲에서 방울새가 노래를 불러요. 같이 들으러 가요!"',
  '"오늘 밤하늘엔 반달이 제일 예쁘게 뜰 거래요. 밤 산책도 함께해 주실 거죠?"',
  '"오물오물... 달콤한 별빛 산딸기예요! 꼬리가 기분 좋게 둥실 떠올라요!"',
  '"방울이 짤랑짤랑! 제가 솜발로 톡 쳐볼게요, 놓치지 마세요!"',
  '"후아암... 졸리면 언제든 구름꼬리의 폭신한 털을 베고 누우셔도 돼요."',
];

export const activeQuest: Quest = {
  id: 'quest_1',
  title: '첫 번째 여정 안내',
  summary: "마을의 '파란 지붕의 집' 방문자에게 첫 안부를 전해보세요.",
  detail:
    '달의 오두막 너머 솔바람 골목길에 푸른 지붕을 인 오두막이 있습니다. 먼 숲에서 온 우편 배달부 다람쥐가 편지를 전하러 와 있어요. 따뜻한 허브차 한 잔과 함께 인사를 나눠보세요.',
  npc: '우편 배달부 솔이',
  location: '파란 지붕의 집',
  reward: {
    item: '별빛 산딸기 바구니',
    count: 5,
  },
  completed: false,
};

export const currentExpedition: Expedition = {
  companion: '밤빛 솔이',
  location: '열매 공터',
  progressPercent: 78,
  statusText: "밤빛 솔이 '열매 공터'를 샅샅이 산책 중입니다 (눌러서 소식 확인)",
  foundItems: ['이슬 맺힌 산딸기 2개', '작은 솔방울 1개', '바람의 깃털 1개'],
};

export const tomeEntries = [
  {
    id: 'cloud_dragon',
    category: '신비한 생명체',
    name: '구름꼬리 솜용',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-LCqReguHaIZT-RNFytSKU48I8KzHNnhOFsIfwavJGYEpSAfAh0bL_ymEwA-EsBQUohF99FT77XYzQjvMqAq_FNskFIMmcRLEdQ33sF45jUg1PAj-tRNRihKbPNtHgJfbQ20yOI4WUacDQSg9IHOCmkqQZ9SklOQWPdM12JUmYvf_wZRYBRqXNuP3DcJ7nkbgyNs2x8rHA82RogZo5SmG6MqAPPgfxNsAV8fv6XGeYdv6P6KIUh7W',
    badge: '오두막의 수호 펫',
    desc: '하늘의 아침 구름과 달빛이 만나 태어난 사랑스러운 어린 드래곤. 꼬리와 날개가 부드러운 솜털로 덮여 있으며, 주인이 쓰다듬어 주면 작게 가르랑거리며 따뜻한 온기를 내뿜습니다.',
    likes: '달콤한 산딸기, 깃털 방울 놀이, 창가 햇살 낮잠',
    rarity: '전설의 반려 생명체',
  },
  {
    id: 'night_squirrel',
    category: '숲의 탐험가',
    name: '밤빛 솔이',
    image: '',
    badge: '부지런한 채집꾼',
    desc: '밤하늘 빛 털을 가진 다람쥐 친구. 오두막 식구들을 위해 숲의 열매 공터와 이슬 계곡을 누비며 귀한 산딸기와 반짝이는 씨앗들을 모아옵니다.',
    likes: '잘 익은 도토리, 별빛 열매, 솔방울',
    rarity: '믿음직한 조력자',
  },
  {
    id: 'star_berry',
    category: '신비한 식물',
    name: '별빛 산딸기',
    image: '',
    badge: '달콤한 열매',
    desc: '달빛을 받고 자란 야생 산딸기. 입안에 넣으면 은은한 단맛과 함께 피로를 달래주는 숲의 향기가 가득 퍼집니다.',
    likes: '솜용이 가장 좋아하는 최고급 간식',
    rarity: '희귀 야생 식물',
  },
];
