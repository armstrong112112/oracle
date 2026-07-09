# Аудит выполнения ТЗ «Подготовка Фронтенда к Интеграции с API»

Дата аудита: 2026-07-10
Метод: построчная сверка кодовой базы с каждым пунктом ТЗ, перепроверка grep-критериев из Definition of Done, трассировка вызовов (страница → composable → стор → серверный роут).

Легенда: ✅ выполнено полностью · ⚠️ выполнено частично / с дефектами · ❌ не выполнено

---

## ВАЖНО: точка интеграции — не страницы, а data-компоненты (widgets/entities)

Ключевое архитектурное уточнение, подтверждённое чтением экранов (см. раздел «Подтверждённые примеры чтения» ниже). В этом проекте **страницы (`pages/*`) — тонкие обёртки**: они задают layout и подключают крупные компоненты, но сами данные почти не держат. Реальная работа с данными (списки, карточки, суммы, статусы) живёт в **виджетах (`widgets/*`) и сущностях (`entities/*`)**, и именно там данные сейчас захардкожены / импортируются из статических файлов.

Практическое следствие для всех пунктов «перевести на `useApiFetch`» и «внедрить Loading/Error/Empty» (Этапы 4 и 7):
- Мигрировать нужно **не на уровне страницы**, а на уровне data-компонента (`P2PList`, `DealList`, `P2PHome`, каталог/карточка товара и т.п.), либо поднять загрузку в тонкую страницу и передавать данные вниз пропсами.
- Локальные типы и статические массивы, объявленные внутри виджетов/entities, нужно заменить на DTO из `shared/types/api/` и данные из сторов.
- Оценка объёма работ по Этапам 4/7 должна считаться по числу data-компонентов, а не по числу страниц (их больше, и они «толще»).

---

## Сводная таблица

| Этап ТЗ | Статус | Кратко |
|---|---|---|
| 1. Сетевой слой (API Client) | ✅ (с 1 дефектом) | httpClient, интерсепторы, useApiClient, useApiFetch созданы; axios удалён. Дефект: useApiFetch не повторяет запрос после refresh |
| 2. SSR-безопасные токены | ✅ | Токены в useCookie, localStorage обёрнут в guards/clientStorage |
| 3. Редизайн Mock-системы | ⚠️ | Каркас Nitro-моков есть; 4 из 8 сторов из таблицы не мигрированы; нет auth/profile mock-роутов; 5 сторов написаны, но не подключены к UI (мёртвый код) |
| 4. useAsyncData / useApiFetch на страницах | ⚠️ | Интеграция шире, чем один паттерн: 5 страниц через useApiFetch + `checks` через useApiClient (работает); но 4 из useApiFetch-страниц бьют в несуществующие endpoints |
| 5. TypeScript DTO | ✅ | 18 DTO-файлов + 18 санитайзеров, `any` устранён |
| 6. Route Guards | ✅ | auth.ts, guest.ts, auth.global.ts + автопривязка через pages:extend |
| 7. Loading / Error / Empty | ⚠️ | Компоненты созданы; паттерн внедрён на 2 из 9 обязательных страниц |
| 8. runtimeConfig | ✅ | apiBaseUrl (приватный) + public.useMocks/vendureGraphqlUrl, .env.example есть |
| 9 (прим.). Удаление devProxy | ✅ | nitro.devProxy отсутствует |
| 10.1 Локализация дат | ✅ | helpers принимают locale; все вызовы передают locale.value |
| 10.2 Bills → Composition API | ✅ | Composition API + fetchBills() |
| 10.3 Server-side ID для stories | ✅ | Date.now() убран, ID с сервера |
| 10.4 Корзина: цена из API | ✅ | ADD_TO_CART через API, isAdding, VALIDATE_CART_PRICES |

---

## Этап 1. Сетевой слой (API Client)

### Сделано ✅
- `shared/api/httpClient.ts` — изоморфный клиент на `$fetch` / `useRequestFetch()` (не axios), с ручным retry после обновления токена через класс `ApiRefreshRequiredError`.
- `utils/apiInterceptors.ts` — общие интерсепторы:
  - подстановка `Authorization: Bearer <token>` из cookie;
  - единый `nuxtApp._refreshPromise` — защита от параллельных refresh («thundering herd»);
  - 401 на `/auth/refresh` → очистка токенов + redirect на login (через `runWithContext`);
  - логирование ошибок 5xx.
- `composables/useApiClient.ts` — для сторов, `baseURL: /api/v1`, повтор исходного запроса после успешного refresh.
- `composables/useApiFetch.ts` — обёртка над нативным `useFetch` с теми же интерсепторами (SSR-дедупликация сохранена).
- `axios` удалён из `package.json` и из всех импортов (проверено grep: 0 совпадений в `store/`, `composables/`, `shared/`, `utils/`).
- `store/auth/index.ts` и `store/profile/index.ts` переведены на `useApiClient()` + `unknown` + санитайзеры.

