document.addEventListener('DOMContentLoaded', (event) => {
    const hand = document.getElementById('hand');
    const container = document.getElementById('container');
    const hpBar = document.getElementById('hp-bar');
    const timerElement = document.getElementById('timer');
    const heartImageUrl = container.getAttribute('data-heart-url');
    const healthImages = JSON.parse(container.getAttribute('data-health-images'));
    const ayoung = document.getElementById('ayoung');

    let topPosition = 50; // Starting at 50% from the top
    let hp = 100;
    let timeElapsed = 0;
    let objectSpeed = 40; // Initial speed at which objects move towards the hand
    const objectCreationInterval = 2000; // Interval in milliseconds to create objects
    let currentObjectSpeed = objectSpeed;

    // Move the hand up and down
    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                topPosition -= 10;
                if (topPosition < 10) topPosition = 10;
                break;
            case 'ArrowDown':
                topPosition += 10;
                if (topPosition > 90) topPosition = 90;
                break;
        }
        hand.style.top = `${topPosition}%`;
    });

    // Function to update the HP gauge and Ayoung's image
    function updateHpBar() {
        hpBar.style.width = `${hp}%`;
        if (hp >= 90) {
            ayoung.src = healthImages[0];
        } else if (hp > 70) {
            ayoung.src = healthImages[1];
        } else if (hp > 60) {
            ayoung.src = healthImages[2];
        } else if (hp > 40) {
            ayoung.src = healthImages[3];
        } else if (hp > 30) {
            ayoung.src = healthImages[4];
        } else if (hp > 20) {
            ayoung.src = healthImages[5];
        } else {
            ayoung.src = healthImages[6];
        }
    }

    // Function to create a flying object
    function createObject(isHeart = false) {
        const object = document.createElement('img');
        object.src = isHeart ? heartImageUrl : 'https://cdn.britannica.com/68/195168-050-BBAE019A/football.jpg';
        object.classList.add(isHeart ? 'heart' : 'object');
        object.style.position = 'absolute'; // Ensure absolute positioning
        object.style.top = `${10 + Math.random() * 80}%`;
        object.style.left = '0%'; // Start at the left edge
        container.appendChild(object);

        // Move the object towards the right
        let objectPosition = 0;
        const interval = setInterval(() => {
            objectPosition += 2; // Increment the position
            object.style.left = `${objectPosition}%`;

            // Check for collision with the hand
            const objectRect = object.getBoundingClientRect();
            const handRect = hand.getBoundingClientRect();
            if (
                objectRect.right >= handRect.left && // Ensure it touches the hand
                objectRect.left <= handRect.right && // Ensure it overlaps horizontally
                objectRect.top < handRect.bottom && // Ensure it overlaps vertically
                objectRect.bottom > handRect.top // Ensure it overlaps vertically
            ) {
                clearInterval(interval);
                container.removeChild(object);
                if (isHeart) {
                    hp = Math.min(100, hp + 20);
                    updateHpBar();
                }
            } else if (objectRect.left >= window.innerWidth) {
                // Check if the object is off the right edge
                // If the object reaches the right end
                clearInterval(interval);
                container.removeChild(object);
                if (!isHeart) {
                    hp -= 10;
                    updateHpBar();
                    if (hp <= 0) {
                        alert('Game Over!');
                        clearInterval(timerInterval);
                        location.reload();
                    }
                }
            }
        }, currentObjectSpeed);
    }

    // Create objects at intervals with a lower probability for hearts
    const objectInterval = setInterval(() => {
        const isHeart = Math.random() < 0.1; // 10% chance to create a heart
        createObject(isHeart);
    }, objectCreationInterval);

    // Timer to update elapsed time and increase speed
    const timerInterval = setInterval(() => {
        timeElapsed += 1;
        timerElement.textContent = `Time: ${timeElapsed}s`;

        // Increase speed every 10 seconds
        if (timeElapsed % 10 === 0) {
            currentObjectSpeed = Math.max(5, currentObjectSpeed - 10); // Increase speed by 50%
        }
    }, 1000);
});
