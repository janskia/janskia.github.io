function nextImage(obj, max){
    var splittedImageName = obj.children[0].src.split('.');
    var newIndex = (Number(splittedImageName[splittedImageName.length - 2]) + 1) % max;
    splittedImageName[splittedImageName.length - 2] = newIndex;
    obj.children[0].src = splittedImageName.join('.');
    obj.children[1].innerHTML = (newIndex+1) + "/" + max;
}