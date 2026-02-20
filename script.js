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

// 2. Логика открытия модального окна
function showModal(productName = "") {
    const modal = document.getElementById("orderModal");
    const modalTitle = modal.querySelector("h2");
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

// 4. Закрытие окна при клике на фон
window.onclick = function(event) {
    var modal = document.getElementById("orderModal");
    if (event.target == modal) {
        closeModal();
    }
}

// 5. ОТПРАВКА ЗАКАЗА В TELEGRAM (С ТВОИМ НОВЫМ ID)
document.getElementById('orderForm').onsubmit = function(e) {
    e.preventDefault(); 
    
    const token = "8583072238:AAHlyiw7PHkiXP2lSU1CuJ9uhI9epjM2x14";
    const chat_id = "7485083333"; // Твой актуальный Chat ID
    
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const product = document.querySelector("#orderModal h2").innerText;

    const message = `🚀 *Новый заказ!*\n📦 *Товар:* ${product}\n👤 *Имя:* ${name}\n📞 *Телефон:* ${phone}`;

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;

    fetch(url)
        .then(response => {
            if (response.ok) {
                alert(`Спасибо, ${name}! Заказ отправлен менеджерам.`);
                closeModal();
                this.reset();
            } else {
                alert("Ошибка отправки. Убедитесь, что вы нажали START в боте.");
            }
        })
        .catch(error => {
            alert("Ошибка сети. Попробуйте позже.");
        });
}
