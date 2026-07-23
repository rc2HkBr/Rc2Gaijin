import { getTeachersWithSchedules } from '@/actions/aulas';
import AulasClient from './AulasClient';

// Ensure the page is dynamically rendered since we need up-to-date schedule data
export const dynamic = 'force-dynamic';

export default async function AulasPage() {
  const res = await getTeachersWithSchedules();
  const teachers = res.success && res.data ? res.data : [];

  return (
    <div className="min-h-[100dvh] bg-[#0a0510] text-foreground p-4 sm:p-6 font-sans">
      <AulasClient initialTeachers={teachers} />
    </div>
  );
}
