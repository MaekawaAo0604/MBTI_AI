import OpenAI from 'openai';
import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  const prompt = `
あなたはMBTI診断の質問を考えるAIです。
MBTIの以下の4つの因子について、それぞれ3つずつ自由記述型の質問を考えてください。

▼ 条件（厳守）
- YES/NOで答えられる質問は禁止です
- 自分の言葉で自然に答えたくなるような質問にしてください
- 1問10〜30文字程度のやさしい日本語で
- 出力形式は以下の通りにしてください：

Q1候補（外向 or 内向）:
- 質問1
- 質問2
- 質問3

Q2候補（直感 or 感覚）:
- 質問1
- 質問2
- 質問3

Q3候補（思考 or 感情）:
- 質問1
- 質問2
- 質問3

Q4候補（判断 or 知覚）:
- 質問1
- 質問2
- 質問3
`;

  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const text = res.choices[0].message.content || '';
    return NextResponse.json({ raw: text });
  } catch (error) {
    console.error('質問生成エラー:', error);
    return NextResponse.json({ error: '質問の生成に失敗しました' }, { status: 500 });
  }
}
