// Глобальная переменная для хранения базовой цены выбранного товара
let basePrice = 0;

// 1. Логика переключения вкладок
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
    const activeTab = document.getElementById(tabName);
    if (activeTab) {
        activeTab.style.display = "block";
        setTimeout(() => activeTab.classList.add("active"), 10);
    }
    evt.currentTarget.classList.add("active");
}

// 2. Логика открытия модального окна с динамической ценой
function showModal(productName, price) {
    const modal = document.getElementById("orderModal");
    const modalTitle = document.getElementById("modalProductTitle");
    
    // Сохраняем базовую цену из аргумента функции
    basePrice = parseInt(price); 
    
    modalTitle.innerText = "Заказ: " + productName;
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; 
    
    // Вызываем пересчет цены сразу при открытии
    updatePrice();
}

// 3. Функция пересчета цены при изменении параметров (памяти)
function updatePrice() {
    const storageSelect = document.getElementById("storage");
    const selectedOption = storageSelect.options[storageSelect.selectedIndex];
    
    // Получаем добавочную стоимость из атрибута data-add
    const extraPrice = parseInt(selectedOption.getAttribute("data-add")) || 0;
    
    // Итоговая сумма
    const totalPrice = basePrice + extraPrice;
    
    // Выводим итоговую цену в модальное окно
    document.getElementById("currentPrice").innerText = totalPrice.toLocaleString();
}

// 4. Закрытие окна
function closeModal() {
    document.getElementById("orderModal").style.display = "none";
    document.body.style.overflow = "auto"; 
}

window.onclick = function(event) {
    if (event.target == document.getElementById("orderModal")) closeModal();
}

// 5. ОТПРАВКА В TELEGRAM С ПОЛНОЙ ИНФОРМАЦИЕЙ И ЦЕНОЙ
document.getElementById('orderForm').onsubmit = function(e) {
    e.preventDefault(); 
    
    const token = "8583072238:AAHlyiw7PHkiXP2lSU1CuJ9uhI9epjM2x14";
    const chat_id = "7485083333"; 
    
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const storage = document.getElementById('storage').value;
    const color = document.getElementById('color').value;
    const finalPrice = document.getElementById('currentPrice').innerText;
    const product = document.getElementById("modalProductTitle").innerText;

    const message = `🚀 *НОВЫЙ ЗАКАЗ*\n\n` +
                    `📦 *Товар:* ${product}\n` +
                    `💾 *Память:* ${storage}\n` +
                    `🎨 *Цвет:* ${color}\n` +
                    `💰 *Итоговая сумма:* ${finalPrice} BYN\n\n` +
                    `👤 *Имя:* ${name}\n` +
                    `📞 *Телефон:* ${phone}`;

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;

    fetch(url)
        .then(response => {
            if (response.ok) {
                alert(`Спасибо, ${name}! Заказ на сумму ${finalPrice} BYN успешно отправлен.`);
                closeModal();
                this.reset();
            } else {
                alert("Ошибка! Проверьте, запущен ли бот.");
            }
        })
        .catch(() => alert("Ошибка сети. Попробуйте позже."));
}
