// Changing Theme Color Code
const themeColor = document.querySelector('[data-themecolor]');
const sunLogo = document.querySelector('.sunlogo');
const moonLogo = document.querySelector('.moonlogo');
const backgroundWrapper = document.querySelector('.wrapper');
const connectionContainer = document.querySelector('.connection-container');
const middleContainer = document.querySelector('.middle-container');
const bottonContainer = document.querySelector('.bottom-container');
const devdetectiveHeading = document.querySelector('h1');
const inputPlaceholder = document.querySelector('input');
const nameHeading = document.querySelector('.name');
const dateHeading = document.querySelector('.date');
const description = document.querySelector('.description');
const connectionHeading = document.querySelectorAll('.connection-heading');
const connectionNumber = document.querySelectorAll('.connection-number');
const svgCollection = document.querySelectorAll('svg');
const data = document.querySelectorAll('.data');

themeColor.addEventListener('click', ()=>{

    let currTheme = document.querySelector('[data-themecolor] > p');

    if(currTheme.textContent === "Light"){
        addWhiteColor(currTheme);
    }else{
        removeWhiteColor(currTheme);
    }
});

function addWhiteColor(currTheme){
    // console.log("Adding white color");
    currTheme.textContent = 'Dark';
    sunLogo.style.display = 'none';
    moonLogo.style.display = 'block';

    // Doing Background White
    backgroundWrapper.classList.add('bgdullwhitecolor');
    connectionContainer.classList.add('bgdullwhitecolor');
    middleContainer.classList.add('bgwhitecolor');
    bottonContainer.classList.add('bgwhitecolor');

    // Doing text Grey
    devdetectiveHeading.classList.add('greycolor');
    currTheme.classList.add('greycolor');
    inputPlaceholder.classList.add('greycolorforpalceholder');
    inputPlaceholder.style.color = '#4B6A9B';
    nameHeading.classList.add('blackcolor');
    dateHeading.classList.add('greycolor');
    description.classList.add('greycolor');
    connectionHeading.forEach(element => {
        element.classList.add('greycolor');
    });
    connectionNumber.forEach(element => {
        element.classList.add('greycolor');
    });
    svgCollection.forEach(element => {
        element.classList.add('greycolorsvg');
    });
    data.forEach(element => {
        element.classList.add('greycolor');
    });

}

function removeWhiteColor(currTheme){
    // console.log("removing White color");
    currTheme.textContent = 'Light';
    sunLogo.style.display = 'block';
    moonLogo.style.display = 'none';
    // Removing White Color
    backgroundWrapper.classList.remove('bgdullwhitecolor');
    connectionContainer.classList.remove('bgdullwhitecolor');
    middleContainer.classList.remove('bgwhitecolor');
    bottonContainer.classList.remove('bgwhitecolor');

    // Removing Grey Color
    devdetectiveHeading.classList.remove('greycolor');
    currTheme.classList.remove('greycolor');
    inputPlaceholder.classList.remove('greycolorforpalceholder');
    inputPlaceholder.style.color = '#fff';
    nameHeading.classList.remove('blackcolor');
    dateHeading.classList.remove('greycolor');
    description.classList.remove('greycolor');
    connectionHeading.forEach(element => {
        element.classList.remove('greycolor');
    });
    connectionNumber.forEach(element => {
        element.classList.remove('greycolor');
    });
    svgCollection.forEach(element => {
        element.classList.remove('greycolorsvg');
    });
    data.forEach(element => {
        element.classList.remove('greycolor');
    });
}
// Theme Color Changed


const searchButton = document.querySelector('[data-searchButton]');
const closeButton = document.querySelector('.close');

// Clearing input 
closeButton.addEventListener('click', ()=>{
    inputPlaceholder.value = "";
    get('.error').style.display = 'none';
});

// Pressed Enter
inputPlaceholder.addEventListener("keydown", (e)=>{
    if(inputPlaceholder.value !== "" && e.key === "Enter"){
        fetchUserData(inputPlaceholder.value);
    }
});

// Pressed Button
searchButton.addEventListener('click', ()=>{
    if(inputPlaceholder !== "")
        fetchUserData(inputPlaceholder.value);
})

const get = (param) => document.querySelector(`${param}`);

async function fetchUserData(github){
    // console.log("data is ", github);
    // github = "crispy-coffee"; //Need to erase later
    try{
        let apiData = await fetch(`https://api.github.com/users/${github}`);

        if(apiData.status === 404){
            throw err;  
        }
        
        // commented code is for clearing the input after taking data of it
        // inputPlaceholder.value = '';
        apiData = await apiData.json();
        console.log(apiData);
        setUserData(apiData);
    }catch(e){

        // Show error
        get('.error').style.display = 'block';

        // remove error after 3 seconds
        setTimeout(function() {
            get('.error').style.display = 'none';
        }, 3000);
    }
}

const month = ['Jan', 'Feb', 'March', 'April', 'June', 'July',' Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function setUserData(apiData){

    get(".left-container > img").src = apiData?.avatar_url;

    if(apiData?.name == null){
        get(".name").textContent = inputPlaceholder.value
    }else{
        get(".name").textContent = apiData?.name;
    }

    var Date = apiData?.created_at;
    get(".date").textContent = 'Joined '+ Date.substring(8, 10) + ' ' + month[parseInt(Date.substring(5, 7)) - 1] + ' ' + Date.substring(0, 4);

    // console.log("Date is ", parseInt(Date.substring(5, 7)) - 1, "  ", Date.substring(5, 7), " ", typeof(parseInt(Date.substring(5, 7)) - 1));

    get(".link").textContent = '@' + apiData?.login;
    get(".link").href = apiData?.html_url;
    get(".description").textContent = apiData?.bio;
    get(".repo-number").textContent = apiData?.public_repos;
    get(".follower-number").textContent = apiData?.followers;
    get(".following-number").textContent = apiData?.following;
    
    if(apiData?.location == null){
        get(".location-data").textContent = 'Not Available';
    }else{
        get(".location-data").textContent = apiData?.location;
    }

    if(apiData?.blog === ''){
        get(".bio-link-data").textContent = 'Not Available';
        get(".bio-link-data").href = '#';
    }else{  
        get(".bio-link-data").textContent = apiData?.blog;
        get(".bio-link-data").href = apiData?.blog;
    }

    if(apiData?.twitter_username == null){
        get(".twitter-data").textContent = 'Not Available';
        get(".twitter-data").href = "#";
    }else{
        get(".twitter-data").textContent = apiData?.twitter_username;
        get(".twitter-data").href = 'https://twitter.com/' + apiData?.twitter_username;
    }
    
    if(apiData?.company == null){
        get(".company-data").textContent = 'Not Available';
    }else{
        get(".company-data").textContent = apiData?.company;
    }
}


fetchUserData("crispy-coffee");