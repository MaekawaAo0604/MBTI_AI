'use client';

export default function SelectPage() {
  return (
    <div className="text-center py-10">
      <h1 className="text-2xl font-bold mb-4">診断方法を選んでください</h1>
      <div className="flex justify-center gap-6">
        <a href="/mbti/input" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
          自由入力で診断
        </a>
        <a href="/mbti/sns" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
          SNS診断（準備中）
        </a>
      </div>
    </div>
  );
}