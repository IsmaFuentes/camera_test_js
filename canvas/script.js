window.onload = () => {
  navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
  document.querySelector('button').onclick = () => { takePhoto() };
}

const video = document.querySelector('video');
const img = document.querySelector("#myImage");
//const canvas = window.canvas = document.querySelector('canvas');
//canvas.width = 480;
//canvas.height = 360;

const takePhoto = () => {
  //canvas.width = video.videoWidth;
  //canvas.height = video.videoHeight;
  //canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageCapture = window.imageCapture;

  if(imageCapture){
    imageCapture.takePhoto().then(blob => {
      img.src = URL.createObjectURL(blob);
      img.onload = () => { URL.revokeObjectURL(this.src) }
    }).catch(
      err => alert(err)
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
  const imageCapture = new imageCapture(mediaStreamStrack);
  window.imageCapture = imageCapture;
}

const handleError = (error) => {
  console.log('Get user media error: ', error.message, error.name);
}
