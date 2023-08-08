const EXT_VIDEOS = [".mp4", ".3gp", ".avi", ".wmv"];

function isVideo(f) {
  const fExt = f.split('.').pop().toLowerCase();
  return EXT_VIDEOS.some(ext => `.${fExt}`.endsWith(ext))
}

const createCarousel = (address, prev, next, onClose) => {
  const carousel = document.createElement('div')
  const location = window.location.href
  carousel.style.height = '100vh'
  carousel.style.width = '100%'
  carousel.style.position = 'fixed'
  carousel.style.top = '0'
  carousel.style.zIndex = '1040'
  carousel.style.backgroundColor = 'black'
  carousel.style.backgroundSize = 'contain';
  carousel.style.backgroundPosition = 'center';
  carousel.style.backgroundRepeat = 'no-repeat';

  const cross = document.createElement('div')
  cross.style.width = '50px'
  cross.style.right = '0'
  cross.style.height = '50px'
  cross.style.position = 'absolute'
  cross.style.backgroundColor = 'white'
  cross.style.backgroundImage = 'url(/@assets/Close.svg)'
  cross.style.backgroundSize = 'contain';
  cross.style.backgroundPosition = 'center';
  cross.style.backgroundRepeat = 'no-repeat';
  cross.style.cursor = 'pointer';
  cross.addEventListener('click', onClose)
  carousel.appendChild(cross)

  const prevBtn = document.createElement('div')

  prevBtn.style.height = '100px'
  prevBtn.style.width = '55px'
  prevBtn.style.backgroundImage = 'url(/@assets/previous.png)'
  prevBtn.style.backgroundSize = 'contain';
  prevBtn.style.backgroundPosition = 'center';
  prevBtn.style.backgroundRepeat = 'no-repeat';
  prevBtn.style.position = 'absolute';
  prevBtn.style.cursor = 'pointer';
  prevBtn.style.top = '50%';
  prevBtn.style.backgroundColor = 'rgb(255 255 255 / 21%)'
  prevBtn.style.transform = 'translate(0, -50%)';

  const nextBtn = document.createElement('div')

  nextBtn.style.height = '100px'
  nextBtn.style.width = '55px'
  nextBtn.style.right = '0'
  nextBtn.style.backgroundImage = 'url(/@assets/previous.png)'
  nextBtn.style.backgroundSize = 'contain';
  nextBtn.style.backgroundPosition = 'center';
  nextBtn.style.backgroundRepeat = 'no-repeat';
  nextBtn.style.position = 'absolute';
  nextBtn.style.cursor = 'pointer';
  nextBtn.style.top = '50%';
  nextBtn.style.backgroundColor = 'rgb(255 255 255 / 21%)'
  nextBtn.style.transform = 'translate(0px, -50%) rotate(180deg)';
  

  const onNext = (e) => {
    e.stopPropagation()
    e.preventDefault()
    onClose()
    const nextLink = document.querySelector(`a[data-index="${next}"]`)
    nextLink?.dispatchEvent(new Event('click'))
  }

  const onPrev = (e) => {
    console.log({e})
    e.stopPropagation()
    e.preventDefault()
    onClose()
    const prevLink = document.querySelector(`[data-index="${prev}"]`)
    console.log({prevLink})
    prevLink?.dispatchEvent(new Event('click'))
  }



  if(isVideo(address)) {
    const video = document.createElement('video')
    video.src = `${location}${address}`
    video.style.height = '95%'
    video.style.maxWidth = '100%'
    video.style.margin = 'auto'
    video.controls = 'controls'
    carousel.style.display = 'flex'
    carousel.append(video)
  } else {
    const url = `url(${location}${encodeURIComponent(address).replace(
      /['()*]/g,
      (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
    )})`
    carousel.style.backgroundImage = url
    if(prev) {
      carousel.appendChild(prevBtn)
      prevBtn.addEventListener('click', onPrev)
    }
    if(next) {
      carousel.appendChild(nextBtn)
      prevBtn.addEventListener('click', onNext)
      carousel.addEventListener('click', onNext)
    }
  }

  return carousel
} 

const openCarousel = (e) => {
  e.preventDefault()
  console.log(e)
  const popupRoot = document.getElementById('popup-root')
  let name = e.currentTarget.dataset.name;
  let prev = e.currentTarget.dataset.prev;
  let next = e.currentTarget.dataset.next;

  const close = () => {
    popupRoot.removeChild(carousel)
  }

  const carousel = createCarousel(name, prev, next, close)

  

  popupRoot.appendChild(carousel)
}