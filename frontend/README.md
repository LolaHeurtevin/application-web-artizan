# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

pour mettre en prod : 
yarn build
yarn preview

(ça créer le dossier dist qui contient tout le projet)


1 - Créer un compte : 
Dans le composant RegisterForm on rentre toujours dans le erreur je ne comprends pas pourquoi (cf commentaire)

2 - Page de profil
erreur liée aux attributs mais ça vient sûrement du fait que 'attributs' est vide car il y a une erreur avec la requête (problème d'autorisation ?)

3 - création de l'attribut users-permissions-user dans "Artisan"
question : préciser ce qu'il veut dire par "relation optionnelle", est ce que c'est que un artisan n'est pas forcément un utilisateur ou l'inverse ?

pb : dans user je ne peux pas toucher aux attributs et je ne comprends pas comment "dévérouiler" le truc
