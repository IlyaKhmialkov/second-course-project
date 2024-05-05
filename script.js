const burgerButton = document.getElementById('burger-button');
const burgerMenu = document.getElementById('burger-menu');
const burgerShadow = document.querySelector('.burger-shadow');
const burgerMenuButtons = document.querySelectorAll('header #burger-menu button');

const themeButton = document.getElementById('theme-button');
const themeButtonP = document.getElementById('theme-button-p');

const sliderDataPath = 'data/sliderData.json';
const glideSlides =  document.querySelector('.glide__slides');

function burgerSetup(){
    function closeBurger(){
        burgerButton.className = 'hide';
        burgerMenu.className = 'hide';
        burgerShadow.style.display = 'none';
        document.body.style.overflowY = 'auto';
    }

    burgerButton.addEventListener('click', function() {
        burgerButton.className = 'show';
        burgerMenu.className = 'show';
        burgerShadow.style.display = 'block';
        document.body.style.overflowY = 'hidden';     
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    })
    burgerShadow.addEventListener('click', function() {
        closeBurger();
    }) 
    for (let i = 0; i < burgerMenuButtons.length; i++) {
        burgerMenuButtons[i].addEventListener('click', function() {
            closeBurger();                
        });
    }
}
function darkThemeSetup(){
    const data = localStorage.getItem('theme');
    const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

    if(data == null){
        if(prefersDarkTheme.matches){
            themeButton.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            themeButtonP.textContent = '🌞';
            document.body.classList.add('dark-mode');
        } else{
            themeButton.classList.add('light');
            localStorage.setItem('theme', 'light');
            themeButtonP.textContent = '🌝';
        }
    } else{
        if(data === 'dark'){
            themeButton.classList.add('dark');
            themeButtonP.textContent = '🌞';
            document.body.classList.add('dark-mode');
        } else{
            themeButton.classList.add('light');
            themeButtonP.textContent = '🌝';
        }
    }
    
    themeButton.addEventListener('click', function() {
        if( themeButton.classList.contains('dark')){
            themeButton.classList.remove('dark');
            themeButton.classList.add('light');
            themeButtonP.textContent = '🌝';
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        } else{
            themeButton.classList.remove('light');
            themeButton.classList.add('dark');
            themeButtonP.textContent = '🌞';
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        }              
    });    
}
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
async function sliderSetup(){
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

async function main(){
    burgerSetup();
    darkThemeSetup();
    await sliderSetup();
}

main();
