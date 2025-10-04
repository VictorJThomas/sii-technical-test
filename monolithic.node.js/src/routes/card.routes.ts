import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Card, CreateCardDto, UpdateCardDto } from '../types/card.types';
import { validateCard } from '../utils/validation.utils';
import { readCardsFromFile, writeCardsToFile, findCardById } from '../utils/fileSystem.utils';
import { AppError, asyncHandler } from '../middleware/errorHandler.middleware';

const router = Router();

// POST - Create a new card
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const { cardNumber, expiryDate, cardHolder, cvv }: CreateCardDto = req.body;

    // Validate input
    const validationResult = validateCard({ cardNumber, expiryDate, cardHolder, cvv });

    if (!validationResult.isValid) {
      throw new AppError(
        JSON.stringify(validationResult.errors),
        400
      );
    }

    // Read existing cards
    const cards = await readCardsFromFile();

    const newCard: Card = {
      id: uuidv4(),
      cardNumber,
      expiryDate,
      cardHolder,
      cvv,
    };

    cards.push(newCard);

    await writeCardsToFile(cards);

    res.status(201).json({
      status: 'success',
      data: newCard,
    });
  })
);

// GET - Get all cards
router.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const cards = await readCardsFromFile();

    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');

    res.status(200).json({
      status: 'success',
      results: cards.length,
      data: cards,
    });
  })
);

// PUT - Update a card by ID
router.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData: UpdateCardDto = req.body;

    const cards = await readCardsFromFile();

    const cardIndex = cards.findIndex(card => card.id === id);

    if (cardIndex === -1) {
      throw new AppError('Card not found', 404);
    }

    const currentCard = cards[cardIndex];

    // Merge update data with current card
    const updatedCardData = {
      cardNumber: updateData.cardNumber || currentCard.cardNumber,
      expiryDate: updateData.expiryDate || currentCard.expiryDate,
      cardHolder: updateData.cardHolder || currentCard.cardHolder,
      cvv: updateData.cvv || currentCard.cvv,
    };

    const validationResult = validateCard(updatedCardData);

    if (!validationResult.isValid) {
      throw new AppError(
        JSON.stringify(validationResult.errors),
        400
      );
    }

    // Update card
    const updatedCard: Card = {
      id,
      ...updatedCardData,
    };

    cards[cardIndex] = updatedCard;

    // Write back to file
    await writeCardsToFile(cards);

    res.status(200).json({
      status: 'success',
      data: updatedCard,
    });
  })
);

export default router;
