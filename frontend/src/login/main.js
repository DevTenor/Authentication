import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

async function main() {
    const isAuth = await checkAuthorized();

    renderPreview();

    if (!isAuth) {
        renderLoginPage();
    } else {
        navigateDashboard();
    }
}

async function navigateDashboard() {
    window.location.href = "/";
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
  <main class="form-signin w-100 m-auto">
    <form>
      <h1 class="h3 fw-normal sign_in_title">Log In</h1>
      <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
        <label for="floatingPassword">Password</label>
      </div>
      <div class="btn btn-primary w-100 py-2" id="sign_in"> <!--- <button type="submit" ---->
        Login
      </div>

      <hr class="hr__divider" style="margin-top: 1.5rem">
      <div class="d-flex align-items-start flex-column">
        <figcaption class="figure-caption">
          Don't have an account?
        </figcaption>
        <button class="btn btn-link btn-sm rounded-pill px-3 ps-0" type="button"
          onclick="window.location.href='/'">Sign up</button>
      </div>
      <hr class="hr__divider" style="margin-bottom: 1.5rem">
        <div class="card regtable">
          <div class="card-header">Already registered users</div>
          <div class="card-body">
            <p class="card-text">
              To provide the list of already registered and saved in our database users,
              press the button below.
            </p>
            <button type="button" id="display_table" class="btn btn-outline-secondary btn-sm">
              Display the table
            </button>
          </div>
        </div>
    </form>
  </main>

  <div class="wrapper" id="table_wrapper">
    <div class="bd-example-snippet bd-code-snippet" id="table_content">
    <div class="close_cross_button">
    <button type="button" class="btn-close table_content__close_button" data-bs-dismiss="alert" aria-label="Close" style="filter: invert(1) grayscale(100%) brightness(200%);">
    </button>
    </div>
      <div class="bd-example m-0 border-0 pt-0">
        <table class="table table-dark table-borderless">
          <thead>
            <tr>
              <th scope="col">#id</th>
              <th scope="col">email</th>
              <th scope="col">encodedPassword</th>
              <th scope="col">creationDate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">--</th>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>`;

    changeTheme();
    displayTable();
    login();
}

async function login() {
    const loginButton = document.getElementById('sign_in');
    loginButton.addEventListener('click', async () => {
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

        const signinTitle = document.querySelector('.sign_in_title');

        const existedAlert = document.querySelector('[role="alert"]');
        if (existedAlert) existedAlert.remove();

        if (!responseBody.ok) {
            const alert = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                Account doesn't exist. Enter a different account or <a href="/" class="alert-link text-primary">get a new one.</a>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
            signinTitle.insertAdjacentHTML('afterend', alert);
            throw new Error("Registration error");
        }

        const success = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                  Congratulations! You have successfully logged in.
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`

        signinTitle.insertAdjacentHTML('afterend', success);

        const response = await responseBody.json();
        localStorage.setItem("jwt", response.token);

        await sleep(1000);

        window.location.href = "/";
    })
}

async function displayTable() {
  const table_wrapper = document.getElementById('table_wrapper');
  const close_button = document.querySelector('.table_content__close_button');
  const table = document.getElementById('table_content');

  const tableButton = document.getElementById('display_table');
  tableButton.addEventListener('click', async () => {
    table_wrapper.classList.add('active-wrapper');
    table.classList.add('bd-example-snippet-active');

    const responseBody = await fetch('http://localhost:8000/api/users',
      {
        method: "GET"
      }
    )

    if (!responseBody.ok) throw new Error("Error getting users");

    const response = await responseBody.json();

    if (response.length > 0) {
      const table = document.querySelector("#table_content tbody");

      table.innerHTML = '';

      for (let i = 0; i < response.length; i++) {
        const id = response[i].id;
        const email = response[i].email;
        const encodedPassword = response[i].encodedPassword;
        const creationDate = new Date(response[i].createdAt);
        const formattedDate = creationDate.toLocaleString("ru-RU", {
          timeZone: "Europe/Bratislava"
        });

        const tr = `<tr>
                      <th scope="row">${id}</th>
                      <td>${email}</td>
                      <td>${encodedPassword}</td>
                      <td>${formattedDate}</td>
                    </tr>`;
        table.innerHTML += tr;
      }
    }
  })

  table_wrapper.addEventListener('click', (event) => {

    const isClickInsideTable = event.target.closest('.bd-example-snippet');

    if (!isClickInsideTable) {
      table_wrapper.classList.remove('active-wrapper');
      table.classList.remove('bd-example-snippet-active');
    }
  });

  close_button.addEventListener('click', () => {
      table_wrapper.classList.remove('active-wrapper');
      table.classList.remove('bd-example-snippet-active');
  })
}



async function checkAuthorized() {
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

        const response = responseBody.json();
        console.log("status: " + response.status);
        console.log("message: " + response.message);
        return true;
    }
}

async function renderPreview() {
    await new Promise(resolve => setTimeout(resolve, 500));
    const loader = document.getElementById('loading-screen');
    loader.style.opacity = '0';
    loader.style.transition = 'opacity .4s ease';
    setTimeout(() => {
        loader.remove();
        document.getElementById('app').style.display = 'block';
    }, 400);
}


function changeTheme() {
  const themeLight = document.getElementById('theme_light');
  const themeDark = document.getElementById('theme_dark');
  const themeAuto = document.getElementById('theme_auto');
  const htmlEl = document.querySelector('html');


  themeLight.addEventListener('click', () => {
      themeAuto.classList.remove('active');
      themeDark.classList.remove('active');
      themeLight.classList.add('active');
      htmlEl.setAttribute('data-bs-theme', 'light');
  });

  themeDark.addEventListener('click', () => {
      themeAuto.classList.remove('active');
      themeLight.classList.remove('active');
      themeDark.classList.add('active');
      htmlEl.setAttribute('data-bs-theme', 'dark');
  });

  themeAuto.addEventListener('click', () => {
      themeLight.classList.remove('active');
      themeDark.classList.remove('active');
      themeAuto.classList.add('active');
      htmlEl.setAttribute('data-bs-theme', 'auto');
  });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

main();