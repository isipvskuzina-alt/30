# Краткий ответ на задания

---

## 1️⃣ СПИСКИ В HTML: ul, ol

### 📌 **<ul> — маркированный (ненумерованный) список**

```html
<ul>
    <li>Молоко</li>
    <li>Хлеб</li>
    <li>Яйца</li>
</ul>
```

**Отображение:**
```
● Молоко
● Хлеб
● Яйца
```

**Типы маркеров:**
```css
ul { list-style-type: disc; }   /* ● (по умолчанию) */
ul { list-style-type: circle; } /* ○ */
ul { list-style-type: square; } /* ■ */
ul { list-style-type: none; }   /* Без маркеров */
```

**Когда использовать:** Порядок не важен (список покупок, меню).

---

### 📌 **<ol> — нумерованный список**

```html
<ol>
    <li>Шаг 1: Открыть крышку</li>
    <li>Шаг 2: Налить воду</li>
    <li>Шаг 3: Включить</li>
</ol>
```

**Отображение:**
```
1. Шаг 1: Открыть крышку
2. Шаг 2: Налить воду
3. Шаг 3: Включить
```

**Типы нумерации:**
```css
ol { list-style-type: decimal; }      /* 1, 2, 3 (по умолчанию) */
ol { list-style-type: lower-roman; }  /* i, ii, iii */
ol { list-style-type: upper-roman; }  /* I, II, III */
ol { list-style-type: lower-alpha; }  /* a, b, c */
ol { list-style-type: upper-alpha; }  /* A, B, C */
```

**Атрибуты:**
```html
<ol start="5">         <!-- Начать с 5 -->
<ol reversed>          <!-- Обратный порядок -->
```

**Когда использовать:** Порядок важен (инструкции, рейтинг, шаги).

---

### 📌 **Сравнение ul и ol**

| Характеристика | **ul** | **ol** |
|----------------|--------|--------|
| **Тип** | Маркированный | Нумерованный |
| **Маркер** | ● ○ ■ | 1, 2, 3 или a, b, c |
| **Порядок** | Не важен | Важен |
| **Пример** | Список покупок | Инструкция |
| **Атрибуты** | - | `start`, `reversed` |

---

### 📌 **Стилизация списков**

```css
/* 1. Убрать маркеры */
ul {
    list-style: none;
    padding: 0;
}

/* 2. Кастомные маркеры (::before) */
ul li::before {
    content: "✦ ";
    color: #6c5ce7;
}

/* 3. Горизонтальное меню */
ul.menu {
    display: flex;
    gap: 20px;
    list-style: none;
}

/* 4. Вложенные списки */
ul ul {
    padding-left: 20px;
    list-style-type: circle;
}
```

---

## 2️⃣ ОБЪЕКТЫ window И document

### 📌 **window — объект браузера**

`window` — глобальный объект, представляющий окно браузера.

```javascript
// === РАЗМЕРЫ ===
window.innerWidth    // Ширина окна
window.innerHeight   // Высота окна

// === УПРАВЛЕНИЕ ===
window.scrollTo(0, 0)     // Прокрутить наверх
window.open('url')        // Открыть новое окно
window.alert('Сообщение') // Диалоговое окно

// === ЛОКАЦИЯ ===
window.location.href      // Текущий URL
window.location.reload()  // Перезагрузить страницу

// === СОБЫТИЯ ===
window.addEventListener('resize', () => {})
window.addEventListener('scroll', () => {})
window.addEventListener('load', () => {})

// === ИНТЕРВАЛЫ ===
setTimeout(() => {}, 1000)   // Через 1 секунду
setInterval(() => {}, 1000)  // Каждую секунду
```

---

### 📌 **document — объект страницы**

`document` — объект, представляющий HTML-страницу.

```javascript
// === ИНФОРМАЦИЯ ===
document.title       // Заголовок страницы
document.URL         // Полный URL
document.readyState  // Состояние загрузки

// === ПОИСК ЭЛЕМЕНТОВ ===
document.getElementById('id')
document.querySelector('.class')
document.querySelectorAll('.class')

// === СОЗДАНИЕ ===
document.createElement('div')
document.createTextNode('текст')

// === СОБЫТИЯ ===
document.addEventListener('DOMContentLoaded', () => {})
document.addEventListener('click', () => {})
document.addEventListener('keydown', () => {})
```

---

### 📌 **window vs document**

| **window** | **document** |
|------------|--------------|
| Браузерное окно | HTML-страница |
| Размеры, скролл, диалоги | Содержимое страницы |
| `window.innerWidth` | `document.title` |
| `window.scrollTo()` | `document.querySelector()` |
| `window.location` | `document.createElement()` |

```javascript
// window содержит document
console.log(window.document === document);  // true

// Глобальные переменные — свойства window
var x = 10;
console.log(window.x);  // 10
```

---

### 📌 **Примеры использования**

```javascript
// 1. Получение информации о странице
console.log('Ширина:', window.innerWidth);
console.log('Заголовок:', document.title);

// 2. Реакция на изменение размера
window.addEventListener('resize', function() {
    console.log('Размер изменён');
});

// 3. Поиск элементов
const board = document.getElementById('boardContainer');
const cards = document.querySelectorAll('.card');

// 4. Создание элементов
const div = document.createElement('div');
div.textContent = 'Привет!';
document.body.appendChild(div);

// 5. Перезагрузка страницы
window.location.reload();

// 6. Прокрутка наверх
window.scrollTo({ top: 0, behavior: 'smooth' });
```

---

## 🎯 Шпаргалка

### Списки

```html
<!-- Ненумерованный -->
<ul>
    <li>Пункт 1</li>
    <li>Пункт 2</li>
</ul>

<!-- Нумерованный -->
<ol>
    <li>Пункт 1</li>
    <li>Пункт 2</li>
</ol>
```

### window и document

```javascript
// window — окно браузера
window.innerWidth
window.scrollTo(0, 0)
window.location.href

// document — страница
document.title
document.getElementById('id')
document.createElement('div')
```