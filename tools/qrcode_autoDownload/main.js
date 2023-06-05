var link = [];
var index = [];

for (let i = 0; i < 100; i++) {
    index[i] = 11110 + i;
} 

for (let i = 0; i < 100; i++) {
    link[i] = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + index[i];
} 

var upics = [];
for (let i = 0; i < 100; i++) {
   upics[i] = link[i];
} 


// var upics = [
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGvEiBfvtvDFi2aSNDydoH_DVaCJBtaaIpl0PhrddPdx4cwoAX",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0cq-7TkAONUjnDKz2AkEgiFRG6E0Dmrl43lOuj_nQCOrnQG8", 
//     "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example"
// ];
  
  //
  function download(item) {
    var fileName = item.split(/(\\|\/)/g).pop();
  
    var image = new Image();
    image.crossOrigin = "anonymous";
    image.src = item;
    image.onload = function() {
    
      // use canvas to load image
      var canvas = document.createElement('canvas');
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      canvas.getContext('2d').drawImage(this, 0, 0);
      
      // grab the blob url
      var blob;
      if (image.src.indexOf(".jpg") > -1) {
        blob = canvas.toDataURL("image/jpeg");
      } else if (image.src.indexOf(".png") > -1) {
        blob = canvas.toDataURL("image/png");
      } else if (image.src.indexOf(".gif") > -1) {
        blob = canvas.toDataURL("image/gif");
      } else {
        blob = canvas.toDataURL("image/png");
      }
  
      // create link, set href to blob
      var a = document.createElement('a');
      a.title = fileName;
      a.href = blob;
      a.style.display = 'none';
      a.setAttribute("download", fileName);
      a.setAttribute("target", "_blank");
      document.body.appendChild(a);
      
      // click item
      a.click();
    }
  }
  
//   function downloadAll(item) {
//     for (let i = 0; i < 100; i++) {
//       download(upics[i]);
//     }
//   }

  function downloadAll(item) {
    download("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=11144");
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }