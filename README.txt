Project Work Nikulina

L'applicazione è funzionante, con l'utilizzo dell'API fornita nel documento.
L'API era protetta, quindi ho dovuto installare un'estensione per browser che ne permettesse la lettura: 
l'estensione per Google Chrome si chiama Allow CORS: Access-Control-Allow-Origin.
una volta installata e fissata l'icona nella barra in alto a destra, basterà cliccare l'icona con tasto sinistro del mouse e successivamente cliccare sull'icona a sinistra, facendola diventare colorata.
Senza l'estensione (o un implementazione del codice corretta), non verranno generate le card dei prodotti.

L'applicazione si aprirà con la lista degli elementi selezionati vuota.
Se si volesse vedere il carrello riempito in una delle 3 modalità richieste, basterà seguire le indcazioni presenti nelle prime righe del codice javascript, 
ma ho ritenuto essere più dinamico dare immediatamente la possibilità di riempirlo in autonomia.
In qualunque caso sarà possibile aggiungere prodotti a scelta alla lista, scegliendo con il check se il prodotto è importato, oppure no, con il relativo calcolo di tassa e prezzo.
All'interno della lista ho implementato inoltre la possibilità di eliminare gli elementi dalla suddetta.

Ho implementato inoltre, come richiesto, la protezione Recaptcha. Ho inserito due domini per la creazione della chiave.
1. 127.0.0.1, poiche il live server di VSCode apriva la mia applicazione con questo url http://127.0.0.1:5500/index.html
2. pwnikulina.web.app, dopo aver creato il progetto su firebase e averne fatto il deploy.
Aperta l'applicazione con altri domini, il recaptcha non funzionerà.

L'URL del progetto generato da firebase: https://pwnikulina.web.app/

Ricordo che l'applicazione sarà funzionante solo con l'estensione Allow-CORS attiva

Vi ringrazio per il vostro tempo
