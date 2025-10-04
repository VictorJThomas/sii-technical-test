export interface ValidationError {
  field: string;
  message: string;
}

export class ValidationResult {
  isValid: boolean;
  errors: ValidationError[];

  constructor(isValid: boolean, errors: ValidationError[] = []) {
    this.isValid = isValid;
    this.errors = errors;
  }
}

export const validateCardNumber = (cardNumber: string): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!cardNumber) {
    errors.push({ field: 'cardNumber', message: 'Número de tarjeta es requerido' });
    return new ValidationResult(false, errors);
  }

  // Check format: Must be formatted as "#### #### #### ####"
  const formatRegex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
  if (!formatRegex.test(cardNumber)) {
    errors.push({ field: 'cardNumber', message: 'Debe contener 16 dígitos' });
  }

  // Check length without spaces
  const cleanNumber = cardNumber.replace(/\s/g, '');
  if (cleanNumber.length !== 16) {
    errors.push({ field: 'cardNumber', message: 'Debe contener exactamente 16 dígitos' });
  }

  return new ValidationResult(errors.length === 0, errors);
};

export const validateExpiryDate = (expiryDate: string): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!expiryDate) {
    errors.push({ field: 'expiryDate', message: 'Fecha de vencimiento es requerida' });
    return new ValidationResult(false, errors);
  }

  // Check format: Must be MM/YY
  const formatRegex = /^\d{2}\/\d{2}$/;
  if (!formatRegex.test(expiryDate)) {
    errors.push({ field: 'expiryDate', message: 'Formato debe ser MM/YY' });
    return new ValidationResult(false, errors);
  }

  // Validate month (01-12)
  const month = parseInt(expiryDate.substring(0, 2));
  if (month < 1 || month > 12) {
    errors.push({ field: 'expiryDate', message: 'Mes inválido (01-12)' });
  }

  // Validate year (current year % 100 to current year % 100 + 5)
  const year = parseInt(expiryDate.substring(3, 5));
  const currentYear = new Date().getFullYear() % 100;
  if (year < 22 || year > currentYear + 5) {
    errors.push({ field: 'expiryDate', message: 'Año inválido' });
  }

  return new ValidationResult(errors.length === 0, errors);
};

export const validateCardHolder = (cardHolder: string): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!cardHolder) {
    errors.push({ field: 'cardHolder', message: 'Nombre del titular es requerido' });
    return new ValidationResult(false, errors);
  }

  // Check min length
  if (cardHolder.length < 3) {
    errors.push({ field: 'cardHolder', message: 'El nombre debe tener al menos 3 caracteres' });
  }

  // Check max length
  if (cardHolder.length > 20) {
    errors.push({ field: 'cardHolder', message: 'El nombre debe tener máximo 20 caracteres' });
  }

  // Check only letters and spaces
  const letterRegex = /^[a-zA-Z\s]+$/;
  if (!letterRegex.test(cardHolder)) {
    errors.push({ field: 'cardHolder', message: 'Solo se permiten letras y espacios' });
  }

  return new ValidationResult(errors.length === 0, errors);
};

export const validateCvv = (cvv: string): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!cvv) {
    errors.push({ field: 'cvv', message: 'CVV es requerido' });
    return new ValidationResult(false, errors);
  }

  // Check format: Must be exactly 3 digits
  const cvvRegex = /^\d{3}$/;
  if (!cvvRegex.test(cvv)) {
    errors.push({ field: 'cvv', message: 'CVV debe contener 3 dígitos' });
  }

  return new ValidationResult(errors.length === 0, errors);
};

export const validateCard = (cardData: {
  cardNumber: string;
  expiryDate: string;
  cardHolder: string;
  cvv: string;
}): ValidationResult => {
  const allErrors: ValidationError[] = [];

  const cardNumberResult = validateCardNumber(cardData.cardNumber);
  const expiryDateResult = validateExpiryDate(cardData.expiryDate);
  const cardHolderResult = validateCardHolder(cardData.cardHolder);
  const cvvResult = validateCvv(cardData.cvv);

  allErrors.push(...cardNumberResult.errors);
  allErrors.push(...expiryDateResult.errors);
  allErrors.push(...cardHolderResult.errors);
  allErrors.push(...cvvResult.errors);

  return new ValidationResult(allErrors.length === 0, allErrors);
};
