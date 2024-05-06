
const sliderDataPath = '../assets/sliderData.json';
const glideSlides =  document.querySelector('.glide__slides');

function addNewSlide(imgUrls, h3s, ps, imgNum, i){
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');

    let randomNum;
    while (true){
        randomNum = Math.floor(Math.random() * imgUrls.length);
        if(randomNum != imgNum[0] && randomNum != imgNum[1]){
            imgNum[i%2] = randomNum;
            break;
        }
    }
    
    img.src = imgUrls[randomNum];

    randomNum = Math.floor(Math.random() * h3s.length);
    h3.textContent = h3s[randomNum];

    randomNum = Math.floor(Math.random() * ps.length);
    p.textContent = ps[randomNum];

    const div = document.createElement('div');
    div.appendChild(h3);
    div.appendChild(p);

    const reviewDiv = document.createElement('div');
    reviewDiv.className = "review"
    reviewDiv.appendChild(img);
    reviewDiv.appendChild(div);

    const slide = document.createElement('li');
    slide.className = "glide__slide"
    slide.appendChild(reviewDiv);
    
    glideSlides.appendChild(slide);
}
async function getSliderData() {
    try {
      const response = await fetch(sliderDataPath);
      if (!response.ok) {
        throw new Error('Error on loading JSON file');
      }
      const data = await response.json();
  
      let imgUrls = [];
      let h3s = [];
      let ps = [];
  
      data.forEach(item => {
        imgUrls.push(item.imgPath);
        h3s.push(item.header);
        ps.push(item.text);
      });
  
      return { imgUrls, h3s, ps };
    } catch (error) {
      console.error('Error:', error);
    }
}
export async function sliderSetup(){
    const sliderData = await getSliderData();
    let imgNum = [-1, -1];
    for(let i = 0; i < sliderData.h3s.length * sliderData.ps.length; i++){
        addNewSlide(sliderData.imgUrls, sliderData.h3s, sliderData.ps, imgNum, i);
    }

    window.addEventListener('load', function() {
        var glide = new Glide('.glide', {                
            type: 'carousel',
            startAt: 1,
            perView: 3,
            focusAt: 'center',
            gap: 10,
            autoplay: 10000,
            peek: 0, 
            breakpoints: {
                1024: {
                    perView: 2.5
                },
                850: {
                    perView: 2
                },
                700: {
                    perView: 1.5
                },
                500: {
                    perView: 1
                },
            }
        });            

        glide.mount();
    });
}