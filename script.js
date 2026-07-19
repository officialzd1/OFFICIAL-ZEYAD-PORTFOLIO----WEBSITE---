window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.querySelector(".scroll-progress").style.width = scrolled + "%";
};

// دمج وظائف السكرول في دالة واحدة
window.onscroll = function() {
    // 1. كود شريط التقدم (الذهبي)
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.querySelector(".scroll-progress").style.width = scrolled + "%";

    // 2. كود زر العودة للأعلى (المُعدل للانسيابية)
    const backToTopButton = document.getElementById("backToTopBtn");
    
    if (winScroll > 300) {
        // إذا نزلنا أكثر من 300px، أضف كلاس الظهور
        backToTopButton.classList.add("show");
    } else {
        // إذا كنا في الأعلى، أزل الكلاس ليختفي بهدوء
        backToTopButton.classList.remove("show");
    }
};

// وظيفة الصعود (تبقى كما هي)
function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}