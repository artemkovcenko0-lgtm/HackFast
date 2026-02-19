// 1. Логика переключения вкладок (iPhone/Mac/Watch)
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    setTimeout(() => document.getElementById(tabName).classList.add("active"), 10);
    evt.currentTarget.classList.add("active");
}

// 2. Логика открытия модального окна
function showModal() {
    document.getElementById("orderModal").style.display = "block";
    // Блокируем прокрутку сайта, пока открыто окно
    document.body.style.overflow = "hidden"; 
}

// 3. Логика закрытия окна
function closeModal() {
    document.getElementById("orderModal").style.display = "none";
    // Возвращаем прокрутку
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
    e.preventDefault(); // Чтобы страница не перезагружалась
    
    // Показываем сообщение об успехе
    alert('Спасибо за заказ! Наш менеджер скоро свяжется с вами.');
    
    // Закрываем окно и очищаем поля
    closeModal();
    this.reset();
}
