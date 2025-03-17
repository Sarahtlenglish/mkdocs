document.addEventListener('DOMContentLoaded', function() {
    // Fjern alle eksisterende dark mode knapper
    const darkModeButtons = document.querySelectorAll('.theme-toggle, .fake-dark-mode-toggle');
    darkModeButtons.forEach(button => button.remove());

    // Opret vores egen drillende knap
    const button = document.createElement('button');
    button.className = 'fake-dark-mode-toggle';
    button.textContent = '🌙 Dark Mode';
    document.body.appendChild(button);

    button.addEventListener('click', function() {
        // Generer tilfældige koordinater inden for vinduets synlige område
        const maxX = window.innerWidth - button.offsetWidth;
        const maxY = window.innerHeight - button.offsetHeight;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        // Flyt knappen til den nye position
        button.style.left = randomX + 'px';
        button.style.top = randomY + 'px';
        
        // Tilføj en sjov besked
        const messages = [
            "Prøv igen! 😜",
            "Næsten! 😅",
            "Du kan ikke fange mig! 🏃‍♂️",
            "Haha, for langsom! 🤪",
            "Dark mode er overrated! ✨"
        ];
        
        button.textContent = messages[Math.floor(Math.random() * messages.length)];
        
        // Sæt knappen tilbage til original tekst efter 1 sekund
        setTimeout(() => {
            button.textContent = '🌙 Dark Mode';
        }, 1000);
    });
}); 