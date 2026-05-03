// on scroll the navbar changes colors
$(function () {
    $(document).scroll(function () {
        var $nav = $("#mainNav");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});

// Full-screen nav overlay
(function () {
    var hamburgerBtn = document.getElementById('hamburgerBtn');
    var navOverlay   = document.getElementById('navOverlay');
    var overlayClose = document.getElementById('overlayClose');
    if (!hamburgerBtn || !navOverlay) return;

    function openMenu() {
        hamburgerBtn.classList.add('active');
        hamburgerBtn.setAttribute('aria-expanded', 'true');
        navOverlay.classList.add('open');
        navOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        navOverlay.classList.remove('open');
        navOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', function () {
        navOverlay.classList.contains('open') ? closeMenu() : openMenu();
    });

    if (overlayClose) overlayClose.addEventListener('click', closeMenu);

    document.querySelectorAll('.overlay-link').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });
})();


// Contact form validation
const form = document.getElementById('form');
const email = document.getElementById('email');
const fullName = document.getElementById('fullName');
const message = document.getElementById('message');

form.addEventListener('submit', (e) => {
    if (!CheckInputs()) {
        e.preventDefault();
    }
});

function CheckInputs() {
    const emailValue = email.value.trim();
    const nameValue = fullName.value.trim();
    const messageValue = message.value.trim();

    var score = 0;

    if (emailValue === '') {
        SetErrorFor(email, 'Email can not be blank');
    } else if (!IsEmail(emailValue)) {
        SetErrorFor(email, 'Email is not valid');
    } else {
        SetSuccessFor(email);
        score += 1;
    }

    if (nameValue === '') {
        SetErrorFor(fullName, 'Name can not be blank');
    } else {
        SetSuccessFor(fullName);
        score += 1;
    }

    if (messageValue === '') {
        SetErrorFor(message, 'Message can not be blank');
    } else {
        SetSuccessFor(message);
        score += 1;
    }

    return score === 3;
}

function SetErrorFor(input, message) {
    const formControl = input.parentElement.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'formControl error';
}

function SetSuccessFor(input) {
    const formControl = input.parentElement.parentElement;
    formControl.className = 'formControl success';
}

function IsEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
