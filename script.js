const langBtn = document.querySelector('.lang-btn');
const nameText = document.querySelector('h1');

langBtn.addEventListener('click', () => {
    // 1. أضف كلاس الاختفاء الناعم
    nameText.classList.add('fade-out');

    // 2. انتظر 300 ملي ثانية (وقت تأثير الـ CSS) ثم غيّر النص واظهره مجدداً
    setTimeout(() => {
        if (nameText.textContent === 'ZEYAD') {
            nameText.textContent = 'زياد';
            langBtn.textContent = 'English';
        } else {
            nameText.textContent = 'ZEYAD';
            langBtn.textContent = 'العربية';
        }
        
        // 3. احذف كلاس الاختفاء ليعود النص للظهور بنعومة
        nameText.classList.remove('fade-out');
    }, 300); 
});