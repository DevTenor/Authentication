import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

async function main() {
    renderLoader();

    if (!await checkAuthorized()) {
        renderLoginPage();
    } else {
        renderContent();
    }
}

async function renderContent() {
  const app = document.getElementById('app');

  app.innerHTML = `
                    <div class="logout"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.00065 6.66667L1.66732 10L5.00065 13.3333M1.66732 10H12.5007M7.50065 16.4966C8.56298 17.1348 9.79632 17.5 11.1117 17.5C15.1005 17.5 18.334 14.1421 18.334 10C18.334 5.85783 15.1005 2.5 11.1117 2.5C9.79632 2.5 8.56298 2.86525 7.50065 3.50333" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg><span class="ms-1">Log out</span></div>
                    <div class="bd-example">
                    <form class="row g-3 details">
                    <div class="fs-5 fw-bold ps-0">Profile details</div>
                    <hr class="m-0 mt-1">
                    <div class="form-floating mb-3 col-md-12 ps-0">
                    <input type="text" class="form-control" id="username">
                    <label for="floatingInput">Username</label>
                    </div>
                    <div class="form-floating mb-3 col-md-6 ps-0">
                    <input type="text" class="form-control" id="fname">
                    <label for="floatingInput">First Name</label>
                    </div>
                    <div class="form-floating mb-3 col-md-6 ps-0 pe-0">
                    <input type="text" class="form-control" id="lname">
                    <label for="floatingInput">Last Name</label>
                    </div>
                    <div class="fs-5 fw-bold ps-0">Contact details</div>
                    <hr class="m-0 mt-1">
                    <div class="form-floating mb-3 col-md-6 ps-0">
                    <input type="email" class="form-control" id="profile_email">
                    <label for="floatingInput">Email</label>
                    </div>
                    <div class="form-floating mb-3 col-md-6 ps-0 pe-0">
                    <input type="text" class="form-control" id="number">
                    <label for="floatingInput">Mobile Phone</label>
                    </div>

                    <div class="col-12">
                        <button type="button" id="update_btn" class="save btn btn-primary disabled">Save</button>
                    </div>

                    <hr class="mb-0 mt-5">
                    <div class="delete-account--button"><span class="delete-account__text">Delete Account</span></div>
                    </form>
                    </div>`;


  getUserData();
  updateProfile();
  changeSaveButtonState();
  deleteProfile();
  logOut();
}

