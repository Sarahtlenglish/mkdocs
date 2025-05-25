document.addEventListener('DOMContentLoaded', function() {
    // Fjern alle eksisterende dark mode knapper
    const darkModeButtons = document.querySelectorAll('.theme-toggle, .fake-dark-mode-toggle');
    darkModeButtons.forEach(button => button.remove());

    // Opret vores egen drillende knap
    const button = document.createElement('button');
    button.className = 'fake-dark-mode-toggle';
    button.innerHTML = '🌙 Dark Mode';
    document.body.appendChild(button);

    // Array med sjove drille-beskeder
    const messages = [
        "Prøv igen! 😜",
        "Næsten! 😅",
        "Du kan ikke fange mig! 🏃‍♂️",
        "Haha, for langsom! 🤪",
        "Dark mode er overrated! ✨",
        "Ups, jeg flyttede mig! 🙈",
        "Nice try! 😎",
        "Bedre held næste gang! 🍀",
        "Kan du fange mig? 🎯",
        "Nope, ikke her! 🚀"
    ];

    button.addEventListener('click', function() {
        // Beregn tilfældig position inden for vinduet
        const maxX = window.innerWidth - button.offsetWidth;
        const maxY = window.innerHeight - button.offsetHeight;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        // Flyt knappen til den nye position
        button.style.position = 'fixed';
        button.style.left = randomX + 'px';
        button.style.top = randomY + 'px';
        button.style.right = 'auto';

        // Tilføj en sjov animation
        button.style.transition = 'all 0.5s ease';
        
        // Vælg en tilfældig besked
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        button.innerHTML = randomMessage;
        
        // Sæt knappen tilbage til original tekst efter 2 sekunder
        setTimeout(() => {
            button.innerHTML = '🌙 Dark Mode';
        }, 2000);
    });
}); 