# LearnLingo

Вебзастосунок для пошуку викладачів іноземних мов. Користувач може переглядати анкети, фільтрувати та сортувати викладачів, додавати їх до обраного й надіслати заявку на пробний урок.

## Можливості

- каталог викладачів із поступовим завантаженням під час прокручування;
- фільтрація за мовою, рівнем знань і ціною;
- сортування за рейтингом, ціною та кількістю проведених уроків;
- реєстрація та вхід користувача через Firebase Authentication;
- список обраних викладачів, синхронізований з Firebase Realtime Database;
- форма бронювання пробного заняття;
- адаптивний інтерфейс і випадкова кольорова тема головного екрана.

## Технології

- [Next.js 16](https://nextjs.org/) (App Router)
- React 19 і TypeScript
- Firebase Authentication та Firebase Realtime Database
- CSS Modules
- ESLint

## Запуск локально

1. Клонуйте репозиторій і перейдіть до його теки.

   ```bash
   git clone <URL_репозиторію>
   cd LearnLingo
   ```

2. Встановіть залежності.

   ```bash
   npm install
   ```

3. Створіть файл `.env.local` на основі `.env.example` та внесіть конфігурацію свого Firebase-проєкту:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
   NEXT_PUBLIC_FIREBASE_APP_ID=
   ```

4. У Firebase увімкніть Email/Password у **Authentication** та створіть **Realtime Database**. Дані викладачів мають бути доступні за шляхом `teachers`; обрані зберігаються за шляхом `favorites/{userId}`.

5. Запустіть сервер розробки.

   ```bash
   npm run dev
   ```

   Застосунок буде доступний за адресою [http://localhost:3000](http://localhost:3000).

## Скрипти

| Команда | Опис |
| --- | --- |
| `npm run dev` | Запускає застосунок у режимі розробки. |
| `npm run build` | Створює production-збірку. |
| `npm run start` | Запускає production-збірку. |
| `npm run lint` | Перевіряє код ESLint. |

## Маршрути

| Маршрут | Призначення |
| --- | --- |
| `/` | Головна сторінка з презентаційним блоком. |
| `/teachers` | Каталог, фільтри, сортування та бронювання. |
| `/favorites` | Збережені викладачі авторизованого користувача. |

## Структура проєкту

```text
src/
├── app/          # сторінки та глобальні стилі
├── components/   # компоненти інтерфейсу
├── hooks/        # React-хуки для авторизації, викладачів і обраного
├── services/     # запити до Firebase
├── lib/          # Firebase-конфігурація та утиліти
├── constants/    # сталі значення для фільтрів
└── types/        # TypeScript-типи
```

## Нотатка щодо даних

Файл `src/data/teachers.json` можна використати як джерело для початкового наповнення Realtime Database. У production не додавайте `.env.local` до репозиторію.