function renderLoginPage() {
    const app = document.getElementById('app');

    
  app.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="d-none">
    <symbol id="check2" viewBox="0 0 16 16">
      <path
        d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z">
      </path>
    </symbol>
    <symbol id="circle-half" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"></path>
    </symbol>
    <symbol id="moon-stars-fill" viewBox="0 0 16 16">
      <path
        d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z">
      </path>
      <path
        d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z">
      </path>
    </symbol>
    <symbol id="sun-fill" viewBox="0 0 16 16">
      <path
        d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z">
      </path>
    </symbol>
  </svg>
  <div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
    <button class="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center" id="bd-theme" type="button"
      aria-expanded="false" data-bs-toggle="dropdown" aria-label="Toggle theme (auto)">
      <svg class="bi my-1 theme-icon-active" aria-hidden="true">
        <use href="#circle-half"></use>
      </svg>
      <span class="visually-hidden" id="bd-theme-text">Toggle theme</span>
    </button>
    <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
      <li>
        <button type="button" class="dropdown-item d-flex align-items-center" id="theme_light" data-bs-theme-value="light"
          aria-pressed="false">
          <svg class="bi me-2 opacity-50" aria-hidden="true">
            <use href="#sun-fill"></use>
          </svg>
          Light
          <svg class="bi ms-auto d-none" aria-hidden="true">
            <use href="#check2"></use>
          </svg>
        </button>
      </li>
      <li>
        <button type="button" class="dropdown-item d-flex align-items-center" id="theme_dark" data-bs-theme-value="dark"
          aria-pressed="false">
          <svg class="bi me-2 opacity-50" aria-hidden="true">
            <use href="#moon-stars-fill"></use>
          </svg>
          Dark
          <svg class="bi ms-auto d-none" aria-hidden="true">
            <use href="#check2"></use>
          </svg>
        </button>
      </li>
      <li>
        <button type="button" class="dropdown-item d-flex align-items-center active" id="theme_auto" data-bs-theme-value="auto"
          aria-pressed="true">
          <svg class="bi me-2 opacity-50" aria-hidden="true">
            <use href="#circle-half"></use>
          </svg>
          Auto
          <svg class="bi ms-auto d-none" aria-hidden="true">
            <use href="#check2"></use>
          </svg>
        </button>
      </li>
    </ul>
  </div>
  <main class="form-login w-100 m-auto">
    <form id="loginForm">
      <h1 class="h3 fw-normal login_title">Log In</h1>
      <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
        <label for="floatingInput">Email address</label>
      </div>

      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
        <label for="floatingPassword">Password</label>
      </div>

      <div class="d-grid gap-3">
      <button type="submit" class="btn btn-primary w-100 py-2" id="login">
        Next
      </button>

      <div class="hr-text">
        <span class="continue_with">OR</span>
      </div>


      <button class="gsi-material-button" type="button" onclick="window.location.href='http://localhost:8000/oauth2/authorization/google'">
        <div class="gsi-material-button-state"></div>
        <div class="gsi-material-button-content-wrapper">
          <div class="gsi-material-button-icon">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
          </div>
          <span class="gsi-material-button-contents">Login with Google</span>
        </div>
      </button>

      <button class="gsi-material-button" type="button" onclick="window.location.href='http://localhost:8000/oauth2/authorization/github'">
        <div class="gsi-material-button-state"></div>
        <div class="gsi-material-button-content-wrapper">
          <div class="gsi-material-button-icon">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_248_5)">
            <path d="M0 0H48V48H0" fill="var(--icon-bg, #181717)"/>
            <path d="M31.4059 46.7814C30.1872 46.7814 29.9059 46.2189 29.9059 45.6564L29.9997 39.0939C29.9997 36.8439 29.2497 35.3439 28.3122 34.5939C33.6559 34.0314 39.2809 31.9689 39.2809 22.7814C39.2809 20.1564 38.3434 18.0001 36.8434 16.3126C37.1247 15.7501 37.8747 13.3126 36.5622 10.0314C36.5622 10.0314 34.5934 9.37512 29.9997 12.4689C26.0622 11.3439 21.9372 11.3439 17.9997 12.4689C13.4059 9.37512 11.4372 10.0314 11.4372 10.0314C10.1247 13.3126 10.8747 15.7501 11.1559 16.3126C9.65595 18.0001 8.71845 20.1564 8.71845 22.7814C8.71845 31.9689 14.2497 34.0314 19.5934 34.5939C18.9372 35.2501 18.2809 36.2814 18.0934 37.8751C16.6872 38.4376 13.2184 39.4689 11.1559 35.8126C11.1559 35.8126 9.84345 33.5626 7.40595 33.3751C7.40595 33.3751 5.0622 33.3751 7.3122 34.8751C7.3122 34.8751 8.8122 35.5314 9.9372 38.3439C9.9372 38.3439 11.3434 43.0314 17.9997 41.5314L18.0934 45.6564C18.0934 46.2189 17.8122 46.7814 16.5934 46.7814C15.2809 46.7814 15.4684 48.3751 15.4684 48.3751H32.5309C32.5309 48.3751 32.7184 46.7814 31.4059 46.7814Z" fill="var(--icon-fg, white)"/>
            </g>
            <defs>
            <clipPath id="clip0_248_5">
            <rect width="48" height="48" rx="24" fill="white"/>
            </clipPath>
            </defs>
            </svg>
          </div>
          <span class="gsi-material-button-contents">Login with GitHub</span>
        </div>
      </button>
      </div>

      <div class="d-flex align-items-center flex-row have_account">
        <figcaption class="figure-caption">
          Don't have an account?
        </figcaption>
        <button class="btn btn-link btn-sm rounded-pill px-3 ps-0" type="button"
          onclick="window.location.href='/register/index.html'">Sign up</button>
      </div>
    </form>
  </main>`;

    changeTheme();
    login();
}

async function login() {
    const loginButton = document.getElementById('loginForm');
    loginButton.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('floatingInput');
        const password = document.getElementById('floatingPassword');

        const inputText = email.value;
        const passwordText = password.value;
        const body = {
            email: inputText,
            password: passwordText
        };

        console.log(inputText, passwordText);

        const responseBody = await fetch('http://localhost:8000/api/auth',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body),
                credentials: "include"
            }
        )

        const loginTitle = document.querySelector('.login_title');

        const existedAlert = document.querySelector('[role="alert"]');
        if (existedAlert) existedAlert.remove();

        if (!responseBody.ok) {
            const alert = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                Account doesn't exist. Enter a different account or <a href="/" class="alert-link text-primary">get a new one.</a>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
            loginTitle.insertAdjacentHTML('afterend', alert);
            throw new Error("Registration error");
        }

        const success = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                  Congratulations! You have successfully logged in.
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`

        loginTitle.insertAdjacentHTML('afterend', success);

        const response = await responseBody.json();
        localStorage.setItem("jwt", response.token);

        await sleep(1000);

        renderContent();
    })
}


