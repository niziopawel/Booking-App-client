export const validation = {
  email: {
    presence: {
      message: '^Wprowadź prawidłowy adres e-mail'
    },
    email: {
      message: '^Wprowadź prawidłowy adres e-mail'
    }
  },
  password: {
    presence: {
      message: '^Wprowadź hasło'
    },
    length: {
      minimum: 6,
      message: '^Hasło musi składać się z minimum 6 znaków'
    }
  }
};
