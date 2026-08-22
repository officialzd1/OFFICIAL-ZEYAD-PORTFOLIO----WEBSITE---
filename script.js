/* ==========================================================================
   1. الوظائف العامة والأدوات (General Utilities)
   ========================================================================== */

// شريط تقدم التمرير العلوي
window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let progress = document.getElementById("scrollProgress");
    if (progress) {
        progress.style.width = (winScroll / height) * 100 + "%";
    }
};

// إدارة القائمة الجوالة
function toggleMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileNav) mobileNav.classList.toggle('active');
}

function closeMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileNav) mobileNav.classList.remove('active');
}

// إدارة حالة التوفر (متاح / مشغول)
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

// إظهار وإخفاء التلميحات والملاحظات
function toggleNote(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const tooltip = e.currentTarget || e.target.closest('.info-tooltip');
    if (tooltip) {
        tooltip.classList.toggle('active');
    }
}

function toggleOrderNote(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const tooltip = e.currentTarget || e.target.closest('.order-info-tooltip');
    if (tooltip) {
        tooltip.classList.toggle('active');
    }
}


/* ==========================================================================
   2. نظام تتبع المشاريع (Project Tracker Modal)
   ========================================================================== */

const myProjects = {
    "ZD-743": { 
        name: "سفرة جدة",
        deliveryDate: "8:00AM | 21 August 2026",
        status: "paused",
        currentStage: 10, 
        driveUrl: "https://drive.google.com/file/d/1J5HcDznmWwVGupDLKjaUn4pIVy9Mewan/view?usp=sharing",
        stages: [
            { ar: "التنزيل", en: "Downloading" },
            { ar: "الترتيب", en: "Organizing" },
            { ar: "القص", en: "Cutting" },
            { ar: "التلوين", en: "Coloring" },
            { ar: "المقدمة", en: "Intro" },
            { ar: "المؤثرات البصرية و الإنتقالات", en: "Video Effects & Transition" },
            { ar: "المؤثرات الصوتية و الموسيقى", en: "Sound Effects & Music" },
            { ar: "المراجعة", en: "Review" },
            { ar: "التعديلات", en: "Amendments" },
            { ar: "التصدير", en: "Exporting" },
            { ar: "التسليم", en: "Final Delivery" }
        ]
    },
    "ZD-8": { 
        name: "فلوق يوتيوب",
        status: "paused",
        currentStage: 8, 
        driveUrl: "https://drive.google.com/file/d/YOUR_VIDEO_ID/view",
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
        statusMsg: "تم الإنتهاء | Finished",
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
            "فيديو قصير | Short Video | <span style='color: #2ecc71;'>100%</span> <small style='color: #ff0000; font-size: 0.5em;'>( عمل مضاف | Extra work )</small>",
            "فيديو قصير | Short Video | <span style='color: #2ecc71;'>100%</span> <small style='color: #ff0000; font-size: 0.5em;'>( عمل مضاف | Extra work )</small>",
            "فيديو قصير | Short Video | <span style='color: #2ecc71;'>100%</span> <small style='color: #ff0000; font-size: 0.5em;'>( عمل مضاف | Extra work )</small>",
            "التسليم ✓ Final Delivery"
        ]
    }
};

let countdownInterval = null;

