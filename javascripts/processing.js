function initialize() { 
    document.getElementById("flower-image").addEventListener("click", function () { nextImage(this,18); });
 }
 
if (document.readyState === 'complete') {
    initialize();
} else {
    document.addEventListener("DOMContentLoaded", initialize);
}
