const messages = [
    "Join our company in Technology Zone of Visionary Innovation Hub for unparalleled opportunities in cutting-edge tech development! 15 QUOTAS LEFT!",
    "Become part of the Innovation Zone at Visionary Innovation Hub, where creativity meets research for groundbreaking solutions! 10 QUOTAS LEFT!",
    "Discover the Eco Zone at Visionary Innovation Hub, dedicated to sustainable practices and technologies for a greener future! 12 QUOTAS LEFT!"
];

const videoSources = [
    [
        "https://personal.cs.cityu.edu.hk/~cs2204/2024/video/video1.mp4",
        "https://personal.cs.cityu.edu.hk/~cs2204/2024/video/video1.webm"
    ],
    [
        "https://personal.cs.cityu.edu.hk/~cs2204/2024/video/video2.mp4",
        "https://personal.cs.cityu.edu.hk/~cs2204/2024/video/video2.webm"
    ]
];

const promoContainer = document.querySelector(".promotioninfo h3");
const videoElement = document.querySelector(".promotioninfo video");

let messageIndex = 0;
let videoIndex = 0;

function randomMessage() {
    messageIndex = Math.floor(Math.random() * messages.length);
    promoContainer.innerHTML = messages[messageIndex];
}

function messageupdate() {
    promoContainer.innerHTML = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
}

function videoupdate() {
    videoIndex = (videoIndex + 1) % videoSources.length;
    const currentVideoSources = videoSources[videoIndex];
    videoElement.src = currentVideoSources[0];
    videoElement.load();
    videoElement.play();
}

window.onload = randomMessage;

setInterval(messageupdate, 3000);

videoElement.addEventListener("ended", videoupdate);

videoupdate();
messageupdate();
