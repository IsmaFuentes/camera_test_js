window.onload = () => {
  navigator.mediaDevices.getUserMedia(constraints).then(getMedia).catch(
    error => console.log(error)
  );
}

const video = document.querySelector('video');
const img = document.querySelector("#myImage");
const slider = document.querySelector("#slider");

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

const getMedia = (stream) => {
  const mediaStreamStrack = stream.getVideoTracks()[0];

  mediaStreamStrack.applyConstraints({
    advanced: [{ zoom: slider.value }]
  }).catch(
    err => console.log(err)
  );

  const imageCapture = new ImageCapture(mediaStreamStrack);

  video.srcObject = stream;
  window.stream = stream;
  window.imageCapture = imageCapture;
  window.mediaStreamStrack = mediaStreamStrack;
}

document.querySelector('button').addEventListener("click", takePhoto);