async function checkAuthorized() {
  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromUrl = urlParams.get("token");

  if (tokenFromUrl) {
    localStorage.setItem("jwt", tokenFromUrl);
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  const token = localStorage.getItem("jwt");
  if (token === null || token === "") {
    return false;
  } else {
    const body = {
      jwtToken: token
    }
    const responseBody = await fetch('http://localhost:8000/api/validate_token',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        credentials: "include"
      }
    );

    if (!responseBody.ok) {
      return false;
    }

    return true;
  }
}


function changeTheme() {
  const themeLight = document.getElementById('theme_light');
  const themeDark = document.getElementById('theme_dark');
  const themeAuto = document.getElementById('theme_auto');
  const htmlEl = document.querySelector('html');


  themeLight.addEventListener('click', () => {
      localStorage.setItem('theme', 'light');
      themeAuto.classList.remove('active');
      themeDark.classList.remove('active');
      themeLight.classList.add('active');
      htmlEl.setAttribute('data-bs-theme', 'light');
  });

  themeDark.addEventListener('click', () => {
      localStorage.setItem('theme', 'dark');
      themeAuto.classList.remove('active');
      themeLight.classList.remove('active');
      themeDark.classList.add('active');
      htmlEl.setAttribute('data-bs-theme', 'dark');
  });

  themeAuto.addEventListener('click', () => {
      localStorage.setItem('theme', 'auto');
      themeLight.classList.remove('active');
      themeDark.classList.remove('active');
      themeAuto.classList.add('active');
      htmlEl.setAttribute('data-bs-theme', 'auto');
  });

  if (localStorage.getItem('theme') === 'light') {
      themeAuto.classList.remove('active');
      themeDark.classList.remove('active');
      themeLight.classList.add('active');
      htmlEl.setAttribute('data-bs-theme', 'light');
  } else if (localStorage.getItem('theme') === 'dark') {
      themeAuto.classList.remove('active');
      themeLight.classList.remove('active');
      themeDark.classList.add('active');
      htmlEl.setAttribute('data-bs-theme', 'dark');
  } else if (localStorage.getItem('theme') === 'auto') {
      themeLight.classList.remove('active');
      themeDark.classList.remove('active');
      themeAuto.classList.add('active');
      htmlEl.setAttribute('data-bs-theme', 'auto');
  }
}


