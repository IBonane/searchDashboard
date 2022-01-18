const searchInput = document.querySelector("#search");
const searchResult = document.querySelector(".table-results");

let dataArray;

async function getUsers(){

    const res = await fetch('https://randomuser.me/api/?nat=fr&results=50');

    const {results} = await res.json();

    dataArray = sortListByOrder(results);
    console.log(dataArray);
    createUserList(dataArray);
}
getUsers();
function sortListByOrder(data) {

    const orderData = data.sort((a, b) =>{

        if(a.name.last.toLowerCase() < b.name.last.toLowerCase()){
            return -1;
        }

        if(a.name.last.toLowerCase() > b.name.last.toLowerCase()){
            return 1;
        }

        if(a.name.last.toLowerCase() == b.name.last.toLowerCase()){
            if(a.name.first.toLowerCase() < b.name.first.toLowerCase()){
                return -1;
            } 
            else if(a.name.first.toLowerCase() > b.name.first.toLowerCase()){
                return 1;
            }
            else
                return 0;
        }

        return 0;
    })

    return orderData;
}

function createUserList(usersList){

    usersList.forEach(user =>{

        const listItem = document.createElement("div");
        listItem.setAttribute("class", "table-items");

        listItem.innerHTML = `
        <div class="conatiner-img">
            <img src=${user.picture.medium}>
            <p class="name">${user.name.last} ${user.name.first}</p>
        </div>
        <p class="email">${user.email}</p>
        <p class="phone">${user.phone}</p>
        `;

        searchResult.appendChild(listItem);
    })
}

searchInput.addEventListener("input", filterdata);

function filterdata() {
    searchResult.innerHTML = "";

    const searchedString = this.value.toLowerCase().replace(/\s/g, ""); //.replace(/\s/g, "") enleve les espaces

    const filterArray = dataArray.filter(element => 
        element.name.first.toLowerCase().includes(searchedString) ||
        element.name.last.toLowerCase().includes(searchedString) ||
        `${element.name.last + element.name.first}`.toLocaleLowerCase().replace(/\s/g, "").includes(searchedString) ||
        `${element.name.first + element.name.last}`.toLocaleLowerCase().replace(/\s/g, "").includes(searchedString)
    )

    createUserList(filterArray);
}
