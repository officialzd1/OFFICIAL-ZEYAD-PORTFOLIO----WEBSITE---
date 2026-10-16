/* ==========================================================================
   1. بيانات المشاريع ونظام التتبع (Projects & Tracker System)
   ========================================================================== */

const myProjects = {
    "ZD-330": { 
        name: "مشروع مسار مكة - 2026",
        deliveryDate: "08:30PM | 2 October 2026",
        status: "paused",
        currentStage: 6, 
        driveUrl: "https://drive.google.com/file/d/1tVYW-ImbI_BDKxhBcCJACAXKmX7dlhfM/view?usp=sharing",
        stages: [
            { ar: "التنزيل", en: "Downloading" },
            { ar: "المؤثرات البصرية و الإنتقالات", en: "Video Effects & Transition" },
            { ar: "المؤثرات الصوتية و الموسيقى", en: "Sound Effects & Music" },
            { ar: "المراجعة", en: "Review" },
            { ar: "التعديلات", en: "Amendments" },
            { ar: "التصدير", en: "Exporting" },
            { ar: "التسليم", en: "Final Delivery" }
        ]
    },
    "ZD-828": { 
        name: "خليت المتابعين يتحكمون بيومي لمدة 24 ساعة",
        deliveryDate: "09:00AM | 1 October 2026",
        status: "paused",
        currentStage: 7, 
        driveUrl: "https://drive.google.com/file/d/1mIpRaExFLx0IPyGYSlctriJT8ShvQJrg/view?usp=sharing",
        stages: [
            { ar: "التنزيل", en: "Downloading" },
            { ar: "المقدمة", en: "Intro" },
            { ar: "المؤثرات البصرية و الإنتقالات", en: "Video Effects & Transition" },
            { ar: "المؤثرات الصوتية", en: "Sound Effects" },
            { ar: "المراجعة", en: "Review" },
            { ar: "التعديلات", en: "Amendments" },
            { ar: "التصدير", en: "Exporting" },
            { ar: "التسليم", en: "Final Delivery" }
        ]
    },
    "ZD-553": { 
        name: "كأس الخليج 27 - 2026",
        deliveryDate: "1:30PM | 26 September 2026",
        currentStage: 8, 
        driveUrl: "https://drive.google.com/file/d/19V8OCezDiknm84gpSnQ8mmvAqAQhcKeR/view?usp=sharing",
        stages: [
            { ar: "الـــتـــنـــزيـــل", en: "Downloading" },
            { ar: "الـــتـــرتـــيـــب", en: "Organizing" },
            { ar: "الـــقـــص", en: "Cutting" },
            { ar: "الـــتـــلـــويـــن", en: "Coloring" },
            { ar: "الـــتـــرجـــمـــة", en: "Caption" },
            { ar: "الـــمـــراجـــعـــة", en: "Review" },
            { ar: "الـــتـــعـــديـــلات", en: "Amendments" },
            { ar: "الـــتـــصـــديـــر", en: "Exporting" },
            { ar: "الـــتـــســـلـــيـــم", en: "Final Delivery" }
        ]
    },
    "ZD-491": { 
        name: "عرض وزارة الدفاع 2026",
        deliveryDate: "10:00PM | 24 September 2026",
        currentStage: 13, 
        driveUrl: "https://drive.google.com/file/d/1md5sQm0TEO2tFAghKLO0wlwT-tNR0ejb/view?usp=sharing",
        stages: [
            { ar: "التنزيل", en: "Downloading" },
            { ar: "الترتيب", en: "Organizing" },
            { ar: "القص", en: "Cutting" },
            { ar: "التلوين", en: "Coloring" },
            { ar: "المؤثرات البصرية و الإنتقالات", en: "Video Effects & Transition" },
            { ar: "تحسين الصوت بالذكاء الإصطناعي", en: "AI-Powered Audio Enhancement" },
            { ar: "المؤثرات الصوتية والموسيقى", en: "Sound Effects & Music" },
            { ar: "المراجعة", en: "Review" },
            { ar: "التعديلات", en: "Amendments" },
            { ar: "تصدير المعاينة", en: "Export Preview" },
            { ar: "تسليم المعاينة", en: "Pre-delivery Inspection" },
            { ar: "تعديلات العميل", en: "Client Revisions" },
            { ar: "التصدير النهائي", en: "Final Export" },
            { ar: "التسليم النهائي", en: "Final Delivery" }
        ]
    },
    "ZD1": { 
        name: "معاينة تجريبية | Experimental preview",
        deliveryDate: "8:30PM | 24 September 2026",
        currentStage: 8, 
        driveUrl: "https://drive.google.com",
        stages: [
            { ar: "التنزيل", en: "Downloading" },
            { ar: "الترتيب", en: "Organizing" },
            { ar: "القص", en: "Cutting" },
            { ar: "التلوين", en: "Coloring" },
            { ar: "المقدمة", en: "Intro" },
            { ar: "المؤثرات البصرية و الإنتقالات", en: "Video Effects & Transition" },
            { ar: "المؤثرات الصوتية والموسيقى", en: "Sound Effects & Music" },
            { ar: "المراجعة", en: "Review" },
            { ar: "التعديلات", en: "Amendments" },
            { ar: "التصدير", en: "Exporting" },
            { ar: "التسليم", en: "Final Delivery" }
        ]
    },
    "ZD-783": { 
        name: "بدأت يومي بـ 0 ريال وحاولت أجمع مبلغ يكفيني",
        deliveryDate: "12:30PM | 21 September 2026",
        status: "paused",
        currentStage: 8, 
        driveUrl: "https://drive.google.com/file/d/1ttnPPX0thLnQUfCX9XyU6lYLTtf3-gdy/view?usp=sharing",
        stages: [
            { ar: "التنزيل", en: "Downloading" },
            { ar: "توقف مؤقت", en: "Paused" },
            { ar: "المقدمة", en: "Intro" },
            { ar: "المؤثرات البصرية و الإنتقالات", en: "Video Effects & Transition" },
            { ar: "المؤثرات الصوتية", en: "Sound Effects" },
            { ar: "المراجعة", en: "Review" },
            { ar: "التعديلات", en: "Amendments" },
            { ar: "التصدير", en: "Exporting" },
            { ar: "التسليم", en: "Final Delivery" }
        ]
    },
    "ZD-113": { 
        name: "صرت دكتور - Ome.tv",
        deliveryDate: "9:30AM | 31 August 2026 | Monday",
        status: "paused",
        currentStage: 9, 
        driveUrl: "https://drive.google.com/file/d/1VgdActyiAjAmR3fUg6Z17H-tprQ2QZ3z/view?usp=sharing",
        stages: [
            { ar: "التنزيل", en: "Downloading" },
            { ar: "المقدمة", en: "Intro" },
            { ar: "القص", en: "Cutting" },
            { ar: "الميمز", en: "Memes" },
            { ar: "المؤثرات البصرية و الإنتقالات", en: "Video Effects & Transition" },
            { ar: "المؤثرات الصوتية و الموسيقى", en: "Sound Effects & Music" },
            { ar: "المراجعة", en: "Review" },
            { ar: "التعديلات", en: "Amendments" },
            { ar: "التصدير", en: "Exporting" },
            { ar: "التسليم", en: "Final Delivery" }
        ]
    },
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
        driveUrl: "",
        stages: [
            { ar: "التنزيل", en: "Downloading" },
            { ar: "الترتيب", en: "Organizing" },
            { ar: "القص", en: "Cutting" },
            { ar: "الانتقالات", en: "Transitions" },
            { ar: "التصدير", en: "Exporting" },
            { ar: "التسليم", en: "Final Delivery" }
        ]
    }
};

