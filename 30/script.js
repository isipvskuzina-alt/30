// ========================================
// 1. ДАННЫЕ
// ========================================

let ideas = [];
let dragIndex = null;

// ========================================
// 2. DOM ЭЛЕМЕНТЫ
// ========================================

const ideaTitle = document.getElementById('ideaTitle');
const ideaImage = document.getElementById('ideaImage');
const ideaDescription = document.getElementById('ideaDescription');
const addBtn = document.getElementById('addBtn');
const boardContainer = document.getElementById('boardContainer');

// ========================================
// 3. LOCALSTORAGE
// ========================================

function loadIdeas() {
    try {
        const saved = localStorage.getItem('ideaBoard');
        if (saved) {
            ideas = JSON.parse(saved);
            return true;
        }
    } catch (e) {
        console.error('Ошибка загрузки:', e);
    }
    return false;
}

function saveIdeas() {
    try {
        localStorage.setItem('ideaBoard', JSON.stringify(ideas));
    } catch (e) {
        console.error('Ошибка сохранения:', e);
    }
}

// ========================================
// 4. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ========================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function clearForm() {
    ideaTitle.value = '';
    ideaImage.value = '';
    ideaDescription.value = '';
    ideaTitle.focus();
}

function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}

// ========================================
// 5. РЕНДЕРИНГ
// ========================================

function renderIdeas() {
    if (ideas.length === 0) {
        boardContainer.innerHTML = `
            <div class="empty-message">
                <span class="emoji">💡</span>
                <p>Нет идей</p>
                <small>Добавьте первую идею!</small>
            </div>
        `;
        return;
    }

    boardContainer.innerHTML = ideas.map((idea, index) => {
        const image = idea.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23f0f2f5"/%3E%3Ctext x="100" y="115" text-anchor="middle" font-size="60" fill="%23b2bec3"%3E💡%3C/text%3E%3C/svg%3E';

        return `
            <div class="idea-card" draggable="true" data-index="${index}">
                <img 
                    class="card-image" 
                    src="${escapeHtml(image)}" 
                    alt="${escapeHtml(idea.title)}"
                    onerror="this.classList.add('error')"
                >
                <div class="card-content">
                    <div class="card-title">${escapeHtml(idea.title)}</div>
                    ${idea.description ? `<div class="card-description">${escapeHtml(idea.description)}</div>` : ''}
                    <div class="card-actions">
                        <button class="delete-btn" onclick="deleteIdea(${index})">🗑️ Удалить</button>
                        <span class="drag-hint">↕ Перетащить</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Добавляем обработчики для drag-and-drop
    const cards = document.querySelectorAll('.idea-card');
    cards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        card.addEventListener('dragover', handleDragOver);
        card.addEventListener('dragenter', handleDragEnter);
        card.addEventListener('dragleave', handleDragLeave);
        card.addEventListener('drop', handleDrop);
    });
}

// ========================================
// 6. DRAG AND DROP (window и document)
// ========================================

function handleDragStart(e) {
    dragIndex = parseInt(e.target.dataset.index);
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';

    // Сохраняем индекс в dataTransfer
    e.dataTransfer.setData('text/plain', dragIndex);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
    e.preventDefault();
    const card = e.target.closest('.idea-card');
    if (card) {
        card.style.borderColor = '#6c5ce7';
        card.style.transform = 'scale(1.02)';
    }
}

function handleDragLeave(e) {
    const card = e.target.closest('.idea-card');
    if (card) {
        card.style.borderColor = 'transparent';
        card.style.transform = 'scale(1)';
    }
}

function handleDrop(e) {
    e.preventDefault();

    const targetCard = e.target.closest('.idea-card');
    if (!targetCard) return;

    targetCard.style.borderColor = 'transparent';
    targetCard.style.transform = 'scale(1)';

    const dropIndex = parseInt(targetCard.dataset.index);

    if (dragIndex !== null && dragIndex !== dropIndex) {
        // Перемещаем элемент в массиве
        const [movedIdea] = ideas.splice(dragIndex, 1);
        ideas.splice(dropIndex, 0, movedIdea);
        saveIdeas();
        renderIdeas();
    }

    dragIndex = null;
}

// ========================================
// 7. ОБЪЕКТЫ window И document
// ========================================

// window — объект браузера
console.log('🌐 window.innerWidth:', window.innerWidth);
console.log('🌐 window.innerHeight:', window.innerHeight);
console.log('🌐 window.location.href:', window.location.href);

// document — объект страницы
console.log('📄 document.title:', document.title);
console.log('📄 document.URL:', document.URL);
console.log('📄 document.readyState:', document.readyState);

// Примеры использования window
window.addEventListener('resize', function() {
    console.log('Размер окна изменён:', window.innerWidth, 'x', window.innerHeight);
});

window.addEventListener('scroll', function() {
    console.log('Скролл:', window.scrollY);
});

// Примеры использования document
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM загружен');
});

// ========================================
// 8. CRUD ОПЕРАЦИИ
// ========================================

function addIdea() {
    const title = ideaTitle.value.trim();
    const image = ideaImage.value.trim();
    const description = ideaDescription.value.trim();

    if (!title) {
        alert('Введите название идеи!');
        ideaTitle.focus();
        return;
    }

    // Проверка URL если введён
    if (image && !isValidUrl(image)) {
        alert('Введите корректную ссылку на изображение!');
        ideaImage.focus();
        return;
    }

    // Проверка на дубликат
    const isDuplicate = ideas.some(i =>
        i.title.toLowerCase() === title.toLowerCase()
    );

    if (isDuplicate) {
        alert('Идея с таким названием уже существует!');
        ideaTitle.focus();
        return;
    }

    const newIdea = {
        id: Date.now().toString(),
        title: title,
        image: image || '',
        description: description || '',
        createdAt: new Date().toISOString()
    };

    ideas.push(newIdea);
    saveIdeas();
    renderIdeas();
    clearForm();

    console.log(`✅ Добавлена идея: ${title}`);
}

function deleteIdea(index) {
    const idea = ideas[index];
    if (!confirm(`Удалить идею "${idea.title}"?`)) return;

    ideas.splice(index, 1);
    saveIdeas();
    renderIdeas();

    console.log(`🗑️ Удалена идея: ${idea.title}`);
}

// ========================================
// 9. ИНИЦИАЛИЗАЦИЯ
// ========================================

function init() {
    console.log('💡 Доска идей');

    // Выводим информацию об объектах window и document
    console.log('📊 Информация о странице:');
    console.log('  - Ширина окна:', window.innerWidth);
    console.log('  - Высота окна:', window.innerHeight);
    console.log('  - URL:', document.URL);
    console.log('  - Заголовок:', document.title);
    console.log('  - Готовность:', document.readyState);

    loadIdeas();
    renderIdeas();

    console.log(`📊 Загружено идей: ${ideas.length}`);

    addBtn.addEventListener('click', addIdea);

    ideaTitle.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            ideaImage.focus();
        }
    });

    ideaImage.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            ideaDescription.focus();
        }
    });

    ideaDescription.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            addIdea();
        }
    });

    console.log('✅ Доска идей готова!');
}

// ========================================
// 10. ЗАПУСК
// ========================================

document.addEventListener('DOMContentLoaded', init);