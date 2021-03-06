export default {
  translation: {
    logo: 'Hexlet Chat',
    logOutBtn: 'Выйти',
    noAccount: 'Нет аккаунта?',
    registration: 'Регистрация',
    LoginPage: {
      title: 'Войти',
      form: {
        username: 'Ваш ник',
        password: 'Пароль',
        button: 'Войти',
      },
      noAccount: 'Нет аккаунта? ',
      registration: 'Регистрация',
    },
    yup: {
      required: 'Заполните поле',
      username: 'от 3 до 20 символов',
      passwordMin: 'Не менее 6 символов',
      confirmPassword: 'Пароли должны совпадать',
      notOneOf: 'Такое имя уже занято',
    },
    errors: {
      authFailed: 'Неверные имя пользователя или пароль',
      signupFailed: 'Такой пользователь уже существует',
      network: 'Ошибка сети',
    },
    success: {
      newChannel: 'Канал создан',
      removeChannel: 'Канал удалён',
      renameChannel: 'Канал переименован',
    },
    messages: {
      messagesCount_one: '{{count}} сообщение',
      messagesCount_few: '{{count}} сообщения',
      messagesCount_many: '{{count}} сообщений',
    },
    SignupPage: {
      registration: 'Регистрация',
      form: {
        username: 'Имя пользователя',
        password: 'Пароль',
        button: 'Зарегистрироваться',
        confirmPassword: 'Подтвердите пароль',
      },
    },
    Modal: {
      newChannelTitle: 'Добавить канал',
      removeChannelTitle: 'Удалить канал',
      removeChannelBody: 'Уверены?',
      renameChannelTitle: 'Переименовать канал',
      cancelBtn: 'Отменить',
      button: 'Отправить',
      removeBtn: 'Удалить',
    },
    ChannelItem: {
      dropdownRemove: 'Удалить',
      dropdownRename: 'Переименовать',
      dropdownName: 'Управление каналом',
    },
    ErrorPage: {
      title: 'Страница не найдена',
      homeLink: 'Вернуться',
    },
  },
};
