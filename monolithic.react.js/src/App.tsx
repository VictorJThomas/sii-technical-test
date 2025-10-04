import "./App.css";
import CardForm from "./components/CardForm";
import CardList from "./components/CardList";
import { useState, useEffect } from "react";
import { cardService, type GetCard } from "./services/card.service";

function App() {
  const [cards, setCards] = useState<GetCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [currentCard, setCurrentCard] = useState({
    cardNumber: "",
    expiryDate: "",
    cardHolder: "",
    cvv: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedCards = await cardService.getAllCards();
      setCards(fetchedCards);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cards');
      console.error('Error loading cards:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (values: {
    cardNumber: string;
    expiryDate: string;
    cardHolder: string;
    cvv: string;
  }) => {
    setCurrentCard(values);
  };

  const handleAddCard = async (values: typeof currentCard) => {
    try {
      setLoading(true);
      setError(null);

      if (selectedCardId) {
        const updatedCard = await cardService.updateCard(selectedCardId, values);
        setCards(cards.map(card =>
          card.id === selectedCardId ? updatedCard : card
        ));
        setSelectedCardId(null);
      } else {
        const newCard = await cardService.createCard(values);
        setCards([...cards, newCard]);
      }

      setCurrentCard({
        cardNumber: "",
        expiryDate: "",
        cardHolder: "",
        cvv: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save card');
      console.error('Error saving card:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (card: GetCard) => {
    setSelectedCardId(card.id);
    setCurrentCard({
      cardNumber: card.cardNumber,
      expiryDate: card.expiryDate,
      cardHolder: card.cardHolder,
      cvv: card.cvv,
    });
  };

  const handleCancel = () => {
    setSelectedCardId(null);
    setCurrentCard({
      cardNumber: "",
      expiryDate: "",
      cardHolder: "",
      cvv: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="relative mb-[-80px] z-10 px-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex justify-between items-start mb-12">
              <div className="flex flex-row gap-3">
                <div className="text-2xl font-bold py-1">monobank</div>
                <span className="text-3xl font-semibold text-gray-400">|</span>
                <div className="text-sm text-gray-400 pt-3">Universal Bank</div>
              </div>
              <div className="text-gray-400">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
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

            <div className="mb-8">
              <div className="w-12 h-10 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded opacity-80"></div>
            </div>

            <div className="text-2xl font-mono tracking-widest mb-6 text-gray-300">
              {currentCard.cardNumber || "---- ---- ---- ----"}
            </div>

            <div className="flex justify-between items-end">
              <div>
                <div className="text-xs text-gray-400 mb-1">VALID THRU</div>
                <div className="text-sm font-mono">
                  {currentCard.expiryDate || "--/--"}
                </div>
                <div className="text-sm font-mono tracking-wide mt-2">
                  {currentCard.cardHolder || "NOMBRE APELLIDO"}
                </div>
              </div>
              <div className="flex gap-0">
                <div className="w-10 h-10 rounded-full bg-red-600"></div>
                <div className="w-10 h-10 rounded-full bg-orange-500 -ml-4"></div>
              </div>
            </div>
          </div>
        </div>

        <CardForm
          onFormChange={handleFormChange}
          onAddCard={handleAddCard}
          currentCard={currentCard}
          onCancel={handleCancel}
          isEditing={selectedCardId !== null}
          loading={loading}
        />

        <CardList cards={cards} onCardClick={handleCardClick} loading={loading} />
      </div>
    </div>
  );
}

export default App;
