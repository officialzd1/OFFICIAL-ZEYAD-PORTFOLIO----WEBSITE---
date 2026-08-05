// 1. شريط تقدم التمرير العلوي
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let progress = document.getElementById("scrollProgress");
    if (progress) {
        progress.style.width = (winScroll / height) * 100 + "%";
    }
};

// 2. مشغل الصوت والموجات الصوتية (Audio & Waveform)
const audio = document.getElementById('my-audio');
const playBtn = document.getElementById('play-btn');
const waveform = document.getElementById('waveform');

if (waveform && audio && playBtn) {
    // إنشاء 60 خط للموجة
    for (let i = 0; i < 60; i++) {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        waveform.appendChild(bar);
    }

    let audioCtx, analyser, dataArray;

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            if (!audioCtx) {
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
        }
    });

    function draw() {
        if (!audio.paused) {
            requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);
            const bars = document.querySelectorAll('.bar');
            bars.forEach((bar, i) => {
                const height = (dataArray[i] / 255) * 45 + 5; 
                bar.style.height = `${height}px`;
            });
        }
    }

    audio.onended = () => { playBtn.textContent = '▶'; };
}

// 3. ظهور الأقسام بسلاسة عند التمرير (Intersection Observer)
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

// 4. زر العودة للأعلى (Back to Top) وزر تتبع المشاريع
document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
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
    }
});

// 5. تفاعل الاسم والصورة الشخصية (Blur & Profile Toggle)
const nameTrigger = document.getElementById('nameTrigger');
const myPhoto = document.getElementById('myPhoto');
const blurArea = document.querySelector('.blur-area');
const subTitle = document.querySelector('.subtitle');
const clickSound = document.getElementById('clickSound');

if (nameTrigger && myPhoto && blurArea) {
    nameTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (clickSound) {
            clickSound.play().catch(e => console.log("الصوت يحتاج تفاعل المستخدم أولاً"));
        }
        
        blurArea.classList.add('active');
        myPhoto.classList.add('show');
        if (subTitle) subTitle.classList.add('hidden');
        nameTrigger.style.pointerEvents = 'none';
    });

    document.body.addEventListener('click', () => {
        blurArea.classList.remove('active');
        myPhoto.classList.remove('show');
        if (subTitle) subTitle.classList.remove('hidden');
        nameTrigger.style.pointerEvents = 'auto';
    });
}

// 6. إدارة القائمة الجوالة (Mobile Menu)
function toggleMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileNav) mobileNav.classList.toggle('active');
}

function closeMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileNav) mobileNav.classList.remove('active');
}

