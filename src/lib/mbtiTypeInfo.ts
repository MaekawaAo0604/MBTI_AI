// src/lib/typeInfo.ts

export const mbtiTypeInfo: Record<string, {
  name: string;
  nickname: string;
  traits: string[];
  image: string;
}> = {
  INFP: {
    name: 'INFP',
    nickname: '理想主義のヒーロー',
    traits: ['内向的', '感受性豊か', '理想主義', '共感力'],
    image: '/images/mbti/infp.png',
  },
  ENFP: {
    name: 'ENFP',
    nickname: '好奇心旺盛な冒険家',
    traits: ['外向的', '想像力豊か', '社交的', '自由'],
    image: '/images/mbti/enfp.png',
  },
  INFJ: {
    name: 'INFJ',
    nickname: '静かな理想主義者',
    traits: ['直感的', '内省的', 'ビジョン重視', '洞察力'],
    image: '/images/mbti/infj.png',
  },
  ENFJ: {
    name: 'ENFJ',
    nickname: '情熱的なリーダー',
    traits: ['人当たりが良い', 'カリスマ性', '思いやり', '調整力'],
    image: '/images/mbti/enfj.png',
  },
  INTP: {
    name: 'INTP',
    nickname: '論理の探求者',
    traits: ['内向的', '理論的', '分析好き', '独創的'],
    image: '/images/mbti/intp.png',
  },
  ENTP: {
    name: 'ENTP',
    nickname: 'ひらめきの発明家',
    traits: ['外向的', '柔軟', '挑戦好き', '発想力豊か'],
    image: '/images/mbti/entp.png',
  },
  INTJ: {
    name: 'INTJ',
    nickname: '戦略的な知性派',
    traits: ['計画的', '論理的', '独立心が強い', '先見性'],
    image: '/images/mbti/intj.png',
  },
  ENTJ: {
    name: 'ENTJ',
    nickname: 'カリスマ的司令塔',
    traits: ['リーダータイプ', '決断力', '論理的', '成果志向'],
    image: '/images/mbti/entj.png',
  },
  ISFP: {
    name: 'ISFP',
    nickname: 'おだやかな芸術家',
    traits: ['感受性豊か', '静か', '柔軟', '芸術的'],
    image: '/images/mbti/isfp.png',
  },
  ESFP: {
    name: 'ESFP',
    nickname: '陽気なエンターテイナー',
    traits: ['明るい', '行動派', '社交的', '楽しいことが好き'],
    image: '/images/mbti/esfp.png',
  },
  ISTP: {
    name: 'ISTP',
    nickname: '冷静な職人肌',
    traits: ['実践的', '観察力', '静かに行動', '分析的'],
    image: '/images/mbti/istp.png',
  },
  ESTP: {
    name: 'ESTP',
    nickname: '行動力の塊',
    traits: ['瞬発力', 'リスクを恐れない', 'エネルギッシュ', '説得力'],
    image: '/images/mbti/estp.png',
  },
  ISFJ: {
    name: 'ISFJ',
    nickname: '思いやりの守護者',
    traits: ['協調性', '勤勉', '保守的', '思いやりがある'],
    image: '/images/mbti/isfj.png',
  },
  ESFJ: {
    name: 'ESFJ',
    nickname: '親切な世話人',
    traits: ['社交的', '責任感', '思いやり', 'チームプレイヤー'],
    image: '/images/mbti/esfj.png',
  },
  ISTJ: {
    name: 'ISTJ',
    nickname: '信頼できる実務家',
    traits: ['真面目', '組織的', '現実的', 'ルール重視'],
    image: '/images/mbti/istj.png',
  },
  ESTJ: {
    name: 'ESTJ',
    nickname: '頼れる責任者',
    traits: ['管理能力', '論理的', '効率重視', 'リーダーシップ'],
    image: '/images/mbti/estj.png',
  },
};
