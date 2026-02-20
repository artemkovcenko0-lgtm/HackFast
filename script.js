// 1. Логика переключения вкладок (iPhone/Mac/iPad/Audio/Watch)
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    
    // Скрываем все вкладки
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    
    // Убираем активный класс у всех кнопок
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    
    // Показываем нужную вкладку
    const activeTab = document.getElementById(tabName);
    if (activeTab) {
        activeTab.style.display = "block";
        // Плавное появление через микро-задержку
        setTimeout(() => activeTab.classList.add("active"), 10);
    }
    
    evt.currentTarget.classList.add("active");
}

// 2. Логика открытия модального окна (с передачей названия товара)
function showModal(productName = "") {
    const modal = document.getElementById("orderModal");
    const modalTitle = modal.querySelector("h2");
    
    // Если передано название товара, меняем заголовок
    if (productName) {
        modalTitle.innerText = "Заказ: " + productName;
    } else {
        modalTitle.innerText = "Оформление заказа";
    }
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; 
}

// 3. Логика закрытия окна
function closeModal() {
    document.getElementById("orderModal").style.display = "none";
    document.body.style.overflow = "auto"; 
}

// 4. Закрытие окна при клике на темный фон
window.onclick = function(event) {
    var modal = document.getElementById("orderModal");
    if (event.target == modal) {
        closeModal();
    }
}

// 5. Обработка нажатия кнопки "Отправить заказ"
document.getElementById('orderForm').onsubmit = function(e) {
    e.preventDefault(); 
    
    // Сбор данных из полей (на будущее)
    const name = this.querySelector('input[type="text"]').value;
    
    alert(`Спасибо, ${name}! Ваш заказ принят. Наш менеджер скоро свяжется с вами.`);
    
    closeModal();
    this.reset();
}
