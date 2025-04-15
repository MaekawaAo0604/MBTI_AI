'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type QuestionSet = string[][]; // 例: [[q1候補1, q1候補2, q1候補3], ...]
type CurrentIndices = number[]; // 例: [0, 1, 2, 0]

export default function InputPage() {
  const router = useRouter();
  const [questionSets, setQuestionSets] = useState<QuestionSet>([]);
  const [currentIndices, setCurrentIndices] = useState<CurrentIndices>([0, 0, 0, 0]);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
  const [loading, setLoading] = useState(false);

  // GPTから候補リスト形式の質問を取得
  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch('/api/questions');
      const data = await res.json();

      const rawLines = data.raw.split('\n').map((line: string) => line.trim());
      const grouped: string[][] = [];
      let currentGroup: string[] = [];

      for (const line of rawLines) {
        if (line.startsWith('Q')) {
          if (currentGroup.length > 0) grouped.push(currentGroup);
          currentGroup = [];
        } else if (line.startsWith('-')) {
          currentGroup.push(line.replace(/^-/, '').trim());
        }
      }
      if (currentGroup.length > 0) grouped.push(currentGroup);

      setQuestionSets(grouped);
    };

    fetchQuestions();
  }, []);

  // 回答変更
  const handleChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  // 質問切り替え
  const handleNextQuestion = (index: number) => {
    const nextIndices = [...currentIndices];
    nextIndices[index] = (nextIndices[index] + 1) % (questionSets[index]?.length || 1);
    setCurrentIndices(nextIndices);
  };

  // 診断実行
  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers }),
    });

    const data = await res.json();
    localStorage.setItem('mbtiResult', data.result);
    router.push('/mbti/result');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-center mb-8 text-blue-700">ゆるMBTI診断</h1>

      {questionSets.length === 4 ? (
        <div className="space-y-6">
          {questionSets.map((group, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1">
                <p className="text-lg font-semibold">Q{i + 1}. {group[currentIndices[i]]}</p>
                <button
                  onClick={() => handleNextQuestion(i)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  質問を変更
                </button>
              </div>
              <textarea
                className="w-full border p-2 rounded resize-none"
                rows={2}
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
              />
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={loading || answers.some(a => a.trim() === '')}
            className="mt-6 w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? '診断中...' : '診断する'}
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">質問を準備中です...</p>
      )}
    </div>
  );
}