### Дефекты ⚠️
1. **`useApiFetch` не повторяет запрос после refresh.** В `useApiClient` перехватывается `ApiRefreshRequiredError` и запрос повторяется; в `useApiFetch` (на базе `useFetch`) такого перехвата нет — после успешного refresh исходный запрос страницы завершится ошибкой. Поведение 401 несогласовано между сторами и страницами. Нарушает DoD #2 для страниц.

### Что сделать для полного соответствия
- [ ] Добавить в `useApiFetch` повтор запроса после `ApiRefreshRequiredError` (например, через опцию `retry` + `retryStatusCodes: [401]` у `useFetch`, либо обёртку execute/refresh при пойманной ошибке refresh).

---

## Этап 2. SSR-безопасное хранение токенов

### Сделано ✅
- `composables/useAuthSession.ts`: `accessToken` в cookie (maxAge 15 мин), `refreshToken` (7 дней), `sameSite`, `secure` вычисляется по протоколу (учтён `x-forwarded-proto` на SSR), валидация структуры JWT (`split('.').length === 3`).
- Создан `utils/clientStorage.ts` (`readLocalStorageJson` / `writeLocalStorageJson` с проверкой `import.meta.client`).
- Прямые обращения к `localStorage` остались только в 3 файлах (`widgets/profile/ProfileHeader/index.vue`, `entities/shop/new-listing-forms/ui/step-two.vue`, `step-three.vue`) и все защищены `if (!import.meta.client) return` либо используют clientStorage-обёртки. Краш SSR исключён (DoD #4 по этой части — выполнен).

### Что сделать
- [ ] (Опционально, для чистоты) Заменить оставшиеся прямые вызовы в 3 файлах на обёртки из `utils/clientStorage.ts`, чтобы был единый механизм.

---

## Этап 3. Редизайн Mock-системы (Nitro Server Routes)

### Сделано ✅
- Каркас: `server/utils/mockOrProxy.ts` (`withMockOrProxy`) + `server/utils/proxy.ts` (`proxyToBackend` при `useMocks=false`).
- Моки перенесены в `shared/mocks/` (bills, checks, disputes, escrow, listings, offers, p2p, payment, stories).
- Создано 26 Nitro-роутов в `server/api/v1/`: bills (GET/POST/PUT/DELETE), checks, disputes, escrow, listings, offers, payment, p2p (coins/fiat/payment-methods/deadlines), shop/products/[id], stories (+highlights).

### Миграция сторов из таблицы ТЗ (8 позиций)

| Стор | Требование ТЗ | Статус | Факт |
|---|---|---|---|
| `useP2PCreateStore` | fetchCoins/fetchFiat/fetchPaymentMethods/fetchDeadlines | ⚠️ | Методы написаны (включая fetchAll), роуты есть, НО **ни один метод не вызывается ни с одной страницы/компонента** — UI P2P по-прежнему живёт на старых данных (`widgets/p2p/P2PHome` всё ещё импортирует `entities/p2p/data`) |
| `useDashboardStore` | fetchCards() | ❌ | Карточки захардкожены в сторе, fetch-метода нет, mock-роута для карточек нет |
| `useEscrowStore` | fetchEscrowProfile() | ❌ | Профиль статичный, fetch-метода нет (роут `escrow.get.ts` создан, но стором не используется) |
| `useShopsStore` | убрать SettingMockUser, fetchProfile() через API | ❌ | `SettingMockUser()` + `MockDefaultUser` на месте (переведён лишь на clientStorage-обёртки); fetchProfile() нет |
| `useShopListingsStore` | fetchListings() | ❌ | Стор остался на **Options API**, товары из хардкода `ProductsData`; fetchListings() нет (роут `listings.get.ts` существует, не подключён) |
| `useCartStore` | то������ар из API, не из ProductsData | ✅ | `ADD_TO_CART` запрашивает `/shop/products/:id`, проверяет наличие |
| `useBillsStore` | fetchBills() | ✅ | Есть, через useApiClient |
| `useStoriesStore` | ID с сервера | ✅ | POST на API, ID из ответа |

### Мёртвый код: 5 «сторов-двойников» написаны, но не подключены к UI ❌ (обнаружено при повторной проверке)
Помимо старых сторов на хардкоде, рефакторинг создал **новый набор интеграционных сторов**, полностью готовых (с `useApiClient`, fetch-методами, DTO и mock-роутами), но **не используемых ни в одной странице/виджете/entity** (проверено grep по `pages/widgets/entities/features/components`):

| Стор | Роут / DTO | Используется в UI? |
|---|---|---|
| `store/escrowApi` | `escrow.get/post` + DTO | ❌ 0 импортов |
| `store/offers` | `offers.get/post` + DTO | ❌ 0 импортов |
| `store/listings` | `listings.get/post` + DTO | ❌ 0 импортов |
| `store/disputes` | `disputes.get/post` + DTO | ❌ 0 импортов |
| `store/payment` | `payment.get/post` + DTO | ❌ 0 импортов |

Это означает: интеграционная логика для escrow/offers/listings/disputes/payment **уже написана и типизирована**, но UI-компоненты продолжают жить на статике и к этим сторам не подключены. Хорошая новость — «последняя миля» (заменить импорт статики на вызов готового стора) короче, чем казалось. Плохая — сейчас это чистый мёртвый код, дублирующий старые сторы (`store/escrow` статичный vs `store/escrowApi` рабочий; `store/shops/listing` статичный vs `store/listings` рабочий).

**Единственный полностью замкнутый домен — `checks`:** `store`(нет, напрямую в странице) → `pages/checks` вызывает `useApiClient` → `checks.get` роут → DTO → mock. Работает end-to-end. `store/profile` тоже подключён (`pages/oracle/my-profile/_id`, `user-profile/_id` вызывают `fetchProfile`), но бьёт в отсутствующий `/user/profile/:id`.

**Что сделать:**
- [ ] Подключить готовые сторы к UI и удалить их статических двойников: `escrowApi`→`entities/escrow/ui/DealList`, `listings`→каталог Shops, `offers`→`widgets/p2p/P2PList`, `disputes`/`payment`→соответствующие экраны.
- [ ] После подключения удалить дублирующие статичные сторы (`store/escrow`, `store/shops/listing`) во избежание расхождения источников данных.

### Критические пробелы в mock-роутах ❌
Сторы и страницы обращаются к endpoints, которых нет в `server/api/v1/` — при дефолтно�� `NUXT_PUBLIC_USE_MOCKS=true` эти запросы получают 404:
- `/auth/login`, `/auth/register`, `/auth/logout`, `/auth/refresh`, `/auth/loginwithtg`, `/auth/regwithtg`, `/auth/confirmTgLogin` — используются `store/auth`; **вся авторизация в mock-режиме нерабочая**, а значит DoD #1 и #2 непроверяемы на моках.
- `/user/my-profile`, `/user/list`, `/user/profile/:id` — используются `store/profile` и страницами whitelist.
- `/dashboard/summary` — используется `pages/dashboard/index.vue`.

### Что сделать
- [ ] Создать mock-роуты auth: `server/api/v1/auth/login.post.ts`, `register.post.ts`, `refresh.post.ts`, `logout.post.ts`, `loginwithtg.post.ts`, `regwithtg.post.ts`, `confirmTgLogin.post.ts` (выдавать валидные по структуре JWT-подобные токены, чтобы guards проходили).
- [ ] Создать `server/api/v1/user/my-profile.get.ts`, `user/list.get.ts`, `user/profile/[id].get.ts`.
- [ ] Создать `server/api/v1/dashboard/summary.get.ts` (мок карточек/баланса).
- [ ] `useDashboardStore`: перенести карточки в `shared/mocks/`, добавить `fetchCards()` через `useApiClient`.
- [ ] `useEscrowStore`: добавить `fetchEscrowProfile()` (роут уже есть).
- [ ] `useShopsStore`: удалить `SettingMockUser`/`MockDefaultUser`, добавить `fetchProfile()`.
- [ ] `useShopListingsStore`: переписать на Composition API, добавить `fetchListings()` на существующий роут `/listings`.
- [ ] Подключить методы `useP2PCreateStore` к UI: вызвать `fetchAll()` со страницы создания оффера (через `callOnce()` + `useAsyncData`, как требует Этап 4), убрать импорт `entities/p2p/data` из `widgets/p2p/P2PHome`.

---

## Этап 4. Стандартизация загрузки данных (useApiFetch на страницах)

### Сделано ⚠️
`useApiFetch` используется на 5 страницах: `pages/bills/index.vue`, `pages/dashboard/index.vue`, `pages/whitelist/catalogue-section.vue`, `pages/whitelist/my-profile.vue`, `pages/whitelist/profile/_id.vue`.

### Дефекты
1. **4 из 5 страниц бьют в несуществующие endpoints** (`/dashboard/summary`, `/user/list`, `/my-profile`, `/user/profile/:id`) → в mock-режиме всегда 404 → всегда рендерится ErrorState. Реально работает только `pages/bills` (`/bills`).
2. **Dashboard: данные из API не подставляются в UI.** Ответ `useApiFetch('/dashboard/summary')` используется только для веток loading/error/empty; баланс, монеты, сервисы и карточки в шаблоне по-прежнему из статических данных. Интеграция косметическая.
3. **`callOnce()` + `useAsyncData` для предзагрузки сторов не используется нигде** (grep: 0 совпадений) — требование Этапа 4 не выполнено.
4. Страницы из таблицы 7.4 (P2P офферы/сделка, Shops каталог/товар/корзина, Escrow, Profile) не переведены на `useApiFetch` вообще.
5. В `pages/whitelist/my-profile.vue` реальный вызов `fetchMyProfile()` **закомментирован** с пометкой «вызывает ошибку» — интеграция отключена вручную вместо починки endpoint.

### Дополнение (подтверждено чтением): данные лежат в widgets/entities, а не в страницах
Страницы `pages/p2p/orders` и `pages/escrow/active-deals` — тонкие обёртки; вся работа с данными в `widgets/p2p/P2PList` и `entities/escrow/ui/DealList`, где данные захардкожены (`LIST_ITEMS` внутри `.vue`, `import activeDealsData`). Поэтому «перевести страницу на `useApiFetch`» здесь недостаточно — целевой объект миграции это data-компонент. См. раздел «Подтверждённые примеры чтения».

### Что сделать
- [ ] Починить endpoints 4 сломанных страниц (см. чек-лист Этапа 3) и раскомментировать/восстановить реальные вызовы.
- [ ] Dashboard: связать данные ответа `/dashboard/summary` с шаблоном (баланс, монеты, карточки).
- [ ] Перевести на данные из API **соответствующие data-компоненты**, а не только страницы: `widgets/p2p/P2PList` и `P2PHome` (`/offers`), `entities/escrow/ui/DealList` (`/escrow`), каталог/карточка Shops (`/listings`, `/shop/products/:id`), корзина, Profile (`/user/my-profile`). Загрузку поднять в тонкую страницу (`useApiFetch`) и передавать вниз пропсами, либо тянуть из стора.
- [ ] Убрать ��окальные хардкод-массивы и локальные типы из виджетов/entities, заменить на DTO из `shared/types/api/`.
- [ ] Для страниц/компонентов, зависящих от сторов, применить `callOnce()` + `useAsyncData` с ключом.

---

## Этап 5. Синхронизация контрактов (TypeScript DTO)

### Сделано ✅ (сверх ТЗ)
- `shared/types/api/` — 18 файлов DTO (auth, balance, bills, checks, common, disputes, escrow, exchange, listings, notifications, offers, p2p, payment, profile, reviews, transaction-history, user).
- `shared/types/api/sanitizers/` — зеркальные 18 санитайзеров: обработка protobuf omitempty (`?? / ||` дефолты), `unknown` на входе + приведение к строгим типам, `unwrapApiPayload` для конвертов ответа. Это закрывает п. 5.3 ТЗ (нулевые значения gRPC Gateway).
- `any` в `store/` и `shared/types/` — 0 совпадений (DoD #6 ✅).
- Моки в `shared/mocks/` типизированы под DTO.

### Что сделать
- [ ] После получения от бэкенда финальной конвенции (snake_case vs camelCase, формат Timestamp, enum как string/number, int64 как string) — сверить DTO и санитайзеры (п. 5.2 ТЗ выполним только совместно с бэкенд-командой).

---

## Этап 6. Route Guards

### Сделано ✅ (сверх ТЗ)
- `middleware/auth.ts` — редирект гостя на sign-in, валидация структуры JWT (без выброса по exp — как требует ТЗ, протухший access добирается интерсептором).
- `middleware/guest.ts` — навешен на все 4 auth-страницы (sign-in, sign-up, sign-in-with-telegram, sign-up-with-telegram) через `definePageMeta` (DoD #5, вторая часть ✅).
- `middleware/auth.global.ts` + хук `pages:extend` в `nuxt.config.ts` — вместо ручного навешивания `definePageMeta({ middleware: 'auth' })` на каждую приватную страницу middleware добавляется автоматически всем непубличным роутам (учитывает i18n-префиксы `/en`, `/ru`). Функционально покрывает `/dashboard`, `/p2p/*`, `/shops/*`, `/escrow/*`, `/profile/*`, `/chat-settings/*` и остальные.

### Замечание
- DoD #5 «просроченный JWT → редирект» в текущей реализации выполняется опосредованно (401 → refresh → при провале logout+redirect), что соответствует примечанию в самом ТЗ. Но в mock-режиме без `/auth/refresh` роута эта цепочка не работает (см. Этап 3).

### Что сд��ла��ь
- [ ] Ничего по самим guards; зависимость — mock-роут `/auth/refresh` (Этап 3).

---

## Этап 7. Loading / Error / Empty States

### Сделано ⚠️
- ✅ `components/ui/ErrorState.vue` — пропсы `title`, `message`, `retryable`, `icon` (+ дополнительно `retryText`), событие `@retry`. Соответствует спецификации 7.1 (дефолтные тексты на английском вместо русских из ТЗ — допустимо, проект англоязычный).
- ✅ `components/ui/EmptyState.vue` — пропсы `title`, `message`, `icon`, `actionLabel`, событие `@action`. Соответствует 7.2.
- ⚠️ Паттерн Loading→Error→Empty→Content внедрён только на: Dashboard, Bills (2 из 9 обязательных страниц), плюс не требуемые ТЗ whitelist-страницы (3 шт., причём с нерабочими endpoints — там ErrorState показывается всегда).

### Не покрыты (обязательные по таблице 7.4) ❌
| Страница | Статус |
|---|---|
| P2P — список офферов | ❌ |
| P2P — детали сделки | ❌ |
| Shops — каталог листингов | ❌ |
| Shops — детали товара | ❌ |
| Shops — корзина | ❌ |
| Escrow — список | ❌ |
| Profile — данные | ❌ |

### Что сделать
- [ ] Внедрить паттерн (SkeletonLoader / ErrorState с `@retry="refresh()"` / EmptyState / контент) на все 7 непокрытых страниц, параллельно с их переводом на `useApiFetch` (Этап 4).
- [ ] Убедиться, что на Dashboard ветка Content рендерит данные из API, а не статику (см. Этап 4, дефект 2).

---

## Этап 8. runtimeConfig

### Сделано ✅
- `runtimeConfig.apiBaseUrl` (приватный, `NUXT_API_BASE_URL`, дефолт `http://localhost:3001`), `public.useMocks` (`NUXT_PUBLIC_USE_MOCKS === 'true'`), `public.vendureGraphqlUrl` — 1:1 по ТЗ.
- `.env.example` создан со всеми тремя переменными.
- Клиент ходит на свой origin (`/api/v1` → Nitro), сервер проксирует по абсолютному `apiBaseUrl` — схема SSR/Client соблюдена.

---

## Примечание ТЗ: удаление devProxy ✅
`nitro.devProxy` в `nuxt.config.ts` отсутствует (grep: 0). Проксирование — через `proxyToBackend` в Nitro-роутах. DoD #13 ✅.

---

## Этап 10. Дополнительные исправления

### 10.1 Локализация дат ✅
`helpers.ts`: `formattedDate(date, locale)` / `shortFormattedDate(date, locale)` + `normalizeLocale` (en→en-US, ru→ru-RU). Все найденные вызовы на страницах передают `locale.value` из `useI18n()`. DoD #14 ✅.

### 10.2 Bills store ✅
Composition API, `fetchBills()` через `useApiClient()('/bills')`, loading/error-стейт. DoD #15 ✅.
Замечание: теперь единственный стор на Options API — `useShopListingsStore` (см. Этап 3); для консистентности его тоже нужно переписать.

### 10.3 Stories: server-side ID ✅
`Date.now()` в `store/` — 0 совпадений (DoD #11 ✅). `createStory`/`createHighlight`/`addToHighlight` отправляют POST и берут ID из ответа сервера.

### 10.4 Корзина ✅
`ADD_TO_CART`: запрос `/shop/products/:id`, проверка `isOutStock`/`itemLeft`, флаг `isAdding` блокирует спам-клики, `VALIDATE_CART_PRICES` перепроверяет цены при оформлении. DoD #12 ✅.

---

## Проверка Definition of Done (15 критериев)

| # | Критерий | Статус | Комментарий |
|---|---|---|---|
| 1 | API Client: login → cookie → Authorization | ⚠️ | Код корректен, но в mock-режиме непроверяем: нет роута `/auth/login` |
| 2 | Refresh Token цепочка | ⚠️ | В сторах — реализована; на страницах (`useApiFetch`) повтора запроса нет; в mock-режиме нет роута `/auth/refresh` |
| 3 | Nitro моки / proxy | ⚠️ | Механизм работает; покрытие endpoints неполное (auth, user, dashboard отсутствуют) |
| 4 | SSR не падает (localStorage) | ✅ | Все обращения защищены guard/обёртками |
| 5 | Route Guards | ✅ | auth + guest работают; JWT-структура валидируется |
| 6 | Нет `: any` в store/ и shared/types/ | ✅ | grep: 0 |
| 7 | Loading/Error/Empty на страницах 7.4 | ❌ | 2 из 9 страниц |
| 8 | ErrorState/EmptyState по спецификации | ✅ | Пропсы и события соответствуют |
| 9 | Нет двойных запросов | ✅* | useApiFetch на useFetch, useRequestFetch на SSR (*требует ручной проверки в Network) |
| 10 | Все сторы имеют fetch-методы | ❌ | dashboard, escrow, shops, shops/listing — без fetch |
| 11 | Нет Date.now() в store/ | ✅ | grep: 0 |
| 12 | Корзина проверяет цену через API | ✅ | + isAdding + revalidate при checkout |
| 13 | Удалён devProxy | ✅ | grep: 0 |
| 14 | Локализация дат | ✅ | locale передаётся динамически |
| 15 | bills на Composition API | ✅ | Да |

Итог: 9 ✅ · 3 ⚠️ · 2 ❌ (+1 условный).

---

## Полный чек-лист доведения проекта до ТЗ (по приоритету)

### P0 — блокеры (в mock-режиме функциональность сломана)
1. [ ] Mock-роуты auth: `login`, `register`, `refresh`, `logout`, `loginwithtg`, `regwithtg`, `confirmTgLogin` (POST, `server/api/v1/auth/`), с JWT-совместимой структурой токенов.
2. [ ] Mock-роуты профиля: `user/my-profile.get.ts`, `user/list.get.ts`, `user/profile/[id].get.ts`.
3. [ ] Mock-роут `dashboard/summary.get.ts`.
4. [ ] Восстановить закомментированный `fetchMyProfile()` в `pages/whitelist/my-profile.vue`.
5. [ ] Добавить retry-after-refresh в `useApiFetch` (согласовать поведение 401 со сторами).

### P1 — незакрытые требования ТЗ
6. [ ] `useDashboardStore`: карточки → `shared/mocks/`, добавить `fetchCards()`.
7. [ ] `useEscrowStore`: добавить `fetchEscrowProfile()` (роут `/escrow` уже есть).
8. [ ] `useShopsStore`: удалить `SettingMockUser`/`MockDefaultUser`, добавить `fetchProfile()` через API.
9. [ ] `useShopListingsStore`: переписать на Composition API + `fetchListings()` (роут `/listings` уже есть).
10. [ ] Подключить `useP2PCreateStore.fetchAll()` к странице создания оффера через `callOnce()` + `useAsyncData`; убрать импорт `entities/p2p/data` из `widgets/p2p/P2PHome`.
11. [ ] Перевести на данные из API + внедрить Loading/Error/Empty в **data-компоненты** соответствующих экранов (не в тонкие страницы): `widgets/p2p/P2PList`, `widgets/p2p/P2PHome`, `entities/escrow/ui/DealList`, каталог/карточка/корзина Shops, Profile. Убрать локальные хардкод-массивы (`LIST_ITEMS`) и `import` статических данных (`entities/escrow/data/activeDealsData`, `entities/p2p/data`).
12. [ ] Dashboard: рендерить в шаблоне данные из ответа `/dashboard/summary` вместо статики.

### P2 — качество/консистентность
13. [ ] Заменить прямые `localStorage`-вызовы в 3 файлах на `utils/clientStorage.ts`.
14. [ ] Сверить DTO/санитайзеры с финальной конвенцией бэкенда (snake_case/camelCase, Timestamp, enum, int64-как-string).
15. [ ] Ручная проверка DoD #9 (один запрос в Network, без hydration mismatch) после выпо��не��и�� P0–P1.

---

## Подтверждённые примеры чтения (выборочная проверка прикладного слоя)

Ниже — экраны, прочитанные построчно целиком (страница + её реальный data-компонент), чтобы верифицировать выводы по метрикам «в поле». Прочитано 5 экранов из разных доменов; выводы разнородны — от ❌ (чистый прототип) до ✅ (полноценная интеграция). Первые два относятся к доменам, обязательным по ТЗ (P2P, Escrow), и ��одтверждают статус ❌.

### P2P — список ордеров
- `pages/p2p/orders/index.vue` — тонкая обёртка, только layout + подключение `<P2PList>`.
- `widgets/p2p/P2PList/index.vue`:
  - данные захардкожены прямо в компоненте — массив `LIST_ITEMS` (~100 строк) внутри `.vue`; нет `useApiFetch`, нет обращения к стору;
  - fetch-методы `useP2PCreateStore` (`fetchCoins/fetchAll`), написанные рефакторингом, здесь **не вызываются** — подтверждён «мёртвый код» из Этапа 3;
  - нет Loading/Error/Empty — при пустом списке рендерится пустой контейнер, без `EmptyState`;
  - `handleAccept` меняет статус только локально в `ref` — мутация не уходит на сервер;
  - типы `ListItem`/`OrderStatus` объявлены в самом виджете, а не в `shared/types/api/` (дублирование DTO-паттерна).

### Escrow — активные сделки
- `pages/escrow/active-deals/index.vue` — тонкая обёртка над `<DealList>`; на родителе есть `@ts-ignore` на импорте `BillsModal` (пример TD-1).
- `entities/escrow/ui/DealList/index.vue`:
  - данные из статического файла — `import { activeDealsData } from "~/entities/escrow/data/activeDealsData"`; нет API/стора;
  - суммы и счётчики зашиты в шаблон (`$ 1,621.00`, `count: 20`) — эталонный пример TD-2 (UI сшит с данными);
  - нет Loading/Error/Empty, нет скелетонов;
  - `windowWidth` в `onMounted` присваивается без гварда `import.meta.client` (мелкая SSR-невнимательность; в родительской странице гвард есть).

### Checks — список чеков ✅ (положительный пример, ранее пропущенный аудитом)
- `pages/checks/index.vue` (351 строка): использует `useApiClient()` + `fetchChecks()` с реальным вызовом `api<ChecksListResponseDto>("/checks")`, `try/catch`, фолбэком `[]`; типы `CheckItem`/`ChecksListResponseDto`; SSR-гварды на месте.
- Домен замкнут end-to-end: страница → `useApiClient` → роут `checks.get.ts` (+`checks.post.ts`) → DTO `shared/types/api/checks.ts` → mock `checks.mock.ts`. В mock-режиме реально работает.
- **Почему аудит его пропустил:** первичный подсчёт «интегрированных» шёл по `useApiFetch`/`useAsyncData`, а `checks` использует другой валидный паттерн — прямой `useApiClient` в `onMounted`. Вывод: интегрированных экранов больше, чем считалось; часть Этапа 4 выполнена вне ожидаемого паттерна.
- Дефекты: часть UI всё же захардкожена (`cryptoList`, заглушка `updateLayout()`); один статический `title` в разметке. Loading/Error/Empty от загрузки отсутствует (есть только пустое состояние списка).

### Shops — корзина ⚠️ (частичная интеграция)
- `pages/shops/cart/index.vue` (528 строк): данные идут из `useCartStore` (`INIT_CART`, `REMOVE_ITEM_FROM_CART`) — не хардкод. Но нет Loading/Error-состояния от загрузки; «2 days left», иконки и часть верстки захардкожены; расчёты сумм — в компоненте, а не в сторе.

### Chat-settings — редактирование папки ❌ (вне ТЗ, чистый прототип)
- `pages/chat-settings/folders/edit/index.vue` (449 строк): `include`/`exclude`/`colors` — локальный стейт; аватары захардкожены (`/svg/avatar.svg`), имя «Julia Work» зашито в шаблон; данные никуда не сохраняются. Домен в ТЗ не входит — ожидаемо.

**Вывод проверки:** выборка подтвердила системный характер недостатков прикладного слоя (данные в widgets/entities, отсутствие состояний), но одновременно **скорректировала аудит в сторону менее пессимистичного**: домен `checks` полностью интегрирован, `profile`/`cart` — частично, а 5 сторов уже готовы к подключению. Интеграцию нельзя мерить одним паттерном `useApiFetch` — надо учитывать и `useApiClient`. Это обосновывает уточнение в разделе «ВАЖНО: точка интеграции» выше.

---

## Техдолг вне ТЗ (обнаружено при аудите качества кодовой базы)

Эти пункты не входят в исходное ТЗ, но напрямую влияют на прод-готовность и останутся даже после закрытия всех пунктов ТЗ выше.

### TD-1. Типобезопасность «дырявая» по краям
`tsconfig` строгий (`strict: true`, `noImplicitAny: true`, `strictNullChecks: true`), и рефакторинг честно вычистил `: any` в `store/` и `shared/types/` (0 совпадений). Но в прикладном слое строгий компилятор массово обходят вручную:
- **87 явных `: any`** в `pages/`, `components/`, `widgets/`, `entities/`, `composables/`.
- **17 `@ts-ignore`** там же.

Это классический анти-паттерн: строгость объявлена на бумаге, но не распространена по всей кодовой базе — она реально соблюдается только в отрефакторенном ядре. Каждый `any`/`@ts-ignore` — это точка, где компилятор перестаёт защищать от рантайм-ошибок (особенно опасно в денежных/финансовых потоках).

**Что сделать:**
- [ ] Постепенно заменить `: any` в прикладном слое на DTO из `shared/types/api/` (они уже есть) или на `unknown` + сужение типа.
- [ ] Устранить `@ts-ignore`, заменив на корректную типизацию; где невозможно сразу — ��аменить на `@ts-expect-error` с комментарием-причиной, чтобы «мёртвые» подавления сами всплывали при исправлении.
- [ ] Ввести ESLint-правило (`@typescript-eslint/no-explicit-any`, `ban-ts-comment`) как warning, чтобы счётчик не рос.

### TD-2. UI намертво сшит с данными (недостаточное разделение data ↔ view)
В прикладных экранах представление жёстко связано со статикой, а не с данными из стора/API. Пример — карточка товара `pages/shops/listing/[id]/index.vue`:
- изображения — захардкоженные пути (`/svg/shop/icons/...`) вместо `currentProduct.images`;
- слайды/секции рендерятся из статических массивов, а не из ответа API.

Следствие: даже когда стор начнёт отдавать реальные данные (P1 из ТЗ), шаблоны частично продолжат показывать заглушки — интеграция будет «наполовину живой». Данные и представление разделены недостаточно.

**Что сделать:**
- [ ] В карточке товара и других экранах shops/p2p/escrow заменить захардкоженные ассеты и статические массивы на поля из стора/DTO (`currentProduct.images`, `.price`, `.description` и т.д.).
- [ ] Ввести фолбэк-заглушку только для реально отсутствующих полей (placeholder), а не как основной источник.
- [ ] Проверить, что после подключения API ни один пользовательский экран не рендерит статические данные там, где есть эквивалент в ответе.

### TD-3. Скелеты загрузки: хороший компонент, но неполное покрытие и дубликат
Скелеты загрузки в проекте **есть**. Базовый компонент `components/ui/SkeletonLoader.vue` сделан качественно: настраиваемые пропсы `width`/`height`/`borderRadius`, настоящий shimmer-эффект (движущийся градиент через `::after` + `@keyframes shimmer`), темизация под тёмный фон приложения.

Проблемы:
- **Неполное покрытие (P1).** Полноценный `<SkeletonLoader>` применён только на 5 мигрированных экранах (`dashboard`, `bills`, `whitelist/*`) + `entities/notification/NotificationCard`. Обязательные по ТЗ P2P, Shops, Escrow, Profile скелетов не имеют — там либо старый спиннер (`components/ui/Loader.vue`), либо ничего. Покрытие совпадает с недопокрытием ErrorState/EmptyState (см. Этап 7).
- **Дубликат реализации (техдолг).** В виджетах `achievements/*` и `statistics/*` скелет сделан отдельно — локальными CSS-классами `.skeleton-block` + собственный `@keyframes skeleton-loading`, без общего компонента. В проекте существуют два независимых механизма скелетонов с продублированной анимацией.

**Что сделать:**
- [ ] Внедрить `<SkeletonLoader>` в loading-состояния P2P, Shops, Escrow, Profile (вместе с ErrorState/EmptyState из Этапа 7).
- [ ] Заменить кустарные `.skeleton-block` в `achievements/*` и `statistics/*` на общий `SkeletonLoader`, удалить дублирующие `@keyframes skeleton-loading`.
- [ ] Заменить оставшиеся спиннеры (`Loader.vue`) на скелеты там, где известна форма контента (списки, карточки), — скелет точнее передаёт ожидаемый layout.

### TD-4. Компоненты-монолиты (600–900+ строк)
Крупнейшие файлы прикладного слоя нарушают принцип единственной ответственности и декларируемый проектом FSD:
- `pages/shops/listing/[id]/index.vue` — 911 строк;
- `widgets/profile/ProfileStories/*` — ~898 строк;
- `payment-modal.vue` — ~631 строка;
- ещё ряд файлов в диапазоне 500–700 строк.

Такие файлы смешивают разметку, бизнес-логику, локальное состояние и стили; их тяжело ревьюить, тестировать и безопасно менять — особенно при предстоящей интеграции с реальным API (P1 п. 11–12).

**Что сделать:**
- [ ] При переводе страниц на `useApiFetch` (P1 п. 11) параллельно декомпозировать монолиты: вынести секции в entities/features по FSD (галерея товара, блок цены, отзывы, слайдер — отдельные компоненты).
- [ ] Ввести мягкий лимит размера компонента (например, ~300 строк) как договорённость команды/ESLint-правило (`max-lines`).

### TD-5. Гигиена репозитория
- В `tsconfig.json` в `exclude` перечислены папки `"дока бека"` и `"_TZ"` — внутренняя документация и ТЗ лежат прямо в рабочем дереве проекта, с кириллическими именами путей.
- В коде остаются рабочие пометки на русском (например, закомментированный `fetchMyProfile()` с «ВЫЗЫВАЕТ ОШИБКУ» в `pages/whitelist/my-profile.vue`).

**Что сделать:**
- [ ] Вынести `дока бека/` и `_TZ/` из репозитория (в wiki/Notion/отдельный docs-репозиторий) либо переместить в `docs/` с латинскими именами и убрать из `tsconfig.exclude`.
- [ ] Удалить закомментированный «сломанный» код после починки endpoints (P0 п. 4).

### TD-6. Полное отсутствие тестов
В проекте нет ни unit-, ни компонентных, ни e2e-тестов (нет тестовых файлов, тест-раннера в `package.json`, CI-конфигурации). Для финтех-приложения с деньгами, эскроу, P2P-сделками и корзиной это самостоятельный прод-риск: регрессии в денежных потоках нечем ловить.

**Что сделать:**
- [ ] Добавить Vitest + @vue/test-utils; первыми покрыть критичные модули: `utils/apiInterceptors.ts` (401/refresh/retry), `shared/types/api/sanitizers/*`, `store/shops/cart` (валидация цен), `helpers.ts` (локализация дат).
- [ ] Добавить минимальный e2e-смоук (Playwright): логин → dashboard → добавление в корзину → checkout-валидация.
- [ ] Подключить прогон тестов в CI.

---

### Общая оценка
Инфраструктурный слой (Этапы 1, 2, 5, 6, 8, 9, 10.1–10.4) выполнен на высоком уровне, местами лучше референсного кода из ТЗ. Прикладной слой (Этапы 3, 4, 7) выполнен примерно на 40%: каркас построен, но половина сторов не мигрирована, критичные mock-endpoints (auth/user/dashboard) отсутствуют, из-за чего 4 из 5 «интегрированных» страниц и вся авторизация в mock-режиме нерабочие.
