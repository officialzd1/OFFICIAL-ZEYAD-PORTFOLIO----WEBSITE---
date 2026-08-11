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

    "ZD1-8": { 
        name: "فلوق يوتيوب",
        status: "paused",
        currentStage: 3, 
        stages: [
            { ar: "التنزيل", en: "Downloading" },
            { ar: "الترتيب", en: "Organizing" },
            { ar: "القص", en: "Cutting" },
            { ar: "الانتقالات", en: "Transitions" },
            { ar: "التصدير", en: "Exporting" },
            { ar: "التسليم", en: "Final Delivery" }
        ]
    },

"ZD1": { 
name: "فلوق يوتيوب", 

status: "paused",
statusMsg: " تم الإنتهاء | Finished ",
currentStage: 14, 
previewUrl: "your-video1.mp4",        
stages: [
            
"التنزيل Downloading <span style='color: #2ecc71;'>100%</span>",
"الترتيب Organizing <span style='color: #2ecc71;'>100%</span>",
"القص Cutting <span style='color: #2ecc71;'>100%</span>",
"إيقاف مؤقت Pausing",
"الترجمة Subtitling <span style='color: #2ecc71;'>92%</span>",
"الانتقالات Transitions <span style='color: #2ecc71;'>100%</span>",
"مؤثرات بصرية VFX <small style='color: #ff0000; font-size: 0.7em;'>( ملغاة | Canceled )</small>",
"مؤثرات صوتية SFX <small style='color: #ff0000; font-size: 0.7em;'>( ملغاة | Canceled )</small>",
"التصدير Exporting <span style='color: #2ecc71;'>100%</span>",
"التسليم ✓ Final Delivery",

" فيديو قصير | Short Video | <span style='color: #2ecc71;'>100%</span> <small style='color: #ff0000; font-size: 0.5em;'>( عمل مضاف | Extra work )</small>",
" فيديو قصير | Short Video | <span style='color: #2ecc71;'>100%</span> <small style='color: #ff0000; font-size: 0.5em;'>( عمل مضاف | Extra work )</small>",
" فيديو قصير | Short Video | <span style='color: #2ecc71;'>100%</span> <small style='color: #ff0000; font-size: 0.5em;'>( عمل مضاف | Extra work )</small>",
"التسليم ✓ Final Delivery",]},};

