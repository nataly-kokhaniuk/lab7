'use strict';    

document.addEventListener('click', function(event) {
    const clickedElement = event.target;

    // Якщо клік був на заголовку вузла
    if (clickedElement.classList.contains('node')) {
        // Перевірка наявності дочірніх вузлів
        const childNodes = clickedElement.querySelector('ul');
        if (childNodes) {
            // Зміна видимості дочірніх вузлів
            if (childNodes.style.display === 'none') {
                childNodes.style.display = 'block';
            } else {
                childNodes.style.display = 'none';
            }
        }
    }
});