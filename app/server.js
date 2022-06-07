// import
const express = require('express'); // import funzioni express
const data = require('fs'); // import metodi per gestione dei file
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dataReader = data.readFileSync('impianti.json'); // contenuto del file
let parser = JSON.parse(dataReader); // parsing del contenuto del file

// views engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);



// get per ottenere un impianto specificando l'ID
app.get('/getImpianto', (req, res) => {
  const id = req.query.idImpianto; 
  const elem = parser.filter(elem => elem['idImpianto'] == id); // ricerca impianto corrispondente
  if (elem.length > 0) {
    res.type('application/json').status(200).json(elem); // risposta in caso di successo
  }
  else {
    res.type('application/json').status(404).json({}); // risposta in caso di fallimento
  }
});

// get per renderizzare la gui per la ricerca di un impianto tramite ID
app.get('/cercaImpianto', (req, res) => {
  res.type('text/html').status(200).sendFile(__dirname + "/views/cercaImpianto.html");
});



// get per ottenere tutti gli impanti della bandiera Tamoil
app.get('/getImpiantiTamoil', (req, res) => {
  const elem = parser.filter(elem => elem['Bandiera'] == 'Tamoil'); // ricerca impianti corrispondenti
  if (elem.length > 0) {
    res.type('application/json').status(200).send(elem); // risposta in caso di successo
  }
  else {
    res.type('application/json').status(404).json({}); // risposta in caso di fallimento
  }
});

// get per ottenere GUI - tabella di tutti gli impianti della Tamoil
app.get('/cercaImpiantiTamoil', (req, res) => {
  res.type('text/html').status(200).sendFile(__dirname + '/views/impiantiTamoil.html');
});



// post per aggiungere un nuovo impianto
app.post('/postImpianto', (req, res) => {
  const impianto = req.body;
  const cloni = parser.filter(elem => elem['idImpianto'] == impianto.idImpianto); // ricerca possibili impianti con stesso id
  if (cloni.length == 0) {
    parser.push(impianto);
    console.log(impianto);
    data.writeFileSync("impianti.json", JSON.stringify(parser));
    res.type('text/plain').status(200).send('Impianto aggiunto correttamente!'); // risposta in caso di successo
  } else
    res.type('text/plain').status(406).send("Impianto già presente, prova a modificare l'id!"); // risposta in caso di fallimento
});

// get per renderizzare la gui per l'inserimento di un impianto
app.get("/aggiungiImpianto", (req, res) => {
  res.type('text/html').status(200).sendFile(__dirname + "/views/aggiungiImpianto.html");
});



// put per modificare il nome di un impianto in base all'id (no gui)
app.put('/modificaNomeImpianto', (req, res) => {
  const idImpianto = req.body.idImpianto;
  const nuovoNome = req.body.nomeImpianto;
  var elem = null; // variabile ausiliaria (conterrà l'indirizzo dell'impianto corrispondente - se presente)
  console.log(nuovoNome);
  console.log(idImpianto);
  for (var i = 0; i < parser.length; i++) {
    if (parser[i]['idImpianto'] == idImpianto) {
      elem = parser[i]; // impianto corrispondente
      elem['Nome Impianto'] = nuovoNome; // modifica del nome
    }
  }
  if (elem != null) { // update del file se la modifica del nome è avvenuta
    data.writeFileSync("impianti.json", JSON.stringify(parser));
    res.type('text/plain').status(200).send('Nome modificato correttamente!'); // risposta in caso di successo
  } else {
    res.type('text/plain').status(404).send('Impossibile trovare l\'impianto, prova a ricontrollare l\'id!'); // risposta in caso di fallimento
  }
});



// delete per eliminare un impianto (tramite id univoco) dal dataset (no gui)
app.delete('/eliminaImpianto', (req, res) => {
  const id = req.body.idImpianto;
  var n = -1; // variabile ausiliaria (indica la posizione dell'impianto da rimuovere - se presente)
  for (var i = 0; i < parser.length; i++) {
    if (parser[i]['idImpianto'] == id)
      n = i;
  }
  if (n >= 0) {
    parser.splice(n, 1); // rimozione
    data.writeFileSync("impianti.json", JSON.stringify(parser)); // update del file
    res.type('text/plain').status(200).send('Impianto eliminato correttamente!'); // risposta
  } else {
    res.type('text/plain').status(404).send('Impossibile trovare l\'impianto, prova a ricontrollare l\'id!'); // risposta in caso di fallimento
  }
});



// get per visualizzare tutti gli impianti nel comune di Milano (usato nella pagina principale)
app.get('/getTutto', (req, res) => {
  if (parser.length > 0) { // verifica presenza di almeno un impianto
    res.type('application/json').status(200).json(parser); // risposta in caso di successo
  } else {
    res.type('application/json').status(404).json({}); // risposta in caso di fallimento
  }
});

// get pagina principale
app.get("/menu", (req, res) => {
  res.type('text/html').status(200).sendFile(__dirname + "/views/menu.html");
});



// log server status
app.listen(process.env.PORT || 4000, () =>
  console.log("Server listen on " + process.env.PORT)
);