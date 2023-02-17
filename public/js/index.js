const dropZone = document.querySelector('.drop-zone');
const browseSpan = document.querySelector(".browse-span");
const fileInput = document.querySelector("#file-input");

// Add event listener for dragover event
dropZone.addEventListener('dragover', (event) => {
  // Prevent default behavior to enable drop
  event.preventDefault();
  if(!dropZone.classList.contains("dragged"))
  dropZone.classList.add("dragged");
  console.log("dragged")
});

// Add event listener for drop event
dropZone.addEventListener('drop', (event) => {
  // Prevent default behavior to enable drop
  event.preventDefault();
  // Get the file(s) from the event data transfer
  const files = event.dataTransfer.files;

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