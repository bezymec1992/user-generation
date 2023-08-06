const inputs = document.querySelectorAll('.input');
const imgPreview = document.getElementById('img-preview');
let imgSrc = 'person.jpg';

//loading start/end
function loading() {
    $('.load').toggleClass("loading");
    $('.load').hasClass("loading") ?
        $('.load').removeClass("loader__title") :
        $('.load').addClass("loader__title");
}

//call rendom user
$(document).on("click", '.randomUser', function () {
    loading()
    $.ajax({
        url: 'https://randomuser.me/api/?results=1',
        dataType: 'json',
        error: "Uh oh, something has gone wrong.",
        success: function (data) {
            data.results.forEach(person => {
                $(".users").prepend(renderUsers(person));
                loading()
            });
        }
    });
})

//user
function renderUsers(person) {
    return `<li class="user-wrapp row align-items-center">
                <div class="col-12 col-md-4">
                    <img class="img-user" src="${person.picture.medium}" alt="person">
                </div>
                <div class="col-12 col-md-8 text-center text-md-start inf">
                    <div class="user__name">${person.name.first} ${person.name.last}</div>
                    <div>Phone: ${person.phone}</div>
                    <div>Email: ${person.email}</div>

                    <div class="modal__info">
                        <div>Gender: ${person.gender}</div>
                        <div>Age: ${person.dob.age}</div>
                        <div>State: ${person.location.state}</div>
                        <div>Country: ${person.location.country}</div>
                        <div>Street: ${person.location.street.name}</div>
                        <div>Street number: ${person.location.street.number}</div>
                        <div>ID: ${person.id.value}</div>
                    </div>
                    <button class="btn__info">More info</button>
                </div>
            </li>`
}

// see more/less info
$(document).on("click", ".btn__info", function (e) {
    this.parentNode.classList.toggle('open')
    e.target.innerHTML == 'More info' ? e.target.innerHTML = "Less info" : e.target.innerHTML = "More info"
});

// create person img src
function getImg(event) {
    const imgUrl = URL.createObjectURL(event.target.files[0]);
    imgPreview.src = imgUrl;
    imgSrc = imgUrl;
}

//clear form
function clear() {
    imgPreview.src = 'person.jpg';
    imgSrc = 'person.jpg';
    for (input of inputs) input.value = '';
}

//form add user
$(document).ready(function () {
    $("form").submit(function (e) {
        e.preventDefault()
        let name = $("#name").val();
        let lastName = $("#last-name").val();
        let email = $("#email").val();
        let phone = $("#phone").val();
        let genderSelect = $("#gender-select").val();
        let country = $("#country").val();
        let age = $("#age").val();
        let state = $("#state").val();
        let street = $("#street").val();
        let streetNumber = $("#street-number").val();
        let id = $("#id").val();

        $(".users").prepend(
            `<li class="user-wrapp row align-items-center"> 
                <div class="col-12 col-md-4">
                    <img class="img-user" src="${imgSrc}" alt="person">
                </div>
                <div class="col-8 col-12 col-md-8 text-center text-md-start inf">
                    <div class="user__name">${name} ${lastName}</div>
                    <div>Phone: ${phone}</div>
                    <div>Email: ${email}</div>
                    <div class="modal__info">
                        <div>Gender: ${genderSelect}</div>
                        <div>Age: ${age}</div>
                        <div>State: ${state}</div>
                        <div>Country: ${country}</div>
                        <div>Street: ${street}</div>
                        <div>Street number: ${streetNumber}</div>
                        <div>ID: ${id}</div>
                    </div>
                    <button class="btn__info">More info</button>
                </div>
            </li>`)

        clear();
        $('.form-section').removeClass('form-open'); 
        $('.users').toggleClass('user-close');
    })
})

//open and close form
$(document).on("click", '.createUser, .close', function () {
    $('.form-section').toggleClass('form-open'); 
    $('.users').toggleClass('user-close');
    clear();
});
