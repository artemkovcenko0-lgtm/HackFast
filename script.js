function openTab(evt, tabName) {
    // Скрываем весь контент вкладок
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // Убираем класс active у всех кнопок
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Показываем текущую вкладку и добавляем класс active кнопке
    const currentTab = document.getElementById(tabName);
    currentTab.style.display = "block";
    setTimeout(() => currentTab.classList.add("active"), 10);
    evt.currentTarget.classList.add("active");
}
