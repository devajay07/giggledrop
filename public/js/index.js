const dropZone = document.querySelector('.drop-zone');
const signature = document.querySelector('.signature');
const browseSpan = document.querySelector(".browse-span");
const fileInput = document.querySelector("#file-input");
const progressZone = document.querySelector(".progress-zone");
const progressBar = document.querySelector(".progress-bar");
const progressIndicator = document.querySelector(".progress-indicator");
const downloadLinkZone = document.querySelector(".downloadLink-zone");
const downloadLinkInput = document.querySelector(".downloadLink-input");
const linkExpiryWarning = document.querySelector(".link-expiry-warning");
const copyIcon = document.querySelector(".copy-icon");
const qrImage = document.querySelector(".qr-image");
const qrZone = document.querySelector(".qr-zone");

const host = "https://excited-sock-lion.cyclic.app";
const uploadUrl = `${host}/api/files/upload`
let downloadUrl;



fileInput.addEventListener('change', ()=>{
  uploadFile();
})

// Add event listener for dragover event
dropZone.addEventListener('dragover', (event) => {
  // Prevent default behavior to enable drop
  event.preventDefault();
  if(!dropZone.classList.contains("dragged"))
  dropZone.classList.add("dragged");
});

// Add event listener for drop event
dropZone.addEventListener('drop', (event) => {
  // Prevent default behavior to enable drop
  event.preventDefault();
  dropZone.classList.remove("dragged");
  // Get the file(s) from the event data transfer
  const files = event.dataTransfer.files;
  if(files.length)
  fileInput.files = files;
  uploadFile();

  // Do something with the files, such as upload or display
});

dropZone.addEventListener('dragleave', (event) =>{
     event.preventDefault();
     if(dropZone.classList.contains("dragged"))
     dropZone.classList.remove("dragged");
})

browseSpan.addEventListener('click',(e)=>{
    fileInput.click();
})

const uploadFile = ()=>{
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append('myFile',file);

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () =>{
   if(xhr.readyState === XMLHttpRequest.DONE){
    showLink(JSON.parse(xhr.response));
    console.log(xhr.response);
  }
  }

  xhr.upload.onprogress = uploadProgress;

  xhr.open('POST', uploadUrl);
  xhr.send(formData);
}

const uploadProgress = (e) =>{
  progressZone.style.display = 'block';
  const percent = Math.round((e.loaded / e.total) * 100);
  progressBar.style.width = `${percent}%`;
  progressIndicator.innerHTML = `${percent}%`;
  if(percent === 100){
    // get rid of the progress bar
    progressZone.style.display = 'none';
    linkExpiryWarning.style.display = 'block';
    downloadLinkZone.style.display = 'block';
    copyIcon.style.display = 'block';

  }
}

const showLink = (downloadLink) =>{
  downloadLinkInput.value = downloadLink.file;
  downloadUrl = downloadLink.file;

  const qrUrl = `${host}/qrCode/generate/?link=${encodeURIComponent(downloadUrl)}`;

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () =>{
   if(xhr.readyState === XMLHttpRequest.DONE){
    showQr(xhr.response);
  }
  }

  xhr.open('GET', qrUrl);
  xhr.send();
}

copyIcon.addEventListener('click', () => {
  downloadLinkInput.select();
  document.execCommand('copy');
  downloadLinkInput.value = 'Link Copied To Clipboard 🥳';
  setTimeout(()=>{
    downloadLinkInput.value = downloadUrl;
  },1000);
  
});

const showQr = (response) =>{
qrZone.style.display = 'block';

 // Assume response is the HTML string returned from the server
const parser = new DOMParser();
const doc = parser.parseFromString(response, "text/html");
const imgElement = doc.querySelector("img");
const imgUrl = imgElement.getAttribute("src");
 qrImage.src = imgUrl;
 signature.style.position = 'relative';
}

