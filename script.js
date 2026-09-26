/* ==========================================================================
   1. شريط تقدم التمرير وتصفية الأعمال (Scroll Progress & Portfolio Filter)
   ========================================================================== */

// شريط تقدم التمرير (Scroll Progress Bar)
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = document.getElementById("scrollProgress");
    
    if (progress && height > 0) {
        progress.style.width = `${(winScroll / height) * 0}%`;
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
});


/* ==========================================================================
   2. نظام قسم الطلب وسياسة الدفع (Order Form & Payment Policy System)
   ========================================================================== */

let currentLang = 'ar';

document.addEventListener('DOMContentLoaded', () => {
    const policyModal = document.getElementById('policyModal');
    const openPolicyBtn = document.getElementById('open-policy-btn');

    if (openPolicyBtn && policyModal) {
        openPolicyBtn.addEventListener('click', () => {
            policyModal.style.display = 'flex';
        });
    }

    if (policyModal) {
        window.addEventListener('click', (e) => {
            if (e.target === policyModal) policyModal.style.display = 'none';
        });
    }

    const orderForm = document.getElementById("my-form");
    if (orderForm) {
        orderForm.addEventListener("submit", handleOrderSubmit);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        observer.observe(section);
    });
});

function toggleTooltip(e, selector) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const tooltip = e.currentTarget || e.target.closest(selector);
    if (tooltip) {
        tooltip.classList.toggle('active');
    }
}

function toggleNote(e) { 
    toggleTooltip(e, '.info-tooltip'); 
}

function toggleOrderNote(e) { 
    toggleTooltip(e, '.order-info-tooltip'); 
}

function openPolicyModal() {
    const modal = document.getElementById('policyModal');
    if (modal) modal.style.display = 'flex';
}

function closePolicyModal() {
    const modal = document.getElementById('policyModal');
    if (modal) modal.style.display = 'none';
}

function togglePolicyLanguage() {
    const title = document.getElementById('modal-title');
    const contentAr = document.getElementById('policy-content-ar');
    const contentEn = document.getElementById('policy-content-en');
    const langBtn = document.getElementById('lang-switch-btn');

    if (!title || !contentAr || !contentEn || !langBtn) return;

    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    contentAr.style.display = currentLang === 'ar' ? 'block' : 'none';
    contentEn.style.display = currentLang === 'en' ? 'block' : 'none';
    title.textContent = currentLang === 'ar' ? 'سياسة الدفع' : 'Payment Policy';
    langBtn.textContent = currentLang === 'ar' ? 'English' : 'العربية';
}

async function handleOrderSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formStatus = document.getElementById("my-form-status");
    const sendBtn = document.getElementById("my-form-button");
    const successMsg = document.getElementById("form-success-msg");
    const checkbox = document.getElementById('policy-checkbox');

    if (checkbox && !checkbox.checked) {
        alert('يرجى الموافقة على سياسة الدفع أولاً | Please agree to payment policy');
        return;
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
                if (sendBtn) {
                    sendBtn.innerText = "إرسال الطلب | Order Now";
                    sendBtn.disabled = false;
                }
            }, 3000);
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


/* ==========================================================================
   3. نظام تتبع المشاريع (Project Tracker Modal System)
   ========================================================================== */

const myProjects = {
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
                <li style="position: relative; margin-bottom: ${index === project.stages.length - 1 ? '0' : '20px'}; font-size: 0.82em; display: flex; align-items: center; justify-content: space-between; width: 100%; direction: ltr; box-sizing: border-box; padding: 0 10px;">
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
        const zd1TermsModal = document.getElementById('zd1TermsModal');

        if (trackerModal && e.target === trackerModal) closeModal('tracker-modal');
        if (orderModal && e.target === orderModal) closeModal('order-modal');
        if (zd1TermsModal && e.target === zd1TermsModal) closeModal('zd1TermsModal');
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

    const trackingCheckBtn = document.querySelector('.check-btn') || document.querySelector('#check-btn');
    const resultSection = document.querySelector('#tracker-result') || document.querySelector('.project-details');

    if (resultSection) {
        resultSection.style.display = 'none';
    }

    if (trackingCheckBtn) {
        trackingCheckBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (resultSection) resultSection.style.display = 'none';
            trackingCheckBtn.classList.add('loading');
            setTimeout(function () {
                trackingCheckBtn.classList.remove('loading');
                if (resultSection) resultSection.style.display = 'block';
            }, 800); 
        });
    }
});


