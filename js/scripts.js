
// on scroll the navbar changes colors
$(function () {
    $(document).scroll(function () {
        var $nav = $("#mainNav");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});




//CONTACT

//assign elements to objects for contact
const form = document.getElementById('form');
const email = document.getElementById('email');
const fullName = document.getElementById('fullName');
const message = document.getElementById('message');


//checks for errors
form.addEventListener('submit', (e) => {

    // e.preventDefault();
    // SetSuccessFor(fullName);
    // CheckInputs();
    //if the check returns false dont submit
    if (!CheckInputs()) {
        e.preventDefault();
    }
});

//recieves input values and checks them then calls function to change css
function CheckInputs() {
    //get values from inputs and gets rid of spaces
    const emailValue = email.value.trim();
    const nameValue = fullName.value.trim();
    const messageValue = message.value.trim();

    //used to check if form is valid. if by then end it doesnt equlat three then return false
    var score = 0;

    //CHECK EMAIL
    //checks if email is empty
    if (emailValue === '') {
        SetErrorFor(email, 'Email can not be blank');
    }
    //checks if email is correct form
    else if (!IsEmail(emailValue)) {
        SetErrorFor(email, 'Email is not valid');
    }

    else {
        SetSuccessFor(email);
        score += 1;
    }

    //CHECK NAME
    if (nameValue === '') {
        SetErrorFor(fullName, 'Name can not be blank');
    }
    else {
        SetSuccessFor(fullName);
        score += 1;
    }

    //CHECK MESSAGE
    if (messageValue === '') {
        SetErrorFor(message, 'Message can not be blank');
    }
    else {
        SetSuccessFor(message);
        score += 1;
    }

    //submit form
    if (score === 3) {
        return true;
    }

    //no submit
    else {
        return false;
    }


}

//this function displays the error message
function SetErrorFor(input, message) {
    console.log("error works");
    //this element is double nested
    const formControl = input.parentElement.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = "formControl error";
}

function SetSuccessFor(input) {
    console.log("success works ");
    const formControl = input.parentElement.parentElement;
    formControl.className = "formControl success";
}

//Verifies email.
function IsEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}