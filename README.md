# avito-ad-moderation-ui-tests

E2E тесты на Playwright для платформы модерации объявлений

### Требования

- Node.js 24+
- npm 11+

### Установка

Клонировать репозиторий:
```bash
git clone https://github.com/10xtheo/avito-ad-moderation-ui-tests
```

Перейти в корень проекта:
```bash
cd avito-ad-moderation-ui-tests
```

Установить зависимости:
```bash
npm install
```

Удостовериться, что установились браузеры:
```bash
npx playwright install
```

### Запуск тестов

Запустить все тесты (из корня проекта):

```bash
npx playwright test
```

Запустить конкретный тестовый файл (например filterCategory.test.ts):
```bash
npx playwright test tests/desktop/adsTests/filterTests/filterCategory.test.ts
```

Запустить конкретный тест по названию (например Фильтрация по категории):
```bash
npx playwright test -g "Фильтрация по категории"
```

Открыть отчет по последнему результату тестов:
```bash
npx playwright show-report
```
