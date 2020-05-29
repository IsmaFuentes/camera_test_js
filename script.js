window.onload = () => {
  navigator.mediaDevices.getUserMedia(constraints).then(
    handleSuccess
  ).catch(
    error => console.log(error)
  );
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
  const mediaStreamStrack = stream.getVideoTracks()[0];
  const imageCapture = new ImageCapture(mediaStreamStrack);

  mediaStreamStrack.applyConstraints({
    advanced: [{ zoom: 20 }]
  }).catch(
    err => console.log(err)
  );

  video.srcObject = stream;
  window.stream = stream;
  window.imageCapture = imageCapture;
  window.mediaStreamStrack = mediaStreamStrack;
}

document.querySelector('button').addEventListener("click", takePhoto);