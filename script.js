window.onscroll = function() {
let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
document.getElementById("scrollProgress").style.width = (winScroll / height) * 100 + "%";
};

















const audio = document.getElementById('my-audio');
const playBtn = document.getElementById('play-btn');
const waveform = document.getElementById('waveform');

// إنشاء 60 خط للموجة
for (let i = 0; i < 60; i++) {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.width = "3px";
    bar.style.height = "10px";
    bar.style.backgroundColor = "white";
    waveform.appendChild(bar);
}

let audioCtx, analyser, dataArray;

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        if (!audioCtx) { // إعداد محلل الصوت لأول مرة
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioCtx.createMediaElementSource(audio);
            analyser = audioCtx.createAnalyser();
            source.connect(analyser);
            analyser.connect(audioCtx.destination);
            analyser.fftSize = 128;
            dataArray = new Uint8Array(analyser.frequencyBinCount);
        }
        audio.play();
        playBtn.textContent = '⏸';
        draw();
    } else {
        audio.pause();
        playBtn.textContent = '▶';
        pauseIcon.style.display = 'none';
    }
});

function draw() {
    if (!audio.paused) {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, i) => {
            // نتحكم في الارتفاع بحيث يتراوح بين 5px و 50px
            const height = (dataArray[i] / 255) * 45 + 5; 
            bar.style.height = `${height}px`;
        });
    }
}

audio.onended = () => { playBtn.textContent = '▶'; };











const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});



document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});





const nameTrigger = document.getElementById('nameTrigger');
const myPhoto = document.getElementById('myPhoto');
const blurArea = document.querySelector('.blur-area');
const subTitle = document.querySelector('.subtitle'); // تأكد من وجود كلاس subtitle في الـ HTML

nameTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    blurArea.classList.add('active'); // هذا سيرفع الاسم بسبب الـ transform اللي أضفناه في الـ CSS
    myPhoto.classList.add('show');
    subTitle.classList.add('hidden'); // إخفاء كلمة PORTFOLIO
});

document.body.addEventListener('click', () => {
    blurArea.classList.remove('active');
    myPhoto.classList.remove('show');
    subTitle.classList.remove('hidden'); // إظهار النص
});




const clickSound = document.getElementById('clickSound');

nameTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // تشغيل الصوت
    clickSound.play().catch(e => console.log("الصوت يحتاج تفاعل المستخدم أولاً"));
    
    blurArea.classList.add('active');
    myPhoto.classList.add('show');
    subTitle.classList.add('hidden');
    nameTrigger.style.pointerEvents = 'none';
});


function toggleMenu() {
    document.getElementById('mobile-nav').classList.toggle('active');
}

function closeMenu() {
    document.getElementById('mobile-nav').classList.remove('active');
}

// دالة تبديل القائمة (التي لديك حالياً)
function toggleMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    mobileNav.classList.toggle('active');
}

// إضافة حدث لجميع روابط القائمة لتغلق عند الضغط عليها
document.querySelectorAll('#mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

function toggleMenu() {
    document.getElementById('mobile-nav').classList.toggle('active');
}


// دالة فتح/غلق النافذة
function toggleInfo() {
    const modal = document.getElementById('info-modal');
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

// دالة لتغيير الحالة برمجياً (استخدمها متى ما احتجت)
function setStatus(isBusy) {
    const badge = document.getElementById('status-badge');
    const text = document.getElementById('status-text');
    
    if (isBusy) {
        badge.classList.add('busy');
        text.innerText = 'مشغول Busy';
    } else {
        badge.classList.remove('busy');
        text.innerText = 'متاح Available ';
    }
}
setStatus(false);





















































































































function checkProject() {
    const code = document.getElementById('project-code').value.toUpperCase(); // نحول الكود لحروف كبيرة لضمان التطابق
    const display = document.getElementById('project-status');

    const projects = {
        "ZD1": { name: "فيديو إعلاني لشركة X", stage: "🎨 مرحلة التلوين (Color Grading)" },
        "ZD1": { name: "مقطع يوتيوب", stage: "✂️ مرحلة المونتاج (Editing)" }
    };

    // تأثير بسيط عند التحقق
    display.innerHTML = "جاري البحث...";

    setTimeout(() => {
        if (projects[code]) {
            display.innerHTML = `
                <div style="text-align: left; color: #fff;">
                    <p><strong>📦 المشروع:</strong> ${projects[code].name}</p>
                    <p><strong>🚀 الحالة:</strong> ${projects[code].stage}</p>
                </div>`;
        } else {
            display.innerHTML = "<p style='color: #ff4444;'>❌ كود غير صحيح، تأكد من الكود!</p>";
        }
    }, 600); // تأخير بسيط ليعطي شعور الاحترافية
}

function toggleTracker() {
    const modal = document.getElementById('tracker-modal');
    // إذا كانت النافذة مخفية افتحها، وإذا كانت مفتوحة أغلقها
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
    }
}


function checkProject() {
    const code = document.getElementById('project-code').value.toUpperCase();
    const display = document.getElementById('project-status');
    
    // المراحل الثابتة
    const stages = ["القص (Cutting)",
         "التلوين (Color Grading)",
         "مؤثرات صوتية (SFX)",
          "المراجعة (Review)",
           "تسليم نهائي"];
    const projects = {
        "ZD1": { name: "مقطع يوتيوب", currentStage: 4 } // 1 يعني التلوين
    };

    if (projects[code]) {
        let timelineHTML = `<ul class="timeline">`;
        stages.forEach((stage, index) => {
            const activeClass = (index === projects[code].currentStage) ? "active" : "";
            timelineHTML += `<li class="${activeClass}">${stage}</li>`;
        });
        timelineHTML += `</ul>`;

        display.innerHTML = `<strong>مشروع: ${projects[code].name}</strong>` + timelineHTML;
    } else {
        display.innerHTML = "<p style='color:red;'>كود غير صحيح.</p>";
    }
}