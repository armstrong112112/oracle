export default {
  title: 'Заявка на верификацию',
  applicationPreview: 'Предпросмотр заявки',
  steps: {
    step1: 'Категории и продолжительность',
    step2: 'Основная информация',
    step3: 'Контактные данные',
    step4: 'Скриншоты и доказательства',
  },
  next: 'Далее',
  submit: 'Отправить',
  categoriesAndDuration: {
    selectCategory: 'Выберите категорию верификации',
    choosePeriod: 'Выберите период верификации',
    description:
      'Можно выбрать несколько категорий. Основная категория оплачивается по полной стоимости, каждая дополнительная — со скидкой 50%.',
    understood: 'Понятно',
  },

  chooseVerificationPeriod: {
    monthLabel: '{month} месяцев',
    labels: {
      price140: '140% от стоимости',
      regular: 'Обычная цена',
      cheaper40: 'На 40% дешевле',
      cheaper50: 'На 50% дешевле',
    },
    goodDeal: 'выгодное предложение',
  },
  chooseCategoryDialog: {
    chooseCategory: 'Выберите категорию верификации',
    category: 'Категории',
    save: 'Сохранить',
    titles: {
      design: 'Дизайн',
      traffic: 'Трафик',
      devops: 'DevOps',
      person: 'Человек',
      service_company: 'Сервис / Компания',
      platform_listing_post: 'Платформа / Объявление',
      fraud_scam: 'Мошенничество / Обман',
      misrepresentation: 'Искажение информации',
      harassment_abuse: 'Домогательства / Оскорбления',
      unauthorized_charge: 'Несанкционированное списание',
      data_privacy: 'Конфиденциальность данных',
      other: 'Другое',
    },
    status: {
      select: 'Выбрать',
      selected: 'Выбрано',
    },
  },
  basicDetails: {
    title: 'Расскажите немного о себе и своем бизнесе',
    placeholder:
      'С чего вы начали, чем занимаетесь и кто может вас рекомендовать?...',
    businessPresence: 'Присутствие бизнеса в интернете',
    linkLabel: 'Ссылка {index}',
    linkPlaceholder: 'Вставьте ссылку здесь...',
    descriptionPlaceholder: 'Описание',
    addLink: 'Добавить ссылку',
    understood: 'Понятно',
  },
  contactDetails: {
    title: 'Мои контактные данные',
    description: 'Требуется как минимум один контакт',
    understood: 'Понятно',
    placeholder: 'Ваш контакт {contact}',
  },
  screenshots: {
    title: 'Добавьте до 5 скриншотов',
    uploadTitle: 'Загрузите здесь',
    uploadResolution:
      'Рекомендуемое разрешение изображения — 1080x1920 пикселей.',
    uploadSize: 'Макс. 15 МБ',
    understood: 'Понятно',
    errors: {
      maxFiles:
        'Достигнут лимит файлов. Вы можете загрузить до 5 файлов. Пожалуйста, удалите некоторые файлы, прежде чем добавлять новые.',
      fileSize:
        'Превышен лимит размера файла. Ваш файл слишком большой. Максимально допустимый размер — 15 МБ. Пожалуйста, сожмите файл или выберите меньший.',
      duplicate:
        'Дубликат файла. Этот файл уже был загружен. Пожалуйста, выберите другой файл.',
      uploadFailed:
        'Ошибка загрузки. Что-то пошло не так во время загрузки. Пожалуйста, попробуйте снова через некоторое время.',
      lowResolution:
        'Низкое разрешение изображения. Пожалуйста, загрузите изображение с более высоким качеством.',
      invalidImage:
        'Недопустимый файл изображения. Пожалуйста, загрузите допустимое изображение.',
      readFailed: 'Не удалось прочитать данные файла.',
    },
  },
  verificationPreview: {
    header: 'Предварительный просмотр заявки',
    submit: 'Отправить',
    verificationCategory: 'Категория верификации',
    verificationPeriod: 'Период верификации',
    month: 'месяц',
    businessDescription: 'Описание бизнеса',
    webPresence: 'Присутствие в интернете',
    link: 'Ссылка',
    contactDetails: 'Контактные данные',
    trackButton: 'Отследить заявку',
  },
  verificationTrackingTitle: 'Отслеживание заявки',
}
