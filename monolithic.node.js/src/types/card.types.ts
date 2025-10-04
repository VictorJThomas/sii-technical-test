export interface Card {
  id: string;
  cardNumber: string;
  expiryDate: string;
  cardHolder: string;
  cvv: string;
}

export interface CreateCardDto {
  cardNumber: string;
  expiryDate: string;
  cardHolder: string;
  cvv: string;
}

export interface UpdateCardDto {
  cardNumber?: string;
  expiryDate?: string;
  cardHolder?: string;
  cvv?: string;
}
