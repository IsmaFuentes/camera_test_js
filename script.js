window.onload = () => {
  navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(error => console.log(error));
  document.querySelector('button').onclick = () => { takePhoto() };
}

const video = document.querySelector('video');
const img = document.querySelector("#myImage");

const takePhoto = () => {
  const imageCapture = window.imageCapture;
  if(imageCapture){
    imageCapture.takePhoto().then(blob => {
      img.src = URL.createObjectURL(blob);
      img.onload = () => { URL.revokeObjectURL(this.src) }
    }).catch(
      err => console.log(err)
    );
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
  window.stream = stream;
  video.srcObject = stream;
  const mediaStreamStrack = stream.getVideoTracks()[0];
  const imageCapture = new ImageCapture(mediaStreamStrack);
  window.imageCapture = imageCapture;
}

