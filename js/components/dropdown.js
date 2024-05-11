const dropdownMenu = document.getElementById('dropdown-menu');
const dropdownButton = document.getElementById('dropdown-button');

export function dropdownSetup(){
    dropdownMenu.style.display = "none";

    window.addEventListener("scroll", function() {
        if (dropdownMenu.style.display === "flex") {
            dropdownMenu.style.display = "none";
        }
    });
      
    window.addEventListener("click", function(event) {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });

    dropdownButton.addEventListener('click', function(){
        if(dropdownMenu.style.display === "none"){
            dropdownMenu.style.display = "flex";
        } else{
            dropdownMenu.style.display = "none";
        }       
    })  
}
