export const runtime = 'nodejs';
import React from 'react';
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const typeData: Record<string, {
  nickname: string;
  color: string;
  description: string;
  advice: string;
}> = {
  ENFJ: {
    nickname: '主人公タイプ',
    color: '#e6f4ea',
    description: 'あなたは人を導くカリスマと、深い共感力を持つリーダーです。\n周囲を自然に惹きつけ前向きな影響を与える存在です。',
    advice: '自分の理想を信じて、周囲を導いてください。'
  },
  INFP: {
    nickname: '仲介者タイプ',
    color: '#e6f4ea',
    description: 'あなたは繊細で想像力に富み、\n自分と他人の心に深く共感できる優しい人です。',
    advice: '自分の気持ちを大切にしながらも、\n外の世界とつながってみましょう。'
  },
  INTJ: {
    nickname: '建築家タイプ',
    color: '#ede9f5',
    description: 'あなたは戦略的思考を持ち、\n長期的な視点で物事を捉える冷静な理論家です。',
    advice: '人との協力を恐れず、\nビジョンを共有してみましょう。'
  },
  INTP: {
    nickname: '論理学者タイプ',
    color: '#ede9f5',
    description: 'あなたは知的好奇心が強く、\n独創的なアイデアを生み出す分析型の探求者です。',
    advice: '時には直感や感情も大切にしてみてください。'
  },
  ENTJ: {
    nickname: '指揮官タイプ',
    color: '#ede9f5',
    description: 'あなたは強い意志とリーダーシップで\n目標を達成へと導く力強い戦略家です。',
    advice: '他者の意見も取り入れることで、\nより大きな成果が得られます。'
  },
  ENFP: {
    nickname: '運動家タイプ',
    color: '#e6f4ea',
    description: 'あなたはエネルギッシュで好奇心旺盛。\n人を惹きつける魅力を持った自由な冒険家です。',
    advice: '思いついたアイデアをまずは形にしてみましょう。'
  },
  ISTJ: {
    nickname: '管理者タイプ',
    color: '#e0f0ff',
    description: 'あなたは責任感が強く、\n正確さと秩序を大切にする頼れる実務家です。',
    advice: '柔軟性を持つことでよりスムーズに物事が進みます。'
  },
  ISFJ: {
    nickname: '擁護者タイプ',
    color: '#e0f0ff',
    description: 'あなたは思いやりがあり、\n他人のために尽くす献身的な支え手です。',
    advice: '自分のケアも忘れず大切にしてください。'
  },
  ESTJ: {
    nickname: '幹部タイプ',
    color: '#e0f0ff',
    description: 'あなたは組織的で決断力があり、\n現実的に物事を成し遂げる信頼の厚いリーダーです。',
    advice: '人との信頼関係を築くことが\n成果への近道になります。'
  },
  ESFJ: {
    nickname: '領事タイプ',
    color: '#e0f0ff',
    description: 'あなたは人を大切にし、\n調和と協力を重んじる思いやりのある支援者です。',
    advice: '時には自分の気持ちを優先してみましょう。'
  },
  INFJ: {
    nickname: '提唱者タイプ',
    color: '#e6f4ea',
    description: 'あなたは直感と深い洞察力を持ち、\n理想を実現しようとする情熱的な導き手です。',
    advice: '目の前の小さな行動が\n理想に近づく一歩になります。'
  },
  ISTP: {
    nickname: '巨匠タイプ',
    color: '#fff9db',
    description: 'あなたは実用的かつ柔軟で、\n手を動かして問題を解決することに長けた職人肌です。',
    advice: '一つのことに集中する時間を大切にしましょう。'
  },
  ISFP: {
    nickname: '冒険家タイプ',
    color: '#fff9db',
    description: 'あなたは芸術的感性が豊かで、\n自由と美しさを追い求める繊細な表現者です。',
    advice: '自分の感性を信じて行動に移してみましょう。'
  },
  ESTP: {
    nickname: '起業家タイプ',
    color: '#fff9db',
    description: 'あなたは大胆で社交的。\n行動力と即興力に優れた現場の指揮官です。',
    advice: '行動の前に一呼吸置くことで\n成功の確率が高まります。'
  },
  ESFP: {
    nickname: 'エンターテイナータイプ',
    color: '#fff9db',
    description: 'あなたは明るくて人懐っこく、\n場を盛り上げることが得意なムードメーカーです。',
    advice: '注目を集めながらも\n周囲の声にも耳を傾けましょう。'
  },
  ENTP: {
    nickname: '討論者タイプ',
    color: '#ede9f5',
    description: 'あなたは機転が利き、\n柔軟な思考力で新しいアイデアを生み出す発明家です。',
    advice: '議論よりも行動で信頼を得ることも大切です。'
  },
};

export async function GET(req: NextRequest) {
  const fontData = await fetch(
    new URL('../../../assets/NotoSansJP-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type')?.toUpperCase() || 'ENFJ';
  const info = typeData[type] || typeData['ENFJ'];
  const host = req.headers.get('host') || 'localhost:3000';
  const imageUrl = `http://${host}/images/mbti/${type}.png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1024px',
          height: '512px',
          backgroundColor: info.color,
          display: 'flex',
          flexDirection: 'row',
          fontFamily: 'NotoSansJP',
        }}
      >
        <img
          src={imageUrl}
          alt={type}
          style={{ width: '50%', height: '100%', objectFit: 'contain' }}
        />
        <div
          style={{
            padding: '30px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              fontSize: 48,
              margin: '0 0 12px 0',
              color: '#2f855a',
            }}
          >
            {type}
          </h1>
          <p
            style={{
              fontSize: 28,
              margin: '0 0 12px 0',
              color: '#2f855a',
            }}
          >
            {info.nickname}
          </p>
          <p
            style={{
              fontSize: 22,
              color: '#333',
              lineHeight: 1.5,
              whiteSpace: 'pre-wrap',
              maxWidth: 420,
            }}
          >
            {info.description}
          </p>
          <p
            style={{
              fontSize: 18,
              marginTop: 16,
              color: '#4a4a4a',
            }}
          >
            🎯 アドバイス：{info.advice}
          </p>
        </div>
      </div> 
    ),
    {
      width: 1024,
      height: 512,
      fonts: [
        {
          name: 'NotoSansJP',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}