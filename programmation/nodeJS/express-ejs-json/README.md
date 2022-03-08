# Node JS - Express - EJS

## Workflow

- User makes a request to path `/`
- Server calculate a captcha value and render `anime.ejs`
- User fills input text with captcha value and clicks on button
- Browser makes a request in JSON format to `/anime`to get two animes 
- Server checks the captcha and returns 2 animes in JSON format if it is correct 

### Point importants

### server js

- Générer une valeur aléatoire
  - Double : `Math.random() * 100`
  - Indice de tableau : il faut convertir en nombre entier

```javascript
Math.floor(Math.random() * ANIMES.length)
```

- Récupérer les données depuis un fichier JSON : `import ANIMES from "./anime.json"`

  - Attention : module expérimental, plus d'info sur un autre article : [Lecture de fichier JSON avec Node.JS](https://rya-sge.github.io/access-denied/2022/01/01/nodejs-json/)

- Effectuer une réponse au format JSON :  `res.json(response)`

  ```javascript
  let response = {
  animes: []
  }
  res.json(response);
  ```

- Faire le rendu d'une vue ejs : `res.render("anime")`

  - En injectant des données au format JSON

  ```javascript
  res.render("anime", {
          captcha: captchaValue
  });
  ```

### anime.ejs

- Obtenir la valeur contenu dans la réponse JSON du serveur : ` <%= captcha %>`
- Effectuer une action au clique de l'utilisateur : `onClick="getAnime()"`
- getAnime()
  - Récupérer l'élément du DOM par son ID : `let inputCaptcha = document.getElementById("captcha")`
    - Récupérer sa valeur avec lâttribue `value`: nputCaptcha.value`
  - Modifier le contenu des balises `p`: `document.getElementById("response").textContent` 

- Effectuer une requête POST au format JSON

  - Code

  ```javascript
  const responseRaw = await fetch("/anime", {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(
          requestJson)
  });
  ```

  - Convertir la réponse au format JSON : ` await responseRaw.json()`

  