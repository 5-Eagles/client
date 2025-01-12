export const LOAN_DATA = [
    {
        id: 1,
        title: '위험등급 C',
        status: '모집중',
        amount: 2000000,
        badge: '달성',
        stats: [
          { label: '수익률', value: '10.9%', color: 'text-primary' },
          { label: '투자 기간', value: '12개월' },
          { label: '모집률', value: '45.50%' },
        ],
        progressAmount: 1400600,
        targetAmount: 2000000,
      },
      {
        id: 2,
        title: '위험등급 B',
        status: '모집중',
        amount: 3000000,
        badge: '신규',
        stats: [
          { label: '수익률', value: '9.5%', color: 'text-primary' },
          { label: '투자 기간', value: '6개월' },
          { label: '모집률', value: '32.20%' },
        ],
        progressAmount: 966000,
        targetAmount: 3000000,
      },
      {
        id: 3,
        title: '위험등급 A',
        status: '모집중',
        amount: 5000000,
        badge: '우수',
        stats: [
          { label: '수익률', value: '8.7%', color: 'text-primary' },
          { label: '투자 기간', value: '24개월' },
          { label: '모집률', value: '78.90%' },
        ],
        progressAmount: 3945000,
        targetAmount: 5000000,
      },
      {
        id: 4,
        title: '위험등급 B',
        status: '모집중',
        amount: 1500000,
        badge: '인기',
        stats: [
          { label: '수익률', value: '11.2%', color: 'text-primary' },
          { label: '투자 기간', value: '9개월' },
          { label: '모집률', value: '55.30%' },
        ],
        progressAmount: 829500,
        targetAmount: 1500000,
      },
      {
        id: 5,
        title: '위험등급 C',
        status: '모집중',
        amount: 4000000,
        badge: '추천',
        stats: [
          { label: '수익률', value: '10.1%', color: 'text-primary' },
          { label: '투자 기간', value: '18개월' },
          { label: '모집률', value: '62.40%' },
        ],
        progressAmount: 2496000,
        targetAmount: 4000000,
      },
      {
        id: 6,
        title: '위험등급 A',
        status: '모집중',
        amount: 6000000,
        badge: '우수',
        stats: [
          { label: '수익률', value: '8.9%', color: 'text-primary' },
          { label: '투자 기간', value: '36개월' },
          { label: '모집률', value: '83.70%' },
        ],
        progressAmount: 5022000,
        targetAmount: 6000000,
      },
      {
        id: 7,
        title: '위험등급 B',
        status: '모집중',
        amount: 2500000,
        badge: '신규',
        stats: [
          { label: '수익률', value: '9.8%', color: 'text-primary' },
          { label: '투자 기간', value: '15개월' },
          { label: '모집률', value: '41.20%' },
        ],
        progressAmount: 1030000,
        targetAmount: 2500000,
      },
      {
        id: 8,
        title: '위험등급 C',
        status: '모집중',
        amount: 3500000,
        badge: '인기',
        stats: [
          { label: '수익률', value: '11.5%', color: 'text-primary' },
          { label: '투자 기간', value: '12개월' },
          { label: '모집률', value: '68.90%' },
        ],
        progressAmount: 2411500,
        targetAmount: 3500000,
      },
      {
        id: 9,
        title: '위험등급 A',
        status: '모집중',
        amount: 7000000,
        badge: '우수',
        stats: [
          { label: '수익률', value: '8.5%', color: 'text-primary' },
          { label: '투자 기간', value: '48개월' },
          { label: '모집률', value: '91.20%' },
        ],
        progressAmount: 6384000,
        targetAmount: 7000000,
      },
      {
        id: 10,
        title: '위험등급 B',
        status: '모집중',
        amount: 4500000,
        badge: '추천',
        stats: [
          { label: '수익률', value: '9.7%', color: 'text-primary' },
          { label: '투자 기간', value: '24개월' },
          { label: '모집률', value: '52.80%' },
        ],
        progressAmount: 2376000,
        targetAmount: 4500000,
      },
];

export const getLoanById = (id: string | number) => {
  return LOAN_DATA.find(loan => loan.id === Number(id));
}; 