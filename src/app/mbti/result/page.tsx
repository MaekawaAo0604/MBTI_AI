'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { mbtiTypeInfo } from '@/lib/typeInfo';

export default function ResultPage() {
  const [result, setResult] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('mbtiResult');
    if (!stored) {
      router.push('/mbti/input');
    } else {
      setResult(stored);
      const match = stored.match(/\b(INFP|ENFP|INFJ|ENFJ|INTP|ENTP|INTJ|ENTJ|ISFP|ESFP|ISTP|ESTP|ISFJ|ESFJ|ISTJ|ESTJ)\b/i);
      if (match) {
        setType(match[1].toUpperCase());
      }
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">あなたのMBTI診断結果</h1>

      {result ? (
        <div className="bg-blue-50 p-6 border rounded-lg whitespace-pre-wrap text-lg mb-8">
          {result}
        </div>
      ) : (
        <p className="text-center text-gray-500">診断結果を読み込み中です...</p>
      )}

      {type && (
        <div className="bg-white border rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-2 text-center">{type} タイプ</h2>
          <img
            src={`/images/mbti/${type}.png`}
            alt={type}
            className="w-full max-w-xs mx-auto mb-4 rounded-lg"
          />
          <img
            src={`/api/og?type=${type}`}
            alt="診断カード"
            className="w-full mt-4 rounded-md shadow-md"
          />
<a
  href={`https://twitter.com/intent/tweet?text=私のMBTIタイプは${type}（${mbtiTypeInfo[type].nickname}）でした！%0aたった4つの質問でAIが判断してくれる早くて新しいMBTI診断&url=https://your-domain.com/mbti/result%0a&hashtags=MBTI診断&hashtags=MBTI`}
  target="_blank"
  rel="noopener noreferrer"
  className="block text-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mt-6 hover:bg-blue-600 transition"
>
  🐦 Twitterで結果をシェア
</a>
        </div>
      )}
    </div>


  );
}
