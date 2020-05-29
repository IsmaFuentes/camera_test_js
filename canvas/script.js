window.onload = () => {
  navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
  document.querySelector('button').onclick = () => { takePhoto() };
}

const video = document.querySelector('video');
const canvas = window.canvas = document.querySelector('canvas');

canvas.width = 480;
canvas.height = 360;

const takePhoto = () => {
  //canvas.width = video.videoWidth;
  //canvas.height = video.videoHeight;
  //canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageCapture = window.imageCapture;
  imageCapture.takePhoto().then(blob => {
    canvas.width = imageCapture.width;
    canvas.height = imageCapture.height;
    canvas.getContext('2d').drawImage(blob, 0,0);
  }).catch(
    err => console.log(err)
  );
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
  const imageCapture = new imageCapture(mediaStreamStrack);

  window.imageCapture = imageCapture;
  //window.stream = stream;
  //video.srcObject = stream;
}

const handleError = (error) => {
  console.log('Get user media error: ', error.message, error.name);
}
