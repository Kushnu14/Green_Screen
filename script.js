var image1;
var image2;
var canvas1;
var canvas2;
var canvas3;

function upload1()
{
   canvas1=document.getElementById("canvas1");
   var imgFile=document.getElementById("fileInput1");
   image1=new SimpleImage(imgFile);
   image1.drawTo(canvas1); 
   
}
function upload2()
{
   
   canvas2=document.getElementById("canvas2");
   
   var imgFile=document.getElementById("fileInput2");
   image2=new SimpleImage(imgFile);
   image2.drawTo(canvas2);
}
function change()
{
    canvas3=document.getElementById("canvas3");
    var oimag=new SimpleImage(image1.width,image1.height);
    
    for(var pixel of image1.values())
    {
       
           if(pixel.getGreen() > pixel.getBlue() + pixel.getRed())
           {
              var x=pixel.getX();
              var y=pixel.getY();
              var newPixel=image2.getPixel(x,y);
              oimag.setPixel(x,y,newPixel);
           }
           else
           {
              oimag.setPixel(pixel.getX(),pixel.getY(),pixel);
           }
        }
        oimag.drawTo(canvas3);
    }
    
   
