import type { CaseStudy } from '@/types/content';

export const caseStudies: CaseStudy[] = [
  {
    id: 'website-devpulse',
    title: 'website-devpulse',
    description:
      'Realtime observability console for a simulated microservice mesh. It streams API latency, throughput, CPU and memory, and HTTP error rates.',
    image: {
      src: '/images/projects/website-devpulse.webp',
      alt: 'DevPulse realtime dashboard with latency, throughput, CPU and error-rate charts.',
      width: 1024,
      height: 489,
    },
  },
  {
    id: 'website-financy',
    title: 'website-financy',
    description:
      'An automatic personal finance manager. It aggregates all accounts, detects recurring costs, and forecasts liquidity days/months/years in advance.',
    image: {
      src: '/images/projects/website-financy.webp',
      alt: 'Financy sign-in screen beside a projection of future account balance.',
      width: 1024,
      height: 485,
    },
  },
  {
    id: 'website-restaurant',
    title: 'website-restaurant',
    description:
      'Fine-dining website for "Zafferano Milano" (Made Up Enterprise). A cinematic intro leads to the dinner, explain the menu and the booking page for the clients.',
    image: {
      src: '/images/projects/website-restaurant.webp',
      alt: 'Zafferano Milano homepage with a plated pasta dish and the restaurant navigation.',
      width: 1024,
      height: 488,
    },
  },
];
