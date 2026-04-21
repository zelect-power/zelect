const CLIENTS = [
  'ДТЕК',
  'Укренерго',
  'Укрзалізниця',
  'Нафтогаз',
  'Енергоатом',
  'Метінвест',
  'АрселорМіттал',
  'Київстар',
  'USAID',
  'Міненерго',
];

export function HomeTicker() {
  const items = [...CLIENTS, ...CLIENTS];
  return (
    <div className="border-border-theme bg-background-alt flex items-center gap-10 overflow-hidden border-t border-b py-7">
      <div className="border-border-theme text-faint-foreground mr-5 flex-none border-r px-10 text-[11px] font-semibold tracking-[0.14em] uppercase">
        Нам довіряють
      </div>
      <div
        className="flex gap-16 whitespace-nowrap"
        style={{ animation: 'zp-ticker 40s linear infinite' }}
      >
        {items.map((name, i) => (
          <span
            key={i}
            className="text-muted-foreground text-[20px] font-semibold tracking-[-0.01em]"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
