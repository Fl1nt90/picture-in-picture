const videoElement = document.getElementById("video");
const button = document.getElementById("button");

// Prompt to select media stream, pass to video element and the play
const selectMediaStream = async function () {
  try {
  await navigator.mediaDevices.getDisplayMedia().then(mediaStream => {
    videoElement.srcObject = mediaStream; //set the mediaStream as source of the video element
    videoElement.onloadedmetadata = () => videoElement.play(); //start the stream (necessary);
  });
  } catch (err) {
    console.log("Oups, an error occurred:", err);
  }

};
//immediately call the function
selectMediaStream();



//picture in picture cannot be started automatically, only by user gesture -->event handler
button.addEventListener("click", async() => {
  if (document.pictureInPictureElement) { //to later close PIP, check if is opened
    document.exitPictureInPicture();
  } else {
      await videoElement.requestPictureInPicture().catch((error) => {
        console.log(error)});  }
  });

//change the button, event handler picture in picture
videoElement.addEventListener('enterpictureinpicture', () => {
    button.textContent = 'Exit Picture-in-Picture';
});
videoElement.addEventListener('leavepictureinpicture', () => {
    button.textContent = 'Enter Picture-in-Picture';
});


