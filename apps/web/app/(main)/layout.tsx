import type { ReactNode } from 'react';

import { Topbar } from '@/components/layout/topbar';
import { Footer } from '@/components/layout/footer';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Topbar />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </>
  );
}
