document.addEventListener('DOMContentLoaded', () => {

    const openBtn = document.getElementById('open-gift-btn');
    const mainContent = document.getElementById('main-content');
    let moveCount = 0;

    // Randomly move button on hover to make it hard to click
    openBtn.addEventListener('mouseover', () => {
        if (moveCount < 5) {
            const x = Math.random() * (window.innerWidth - openBtn.clientWidth);
            const y = Math.random() * (window.innerHeight - openBtn.clientHeight);
            openBtn.style.position = 'absolute';
            openBtn.style.left = x + 'px';
            openBtn.style.top = y + 'px';
            moveCount++;
        }
    });

    openBtn.addEventListener('click', () => {
        mainContent.classList.remove('hidden');
        document.body.style.backgroundColor = 'black';

        // Funky background flash
        const flashInterval = setInterval(() => {
            if (!document.getElementById('real-version-section').classList.contains('hidden')) {
                document.body.style.backgroundColor = 'black';
                clearInterval(flashInterval);
                return;
            }
            document.body.style.backgroundColor =
                document.body.style.backgroundColor === 'black' ? 'white' : 'black';
        }, 200);
    });

    // Typewriter effect triggered by button
    const showMessageBtn = document.getElementById('show-message-btn');
    const prankMsg = document.getElementById('prank-message');
    const text = "LOADING MESSAGE... ERROR 404 HEART NOT FOUND...";

    showMessageBtn.addEventListener('click', () => {
        showMessageBtn.style.display = 'none';
        let i = 0;
        prankMsg.innerHTML = "";

        function typeWriter() {
            if (i < text.length) {
                prankMsg.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 200); // Even slower speed
            } else {
                // MESSAGE FINISHED - WAIT 3 SECONDS THEN SHOW FINAL SECTION
                setTimeout(() => {
                    const realVersionSection = document.getElementById('real-version-section');
                    realVersionSection.classList.remove('hidden');
                    // Scroll to it
                    realVersionSection.scrollIntoView({ behavior: 'smooth' });
                }, 3000);
            }
        }
        typeWriter();
    });

    // Handle redirect to nice version
    const redirectBtn = document.getElementById('redirect-btn');
    redirectBtn.addEventListener('click', () => {
        window.location.href = '../index.html';
    });
});
