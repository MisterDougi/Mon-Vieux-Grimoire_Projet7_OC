# Mon vieux Grimoire


## Comment lancer le projet ? 

### Avec npm

Faites la commande `npm install` à la racine et une nouvelle fois dans le dossier backend pour installer les dépendances

### Paramétrez votre BDD

Accédez au site web de MongoDB - https://account.mongodb.com/ - et inscrivez-vous pour obtenir un compte. Une fois que vous avez accès à votre tableau de bord, créez un cluster puis configurez-le.

Récupérez votre code URI sur MongoDB et ajoutez-le dans un fichier .env que vous créez (exemple du contenu dans le fichier .example.env, dans le dossier backend).

### Lancez le backend

 Faites la commande `nodemon run start` dans le dossier backend pour lancer le serveur, et `npm run start` à la racine pour lancer le projet. 
