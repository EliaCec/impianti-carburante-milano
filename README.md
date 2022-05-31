# impianti-carburante-milano
Progetto Piattaforme Digitali per la Gestione del Territorio

Elia Ceccolini, 308666
Impianti del carburante per autotrazione nel comune di Milano

L’obiettivo del progetto è creare un Web Service che espone delle APIs per l’interrogazione e l’elaborazione di un elenco dati riguardanti gli impianti dei carburanti per autotrazione localizzati all’interno del comune di Milano. Per ogni impianto si tiene traccia di:
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
Per l'implementazione del servizio si è utilizzato il sito www.glitch.com, il codice per l'implementazione del Web Service è racchiuso nel file nominato server.js e le interfacce grafiche nei file:
- aggiungiImpianto.html
- cercaImpianto.html
- impiantiTamoil.html
- menu.html
Il dataset (.json) è contenuto nel file impianti.json ed è stato reperito dal sito del governo (www.dati.gov.it) e possono essere consultati al seguente link: https://dati.gov.it/view-dataset/dataset?id=932e162f-c2dd-48a5-8641-bf16d6f1e6a5.

Le funzionalità esposte sono:
- get per cercare tutti gli impianti presenti nel comune di Milano (GUI)
- get per cercare uno specifico impianto tramite il codice univoco (GUI)
- get per cercare tutti gli impianti della bandiera Tamoil (GUI)
- post per aggiungere un nuovo impianto (tutti i campi devono essere compilati e il codice immesso deve essere diverso da quelli già esistenti) (GUI)
- delete per cancellare un impianto tramite il codice univoco
- put per modificare il nome di un impianto già esistente (la ricerca viene effettuata tramite il codice univoco)
Tutte le seguenti richieste vengono effettuate tramite il protocollo HTTP e l'intestazione contiene il content-type che nella maggior parte dei casi è 'application/json' o 'text/plain' (viene utilizzato anche 'text/html' solamente per le get per il rendere delle GUI).
Le ultime due funzionalità sono prive di interfaccia grafica, perciò devono essere effettuate da Postman.