let countdownInterval = null;

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

        const diff = targetDate.getTime() - new Date().getTime();
        if (diff <= 0) {
            timerElement.innerHTML = `<span style="color: #00ff22; font-weight: bold;">انتهى موعد التسليم | Deadline Passed</span>`;
            clearInterval(countdownInterval);
            return;
        }

        const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
        const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');

        timerElement.innerHTML = ` <span style="color: #ffb000; font-weight: bold; font-family: monospace; font-size: 0.95rem;">${hours}:${minutes}:${seconds}</span>`;
    }

    updateTimer();
    countdownInterval = setInterval(updateTimer, 1000);
}

function checkProject() {
    const codeInput = document.getElementById('project-code');
    const display = document.getElementById('project-status');
    const checkBtn = document.querySelector('.check-btn');
    if (!codeInput || !display) return;

    display.innerHTML = "";
    if (checkBtn) {
        checkBtn.classList.add('loading');
    }

    setTimeout(function () {
        if (checkBtn) {
            checkBtn.classList.remove('loading');
        }

        if (countdownInterval) clearInterval(countdownInterval);

        const code = codeInput.value.trim().toUpperCase();
        const project = myProjects[code];

        if (!project) {
            display.innerHTML = `<p style="color:red; text-align: center; padding: 10px;">كود غير صحيح | Invalid Code</p>`;
            return;
        }

        let stagesHTML = project.stages.map((stage, index) => {
            const isCompleted = index < project.currentStage;
            const isActive = index === project.currentStage;
            
            let circleColor = isCompleted ? "#00ff22" : (isActive ? "#ffb000" : "rgba(255, 255, 255, 0.2)"); 
            let textColor = isCompleted ? "#ffffff" : (isActive ? "#ffb000" : "#777777");
            let glow = isActive ? "0 0 10px #ffb000" : "none";

            let arText = typeof stage === 'object' ? stage.ar : stage;
            let enText = typeof stage === 'object' ? stage.en : '';

            return `
                <li style="position: relative; margin-bottom: 20px; font-size: 0.82em; display: flex; align-items: center; justify-content: space-between; width: 100%; direction: ltr; box-sizing: border-box; padding: 0 10px;">
                    <span style="width: 42%; text-align: right; color: ${textColor};">${enText}</span>
                    <div style="width: 16%; display: flex; justify-content: center; position: relative;">
                        <span style="width: 12px; height: 12px; background-color: ${circleColor}; border-radius: 50%; box-shadow: ${glow}; border: 2px solid #111; z-index: 2;"></span>
                    </div>
                    <span style="width: 42%; text-align: left; color: ${textColor};">${arText}</span>
                </li>`;
        }).join('');

        let deliveryHTML = project.deliveryDate ? `
            <div style="margin-top: 25px; margin-bottom: 10px; text-align: center; color: #ffffff; font-size: 0.85rem; width: 100%;">
                <div> <span style="color: #ffb000;">${project.deliveryDate}</span></div>
                <div id="delivery-countdown" style="margin-top: 6px; font-size: 0.85rem; color: #ffffff;"></div>
            </div>` : '';

        let downloadButton = (project.driveUrl && project.driveUrl.trim() !== "") ? `
            <div style="text-align: center; margin-top: 15px; padding-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <a href="${project.driveUrl}" target="_blank" class="drive-btn">إستلام الفيديو 📥 Get Video</a>
            </div>` : '';

        display.innerHTML = `
            <div style="background: rgba(0, 0, 0, 0.6); padding: 15px; border-radius: 10px; border: 1px solid rgba(197, 160, 85, 0.3); text-align: center;">
                <div style="margin-bottom: 12px; text-align: center;">
                    <strong> <span style="color: #ffffff; font-size: 1rem;">${project.name}</span></strong>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; margin-top: 15px; max-height: 210px; overflow-y: auto; width: 100%; padding: 10px 0;">
                    <div style="position: relative; width: 100%; margin-top: 5px;">
                        <div style="position: absolute; top: 10px; bottom: 10px; left: 50%; transform: translateX(-50%); width: 2px; background: rgba(255, 255, 255, 0.15);"></div>
                        <ul style="list-style: none; padding: 0; margin: 0; position: relative; width: 100%;">${stagesHTML}</ul>
                    </div>
                    ${deliveryHTML}
                </div>
                ${downloadButton}
            </div>`;

        if (project.deliveryDate) startCountdown(project.deliveryDate);

    }, 800);
}

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = document.getElementById("scrollProgress");
    
    if (progress && height > 0) {
        progress.style.width = `${(winScroll / height) * 100}%`;
    }
});

