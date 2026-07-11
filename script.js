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
setStatus(true);









































































































const myProjects = {




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
"المراجعة Review <span style='color: #2ecc71;'>100%</span>",
"التصدير Exporting <span style='color: #2ecc71;'>100%</span>",
"التسليم ✓ Final Delivery",

" فيديو قصير | Short Video | <span style='color: #2ecc71;'>100%</span> <small style='color: #ff0000; font-size: 0.5em;'>( عمل مضاف | Extra work )</small>",
" فيديو قصير | Short Video | <span style='color: #2ecc71;'>100%</span> <small style='color: #ff0000; font-size: 0.5em;'>( عمل مضاف | Extra work )</small>",
" فيديو قصير | Short Video | <span style='color: #2ecc71;'>100%</span> <small style='color: #ff0000; font-size: 0.5em;'>( عمل مضاف | Extra work )</small>",
"التسليم ✓ Final Delivery"
,

] 
},





"ZD1-2": { 
name: " فيديو يوتيوب ",
status: "active",
statusMsg: " جاري العمل | In Progress ",
currentStage: 2, 
stages: [
    
"التنزيل Downloading <span style='color: #00ff22;'>100%</span>",
"الترتيب Organizing <span style='color: #00ff22;'>100%</span>",
"القص Cutting <span style='color: #e67e22;'>74%</span>",
"الانتقالات Transitions <span style='color: #e67e22;'>74%</span>",
"التصدير Exporting <span style='color: #ffffff;'>0%</span>",
"التسليم ✓ Final Delivery",


] 

}

};




function toggleInfo() {
const modal = document.getElementById('info-modal');
modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

function checkProject() {
const code = document.getElementById('project-code').value.toUpperCase();
const display = document.getElementById('project-status');
const project = myProjects[code];

if (project) { 
const statusColors = {
"active": "#00ff22",
"paused": "#ff0000",
"review": "#e67e22"
};

const dotColor = statusColors[project.status] || "#6e6e6e";
let timelineHTML = `<ul class="timeline">`;
project.stages.forEach((stage, index) => {
const activeClass = index === project.currentStage ? 'active' : '';
timelineHTML += `<li class="${activeClass}">${stage}</li>`;
});
timelineHTML += `</ul>`;
timelineHTML += "</ul>";


display.innerHTML = `
<div style="text-align: center; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; gap: 8px;">
    
    <span class="online-badge">${project.statusMsg}</span> 
    
    <span class="status-dot" style="background-color: ${dotColor}; display: inline-block; width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 5px ${dotColor};"></span>
    
    <strong>مشروع : ${project.name}</strong>
</div>
${timelineHTML}`;

} else {
display.innerHTML = "<p style='color:red;'> كود غير صحيح | Invalid Code </p>";
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

// اجعل هذا المتغير هو مرجعك الوحيد لحالة عملك
const isBusy = false; // غيّر هذه القيمة إلى false عندما تصبح متاحاً

document.addEventListener("DOMContentLoaded", function() {
    const bookingBtn = document.getElementById('booking-btn');
    
    // إذا كنت متاحاً، أظهر الزر
    if (!isBusy) {
        bookingBtn.style.display = 'inline-block';
    } else {
        bookingBtn.style.display = 'none';
    }



    // افتراضاً أن هذا هو المتغير الذي يحتوي على الكود الذي أدخله العميل
let inputCode = document.getElementById('your-input-id').value; // غير your-input-id إلى الـ ID حق مربع النص عندك

if (inputCode === "zd1") {
    // هنا نضيف النص الذي تريده
    document.getElementById('result-container').innerHTML = `
        <p style="color: #2ecc71; font-size: 18px; text-align: center; margin-top: 20px;">
            تم الانتهاء من هذا المشروع
        </p>
    `;
}
});














































































// هنا تحدد الأيام التي تكون فيها مشغولاً يدوياً
const busyDates = [


"2026-07-10",
"2026-07-08",
"2026-07-09",


]; 

const grid = document.getElementById('calendar-grid');

// توليد أيام الشهر (مثال مبسط لـ 30 يوم)
for (let i = 1; i <= 30; i++) {
    const dateStr = `2026-07-${i < 10 ? '0' + i : i}`;


    
    const pausedDates = [
    "2026-07-20",
    "2026-07-21",
    "2026-07-22",
    "2026-07-23",
    "2026-07-24",
    "2026-07-25",
    "2026-07-26",
    "2026-07-27",
    "2026-07-28",
    "2026-07-29",
    "2026-07-30",
    "2026-07-31",


    

];
 
    // أضف التواريخ التي تريدها هنا
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    dayDiv.innerText = i;
// فحص هل التاريخ موجود في قائمة الانشغال

const currentDate = new Date('2026-07-10'); 
const currentDay = new Date(dateStr); 

if (currentDay < currentDate) {
    dayDiv.classList.add('past-day');
    dayDiv.style.opacity = '0.5';
    dayDiv.style.pointerEvents = 'none';
    dayDiv.innerText = i + "\n"; // اختياري: لتوضيح أن اليوم انتهى
}

    if (busyDates.includes(dateStr)) {
        dayDiv.classList.add('busy');
        dayDiv.innerText += " (مشغول)";
    }

else if (pausedDates.includes(dateStr)) {
    dayDiv.classList.add('paused');
    dayDiv.innerText += " (متوقف)";
}

     else {
        dayDiv.classList.add('free');
        
        
        // هذا هو الكود الوحيد للواتساب
        dayDiv.onclick = function() {
            const phoneNumber = "966560260300"; // تأكد أن الرقم صحيح
            const message = "مرحباً، أريد حجز موعد يوم " + i + " من الشهر الحالي.";
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappUrl, '_blank');
        };
    }

    
    grid.appendChild(dayDiv);


    
    }

    