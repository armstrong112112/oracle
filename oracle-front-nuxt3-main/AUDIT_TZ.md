# Аудит выполнения ТЗ «Подготовка Фронтенда к Интеграции с API»

Дата аудита: 2026-07-10
Метод: построчная сверка кодовой базы с каждым пунктом ТЗ, перепроверка grep-критериев из Definition of Done, трассировка вызовов (страница → composable → стор → серверный роут).

Легенда: ✅ выполнено полностью · ⚠️ выполнено частично / с дефектами · ❌ не выполнено

---

## Сводная таблица

| Этап ТЗ | Статус | Кратко |
|---|---|---|
| 1. Сетевой слой (API Client) | ✅ (с 1 дефектом) | httpClient, интерсепторы, useApiClient, useApiFetch созданы; axios удалён. Дефект: useApiFetch не повторяет запрос после refresh |
| 2. SSR-безопасные токены | ✅ | Токены в useCookie, localStorage обёрнут в guards/clientStorage |
| 3. Редизайн Mock-системы | ⚠️ | Каркас Nitro-моков есть; 4 из 8 сторов из таблицы не мигрированы; нет auth/profile mock-роутов |
| 4. useAsyncData / useApiFetch на страницах | ⚠️ | Только 5 страниц; 4 из них бьют в несуществующие endpoints |
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
| `useCartStore` | то����ар из API, не из ProductsData | ✅ | `ADD_TO_CART` запрашивает `/shop/products/:id`, проверяет наличие |
| `useBillsStore` | fetchBills() | ✅ | Есть, через useApiClient |
| `useStoriesStore` | ID с сервера | ✅ | POST на API, ID из ответа |

### Критические пробелы в mock-роутах ❌
Сторы и страницы обращаются к endpoints, которых нет в `server/api/v1/` — при дефолтном `NUXT_PUBLIC_USE_MOCKS=true` эти запросы получают 404:
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

### Что сделать
- [ ] Починить endpoints 4 сломанных страниц (см. чек-лист Этапа 3) и раскомментировать/восстановить реальные вызовы.
- [ ] Dashboard: связать данные ответа `/dashboard/summary` с шаблоном (баланс, монеты, карточки).
- [ ] Перевести на `useApiFetch` страницы: P2P список офферов (`/offers`), P2P детали сделки, Shops каталог (`/listings`), Shops товар (`/shop/products/:id`), Shops корзина, Escrow список (`/escrow`), Profile (`/user/my-profile`).
- [ ] Для страниц, зависящих от сторов, применить `callOnce()` + `useAsyncData` с ключом.

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

### Что сделать
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
11. [ ] Перевести на `useApiFetch` + внедрить Loading/Error/Empty на 7 страниц: P2P офферы, P2P сделка, Shops каталог, Shops товар, Shops корзина, Escrow список, Profile.
12. [ ] Dashboard: рендерить в шаблоне данные из ответа `/dashboard/summary` вместо статики.

### P2 — качество/консистентность
13. [ ] Заменить прямые `localStorage`-вызовы в 3 файлах на `utils/clientStorage.ts`.
14. [ ] Сверить DTO/санитайзеры с финальной конвенцией бэкенда (snake_case/camelCase, Timestamp, enum, int64-как-string).
15. [ ] Ручная проверка DoD #9 (один запрос в Network, без hydration mismatch) после выполне��и�� P0–P1.

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
- [ ] Устранить `@ts-ignore`, заменив на корректную типизацию; где невозможно сразу — заменить на `@ts-expect-error` с комментарием-причиной, чтобы «мёртвые» подавления сами всплывали при исправлении.
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

---

### Общая оценка
Инфраструктурный слой (Этапы 1, 2, 5, 6, 8, 9, 10.1–10.4) выполнен на высоком уровне, местами лучше референсного кода из ТЗ. Прикладной слой (Этапы 3, 4, 7) выполнен примерно на 40%: каркас построен, но половина сторов не мигрирована, критичные mock-endpoints (auth/user/dashboard) отсутствуют, из-за чего 4 из 5 «интегрированных» страниц и вся авторизация в mock-режиме нерабочие.