// تصفية معرض الأعمال (Portfolio Filter)
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.thumbnail-link');

    if (filterButtons.length && portfolioItems.length) {
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

    // ربط نماذج الإرسال (Formspree) مع إظهار رسالة النجاح الخضراء
    const formMain = document.getElementById('my-form');
    if (formMain) {
        formMain.addEventListener('submit', (e) => handleFormSubmit(e, 'my-form-status', 'form-success-msg', 'my-form-button'));
    }

    const formMobile = document.getElementById('my-form-mobile');
    if (formMobile) {
        formMobile.addEventListener('submit', (e) => handleFormSubmit(e, 'my-form-status-mobile', 'form-success-msg-mobile', 'my-form-button-mobile'));
    }
});


/* ==========================================================================
   2. نظام قسم الطلب وإرسال الرسالة الخضراء (Order Form & Success Message)
   ========================================================================== */

function handleFormSubmit(event, statusId, successMsgId, buttonId) {
    event.preventDefault();

    const form = event.target;
    const formStatus = document.getElementById(statusId);
    const successMsg = document.getElementById(successMsgId);
    const sendBtn = document.getElementById(buttonId);

    if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.innerText = "جاري الإرسال | Sending";
    }

    const data = new FormData(form);

    fetch(form.action, {
        method: form.method || 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            if (formStatus) formStatus.innerHTML = ""; 
            if (successMsg) successMsg.style.display = 'block';

            form.reset();
            setTimeout(() => {
                if (successMsg) successMsg.style.display = 'none';
                if (sendBtn) {
                    sendBtn.innerText = "إرسال الطلب | Order Now";
                    sendBtn.disabled = false;
                }
            }, 4000);
        } else {
            if (successMsg) successMsg.style.display = 'none';
            response.json().then(data => {
                if (formStatus) {
                    formStatus.style.color = "#e74c3c";
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.innerHTML = "حدث خطأ أثناء الإرسال، حاول مرة أخرى.";
                    }
                }
            });
            if (sendBtn) {
                sendBtn.innerText = "إرسال الطلب | Order Now";
                sendBtn.disabled = false;
            }
        }
    }).catch(error => {
        if (successMsg) successMsg.style.display = 'none';
        if (formStatus) {
            formStatus.style.color = "#e74c3c";
            formStatus.innerHTML = "حدث خطأ في الاتصال، حاول لاحقاً.";
        }
        if (sendBtn) {
            sendBtn.innerText = "إرسال الطلب | Order Now";
            sendBtn.disabled = false;
        }
    });
}

