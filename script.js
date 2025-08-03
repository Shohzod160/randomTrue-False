document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const resultDiv = document.getElementById('result');
    const card = document.getElementById('card');
    const historyList = document.getElementById('historyList');

    let history = JSON.parse(localStorage.getItem('trueFalseHistory')) || [];

    // Функция для обновления истории на странице
    const updateHistory = () => {
        historyList.innerHTML = '';
        history.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.value;
            li.classList.add(item.value.toLowerCase());
            historyList.appendChild(li);
        });
    };

    // Функция для сохранения истории
    const saveHistory = () => {
        localStorage.setItem('trueFalseHistory', JSON.stringify(history));
    };

    generateBtn.addEventListener('click', () => {
        // Запускаем анимацию
        card.classList.remove('flipped');

        // Генерируем случайное значение: true или false
        const isTrue = Math.random() < 0.5; // [1, 4]
        const result = isTrue ? 'TRUE' : 'FALSE';

        // Добавляем результат в историю
        history.unshift({ value: result });
        if (history.length > 10) {
            history.pop(); // Ограничиваем историю 10 последними записями
        }

        setTimeout(() => {
            resultDiv.textContent = result;
            resultDiv.className = 'back'; // Сбрасываем классы
            resultDiv.classList.add(result.toLowerCase());
            card.classList.add('flipped');

            // Обновляем и сохраняем историю
            updateHistory();
            saveHistory();
        }, 200); // Небольшая задержка для плавности анимации
    });

    // При загрузке страницы отображаем сохраненную историю
    updateHistory();
});