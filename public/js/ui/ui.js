// var $ = require('jQuery');

// check if on browse page
if(document.getElementById('nameSearch')) {
    console.log('on browse page');

    var nameSearch = document.getElementById('nameSearch');
    var categorySearch = document.getElementById('categorySearch');
    
    nameSearch.addEventListener('keyup', searchUser);
    categorySearch.addEventListener('keyup', searchCategory);

}

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

function searchCategory() {
    if(event.key === 'Enter') {
        var uri = 'api/categories/' + this.value;
        fetch(uri)
            .then(response => response.json())
            .then(data => {
                var users = data.users; //[]
                var gridOfLegends = document.getElementById("gridOfLegends");
                // empty grid
                while (gridOfLegends.firstChild) {
                    gridOfLegends.removeChild(gridOfLegends.firstChild);
                }
                // fill grid. TOLE JE PA SFUKANO LOL
                var cardOfALegend = document.getElementById("cardOfALegend").innerHTML;
                for (i = 0; i < users.length; i++) {
                    document.getElementById("nameOfLegend").innerHTML = 'JUS LESJAAAK';
                    gridOfLegends.innerHTML = cardOfALegend;

                }
                console.log(data.users)
            })
            .catch(error => console.log(error))
    }
}

// check if on createUser page
if(document.getElementById('newUserForm')) {

    // za submit rabs poslusat na <form id="nfjsrf">
    var newUserForm = document.getElementById('newUserForm')
    var submitUpdatedUser = document.getElementById('submitUpdatedUser')
    var test = document.getElementById('legendName')
    test.addEventListener('keyup', testForm)

    newUserForm.addEventListener('submit', testForm)
}

function testForm(elem) {
    console.log('hit the test target')
}

function postUser() {
    var formData = new FormData(this);
    var user = {
        data: {
            name: formData.data.name,
            categories: formData.data.categories 
        },
        google: {
            id: formData.google.id,
            email: formData.google.email
        }
    }

    console.log(user);
    // $.post('/api/users', user)
}


