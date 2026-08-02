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

document.addEventListener("DOMContentLoaded", function () {
  const videoLinks = document.querySelectorAll("#slider .thumbnail-link");
  const showMoreBtn = document.getElementById("showMoreBtn");
  
  let visibleCount = 3; // عدد الفيديوهات البداية
  const increment = 5;  // عدد الفيديوهات التي تظهر عند الضغط

  function updateVideos() {
    videoLinks.forEach((video, index) => {
      if (index < visibleCount) {
        video.style.display = "block"; // إظهار الفيديو
      } else {
        video.style.display = "none";  // إخفاء الفيديو
      }
    });

    // إذا ظهرت كل الفيديوهات، أخفِ الزر
    if (visibleCount >= videoLinks.length) {
      showMoreBtn.style.display = "none";
    }
  }

  showMoreBtn.addEventListener("click", function () {
    visibleCount += increment;
    updateVideos();
  });

  // تشغيل الدالة أول ما يفتح الموقع
  updateVideos();
});


