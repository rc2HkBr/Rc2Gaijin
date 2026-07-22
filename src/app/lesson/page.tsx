'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import QuizEngine from '@/components/QuizEngine';
import { HIRAGANA_GROUPS } from '@/data/hiraganaData';

function LessonContent() {
  const searchParams = useSearchParams();
  const groupId = searchParams.get('group') || 'vowels';

  const groupData = HIRAGANA_GROUPS.find((g) => g.id === groupId) || HIRAGANA_GROUPS[0];

  return <QuizEngine groupName={groupData.name} characters={groupData.characters} />;
}

export default function LessonPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-foreground font-bold">Carregando lição...</div>}>
      <LessonContent />
    </Suspense>
  );
}
