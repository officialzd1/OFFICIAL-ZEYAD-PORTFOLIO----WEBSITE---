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


// بدلاً من التعامل مع id واحد، نأخذ كل الحاويات
document.querySelectorAll('.audio-container').forEach(container => {
    const playBtn = container.querySelector('.play-btn');
    const audio = container.querySelector('.my-audio');
    
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playBtn.textContent = '⏸'; // أيقونة إيقاف
        } else {
            audio.pause();
            playBtn.textContent = '▶'; // أيقونة تشغيل
        }
    });
});