// select all required elements
const filterItems = document.querySelector(".items");
const filterImg = document.querySelectorAll(".image");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentIndex = 0;
let visibleImages = []; // Array to store currently visible images

window.onload = () => {
    filterItems.onclick = (selectedItem) => {
        if (selectedItem.target.classList.contains("item")) {
            filterItems.querySelector(".active").classList.remove("active");
            selectedItem.target.classList.add("active");
            let filterName = selectedItem.target.getAttribute("data-name");
            
            // Reset visible images array
            visibleImages = [];
            
            filterImg.forEach((image, index) => {
                let filterImages = image.getAttribute("data-name");
                
                if ((filterImages == filterName) || (filterName == "all")) {
                    image.classList.remove("hide");
                    image.classList.add("show");
                    visibleImages.push(image); // Add to visible images array
                } else {
                    image.classList.add("hide");
                    image.classList.remove("show");
                }
            });
        }
    };

    // Initialize with all images visible
    visibleImages = Array.from(filterImg);
    
    for (let index = 0; index < filterImg.length; index++) {
        filterImg[index].setAttribute("onclick", "preview(this)");
    }
}

// Preview elements
const previewBox = document.querySelector(".preview-box"),
    previewImg = previewBox.querySelector("img"),
    categoryName = previewBox.querySelector(".title p"),
    closeIcon = previewBox.querySelector(".icon"),
    shadow = document.querySelector(".shadow");

function preview(element) {
    document.querySelector("body").style.overflow = "hidden";
    let selectedPrevImg = element.querySelector("img").src;
    let selectedImgCategory = element.getAttribute("data-name");
    categoryName.textContent = selectedImgCategory;
    previewImg.src = selectedPrevImg;
    previewBox.classList.add("show");
    shadow.classList.add("show");

    // Find the index in visibleImages array
    currentIndex = visibleImages.indexOf(element);
    updateButtons();
}

function updateButtons() {
    // Always show both buttons but disable when at limits
    prevBtn.style.opacity = currentIndex > 0 ? "1" : "0.5";
    prevBtn.style.pointerEvents = currentIndex > 0 ? "all" : "none";
    
    nextBtn.style.opacity = currentIndex < visibleImages.length - 1 ? "1" : "0.5";
    nextBtn.style.pointerEvents = currentIndex < visibleImages.length - 1 ? "all" : "none";
}

prevBtn.onclick = () => {
    if (currentIndex > 0) {
        currentIndex--;
        const prevImage = visibleImages[currentIndex].querySelector("img");
        previewImg.src = prevImage.src;
        categoryName.textContent = visibleImages[currentIndex].getAttribute("data-name");
        updateButtons();
    }
};

nextBtn.onclick = () => {
    if (currentIndex < visibleImages.length - 1) {
        currentIndex++;
        const nextImage = visibleImages[currentIndex].querySelector("img");
        previewImg.src = nextImage.src;
        categoryName.textContent = visibleImages[currentIndex].getAttribute("data-name");
        updateButtons();
    }
};

closeIcon.onclick = () => {
    previewBox.classList.remove("show");
    shadow.classList.remove("show");
    document.querySelector("body").style.overflow = "scroll";
};