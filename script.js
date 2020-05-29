window.onload = () => {
  navigator.mediaDevices.getUserMedia(constraints).then(
    handleSuccess
  ).catch(
    error => console.log(error)
  );
}


const video = document.querySelector('video');
const img = document.querySelector("#myImage");
const slider = document.querySelector("#mySlider");

const takePhoto = () => {
  const imageCapture = window.imageCapture;
  if(imageCapture){
    imageCapture.takePhoto().then(blob => {
      img.src = URL.createObjectURL(blob);
      img.onload = () => { URL.revokeObjectURL(this.src) }
    }).catch(
      err => console.log(err)
    );
  }else{
    alert("Image capture is not suported")
  }
}

const constraints = {
  audio: false,
  video: {
    facingMode: { 
      exact: 'environment'
    },
    aspectRatio: { exact: 0.70 }
  }
};

const handleSuccess = (stream) => {
  // basic config
  window.stream = stream;
  video.srcObject = stream;
  const mediaStreamStrack = stream.getVideoTracks()[0];
  const imageCapture = new ImageCapture(mediaStreamStrack);
  window.imageCapture = imageCapture;

  // slider
  const capabilities = mediaStreamStrack.getCapabilities();
  const settings = mediaStreamStrack.getSettings();
  if(capabilities.zoom){
    slider.min = capabilities.zoom.min;
    slider.max = capabilities.zoom.max;
    slider.step = capabilities.zoom.step;
    slider.value = settings.zoom;
  }
}

document.querySelector('button').addEventListener("click", takePhoto);