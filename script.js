const langBtn = document.querySelector('.lang-btn');
const nameText = document.getElementById('name-text');
const aboutTitle = document.getElementById('about-title');
const aboutText = document.getElementById('about-text');

langBtn.addEventListener('click', () => {
    nameText.classList.add('fade-out');
    aboutTitle.classList.add('fade-out');
    aboutText.classList.add('fade-out');

    setTimeout(() => {
        if (langBtn.textContent === 'العربية') {
            nameText.textContent = 'زياد';
            aboutTitle.textContent = 'نبذة عني';
            aboutText.textContent = 'أنا زياد، محرر فيديو';
            langBtn.textContent = 'English';
            document.body.style.direction = 'rtl';
        } else {
            nameText.textContent = 'ZEYAD';
            aboutTitle.textContent = 'About Me';
            aboutText.textContent = "I'M ZEYAD , A Video Editor .";
            langBtn.textContent = 'العربية';
            document.body.style.direction = 'ltr';
        }

        nameText.classList.remove('fade-out');
        aboutTitle.classList.remove('fade-out');
        aboutText.classList.remove('fade-out');
    }, 300);
});