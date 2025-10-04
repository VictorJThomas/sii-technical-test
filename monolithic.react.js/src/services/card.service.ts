import { apiClient } from '../config/api.config';

export interface GetCard {
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

export interface ApiResponse<T> {
  status: string;
  data?: T;
  results?: number;
  message?: string;
}

class CardService {
  private readonly basePath = '/api/cards';

  async getAllCards(): Promise<GetCard[]> {
    try {
      const response = await apiClient.get<ApiResponse<GetCard[]>>(this.basePath);
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching cards:', error);
      throw this.handleError(error);
    }
  }

  async createCard(cardData: CreateCardDto): Promise<GetCard> {
    try {
      const response = await apiClient.post<ApiResponse<GetCard>>(this.basePath, cardData);
      if (!response.data.data) {
        throw new Error('Invalid response from server');
      }
      return response.data.data;
    } catch (error) {
      console.error('Error creating card:', error);
      throw this.handleError(error);
    }
  }

  async updateCard(id: string, cardData: UpdateCardDto): Promise<GetCard> {
    try {
      const response = await apiClient.put<ApiResponse<GetCard>>(`${this.basePath}/${id}`, cardData);
      if (!response.data.data) {
        throw new Error('Invalid response from server');
      }
      return response.data.data;
    } catch (error) {
      console.error('Error updating card:', error);
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      const errorMessage = error.response.data?.message || 'Server error occurred';

      // Handle validation errors
      if (error.response.status === 400) {
        try {
          const validationErrors = JSON.parse(errorMessage);
          if (Array.isArray(validationErrors)) {
            const messages = validationErrors.map((err: any) => err.message).join(', ');
            return new Error(messages);
          }
        } catch {
          return new Error(errorMessage);
        }
      }

      return new Error(errorMessage);
    } else if (error.request) {
      return new Error('No response from server. Please check your connection.');
    }
    return new Error('An unexpected error occurred');
  }
}

export const cardService = new CardService();