function toggleMenu() {
    const mobileNav = document.getElementById('menuItems') || document.getElementById('mobile-nav');
    const burgerToggle = document.getElementById('burgerToggle');
    if (mobileNav) {
        mobileNav.classList.toggle('show');
        mobileNav.classList.toggle('active');
    }
    if (burgerToggle) {
        burgerToggle.classList.toggle('active');
    }
}

function closeMenu() {
    const mobileNav = document.getElementById('menuItems') || document.getElementById('mobile-nav');
    const burgerToggle = document.getElementById('burgerToggle');
    if (mobileNav) {
        mobileNav.classList.remove('show');
        mobileNav.classList.remove('active');
    }
    if (burgerToggle) {
        burgerToggle.classList.remove('active');
    }
}

function setStatus(isBusy) {
    const badge = document.getElementById('status-badge');
    if (badge) {
        badge.classList.toggle('busy', isBusy);
    }
}
setStatus(false);


document.addEventListener('DOMContentLoaded', () => {
    const burgerToggle = document.getElementById('burgerToggle');
    const menuItems = document.getElementById('menuItems') || document.getElementById('mobile-nav');

    if (burgerToggle && menuItems) {
        burgerToggle.addEventListener('click', () => {
            burgerToggle.classList.toggle('active');
            menuItems.classList.toggle('show');
            menuItems.classList.toggle('active');
        });
    }

    // إغلاق النوافذ عند النقر على الخلفية السوداء
    window.addEventListener('click', function (e) {
        const trackerModal = document.getElementById('tracker-modal');
        const orderModal = document.getElementById('order-modal');
        const policyModal = document.getElementById('policyModal');
        const zd1TermsModal = document.getElementById('zd1TermsModal');
        const zd1PolicyModal = document.getElementById('zd1-policy-modal');

        if (trackerModal && e.target === trackerModal) closeModal('tracker-modal');
        if (orderModal && e.target === orderModal) closeModal('order-modal');
        if (policyModal && e.target === policyModal) closeModal('policyModal');
        if (zd1TermsModal && e.target === zd1TermsModal) closeModal('zd1TermsModal');
        if (zd1PolicyModal && e.target === zd1PolicyModal) closeModal('zd1-policy-modal');
    });

    const inputField = document.querySelector('#tracker-modal input, .modal input, #tracker-form input');
    const checkBtn = document.querySelector('#tracker-modal button, .modal button, .check-btn');

    if (inputField) {
        inputField.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.keyCode === 13) {
                event.preventDefault();
                if (checkBtn) checkBtn.click();
            }
        });
    }
});

