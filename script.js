var image1=null;
var image2=null;
var canvas1;
var canvas2;

// Get the button element
var mergeButton = document.querySelector(".merge");
var resetButton = document.querySelector(".reset");

function upload1() {
    canvas1 = document.getElementById("canvas1");
    var imgFile1 = document.getElementById("fileInput1");
    image1 = new SimpleImage(imgFile1);
    image1.drawTo(canvas1);
}

function upload2() {
    canvas2 = document.getElementById("canvas2");
    var imgFile2 = document.getElementById("fileInput2");
    image2 = new SimpleImage(imgFile2);
    image2.drawTo(canvas2);
}

function change() {
    canvas3 = document.getElementById("canvas3");

    const bgColor = image1.getPixel(0, 0);
    if (image1.getWidth() !== image2.getWidth() || image1.getHeight() !== image2.getHeight()) {
        image2.setSize(image1.getWidth(), image1.getHeight());
    } else if (image2.getWidth() !== image1.getWidth() || image2.getHeight() !== image1.getHeight()) {
        image1.setSize(image2.getWidth(), image2.getHeight());
    }

    var oimag = new SimpleImage(image1.width, image1.height);

    for (var pixel of image1.values()) {
        if (pixel.getBlue() > pixel.getGreen() + pixel.getRed()) {
            var x = pixel.getX();
            var y = pixel.getY();
            var newPixel = image2.getPixel(x, y);
            oimag.setPixel(x, y, newPixel);
        } else if (pixel.getGreen() > pixel.getBlue() + pixel.getRed()) {
            var x = pixel.getX();
            var y = pixel.getY();
            var newPixel = image2.getPixel(x, y);
            oimag.setPixel(x, y, newPixel);
        } else if (pixel.getRed() > pixel.getBlue() + pixel.getGreen()) {
            var x = pixel.getX();
            var y = pixel.getY();
            var newPixel = image2.getPixel(x, y);
            oimag.setPixel(x, y, newPixel);
        }
       
        else {
            oimag.setPixel(pixel.getX(), pixel.getY(), pixel);
        }
    }
    oimag.drawTo(canvas3);
}

// Add event listener for the button click
mergeButton.addEventListener("click", () => {
    if (image1 === null || image2 === null || image1.getWidth() === 0 || image2.getWidth() === 0) {
        // If either image1 or image2 is not loaded
        alert("First, please upload two images in the image boxes.");
    } else {
        // If both images are loaded
        mergeButton.style.background = 'aquamarine';  // Change button color to grey
        change();  // Proceed with the merging
        mergeButton.style.transition = '.5s ease';
    }
});
resetButton.addEventListener("click", () => {
   if (image1 === null && image2 === null) {
       alert("There are no images to reset.");
   } else {
       // Reset the canvas elements
       var context1 = canvas1.getContext("2d");
       var context2 = canvas2.getContext("2d");
       var context3 = canvas3.getContext("2d");

       context1.clearRect(0, 0, canvas1.width, canvas1.height);
       context2.clearRect(0, 0, canvas2.width, canvas2.height);
       context3.clearRect(0, 0, canvas3.width, canvas3.height);

       // Reset the images
       image1 = null;
       image2 = null;

       // Reset the file input elements
       document.getElementById("fileInput1").value = "";
       document.getElementById("fileInput2").value = "";

       // Optionally reset the button's color or styles
       mergeButton.style.background = 'aquamarine';
       mergeButton.style.transition = '.5s ease';

       
   }
});




