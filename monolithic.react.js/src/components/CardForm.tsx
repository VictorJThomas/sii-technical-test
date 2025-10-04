import { ErrorMessage, Field, Form, Formik } from "formik";
import { cardValidationSchema } from "../validations/cardValidation";
import { useEffect } from "react";

interface CardFormProps {
  onFormChange: (values: {
    cardNumber: string;
    expiryDate: string;
    cardHolder: string;
    cvv: string;
  }) => void;
  onAddCard: (values: {
    cardNumber: string;
    expiryDate: string;
    cardHolder: string;
    cvv: string;
  }) => void;
  currentCard: {
    cardNumber: string;
    expiryDate: string;
    cardHolder: string;
    cvv: string;
  };
  onCancel: () => void;
  isEditing: boolean;
}

const CardForm = ({ onFormChange, onAddCard, currentCard, onCancel, isEditing }: CardFormProps) => {
  const validationSchema = cardValidationSchema;

  const initialValues = {
    cardNumber: "",
    expiryDate: "",
    cardHolder: "",
    cvv: "",
  };

  const handleSubmit = (values: typeof initialValues, { resetForm }: any) => {
    onAddCard(values);
    resetForm();
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  return (
    <div className="bg-white rounded-lg border-2 border-gray-500 p-8 shadow-sm">
      <Formik
        initialValues={currentCard}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue, isValid, errors }) => {
          useEffect(() => {
            onFormChange(values);
          }, [values]);

          const hasAllRequiredValues = values.cardNumber && values.expiryDate && values.cardHolder && values.cvv;
          const isFormValid = isValid && hasAllRequiredValues && Object.keys(errors).length === 0;

          return (
            <Form className="pt-20">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="col-span-2 md:col-span-1">
                <label className="text-left px-2 block text-sm font-bold text-gray-900 mb-2">
                  Número de Tarjeta
                </label>
                <Field name="cardNumber">
                  {({ field }: any) => (
                    <input
                      {...field}
                      type="text"
                      maxLength={19}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="---- ---- ---- ----"
                      value={values.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').substring(0, 16);
                        setFieldValue('cardNumber', formatCardNumber(value));
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage name="cardNumber">
                  {(msg) => (
                    <span className="text-red-500 text-sm text-left">
                      {msg}
                    </span>
                  )}
                </ErrorMessage>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="text-left px-2 block text-sm font-bold text-gray-900 mb-2">
                  Fecha Vencimiento
                </label>
                <Field name="expiryDate">
                  {({ field }: any) => (
                    <input
                      {...field}
                      type="text"
                      maxLength={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="--/--"
                      value={values.expiryDate}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').substring(0, 4);
                        setFieldValue('expiryDate', formatExpiryDate(value));
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage name="expiryDate">
                  {(msg) => (
                    <span className="text-red-500 text-sm text-left">
                      {msg}
                    </span>
                  )}
                </ErrorMessage>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="text-left px-2 block text-sm font-bold text-gray-900 mb-2">
                  Nombre Titular
                </label>
                <Field name="cardHolder">
                  {({ field }: any) => (
                    <input
                      {...field}
                      type="text"
                      maxLength={20}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="NOMBRE APELLIDO"
                      value={values.cardHolder}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^a-zA-Z\s]/g, '').substring(0, 20);
                        setFieldValue('cardHolder', value.toUpperCase());
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage name="cardHolder">
                  {(msg) => (
                    <span className="text-red-500 text-sm text-left">
                      {msg}
                    </span>
                  )}
                </ErrorMessage>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="text-left px-2 block text-sm font-bold text-gray-900 mb-2">
                  CVV
                </label>
                <Field name="cvv">
                  {({ field }: any) => (
                    <input
                      {...field}
                      type="text"
                      maxLength={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="---"
                      value={values.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').substring(0, 3);
                        setFieldValue('cvv', value);
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage name="cvv">
                  {(msg) => (
                    <span className="text-red-500 text-sm text-left">
                      {msg}
                    </span>
                  )}
                </ErrorMessage>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={!isFormValid}
                className={`px-6 py-3 rounded-full font-medium transition-colors shadow-md ${
                  isFormValid
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isEditing ? 'Editar Tarjeta' : 'Agregar Tarjeta'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFieldValue('cardNumber', '');
                  setFieldValue('expiryDate', '');
                  setFieldValue('cardHolder', '');
                  setFieldValue('cvv', '');
                  onCancel();
                }}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CardForm;
