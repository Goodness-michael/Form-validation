const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const captcha = document.getElementById("captcha");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInput();
});

function setError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

function setSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkInput() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  const captchaValue = captcha.value.trim();
  if (usernameValue === "") {
    // validate the username (empty fields, min length is 5)
    // username is required
    setError(username, "username is required");
  } else if (usernameValue.length < 5) {
    // minimum username length is 5
    setError(username, "minimum username length is 5");
  } else {
    // success
    setSuccess(username);
  }
  //    validate email(email must not be empty, email must include 0)

  if (emailValue === "") {
    setError(email, "email is required");
  } else if (!emailValue.includes("@")) {
    setError(email, "Email is notvalid");
  } else {
    setSuccess(email);
  }

  if (passwordValue === "") {
    setError(password, "password is required");
  } else if (passwordValue <= 7) {
    setError(password, "minimum password is 7");
  } else {
    setSuccess(password);
  }

  if (password2Value === "") {
    setError(password2, "password is required");
  } else if (password2Value !== passwordValue) {
    setError(password2, "password incorrect");
  } else setSuccess(password2);
  if (!captchaValue) {
    setError(captcha, "captcha is required");
  }
}

// sellect that button using the class show-btn
const showBtn = document.querySelector(".show-btn");
showBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputType = password.getAttribute("type");
  if (inputType === "password") {
    password.setAttribute("type", "text");
    showBtn.value = "hide";
  } else {
    password.setAttribute("type","password");
    showBtn.value ="show";
  }

});

captcha.addEventListener("input", (e) => {
  // select image
  const img = document.querySelector("img");
  const text = e.target.value;
  const blurValue = 20 - text.length;
  // blurr px
  img.style.filter = `blur(${blurValue}px)`;
  if (blurValue<=0){
    setSuccess(captcha);
  }else{
    setError(captcha,"text is not long enough");}
});
