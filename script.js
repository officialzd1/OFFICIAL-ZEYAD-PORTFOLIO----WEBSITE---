window.addEventListener('load', () => {
const audio = document.getElementById('myAudio');
setTimeout(() => {
if (audio) {
setTimeout(() => {
}, 0);
audio.play().catch(err => console.log("المتصفح منع التشغيل التلقائي، بانتظار نقرة المستخدم."));
}
});
});