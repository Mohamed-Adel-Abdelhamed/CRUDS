//Define inputs
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'Create';
let tmp;
//Get total
function get_total() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else {
        total.innerHTML = '';
        total.style.background = '#ff001f';
    }
   
}



//Create product
let datapro;
if (localStorage.product !=null) {
    datapro = JSON.parse(localStorage.product);
}
else {
    datapro = [];
}
submit.onclick = function(){
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    //Create product //Count //Clean data
    if (title.value != '' && price.value != '' && category.value != '' && newpro.count <= 100) {
        if (mood == 'Create') {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                }
            }
            else {
                datapro.push(newpro);
            }
        }
        else {
            datapro[tmp] = newpro;
            mood = 'Create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        cleardata();
    }



     else if (title.value == '') {
            title.focus();
        }
     else if (price.value == '') {
            price.focus();
        }
     else if (category.value == '') {
            category.focus();
        }
     else if (newpro.count > 100) {
            count.focus();
        }
    
     
    //Create product //Save in localstorage
    localStorage.setItem('product', JSON.stringify(datapro));
    showdata();
}


//Clear input 
function cleardata() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}



//Read
function showdata() {
    get_total();
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `<tr>
                        <td>${i+1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button id="update" onclick="updatedata(${i})">update</button></td>
                        <td><button id="delete" onclick="deletedata(${i})">delete</button></td>
                    </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    let btndeleteall = document.getElementById('deleteall');
    if (datapro.length > 0) {
        btndeleteall.innerHTML = `<button onclick="delete_all()">Delete all (${datapro.length})</button>`;
    }
    else {
        btndeleteall.innerHTML = '';
    }
}
showdata();




//Delete //Delete_All
function deletedata(i) {
    datapro.splice(i,1);
    localStorage.product = JSON.stringify(datapro);
    showdata();
}
function delete_all() {
    localStorage.clear();
    datapro.splice(0);
    showdata();

}


//Update
function updatedata(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    get_total();
    count.style.display = 'none';
    category.value = datapro[i].category;
    submit.innerHTML = 'Update';
    mood = 'Update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}



//search
let searchmood = 'title';
let search = document.getElementById('search');
function getsearchmood(id) {
    if (id == 'searchtitle') {
        searchmood = 'title';
    }
    else {
        searchmood = 'category';
    }
    search.placeholder = 'search by ' + searchmood;
    search.focus();
    search.value = '';
    showdata();
}

function searchdata(value) {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        if (searchmood == 'title') {

            if (datapro[i].title.includes(value.toLowerCase())) {
                table += `<tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button id="update" onclick="updatedata(${i})">update</button></td>
                        <td><button id="delete" onclick="deletedata(${i})">delete</button></td>
                    </tr>`
            }

        }
        else {

            if (datapro[i].category.includes(value.toLowerCase())) {
                table += `<tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button id="update" onclick="updatedata(${i})">update</button></td>
                        <td><button id="delete" onclick="deletedata(${i})">delete</button></td>
                    </tr>`
            }

        }
    }
   
    document.getElementById('tbody').innerHTML = table;
}





