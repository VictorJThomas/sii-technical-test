import * as Yup from "yup";

export const cardValidationSchema = Yup.object({
  cardNumber: Yup.string()
    .required("Número de tarjeta es requerido")
    .matches(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, "Debe contener 16 dígitos")
    .test('len', 'Debe contener exactamente 16 dígitos', val => val?.replace(/\s/g, '').length === 16),
  expiryDate: Yup.string()
    .required("Fecha de vencimiento es requerida")
    .matches(/^\d{2}\/\d{2}$/, "Formato debe ser MM/YY")
    .test('valid-month', 'Mes inválido (01-12)', val => {
      if (!val) return false;
      const month = parseInt(val.substring(0, 2));
      return month >= 1 && month <= 12;
    })
    .test('valid-year', 'Año inválido', val => {
      if (!val) return false;
      const year = parseInt(val.substring(3, 5));
      const currentYear = new Date().getFullYear() % 100;
      return year >= 22 && year <= currentYear + 5;
    }),
  cardHolder: Yup.string()
    .required("Nombre del titular es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(20, "El nombre debe tener máximo 20 caracteres")
    .matches(/^[a-zA-Z\s]+$/, "Solo se permiten letras y espacios"),
  cvv: Yup.string()
    .required("CVV es requerido")
    .matches(/^\d{3}$/, "CVV debe contener 3 dígitos")
});