async function getUserData() {
  const token = localStorage.getItem("jwt");

  if (token === null || token === "") {
    return;
  }

  const body = {
    jwtToken: token
  }

  const responseBody = await fetch('http://localhost:8000/api/get_profile',
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      credentials: "include"
    }
  );

  if (!responseBody.ok) {
    throw new Error("Unable to provide access to profile");
  }

  const response = await responseBody.json();

  const profileEmail = document.getElementById('profile_email');
  const profileUsername = document.getElementById('username');
  const profileFirstName = document.getElementById('fname');
  const profileLastName = document.getElementById('lname');
  const profileNumber = document.getElementById('number');

  profileEmail.value = response.email ?? '';
  profileUsername.value = response.username ?? '';
  profileFirstName.value = response.firstName ?? '';
  profileLastName.value = response.lastName ?? '';
  profileNumber.value = response.mobilePhone ?? '';
}

async function renderLoader() {
  await new Promise(resolve => setTimeout(resolve, 700));
  const loader = document.getElementById('loading-screen');
  loader.style.opacity = '0';
  loader.style.transition = 'opacity .4s ease';
  setTimeout(() => {
    loader.remove();
    document.getElementById('app').style.display = 'block';
  }, 400);
}

function changeSaveButtonState() {
  const username = document.getElementById('username');
  const fname = document.getElementById('fname');
  const lname = document.getElementById('lname');
  const profile_email = document.getElementById('profile_email');
  const number = document.getElementById('number');

  const button = document.getElementById('update_btn');

  username.addEventListener('input', () => {
    button.classList.remove('disabled');
  });

  fname.addEventListener('input', () => {
    button.classList.remove('disabled');
  });

  lname.addEventListener('input', () => {
    button.classList.remove('disabled');
  });

  profile_email.addEventListener('input', () => {
    button.classList.remove('disabled');
  });

  number.addEventListener('input', () => {
    button.classList.remove('disabled');
  });
}

async function updateProfile() {
  const username = document.getElementById('username');
  const fname = document.getElementById('fname');
  const lname = document.getElementById('lname');
  const profile_email = document.getElementById('profile_email');
  const number = document.getElementById('number');

  const button = document.getElementById('update_btn');
  button.addEventListener('click', async () => {
    if (!button.classList.contains('disabled')) {
      const token = localStorage.getItem('jwt');
      const body = {
        jwtToken: token,
        username: username.value,
        firstName: fname.value,
        lastName: lname.value,
        email: profile_email.value,
        mobilePhone: number.value
      }
      const request = await fetch('http://localhost:8000/api/update_profile', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!request.ok) throw new Error("Unable to update profile");

      button.classList.add('disabled');

      const alertSuccess = `<div class="alert_saved_data bd-example m-0 border-0"><div class="alert alert-primary alert-dismissible fade show" role="alert">
                  Changes saved to profile.
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
      </div>`;
      document.querySelector('body').insertAdjacentHTML('afterbegin', alertSuccess);

      const alertEl = document.querySelector('.alert_saved_data');

      (async () => {
        await sleep(1000);

        if (alertEl) {
          const innerAlert = alertEl.querySelector('.alert');

          innerAlert.classList.remove('show');

          await sleep(150);
          alertEl.remove();
        }
      })();

    }
  });
}

function logOut() {
  const logOutEl = document.querySelector('.logout');
  logOutEl.addEventListener('click', () => {
    localStorage.removeItem('jwt');
    window.location.reload();
  })
}

async function deleteProfile() {
  const deleteButton = document.querySelector('.delete-account--button');
  deleteButton.addEventListener('click', async () => {
    if (confirm('Are you sure, you want to delete your account ?')) {
      const jwtToken = localStorage.getItem('jwt');
      const bodyRequest = {
        jwtToken: jwtToken
      };
      const request = await fetch('http://localhost:8000/api/account_remove',
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(bodyRequest)
        }
      );

      if (!request.ok) throw new Error("Error occured, while removing account");

      localStorage.removeItem('jwt');

      const removingAlert = `<div class="alert alert-light alert-dismissible fade show account-removed" role="alert">
                  Your account was successfully removed.
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
      document.querySelector('body').insertAdjacentHTML('afterbegin', removingAlert);

      await sleep(1000);

      window.location.reload();
    }
  })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

main();