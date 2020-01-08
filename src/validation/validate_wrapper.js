import validation from 'validate.js';

export default function validate(fieldName, value) {
  const constraints = {
    email: {
      presence: {
        message: '^Wprowadź adres email'
      },
      format: {
        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: '^Niepoprawny adres email'
      }
    },
    password: {
      presence: true,
      length: {
        minimum: 6,
        message: '^Hasło powinno zawierać przynajmniej 6 znaków'
      }
    },
    confirmPassword: {
      presence: {
        messagge: 'Wprowadź hasło potwierdzające'
      },
      equality: 'password'
    },
    phoneNo: {
      presence: true,
      format: {
        pattern: '^[0-9]{10}$',
        message: 'Nieprawidłowy numer telefonu'
      }
    }
  };

  const formValues = {};
  formValues[fieldName] = value;

  const formFields = {};
  formFields[fieldName] = constraints[fieldName];

  const result = validation(formValues, formFields);

  if (result) {
    return result[fieldName][0];
  }
  return null;
}
