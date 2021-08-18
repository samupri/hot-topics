// GET THE REFERENCES

//variable reference to dynamic data
let dd = document.getElementById("dynamic-data");
const links = document.getElementsByClassName('menu-item');
let url = './partials/home.html';


// CREATE THE FUNCTION THAT WILL LOAD THE REQUESTED PARTIAL
function loadContent (selectedurl){
    
   /*
   IMPORTANT NOTES:
   loadContent RUNS EVERY TIME A LINK IS CLICKED.
   loadContent REQUIRES THE INPUT. THIS INPUT IS
   THE VALUE OF href ATTRIBUTE OF THE CLICKED LINK.
   EVERY TIME A LINK IS CLICKED, urlFeed WILL GET 
   THE UPDATED PATH TO THE REQUESTED CONTENT.
   */
   

    // RUN THE fetch(urlFeed).then().then().catch()
    fetch(selectedurl).then(function(rsp)
    {
        //if everything is okay, then return the data to function(data) below
        if(rsp.ok){
            return rsp.text();
        }
        //create the eventual error message
        throw new Error(rsp.statusText);
    })
    .then(function(data)
    {
        //create new item list
        dd.innerHTML = data;

    })
    
    .catch(function(err)
    {
        dd.innerHTML = err.message;
    });
    
    
// CLOSE YOUR FUNCTION loadContent HERE
}

// CALL loadContent WITH THE CURRENT VALUE OF url 
loadContent(url);

// CREATE THE FUNCTION THAT WILL SELECT A PARTIAL:
function selectContent(ev)
{
    // PREVENT DEFAULT BEHAVIOUR OF A LINK TAG
    ev.preventDefault();
    let currentItem = ev.target;
    let selectedLink = currentItem.href;
    
   
   // GET THE VALUE OF href ATTRIBUTE OF THE CLICKED LINK
   for (let i = 0; i < links.length; i++) {
        if (links[i].hasAttribute('id')) {
            //remove the attribute
            links[i].removeAttribute('id');
        }

        currentItem.setAttribute('id', 'active');
    }   

   // CALL THE FUNCTION loadContent PROVIDING THE href
   // VALUE OF THE CLICKED LINK AS THE VALUE FOR THE PARAMETER
   // OF loadContent FUNCTION.
    loadContent(selectedLink);
}

// REGISTER links FOR CLICK EVENT WITH selectContent AS EVENT HANDLER!
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', selectContent);
}
