// var $ = require('jQuery');

// check if on browse page
if(document.getElementById('nameSearch')) {
    console.log('on browse page');

    var nameSearch = document.getElementById('nameSearch');
    var categorySearch = document.getElementById('categorySearch');
    
    nameSearch.addEventListener('keyup', searchUser);
    categorySearch.addEventListener('keyup', searchCategory);

}

// SEARCH EXISTING USER

function searchUser() {
    if(event.key === 'Enter') {
        // slice user query to render for query
        var query = this.value.replace(/ /g, '%20');
        var uri = 'api/users/' + query;
        fetch(uri)
            .then(response => response.json())
            .then(data => {

                // create a new card with all proper data
                document.getElementById("gridOfLegends").innerHTML = document.getElementById("cardOfALegend").innerHTML;
                document.getElementById("nameOfLegend").innerHTML = data.data.name;
                document.getElementById("legendRedirect").setAttribute("href", query)

                console.log(data.data.categories)
            })
            .catch(error => console.log(error))
    }
};

// SEARCH EXISTING CATEGORY

function searchCategory() {
    if(event.key === 'Enter') {
        var uri = 'api/categories/' + this.value;
        fetch(uri)
            .then(response => response.json())
            .then(data => {
                var users = data.users; //[]

                // empty grid
                var gridOfLegends = document.getElementById("gridOfLegends");
                while (gridOfLegends.firstChild) {
                    gridOfLegends.removeChild(gridOfLegends.firstChild);
                }

                // fill grid. TOLE JE PA SFUKANO LOL
                for (i = 0; i < users.length; i++) {
                    // create card with found users data
                    var cardOfALegend = document.getElementById("cardOfALegend").innerHTML;
                    
                    document.getElementById("nameOfLegend").innerHTML = data.data.name;
                    document.getElementById("legendRedirect").setAttribute("href", query)

                    // Append cardOfALegend to gridOfLegends
                    gridOfLegends.appendChild(cardOfALegend);
                }
            })
            .catch(error => console.log(error))
    }
}

// ADD NEW USER

// check if on createUser page
if(document.getElementById('newUserForm')) {

    // za submit rabs poslusat na <form id="nfjsrf">
    var newUserForm = document.getElementById('newUserForm')
    newUserForm.addEventListener('submit', postUser)
}

function postUser() {
    event.preventDefault();

    // redirect se ne sme zgodit: http://localhost:3000/ustvari?first=Jus&last=Lesjak&categories=e
    var formData = new FormData(this);

    // model formData da bojo ustrezale data: formData

    var user = {
        data: {
            name: "user",
            categories: "5ccddebfb94654349067fd04"
        },
        google: {
            id: 'useruser', //formData.google.id,
            email: 'user.email43@gmail.com' //formData.google.email
        }
    }
    
    // var request = new XMLHttpRequest();
    // request.open("POST", "http://localhost:3000/api/users/test");
    // request.setRequestHeader("Content-type", "application/json");
    // request.send(JSON.stringify(formData));
    
    // $.post('/api/users', user)

}



// update user
//     var submitUpdatedUser = document.getElementById('submitUpdatedUser')


