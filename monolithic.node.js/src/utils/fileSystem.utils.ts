import fs from 'fs/promises';
import path from 'path';
import { Card } from '../types/card.types';

const DATA_FILE_PATH = path.join(__dirname, '../../data.json');

export const readCardsFromFile = async (): Promise<Card[]> => {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      await writeCardsToFile([]);
      return [];
    }
    throw error;
  }
};

export const writeCardsToFile = async (cards: Card[]): Promise<void> => {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(cards, null, 2), 'utf-8');
  } catch (error) {
    throw new Error('Error writing to file: ' + (error as Error).message);
  }
};

export const findCardById = async (id: string): Promise<Card | null> => {
  const cards = await readCardsFromFile();
  return cards.find(card => card.id === id) || null;
};

export const cardExists = async (id: string): Promise<boolean> => {
  const card = await findCardById(id);
  return card !== null;
};