function toggleInfo() {
    const modal = document.getElementById('info-modal');
    if (modal) modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

function toggleTracker() {
    const modal = document.getElementById('tracker-modal');
    if (modal) {
        modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
    }
}

function parseDeliveryDate(dateStr) {
    if (!dateStr) return null;
    
    const regex = /(\d{1,2}):(\d{2})\s*(AM|PM)?\s*\|\s*(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/i;
    const match = dateStr.match(regex);

    if (match) {
        let [_, hours, minutes, period, day, month, year] = match;
        hours = parseInt(hours, 10);
        
        if (period) {
            period = period.toUpperCase();
            if (period === 'PM' && hours < 12) hours += 12;
            if (period === 'AM' && hours === 12) hours = 0;
        }

        const formattedHours = hours < 10 ? '0' + hours : hours;
        return new Date(`${month} ${day}, ${year} ${formattedHours}:${minutes}:00`);
    }

    return new Date(dateStr.replace('|', '').trim());
}

function startCountdown(dateString) {
    if (countdownInterval) clearInterval(countdownInterval);

    function updateTimer() {
        const timerElement = document.getElementById('delivery-countdown');
        if (!timerElement) return;

        const targetDate = parseDeliveryDate(dateString);

        if (!targetDate || isNaN(targetDate.getTime())) {
            timerElement.innerHTML = `<span style="color: #ff4d4d; font-size: 0.75rem;">(صيغة التاريخ غير صحيحة)</span>`;
            return;
        }

        const now = new Date().getTime();
        const diff = targetDate.getTime() - now;

        if (diff <= 0) {
            timerElement.innerHTML = `<span style="color: #00ff22; font-weight: bold;">انتهى موعد التسليم | Deadline Passed</span>`;
            clearInterval(countdownInterval);
            return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const hStr = hours < 10 ? '0' + hours : hours;
        const mStr = minutes < 10 ? '0' + minutes : minutes;
        const sStr = seconds < 10 ? '0' + seconds : seconds;

        timerElement.innerHTML = `المتبقي : <span style="color: #ffb000; font-weight: bold; font-family: monospace; font-size: 0.95rem;">${hStr}:${mStr}:${sStr}</span>`;
    }

    updateTimer();
    countdownInterval = setInterval(updateTimer, 1000);
}

function checkProject() {
    const codeInput = document.getElementById('project-code');
    const display = document.getElementById('project-status');
    if (!codeInput || !display) return;

    if (countdownInterval) clearInterval(countdownInterval);

    const code = codeInput.value.trim().toUpperCase();
    const project = myProjects[code];

    if (project) { 
        let timelineHTML = `<div style="display: flex; flex-direction: column; align-items: center; margin-top: 15px; max-height: 210px; overflow-y: auto; width: 100%; box-sizing: border-box; padding: 10px 0;">`;
        
        timelineHTML += `<div style="position: relative; width: 100%; margin-top: 5px;">`;
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

            const isLast = index === project.stages.length - 1;
            const marginBottom = isLast ? '0px' : '20px';

            timelineHTML += `
                <li style="position: relative; margin-bottom: ${marginBottom}; font-size: 0.82em; display: flex; align-items: center; justify-content: space-between; width: 100%; direction: ltr; box-sizing: border-box; padding: 0 10px;">
                    <span style="width: 42%; text-align: right; color: ${enColor}; box-sizing: border-box;">${enText}</span>
                    <div style="width: 16%; display: flex; justify-content: center; position: relative;">
                        <span style="width: 12px; height: 12px; background-color: ${circleColor}; border-radius: 50%; box-shadow: ${glow}; border: 2px solid #111; z-index: 2;"></span>
                    </div>
                    <span style="width: 42%; text-align: left; color: ${arColor}; box-sizing: border-box;">${arText}</span>
                </li>`;
        });
        
        timelineHTML += `</ul></div>`;

        if (project.deliveryDate) {
            timelineHTML += `
                <div style="margin-top: 25px; margin-bottom: 10px; text-align: center; color: #ffffff; font-size: 0.85rem; width: 100%;">
                    <div>الوقت المتوقع للتسليم : <span style="color: #ffb000;">${project.deliveryDate}</span></div>
                    <div id="delivery-countdown" style="margin-top: 6px; font-size: 0.85rem; color: #ffffff;"></div>
                </div>`;
        }

        timelineHTML += `</div>`;

        let downloadButton = "";
        if (project.driveUrl && project.driveUrl.trim() !== "") {
            downloadButton = `
                <div style="text-align: center; margin-top: 15px; padding-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                    <a href="${project.driveUrl}" target="_blank" class="drive-btn">
                         إستلام الفيديو 📥 Get Video
                    </a>
                </div>
            `;
        }

        display.innerHTML = `
            <div style="background: rgba(0, 0, 0, 0.6); padding: 15px; border-radius: 10px; border: 1px solid rgba(197, 160, 85, 0.3); text-align: center;">
                <div style="margin-bottom: 12px; text-align: center;">
                    <strong>المشروع : <span style="color: #ffffff; font-size: 1rem;">${project.name}</span></strong>
                </div>
                ${timelineHTML}
                ${downloadButton}
            </div>
        `;

        if (project.deliveryDate) {
            startCountdown(project.deliveryDate);
        }

    } else {
        display.innerHTML = `<p style="color:red; text-align: center; padding: 10px;">كود غير صحيح | Invalid Code</p>`;
    }
}


/* ==========================================================================
   3. نظام التقييم (Rating Form)
   ========================================================================== */

function handleEmojiClick(ratingText, needsFeedback) {
    const inputField = document.getElementById('rating-input-value');
    if (inputField) inputField.value = ratingText;

    const feedbackBox = document.getElementById('feedback-box');

    if (needsFeedback) {
        if (feedbackBox) feedbackBox.style.display = 'block';
        const statusElem = document.getElementById('rating-status');
        if (statusElem) statusElem.textContent = "يرجى كتابة ملاحظتك بالأسفل ثم اضغط إرسال:";
    } else {
        if (feedbackBox) feedbackBox.style.display = 'none';
        submitRatingForm();
    }
}

function submitRatingForm() {
    const form = document.getElementById('rating-form');
    const statusElement = document.getElementById('rating-status');

    if (!form) return;
    if (statusElement) statusElement.textContent = "جاري إرسال تقييمك، شكراً لك...";

    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            if (statusElement) statusElement.textContent = "شكراً لك! تم استلام تقييمك بنجاح ❤️";
            const emojiContainer = document.querySelector('.emoji-container');
            if (emojiContainer) emojiContainer.style.display = 'none';
            const feedbackBox = document.getElementById('feedback-box');
            if (feedbackBox) feedbackBox.style.display = 'none';
        } else {
            if (statusElement) statusElement.textContent = "عذراً، حدث خطأ. حاول مرة أخرى.";
        }
    }).catch(error => {
        if (statusElement) statusElement.textContent = "تأكد من اتصالك بالإنترنت.";
    });
}