/* ==========================================================================
   4. دوال التحكم الموحدة بالنوافذ المنبثقة وإغلاق القائمة فوراً
   ========================================================================== */

// دالة فتح نافذة تتبع المشروع وإغلاق البرجر فوراً
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

// دالة فتح نافذة الطلب وإغلاق البرجر فوراً
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

// فتح نافذة سياسة ZD1 من قائمة البرجر وإغلاق البرجر فوراً
function toggleZd1TermsModal() {
    const modal = document.getElementById('zd1TermsModal');
    closeMenu(); 

    if (modal) {
        const isOpen = modal.classList.contains('modal-open');
        if (isOpen) {
            closeModal('zd1TermsModal');
        } else {
            openModal('zd1TermsModal');
        }
    }
}

function closeZd1TermsModal() {
    const modal = document.getElementById('zd1TermsModal');
    if (modal) {
        modal.classList.remove('modal-open');
        setTimeout(() => {
            modal.style.display = 'none'; 
        }, 300); // متطابقة مع التوقيت العام للإغلاق
    }

    // تحديد مربع الإقرار تلقائياً عند الضغط على فهمت
    const termsCheckbox = document.getElementById('termsCheckbox');
    if (termsCheckbox) {
        termsCheckbox.checked = true;
    }
}

function openModal(modalId) {
    // إذا لم تكن النافذة المراد فتحها هي السياسة، نقفل البقية بشكل طبيعي
    if (modalId !== 'zd1TermsModal') {
        const allModals = document.querySelectorAll('#order-modal, #tracker-modal, #zd1TermsModal');
        allModals.forEach(modal => {
            modal.classList.remove('modal-open');
            modal.style.display = 'none'; 
        });
    }

    // فتح النافذة المطلوبة
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.style.display = 'flex';
        setTimeout(() => {
            targetModal.classList.add('modal-open');
        }, 10);
    }
}

// دالة عامة لإغلاق أي مودل بانسيابية متطابقة
function closeModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.classList.remove('modal-open');
        setTimeout(() => {
            targetModal.style.display = 'none';
        }, 300); // 300ms متطابقة مع التوقيت العام
    }
}


let currentPolicyLang = 'ar';

function togglePolicyLanguage() {
    const title = document.getElementById('policy-modal-title');
    const contentAr = document.getElementById('policy-content-ar');
    const contentEn = document.getElementById('policy-content-en');
    const langBtn = document.getElementById('lang-switch-btn');

    if (!title || !contentAr || !contentEn || !langBtn) return;

    currentPolicyLang = currentPolicyLang === 'ar' ? 'en' : 'ar';

    if (currentPolicyLang === 'ar') {
        contentAr.style.display = 'block';
        contentEn.style.display = 'none';
        title.textContent = 'سياسة-ZD1';
        langBtn.textContent = 'English';
    } else {
        contentAr.style.display = 'none';
        contentEn.style.display = 'block';
        
        // إجبار الحاوية الكبيرة على اليسار
        contentEn.setAttribute('dir', 'ltr');
        contentEn.style.direction = 'ltr';
        contentEn.style.textAlign = 'left';
        
        title.textContent = 'Policy-ZD1';
        langBtn.textContent = 'العربية';
        
        // إجبار كل العناوين والفقرات بالداخل على محاذاة اليسار بقوة !important
        const enElements = contentEn.querySelectorAll('h4, p');
        enElements.forEach(el => {
            el.style.setProperty('direction', 'ltr', 'important');
            el.style.setProperty('text-align', 'left', 'important');
        });
    }
}

document.querySelectorAll('.policy-link-trigger').forEach(link => {
    link.addEventListener('click', function() {
        openModal('zd1TermsModal'); 
    });
});