const targetDate = new Date("August 3, 2026 00:00:00").getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000); // إضافة حساب الثواني

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds; // تحديث الواجهة

    if (difference < 0) {
        clearInterval(timer);
        document.querySelector(".coming-soon").style.display = "none";
    }
}, 1000);