document.querySelectorAll('#mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

// 7. إدارة الحالة (متاح / مشغول)
function setStatus(isBusy) {
    const badge = document.getElementById('status-badge');
    const statusDot = document.getElementById('status-dot');
    
    if (badge && statusDot) {
        if (isBusy) {
            badge.classList.add('busy');
        } else {
            badge.classList.remove('busy');
        }
    }
}
setStatus(false);

// 8. نظام تتبع المشاريع (Project Tracker Modal)
const myProjects = {
    "ZD1-3": { 
        name: "فلوق يوتيوب",
        status: "paused",
        statusMsg: "تم الإنتهاء | Finished",
        currentStage: 5, 
        stages: [
            "التنزيل | Downloading",
            "الترتيب | Organizing",
            "القص | Cutting",
            "الانتقالات | Transitions",
            "التصدير | Exporting",
            "التسليم | Final Delivery"
        ]
    },
    "ZD1-2": { 
        name: "فيديو يوتيوب",
        status: "paused",
        statusMsg: "تم الإنتهاء | Finished",
        currentStage: 6, 
        stages: [
            "التنزيل | Downloading",
            "الترتيب | Organizing",
            "القص | Cutting",
            "الانتقالات | Transitions",
            "إيقاف مؤقت | Pausing",
            "التصدير | Exporting",
            "التسليم | Final Delivery"
        ]
    },
    "ZD1": { 
        name: "فلوق يوتيوب", 
        status: "paused",
        statusMsg: "تم الإنتهاء | Finished",
        currentStage: 13, 
        stages: [
            "التنزيل | Downloading",
            "الترتيب | Organizing",
            "القص | Cutting",
            "إيقاف مؤقت | Pausing",
            "الترجمة | Subtitling",
            "الانتقالات | Transitions",
            "مؤثرات بصرية | VFX <small style='color: #ff0000; font-size: 0.7em;'>( ملغاة | Canceled )</small>",
            "مؤثرات صوتية | SFX <small style='color: #ff0000; font-size: 0.7em;'>( ملغاة | Canceled )</small>",
            "التصدير | Exporting",
            "التسليم | Final Delivery",
            "فيديو قصير | Short Video <small style='color: #ff0000; font-size: 0.5em;'>( عمل مضاف )</small>",
            "فيديو قصير | Short Video <small style='color: #ff0000; font-size: 0.5em;'>( عمل مضاف )</small>",
            "فيديو قصير | Short Video <small style='color: #ff0000; font-size: 0.5em;'>( عمل مضاف )</small>",
            "التسليم | Final Delivery"
        ]
    }
};

function toggleInfo() {
    const modal = document.getElementById('info-modal');
    if (modal) {
        modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
    }
}

function toggleTracker() {
    const modal = document.getElementById('tracker-modal');
    if (modal) {
        modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
    }
}

function checkProject() {
    const codeInput = document.getElementById('project-code');
    const display = document.getElementById('project-status');
    if (!codeInput || !display) return;

    const code = codeInput.value.toUpperCase();
    const project = myProjects[code];

    if (project) { 
        const statusColors = {
            "active": "#00ff22",
            "paused": "#ff0000",
            "review": "#e67e22"
        };

        const dotColor = statusColors[project.status] || "#6e6e6e";
        
        let timelineHTML = `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 15px; max-height: 250px; overflow-y: auto; width: 100%;">`;
        timelineHTML += `<div style="display: inline-block; text-align: right;">`;
        timelineHTML += `<ul style="list-style: none; padding: 0; margin: 0; position: relative;">`;

        project.stages.forEach((stage, index) => {
            const isCompleted = index < project.currentStage;
            const isActive = index === project.currentStage;
            
            let circleColor = "#ff0000"; // أحمر (لسا ما بدات)
            let textColor = "#a0a0a0";
            let glow = "none";
            
            if (isCompleted) {
                circleColor = "#00ff22"; // أخضر (انتهيت)
                textColor = "#ffffff";
            } else if (isActive) {
                circleColor = "#ffb000"; // ذهبي (المرحلة الحالية)
                textColor = "#ffb000";
                glow = "0 0 10px #ffb000"; 
            } else if (index === project.currentStage + 1) {
                circleColor = "#e67e22"; // برتقالي (اللي شغال عليها)
            }

            timelineHTML += `
                <li style="position: relative; margin-bottom: 14px; font-size: 0.85em; color: ${textColor}; display: flex; align-items: center; justify-content: flex-end; white-space: nowrap;">
                    <span style="margin-left: 24px; text-align: right;">${stage}</span>
                    <span style="position: absolute; right: -22px; width: 12px; height: 12px; background-color: ${circleColor}; border-radius: 50%; box-shadow: ${glow};"></span>
                </li>`;
        });
        
        timelineHTML += `</ul></div></div>`;

        display.innerHTML = `
        <div style="background: rgba(0,0,0,0.5); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); text-align: center;">
            <div style="margin-bottom: 10px; display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
                <span class="online-badge">${project.statusMsg}</span> 
                <span class="status-dot" style="background-color: ${dotColor}; display: inline-block; width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 5px ${dotColor};"></span>
                <strong>مشروع : ${project.name}</strong>
            </div>
            ${timelineHTML}
        </div>`;
    } else {
        display.innerHTML = `<p style="color:red; text-align: center;">كود غير صحيح | Invalid Code</p>`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const daysGrid = document.getElementById('days-grid');
    const bookingModal = document.getElementById('booking-modal');
    const selectedDateText = document.getElementById('selected-date-text');
    const bookingForm = document.getElementById('booking-form');
    
    let selectedDate = '';

    // تحديد الأيام المشغولة لهذا الشهر (مثال: أيام 6, 10, 15, 20 مشغولة والباقي متاح)
    // يمكنك تعديل رقم اليوم ليكون true (متاح) أو false (مشغول/أحمر)
    const busyDays = [6, 10, 15, 20, 25]; 

    // شهر أغسطس 2026 يبدأ يوم السبت (تعديل حسب التقويم الحقيقي)
    // عدد أيام أغسطس 31 يوم
    const totalDays = 31;
    const startDayOffset = 6; // السبت

// إفراغ الشبكة أولاً
    daysGrid.innerHTML = '';

    // إضافة فراغات بداية الشهر
    for (let i = 0; i < startDayOffset; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('day-cell', 'empty');
        daysGrid.appendChild(emptyCell);
    }

    // بناء أيام الشهر
    for (let day = 1; day <= totalDays; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('day-cell');
        dayCell.textContent = day;

        if (busyDays.includes(day)) {
            // يوم مشغول (أحمر ومطفي)
            dayCell.classList.add('busy');
        } else {
            // يوم متاح (أخضر وقابل للنقر)
            dayCell.classList.add('available');
            dayCell.addEventListener('click', function() {
                selectedDate = `أغسطس ${day}, 2026`;
                selectedDateText.textContent = selectedDate;
                bookingModal.style.display = 'block';
                bookingModal.scrollIntoView({ behavior: 'smooth' });
            });
        }

        daysGrid.appendChild(dayCell);
    }

    // إرسال تفاصيل الحجز عبر الواتساب
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const clientName = document.getElementById('client-name').value;
        const projectType = document.getElementById('project-type').value;

        // استبدل هذا الرقم برقم واتساب الخاص بك مع رمز الدولة (مثلاً 9665xxxxxxxx)
        const myWhatsAppNumber = "966560260300"; 
        
        const message = `مرحباً زياد، أرغب بحجز موعد مشروع مونتاج:\n- التاريخ: ${selectedDate}\n- الاسم: ${clientName}\n- نوع المشروع: ${projectType}`;
        const encodedMessage = encodeURIComponent(message);

        window.open(`https://wa.me/${myWhatsAppNumber}?text=${encodedMessage}`, '_blank');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.thumbnail-link');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // إزالة الكلاس النشط من كل الأزرار وإضافته للزر المضغوط
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.item(0).parentElement; // حاوية الأعمال

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
});

function handleEmojiClick(ratingText, needsFeedback) {
    const inputField = document.getElementById('rating-input-value');
    inputField.value = ratingText;

    const feedbackBox = document.getElementById('feedback-box');

    if (needsFeedback) {
        // إذا ضغط زعلان، نفتح له خانة الكتابة وما نرسل مباشرة
        feedbackBox.style.display = 'block';
        document.getElementById('rating-status').textContent = "يرجى كتابة ملاحظتك بالأسفل ثم اضغط إرسال:";
    } else {
        // إذا عادي أو ممتاز، نرسل التقييم مباشرة بدون تعب
        feedbackBox.style.display = 'none';
        submitRatingForm();
    }
}

function submitRatingForm() {
    const form = document.getElementById('rating-form');
    const statusElement = document.getElementById('rating-status');

    statusElement.textContent = "جاري إرسال تقييمك، شكراً لك...";

    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            statusElement.textContent = "شكراً لك! تم استلام تقييمك بنجاح ❤️";
            document.querySelector('.emoji-container').style.display = 'none';
            document.getElementById('feedback-box').style.display = 'none';
        } else {
            statusElement.textContent = "عذراً، حدث خطأ. حاول مرة أخرى.";
        }
    }).catch(error => {
        statusElement.textContent = "تأكد من اتصالك بالإنترنت.";
    });
}

