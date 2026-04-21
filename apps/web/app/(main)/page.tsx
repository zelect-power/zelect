import { HomeCases } from '@/components/home/cases';
import { HomeCerts } from '@/components/home/certs';
import { HomeContact } from '@/components/home/contact';
import { HomeHero } from '@/components/home/hero';
import { HomeNews } from '@/components/home/news';
import { HomeProducts } from '@/components/home/products';
import { HomeServices } from '@/components/home/services';
import { HomeStats } from '@/components/home/stats';
import { HomeSupport } from '@/components/home/support';
import { HomeTicker } from '@/components/home/ticker';
import { HomeWhy } from '@/components/home/why';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeTicker />
      <HomeProducts />
      <HomeStats />
      <HomeServices />
      <HomeWhy />
      <HomeCases />
      <HomeSupport />
      <HomeCerts />
      <HomeNews />
      <HomeContact />
    </>
  );
}
