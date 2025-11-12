const wheel = document.querySelector('.wheel');
const spinBtn = document.querySelector('#spin-btn');

const degreesPerNumber = 36; 

const targetIndex = 6;

const targetAngle = targetIndex * degreesPerNumber;

let spinCount = 0;
let isSpinning = false
const rotationsPerSpin = 8; 

spinBtn.addEventListener('click', () => {
    if (isSpinning) return;

    isSpinning = true;
    spinCount++; 
    const totalSpinsInDegrees = (spinCount * rotationsPerSpin) * 360; 

    const finalRotation = totalSpinsInDegrees - targetAngle;

    wheel.style.transform = `rotate(${finalRotation}deg)`;
});

wheel.addEventListener('transitionend', () => {
    isSpinning = false;
});