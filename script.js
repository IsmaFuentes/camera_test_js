
// camera test

window.onload = () => {
    getStream();

    document.querySelector("#capture").onclick = () => { takePhoto(); }
};

let theStream;

const getUserMedia = (options, successCallback, failureCallback) => {
    let api = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if(api){
        return api.bind(navigator)(options, successCallback, failureCallback);
    }
}

const getStream = () =>  {
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
      !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
      console.log('User Media API not supported.');
      return;
    }
    
    const constraints = {
      video: {
        width: { 
            min: 1280,
            ideal: 1920,
            max: 2560,
          },
          height: {
            min: 720,
            ideal: 1080,
            max: 1440
          },
          facingMode: { 
              exact: 'environment'
          }
      }
    };
  
    getUserMedia(constraints, (stream) => {
      var mediaControl = document.querySelector('#video');
      if ('srcObject' in mediaControl) {
        mediaControl.srcObject = stream;
      } else if (navigator.mozGetUserMedia) {
        mediaControl.mozSrcObject = stream;
      } else {
        mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
      }
      theStream = stream;
    }, (err) => {
      console.log('Error: ' + err);
    });
  }
  
const takePhoto = () => {
    if (!('ImageCapture' in window)) {
      console.log('ImageCapture is not available');
      return;
    }
    
    if (!theStream) {
      console.log('Grab the video stream first!');
      return;
    }
    
    let theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);
  
    theImageCapturer.takePhoto()
      .then(blob => {
        let theImageTag = document.querySelector('.photo');
        theImageTag.src = URL.createObjectURL(blob);
      })
      .catch(err => console.log('Error: ' + err));
}

