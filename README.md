# avito-ad-moderation-ui-tests

E2E тесты на Playwright для платформы модерации объявлений

### Требования

- Node.js 18+ (лучше LTS)
- npm 9+

### Установка

Установить зависимости:

```bash
npm install
```
Удостовериться, что установились браузеры
```bash
npx playwright install
```

### Запуск тестов

Запустить все тесты:

```bash
npx playwright test
```

Запустить конкретный тестовый файл filterCategory.test.ts:
```bash
npx playwright test tests/desktop/adsTests/filterTests/filterCategory.test.ts
```

Запустить конкретный тест по названию:
```bash
npx playwright test -g "Фильтрация по категории"
```

Открыть отчет по тестам:
```bash
npx playwright show-report
```