function toggleInfo() {
const modal = document.getElementById('info-modal');
modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';}

function checkProject() {
    const codeInput = document.getElementById('project-code');
    const display = document.getElementById('project-status');
    if (!codeInput || !display) return;

    const code = codeInput.value.trim().toUpperCase();
    const project = myProjects[code];

    if (project) { 
        let timelineHTML = `<div style="display: flex; flex-direction: column; align-items: center; margin-top: 15px; max-height: 260px; overflow-y: auto; width: 100%; box-sizing: border-box; padding: 10px 0;">`;
        timelineHTML += `<div style="position: relative; width: 100%; margin-top: 5px;">`;
        
        // الخط العمودي في المنتصف تماماً
        timelineHTML += `<div style="position: absolute; top: 10px; bottom: 10px; left: 50%; transform: translateX(-50%); width: 2px; background: rgba(255, 255, 255, 0.15);"></div>`;
        timelineHTML += `<ul style="list-style: none; padding: 0; margin: 0; position: relative; width: 100%;">`;

        project.stages.forEach((stage, index) => {
            const isCompleted = index < project.currentStage;
            const isActive = index === project.currentStage;
            
            let circleColor = "rgba(255, 255, 255, 0.2)"; 
            let arColor = "#777777";
            let enColor = "#777777";
            let glow = "none";
            
            if (isCompleted) {
                circleColor = "#00ff22"; 
                arColor = "#ffffff";
                enColor = "#ffffff";
            } else if (isActive) {
                circleColor = "#ffb000"; 
                arColor = "#ffb000";
                enColor = "#ffb000";
                glow = "0 0 10px #ffb000";
            }

            let arText = typeof stage === 'object' ? stage.ar : stage;
            let enText = typeof stage === 'object' ? stage.en : '';

            timelineHTML += `
                <li style="position: relative; margin-bottom: 20px; font-size: 0.82em; display: flex; align-items: center; justify-content: space-between; width: 100%; direction: ltr; box-sizing: border-box; padding: 0 10px;">
                    <!-- النص الانجليزي على اليسار -->
                    <span style="width: 42%; text-align: right; color: ${enColor}; box-sizing: border-box;">${enText}</span>
                    
                    <!-- الدائرة في المنتصف تماماً -->
                    <div style="width: 16%; display: flex; justify-content: center; position: relative;">
                        <span style="width: 12px; height: 12px; background-color: ${circleColor}; border-radius: 50%; box-shadow: ${glow}; border: 2px solid #111; z-index: 2;"></span>
                    </div>
                    
                    <!-- النص العربي على اليمين -->
                    <span style="width: 42%; text-align: left; color: ${arColor}; box-sizing: border-box;">${arText}</span>
                </li>`;
        });
        
        timelineHTML += `</ul></div></div>`;

        display.innerHTML = `
        <div style="background: rgba(0,0,0,0.6); padding: 15px; border-radius: 10px; border: 1px solid rgba(197,160,89,0.3); text-align: center;">
            <div style="margin-bottom: 12px; text-align: center;">
                <strong style="color: #fcf6ba; font-size: 1rem;">مشروع : ${project.name}</strong>
            </div>
            ${timelineHTML}
        </div>`;
    } else {
        display.innerHTML = `<p style="color:red; text-align: center; padding: 10px;">كود غير صحيح | Invalid Code</p>`;
    }
}
    
function toggleTracker() {
const modal = document.getElementById('tracker-modal');
if (modal.style.display === 'flex') {
modal.style.display = 'none';
} else {
modal.style.display = 'flex';
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

window.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 768) {
        // إنشاء زر البرجر برمجياً للجوال
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-utility-toggle';
        toggleBtn.innerHTML = '<span></span><span></span><span></span>';
        document.body.appendChild(toggleBtn);

        // إنشاء حاوية القائمة المنبثقة
        const menuWrapper = document.createElement('div');
        menuWrapper.className = 'mobile-utility-menu';
        document.body.appendChild(menuWrapper);

        // جلب زر الحالة وزر تتبع المشروع وإضافتهما داخل القائمة
        const statusBadge = document.getElementById('status-badge');
        const trackBtn = document.querySelector('.track-btn');

        if (statusBadge) menuWrapper.appendChild(statusBadge);
        if (trackBtn) menuWrapper.appendChild(trackBtn);

        // إنشاء أزرار التواصل الاجتماعي وإضافتها للقائمة
        // إنشاء أزرار التواصل الاجتماعي وإضافتها للقائمة (الشكل المطلوب)
        const socialDiv = document.createElement('div');
        socialDiv.style.cssText = "display: flex; gap: 15px; margin-top: 25px; justify-content: center;";
        socialDiv.innerHTML = `
            <a href="https://wa.me/966562650100" target="_blank" style="padding: 10px 25px; background: #00e676; border-radius: 50px; color: #000; text-decoration: none; font-size: 14px; font-weight: bold; transition: 0.3s; text-align: center; line-height: normal; display: inline-block;">WhatsApp</a>
            <a href="https://www.instagram.com/officialzd1/" target="_blank" style="padding: 10px 25px; background: #ff0050; border-radius: 50px; color: #000; text-decoration: none; font-size: 14px; font-weight: bold; transition: 0.3s; text-align: center; line-height: normal; display: inline-block;">Instagram</a>
        `;
        menuWrapper.appendChild(socialDiv);

        // تفعيل فتح وإغلاق القائمة عند الضغط على زر البرجر
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('utility-menu-active');
        });

        // إغلاق القائمة تلقائياً عند النقر على أي زر بداخلهما
        [statusBadge, trackBtn, socialDiv].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => {
                    document.body.classList.remove('utility-menu-active');
                });
            }
        });
    }
});

function toggleNote(event) {
  event.stopPropagation();
  const tooltip = event.currentTarget;
  tooltip.classList.toggle('active');
}

// إغلاق المستطيل إذا ضغط العميل في أي مكان آخر بالصفحة
document.addEventListener('click', function() {
  const activeTooltips = document.querySelectorAll('.info-tooltip.active');
  activeTooltips.forEach(item => item.classList.remove('active'));
});