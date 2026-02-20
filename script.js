// 1. Логика переключения вкладок (iPhone/Mac/iPad/Audio/Watch)
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    
    // Скрываем все вкладки
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    
    // Убираем активный класс у всех кнопок меню
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    
    // Показываем нужную вкладку
    const activeTab = document.getElementById(tabName);
    if (activeTab) {
        activeTab.style.display = "block";
        // Плавное появление через микро-задержку для анимации CSS
        setTimeout(() => activeTab.classList.add("active"), 10);
        
        // Автоматический скролл к началу контента на мобильных устройствах
        if (window.innerWidth < 768) {
            window.scrollTo({ top: activeTab.offsetTop - 100, behavior: 'smooth' });
        }
    }
    
    // Добавляем класс active текущей кнопке
    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }
}

// 2. Логика открытия модального окна (с передачей названия товара)
function showModal(productName = "") {
    const modal = document.getElementById("orderModal");
    if (!modal) return; // Если модалки нет в HTML, не ломаем код

    const modalTitle = modal.querySelector("h2");
    
    // Если передано название товара, меняем заголовок окна
    if (productName && modalTitle) {
        modalTitle.innerText = "Заказ: " + productName;
    } else if (modalTitle) {
        modalTitle.innerText = "Оформление заказа";
    }
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Блокируем прокрутку фона
}

// 3. Логика закрытия окна
function closeModal() {
    const modal = document.getElementById("orderModal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Возвращаем прокрутку фона
    }
}

// 4. Закрытие окна при клике на темный фон или клавишу Escape
window.onclick = function(event) {
    const modal = document.getElementById("orderModal");
    if (event.target == modal) {
        closeModal();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

// 5. Обработка нажатия кнопки "Отправить заказ"
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.onsubmit = function(e) {
        e.preventDefault(); 
        
        const nameInput = this.querySelector('input[type="text"]');
        const name = nameInput ? nameInput.value : "клиент";
        
        // Тут можно добавить отправку данных на сервер/телеграм
        alert(`Спасибо, ${name}! Ваш заказ принят. Наш менеджер скоро свяжется с вами.`);
        
        closeModal();
        this.reset();
    }
}
