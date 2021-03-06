# impianti-carburante-milano
Progetto Piattaforme Digitali per la Gestione del Territorio

Elia Ceccolini, 308666

Impianti del carburante per autotrazione nel comune di Milano

<h1>DESCRIZIONE E OBIETTIVO</h1>
L’<b>obiettivo</b> del progetto è creare un Web Service che espone delle APIs per l’interrogazione e l’elaborazione di un elenco dati riguardante gli impianti dei carburanti per autotrazione, localizzati all’interno del comune di Milano. Per ogni impianto si tiene traccia di:

- Il codice univoco (idImpianto);

- Il gestore;

- La bandiera;

- Il tipo;

- Il nome;

- L’indirizzo;

- Il comune;

- La provincia;

- Il numero del municipio;

- Il codice NIL;

- Il NIL (Nucleo di Identità Locale, definibile anche come quartiere);

- Longitudine;

- Latitudine;

- Location (unione della longitudine e della latitudine separati da una virgola e racchiusi tra parentesi tonde).


Per l'implementazione del servizio si è utilizzato il sito www.glitch.com; il codice per l'implementazione del Web Service è racchiuso nel file nominato server.js e le interfacce grafiche nei file:
- aggiungiImpianto.html
- cercaImpianto.html
- impiantiTamoil.html
- menu.html

Il dataset (.json) è contenuto nel file impianti.json ed è stato reperito dal sito del governo (www.dati.gov.it). Può essere consultato al seguente link: https://dati.gov.it/view-dataset/dataset?id=932e162f-c2dd-48a5-8641-bf16d6f1e6a5.
L'url per effettuare le richieste al server è: https://impianti-carburante-milano.glitch.me.

<h1>FUNZIONALITA'</h1>
Le funzionalità esposte sono:

- <b>get</b> (/getTutto) per cercare tutti gli impianti presenti nel comune di Milano (GUI: /menu)
  Non è previsto alcun input, l'output è un oggetto in formato json contenente tutti gli impianti presenti (vuoto se non ci sono)

- <b>get</b> (/getImpianto) per cercare uno specifico impianto tramite il codice univoco (GUI: /cercaImpianto). L'input è il codice univoco (idImpianto), l'output è un oggetto in formato json contenente le informazioni relative all'impianto (vuoto se non è presente)

- <b>get</b> (/getImpiantiTamoil) per cercare tutti gli impianti della bandiera Tamoil (GUI: /cercaImpiantiTamoil). Non è previsto alcun input, l'output è un oggetto in formato json contente le informazioni relative a tutti gli impianti Tamoil (vuoto se non ne è presente nemmeno uno)

- <b>post</b> (/postImpianto) per aggiungere un nuovo impianto (tutti i campi devono essere compilati e il codice immesso deve essere diverso da quelli già esistenti) (GUI: /aggiungiImpianto). Gli input sono tutte le informazioni (obbligatorie) relative all'impianto da aggiungere, l'output è un messaggio di conferma (o di errore se il codice univoco è già presente)

- <b>delete</b> (/eliminaImpianto) per cancellare un impianto tramite il codice univoco. L'input è il codice univoco (idImpianto) dell'impianto da eliminare, l'output è un messaggio di conferma (o di errore se il codice univoco non è presente)

- <b>put</b> (/modificaNomeImpianto) per modificare il nome di un impianto già esistente (la ricerca viene effettuata tramite il codice univoco). Gli input sono il codice univoco dell'impianto a cui modificare il nome e il nuovo nome, l'output è un messaggio di conferma (o di errore se il codice univoco non è presente)

Tutti i formati degli input (dove presenti) è x-www-form-urlencoded.

Tutte le seguenti richieste vengono effettuate tramite il protocollo HTTP e l'intestazione contiene il content-type che nella maggior parte dei casi è 'application/json' o 'text/plain' (viene utilizzato anche 'text/html' solamente per le get dei render delle GUI). 

Le ultime due funzionalità sono prive di interfaccia grafica, perciò devono essere effettuate da Postman.

Tutte le pagine html sono state progettate per lasciare l'elaborazione dei dati al server, perciò si occupano solamente della formattazione dei dati, in modo da renderli più leggibili all'occhio umano, e della creazione delle eventuali mappe geografiche (se presenti).

<h1>ESEMPI</h1>

Esempi di utiizzo del Web Service:
1) <b>GET /getTutto:</b>
  - richiesta: ricerca di tutti gli impianti presenti nel comune di Milano; il risultato atteso è la visualizzazione di tutti gli impianti in una mappa     geografica
  - risposta: <img width="1440" alt="menu" src="https://user-images.githubusercontent.com/97044668/171383214-29fdb372-af0e-4659-9eaf-06ad5090b6a8.png">
  
2) <b>GET /getTutto:</b>
  - richiesta: ricerca di tutti gli impianti presenti nel comune di Milano; nel caso in cui non ci fossero il risultato atteso è la visualizzazione di       un messaggio di errore
  - risposta: <img width="1440" alt="menuFail" src="https://user-images.githubusercontent.com/97044668/171442062-651352f9-344d-45bf-a2fc-ed0a2555101c.png">

