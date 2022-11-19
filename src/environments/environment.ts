// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl : 'https://www.omdbapi.com/?s=',
  apiKey : 'a94b9e03',
  firebase : {
    apiKey: "AIzaSyAZgc3wNQv9dDWfMKU8yDj2MME8ZhlljxM",
    authDomain: "which-movie-7c2e3.firebaseapp.com",
    databaseURL: "https://which-movie-7c2e3.firebaseio.com",
    projectId: "which-movie-7c2e3",
    storageBucket: "which-movie-7c2e3.appspot.com",
    messagingSenderId: "628057619491"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