// حدد التاريخ والوقت المستهدف لإطلاق المشروع (مثلاً: 10 أغسطس 2026، الساعة 8 مساءً)
const targetDate = new Date("August 10, 2026 20:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft < 0) {
        document.getElementById("countdown-section").innerHTML = "<h2>تم إطلاق المشروع الآن! شاهد العمل في قسم الأعمال 🚀</h2>";
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = String(days).padStart(2, '0');
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
}

// تحديث العداد كل ثانية
setInterval(updateCountdown, 1000);
updateCountdown();

const form = document.getElementById('my-form');
const successMsg = document.getElementById('form-success-msg');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // يمنع الانتقال لصفحة Formspree البيضاء
    
    const submitBtn = document.getElementById('my-form-button');
    submitBtn.textContent = "جاري الإرسال...";
    submitBtn.disabled = true;

    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // إخفاء الفورم أو تصفيره وإظهار رسالة النجاح وعلامة الصح
            form.reset();
            form.style.display = 'none'; // يفضل إخفاء الفورم بعد النجاح
            successMsg.style.display = 'block'; // إظهار علامة الصح ورسالة النجاح
        } else {
            alert('عذراً، حدث خطأ في إرسال الطلب. حاول مرة أخرى.');
            submitBtn.textContent = 'إرسال الطلب / Order Now';
            submitBtn.disabled = false;
        }
    }).catch(error => {
        alert('تأكد من اتصالك بالإنترنت وحاول مرة أخرى.');
        submitBtn.textContent = 'إرسال الطلب / Order Now';
        submitBtn.disabled = false;
    });
});
