window.onload = () => {
  navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
  document.querySelector('#capture').onclick = () => { takePhoto() };
}

const video = document.querySelector('video');
const canvas = window.canvas = document.querySelector('canvas');

//canvas.width = 480;
//canvas.height = 360;

const takePhoto = () => {
  //canvas.width = video.videoWidth;
  //canvas.height = video.videoHeight;

  let wrapper = document.querySelector("#wrapper");
  let wWidth = wrapper.clientWidth;
  let wHeigth = wrapper.clientHeight;

  let delimiter = document.querySelector("#delimiter");
  let dWidth = delimiter.clientWidth;
  let dHeigth = delimiter.clientHeight;

  /*
  let img = new Image();
  img.src = "C:\\Users\\Ruta\\Desktop\\images\\source.jpg";

  console.log((wWidth - dWidth), (wHeigth - dHeigth));
  */

  canvas.getContext('2d').drawImage(video, 10, 10, 100, 100, 0, 0, wWidth, wHeigth);
  //canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
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