3) <b>GET /getImpianto:</b>
  - richiesta: ricerca di un impianto presente (es. idImpianto = 37506); il risultato atteso è la visualizzazione di tutte le relative informazioni nella     medesima pagina e la localizzazione di tale impianto in una mappa geografica
  - risposta: <img width="1440" alt="cercaImpiantoSuccess" src="https://user-images.githubusercontent.com/97044668/171384146-4cb0dd1a-2292-4202-81ea-b86aa500ebf4.png">

4) <b>GET /getImpianto:</b>
  - richiesta: ricerca di un impianto che non è presente (es. idImpianto = 1); il risultato atteso è la comparsa di una scritta di errore che suggerisce       all'utente di ricontrollare la correttezza del codice
  - risposta: <img width="1440" alt="cercaImpiantoFail" src="https://user-images.githubusercontent.com/97044668/171384605-edbe86fe-6017-4f6c-a2e1-a0fb73d8dea3.png">

5) <b>GET /getImpiantiTamoil:</b>
  - richiesta: ricerca di tutti gli impianti appartenenti alla bandiera Tamoil; il risultato atteso è la lista di tutti gli impianti visualizzati su una       mappa e le relative informzioni elencate in una tabella
  - risposta: <img width="1440" alt="cercaImpiantiTamoilSuccess" src="https://user-images.githubusercontent.com/97044668/171385220-1f1908f9-33c2-4efb-ab95-47c674086231.png">

6) <b>GET /getImpiantiTamoil:</b>
  - richiesta: ricerca di tutti gli impianti Tamoil; quando non ne è presente nessuno il risultato atteso è un messaggio di errore che invita all'utente     di aggiungerne uno nuovo
  - risposta: <img width="1440" alt="cercaImpiantiTamoilFail" src="https://user-images.githubusercontent.com/97044668/171385822-4ce1e984-b005-4b3e-8998-9d3668ebff96.png">

7) <b>POST /postImpianto:</b>
  - richiesta: il body contiene tutte le informazioni (obbligatorie) relative all'impianto da aggiungere; il risultato aspettato è un messaggio di             conferma dell'avvenuto inserimento 
    <img width="1440" alt="aggiungiImpiantoSuccess1" src="https://user-images.githubusercontent.com/97044668/171387055-66cfe50e-226e-4aad-bd56-db07a132b54f.png">
  - risposta: <img width="1440" alt="aggiungiImpiantoSuccess2" src="https://user-images.githubusercontent.com/97044668/171387081-22343f6b-455a-4fff-bb8e-d0a10c8acdaf.png">

8) <b>POST /postImpianto:</b>
  - richiesta: il body contiene tutte le informazioni relative all'impianto (obbligatorie); quando il codice è già presente in quelli esistenti il risultato atteso è un messaggio di errore che suggerisce all'utente di modificare l'id
   <img width="1440" alt="aggiungiImpiantoFail1" src="https://user-images.githubusercontent.com/97044668/171428232-b601fc13-e1d2-4c13-a58d-aeba561700d6.png">
  - risposta: <img width="1440" alt="aggiungiImpiantoFail2" src="https://user-images.githubusercontent.com/97044668/171428270-5d53a671-393d-4cec-bc65-e6a4dfd0853f.png">

9) <b>DELETE /eliminaImpianto:</b>
  - richiesta: eliminazione di un impianto specificando un id esistente (es. 1234); il risultato atteso è un messaggio che conferma l'avvenuta             eliminazione
  - risposta: <img width="1012" alt="eliminaImpiantoSuccess" src="https://user-images.githubusercontent.com/97044668/171429237-3d071c9f-6e12-4f9a-a5c3-bd25231b5186.png">

10) <b>DELETE /eliminaImpianto:</b>
  - richiesta: eliminazione di un impianto specificando un id non presente (es. 7890); il risultato atteso è un messaggio di errore che suggerisce         all'utente di controllare la correttezza dell'id
  - risposta: <img width="1004" alt="eliminaImpiantoFail" src="https://user-images.githubusercontent.com/97044668/171846553-fecb8a7f-465b-4b28-a8ee-ee4c798d5ec5.png">

11) <b>PUT /modificaNomeImpianto:</b>
  - richiesta: modifica del nome di un impianto (specificando l'id esistente); il risultato atteso è un messaggio che conferma l'avvenuta modifica
  - risposta: <img width="1004" alt="modificaNomeImpiantoSuccess" src="https://user-images.githubusercontent.com/97044668/171439061-b0f69323-acaa-42b2-a6ad-734475afb751.png">

12) <b>PUT /modificaNomeImpianto:</b>
  - richiesta: modifica del nome di un impianto (specificando un id inesistente); il risultato atteso è un messaggio di errore che invita l'utente a     ricontrollare l'id
  - risposta: <img width="1011" alt="modificaNomeImpiantoFail" src="https://user-images.githubusercontent.com/97044668/171439479-293371aa-e03e-49e7-9e67-1a9de8849797.png">