/* ==========================================================================
   دوال التحكم الموحدة بالنوافذ المنبثقة وإغلاق القائمة فوراً
   ========================================================================== */

function toggleTrackerModal() {
    const trackerModal = document.getElementById('tracker-modal');
    closeMenu(); 

    if (trackerModal) {
        const isOpen = trackerModal.classList.contains('modal-open');
        if (isOpen) {
            closeModal('tracker-modal');
        } else {
            openModal('tracker-modal');
        }
    }
}

function toggleOrderModal() {
    const orderModal = document.getElementById('order-modal');
    closeMenu(); 

    if (orderModal) {
        const isOpen = orderModal.classList.contains('modal-open');
        if (isOpen) {
            closeModal('order-modal');
        } else {
            openModal('order-modal');
        }
    }
}

function togglePolicyModal() {
    const policyModal = document.getElementById('policyModal');
    closeMenu(); 

    if (policyModal) {
        const isOpen = policyModal.classList.contains('modal-open');
        if (isOpen) {
            closeModal('policyModal');
        } else {
            openModal('policyModal');
        }
    }
}

function openModal(modalId) {
    const allModals = document.querySelectorAll('#order-modal, #tracker-modal, #policyModal, #zd1-policy-modal');
    allModals.forEach(modal => {
        modal.classList.remove('modal-open');
        modal.style.display = 'none'; 
    });

    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.style.display = 'flex';
        setTimeout(() => {
            targetModal.classList.add('modal-open');
        }, 10);
    }
}

function closeModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.classList.remove('modal-open');
        setTimeout(() => {
            targetModal.style.display = 'none';
        }, 300); 
    }
}

document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".mobile-bottom-nav .nav-item");

  navItems.forEach(item => {
    item.addEventListener("click", function (e) {
      e.preventDefault();

      // تفعيل الأيقونة فوراً لحظة الضغط
      navItems.forEach(nav => nav.classList.remove("active"));
      this.classList.add("active");

      const targetId = this.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // انتقال سموذ فوري عبر المتصفح
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});

// تفعيل الـ Service Worker ليعمل التطبيق بسلاسة
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then(() => console.log("Service Worker Registered!"))
      .catch((err) => console.log("Service Worker Failed", err));
  });
}

let deferredPrompt;

// التقاط حدث التثبيت من المتصفح
window.addEventListener('beforeinstallprompt', (e) => {
  // منع ظهور نافذة المتصفح الافتراضية
  e.preventDefault();
  deferredPrompt = e;

  // إظهار أيقونة التنزيل داخل قائمة البرجر
  const menuInstallBtn = document.getElementById('menuInstall-btn');
  if (menuInstallBtn) {
    menuInstallBtn.style.display = 'flex'; // أو block حسب التنسيق عندك

    // عند النقر على الأيقونة داخل القائمة
    menuInstallBtn.addEventListener('click', () => {
      if (!deferredPrompt) return;

      // إظهار نافذة التثبيت الرسمية للجوال/المتصفح
      deferredPrompt.prompt();

      // معرفة اختيار المستخدم (هل وافق على التثبيت أم لا)
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
      });
    });
  }
});