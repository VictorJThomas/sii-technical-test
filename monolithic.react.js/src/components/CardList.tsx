interface CardData {
  id: string;
  cardNumber: string;
  expiryDate: string;
  cardHolder: string;
  cvv: string;
}

interface CardListProps {
  cards: CardData[];
  onCardClick?: (card: CardData) => void;
  loading?: boolean;
}

const CardList = ({ cards, onCardClick, loading = false }: CardListProps) => {
  const maskCardNumber = (num: string) => {
    const cleaned = num.replace(/\s/g, '');
    if (cleaned.length === 16) {
      return cleaned.substring(0, 2) + '**********' + cleaned.substring(12);
    }
    return num;
  };

  const displayCardNumber = (num: string) => {
    const masked = maskCardNumber(num);
    const cleaned = masked.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : masked;
  };

  if (loading) {
    return (
      <div className="mt-8 px-8">
        <div className="text-center text-gray-500">Cargando tarjetas...</div>
      </div>
    );
  }

  if (cards.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 px-8">Tarjetas Guardadas</h3>
      <div className="grid grid-cols-1 gap-4 px-8">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => onCardClick?.(card)}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 text-white shadow-lg transform transition-transform hover:scale-105 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-lg font-bold">monobank</div>
                <div className="text-gray-400 text-xs mt-1">Universal Bank</div>
              </div>
              <div className="text-gray-400">
                <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M8 12C8 10 10 8 12 8H28C30 8 32 10 32 12V28C32 30 30 32 28 32H12C10 32 8 30 8 28V12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M12 16C12 14 14 12 16 12C18 12 20 14 20 16C20 18 18 20 16 20C14 20 12 18 12 16Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M20 16C20 14 22 12 24 12C26 12 28 14 28 16C28 18 26 20 24 20C22 20 20 18 20 16Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            <div className="mb-4">
              <div className="w-8 h-6 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded opacity-80"></div>
            </div>

            <div className="text-base font-mono tracking-wider mb-4 text-gray-300">
              {displayCardNumber(card.cardNumber)}
            </div>

            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs text-gray-400 mb-1">VALID THRU</div>
                <div className="text-xs font-mono">{card.expiryDate}</div>
                <div className="text-xs font-mono tracking-wide mt-1">
                  {card.cardHolder}
                </div>
              </div>
              <div className="flex gap-0">
                <div className="w-6 h-6 rounded-full bg-red-600"></div>
                <div className="w-6 h-6 rounded-full bg-orange-500 -ml-3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
