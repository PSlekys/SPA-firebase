const app = document.getElementById("app");

document.location.hash = "login";
Router();

window.addEventListener("hashchange", () => {
  Router();
});

function Router() {
  let route = document.location.hash.toLowerCase();
  if (route.length > 0) {
    route = route.slice(1);
  }

  switch (route) {
    case "view":
      app.innerHTML = "";
      HomePage();
      break;
    case "add":
      app.innerHTML = "";
      AddPage();
      break;
    case "login":
      app.innerHTML = "";
      LoginPage();
      break;
    default:
      app.innerHTML = "";
      LostPage();
  }
}

function Header() {
  const header = `
        <header>
            <div class="wrapper">
                <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt="Google" />

                <nav>
                    <a href="#view" id="view">View</a>
                    <a href="#add" id="add">Add</a>
                </nav>
            </div>
        </header>
    `;

  app.innerHTML += header;
}

function LoginPage() {
  const login = `
    <main class="wrapper">
        <h1>Login</h1>
        <form name="login">
            <input type="email" name="email" required />
            <input type="password" name="password" required />
            <button type="submit">Login</button>
        </form>
    </main>
  `;

  app.innerHTML += login;

  document.forms.login.addEventListener("submit", (e) => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(
        e.target.elements.email.value,
        e.target.elements.password.value
      )
      .then(() => (document.location.hash = "view"));
  });
}

function HomePage() {
  const home = `
          <main class="wrapper">
              <h1>Home</h1>
              <table>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody></tbody>
              </table>
          </main>
      `;

  Header();
  app.innerHTML += home;

  const table = document.querySelector("tbody");

  firebase
    .firestore()
    .collection("books")
    .get()
    .then((snapshot) =>
      snapshot.docs.forEach((book) => {
        const tr = table.insertRow();

        const td1 = tr.insertCell();
        td1.textContent = book.data().author;

        const td2 = tr.insertCell();
        td2.textContent = book.data().title;
      })
    );
}

function AddPage() {
  const add = `
          <main class="wrapper">
              <h1>Add</h1>
              <form name="add">
                  <input type="text" name="author" required />
                  <input type="text" name="title" required />
                  <button type="submit">Add</button>
              </form>
          </main>
      `;

  Header();
  app.innerHTML += add;

  document.forms.add.addEventListener("submit", (e) => {
    e.preventDefault();

    firebase.firestore().collection("books").add({
      author: event.target.elements.author.value,
      title: event.target.elements.title.value,
    });
  });
}

function LostPage() {
  const lost = `
    <main class="wrapper">
        <h1>404: not found</h1>
    </main>
  `;

  app.innerHTML += lost;
}
