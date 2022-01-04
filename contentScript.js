var s = document.createElement('script');
s.src = chrome.runtime.getURL('inject.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

document.body.style.backgroundColor = "red";
console.log("yeaahhhh")

window.addEventListener('message', function(event) {
    console.log(event.data);
});