window.onload = () => {
  navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
  document.querySelector('button').onclick = () => { takePhoto() };
}

const video = document.querySelector('video');
const canvas = window.canvas = document.querySelector('canvas');

canvas.width = 480;
canvas.height = 360;

const takePhoto = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
}

const constraints = {
  audio: false,
  video: {
    facingMode: { 
      exact: 'environment'
    }
  }
};

const handleSuccess = (stream) => {
  window.stream = stream;
  video.srcObject = stream;
}

const handleError = (error) => {
  console.log('Get user media error: ', error.message, error.name);
}
