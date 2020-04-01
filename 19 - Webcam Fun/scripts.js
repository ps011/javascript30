const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo () {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
        console.log(localMediaStream)
        video.srcObject = localMediaStream
        video.play()
    }).catch(e => {
        console.error('Webcam Permission Denied')
    })
}

function paintToCanvas () {
    const width = video.videoWidth
    const height = video.videoHeight
    console.log(width, height)
    canvas.width = width
    canvas.height = height

    return setInterval( () => {
        ctx.drawImage(video, 0, 0 , width ,height)
        let pixels = ctx.getImageData(0, 0, width, height)
        pixels = rgbSplit(pixels)
        ctx.globalAlpha = 0.1
        ctx.putImageData(pixels, 0, 0)
    }, 16)
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] = pixels.data[i] + 100
        pixels.data[i + 1] = pixels.data[i + 1] - 50
        pixels.data[i + 2] = pixels.data[i + 2] - 100
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 100] = pixels.data[i + 0]
        pixels.data[i + 100] = pixels.data[i + 1]
        pixels.data[i - 100] = pixels.data[i + 2]
        // pixels[i + 3] = pixels[i + 3] - 30
    }
    return pixels;
}

function takePhoto () {
    snap.currentTime = 0
    snap.play()

    const data = canvas.toDataURL('image/jpeg')
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'hero')
    link.innerHTML = `<img src=${data} />`;
    strip.insertBefore(link, strip.firstChild)
}

getVideo()
video.addEventListener('canplay', paintToCanvas)