/* ==========================================================================
   4. العداد التنازلي لإطلاق المشروع (Countdown)
   ========================================================================== */

const targetDate = new Date("August 10, 2026 20:00:00").getTime();

function updateCountdown() {
    const countdownSection = document.getElementById("countdown-section");
    if (!countdownSection) return;

    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft < 0) {
        countdownSection.innerHTML = "<h2>تم إطلاق المشروع الآن! شاهد العمل في قسم الأعمال 🚀</h2>";
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    const dElem = document.getElementById("days");
    const hElem = document.getElementById("hours");
    const mElem = document.getElementById("minutes");
    const sElem = document.getElementById("seconds");

    if (dElem) dElem.textContent = String(days).padStart(2, '0');
    if (hElem) hElem.textContent = String(hours).padStart(2, '0');
    if (mElem) mElem.textContent = String(minutes).padStart(2, '0');
    if (sElem) sElem.textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();


/* ==========================================================================
   5. التهيئة الرئيسية بعد اكتمال تحميل عناصر الصفحة (DOM Ready)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // أ. نموذج الطلب المباشر (Formspree AJAX)
    const orderForm = document.getElementById("my-form");
    const successMsg = document.getElementById("form-success-msg");

    if (orderForm) {
        orderForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const data = new FormData(orderForm);

            fetch(orderForm.action || "https://formspree.io/f/xowdynyw", {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    orderForm.reset();
                    if (successMsg) successMsg.style.display = "block";
                } else {
                    alert("حدث خطأ أثناء إرسال الطلب، يرجى المحاولة لاحقاً.");
                }
            })
            .catch(error => {
                console.error("خطأ الإرسال:", error);
                alert("تأكد من الاتصال بالإنترنت والمحاولة مجدداً.");
            });
        });
    }

    // ب. مشغل الصوت والموجات الصوتية (Audio & Waveform)
    const audio = document.getElementById('my-audio');
    const playBtn = document.getElementById('play-btn');
    const waveform = document.getElementById('waveform');

    if (waveform && audio && playBtn) {
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

    // ج. ظهور الأقسام بسلاسة (Intersection Observer)
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

    // د. زر العودة للأعلى (Back to Top)
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

    // هـ. تفاعل الاسم والصورة الشخصية (Blur & Profile Toggle)
    const nameTrigger = document.getElementById('nameTrigger');
    const myPhoto = document.getElementById('myPhoto');
    const blurArea = document.querySelector('.blur-area');
    const subTitle = document.querySelector('.subtitle');
    const clickSound = document.getElementById('clickSound');

    if (nameTrigger && myPhoto && blurArea) {
        nameTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (clickSound) {
                clickSound.play().catch(err => console.log("الصوت يحتاج تفاعل المستخدم أولاً"));
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

    // و. إغلاق روابط القائمة الجوالة عند النقر
    document.querySelectorAll('#mobile-nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ز. تقويم حجز المواعيد (Booking Calendar)
    const daysGrid = document.getElementById('days-grid');
    const bookingModal = document.getElementById('booking-modal');
    const selectedDateText = document.getElementById('selected-date-text');
    const bookingForm = document.getElementById('booking-form');

    if (daysGrid && bookingModal && bookingForm) {
        let selectedDate = '';
        const busyDays = [6, 10, 15, 20, 25]; 
        const totalDays = 31;
        const startDayOffset = 6; 

        daysGrid.innerHTML = '';

        for (let i = 0; i < startDayOffset; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('day-cell', 'empty');
            daysGrid.appendChild(emptyCell);
        }

        for (let day = 1; day <= totalDays; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('day-cell');
            dayCell.textContent = day;

            if (busyDays.includes(day)) {
                dayCell.classList.add('busy');
            } else {
                dayCell.classList.add('available');
                dayCell.addEventListener('click', function() {
                    selectedDate = `أغسطس ${day}, 2026`;
                    if (selectedDateText) selectedDateText.textContent = selectedDate;
                    bookingModal.style.display = 'block';
                    bookingModal.scrollIntoView({ behavior: 'smooth' });
                });
            }
            daysGrid.appendChild(dayCell);
        }

        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const clientName = document.getElementById('client-name').value;
            const projectType = document.getElementById('project-type').value;
            const myWhatsAppNumber = "966560260300"; 
            
            const message = `مرحباً زياد، أرغب بحجز موعد مشروع مونتاج:\n- التاريخ: ${selectedDate}\n- الاسم: ${clientName}\n- نوع المشروع: ${projectType}`;
            const encodedMessage = encodeURIComponent(message);

            window.open(`https://wa.me/${myWhatsAppNumber}?text=${encodedMessage}`, '_blank');
        });
    }

    // ح. تصفية معرض الأعمال (Portfolio Filter)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.thumbnail-link');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

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
    }
});