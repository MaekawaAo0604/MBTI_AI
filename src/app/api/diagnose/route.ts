import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { answers } = await req.json();

  const [a1, a2, a3, a4] = answers;

  const prompt = `
あなたはMBTI診断の専門家です。
以下の4つの自由回答から、ユーザーの性格傾向を推測し、MBTIタイプ（16タイプ）を1つ挙げてください。

▼ 条件
- MBTIタイプ名（例：INFP）を最初に明記してください
- そのタイプを選んだ理由を自然な言葉でやさしく説明してください
- 難しい専門用語は使わず、友達に話すような雰囲気で

▼ 回答（ユーザーの自由記述）:
Q1. ${a1}
Q2. ${a2}
Q3. ${a3}
Q4. ${a4}

▼ 出力形式の例:
タイプ：INFJ  
解説：あなたは周りをよく観察し、自分の内側にある価値観を大事にして行動しているようです...

※この形式を守って、あなたの診断結果を出してください。
`;

  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const result = res.choices[0].message.content || '';
    return NextResponse.json({ result });
  } catch (err) {
    console.error('診断失敗:', err);
    return NextResponse.json({ error: '診断に失敗しました' }, { status: 500 });
  }
}
