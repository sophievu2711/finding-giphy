# Finding Giphy

A Giphy search interface.
Demo: https://sophievu2711.github.io/finding-giphy/

## User Manual
```sh
1. Input a keyword into the search bar.
Then, click either SEARCH GIFS or SEARCH STICKERS. 
You can also just press Enter and the program will randomly choose for you :).
```
![first](https://raw.githubusercontent.com/sophievu2711/finding-giphy/master/src/assets/main.PNG)
```sh
2. Results limit for each search session is 20 by default 
and the program always set a random integer value for "offset" in your first search attempt.

But, you can also adjust value of these parameters manually 
(input an integer value in to the text field and click either UPDATE LIMIT/ UPDATE OFFSET).

"Clear Current Offset" button is there to help you to clear the current value of offset. 
Then, if you click REFRESS again, the program will still randomly give you an offset value.
```
![second](https://raw.githubusercontent.com/sophievu2711/finding-giphy/master/src/assets/adjust.PNG)
```sh
3. Demo of results. Click on the picture you like to find more details on GIPHY.
```
![third](https://raw.githubusercontent.com/sophievu2711/finding-giphy/master/src/assets/gif.PNG)

## Functionalities

- Search Gifs and Stickers by keyword
- Display random set of results 

## Building and running on localhost

First install dependencies:

```sh
npm install
```

To run in hot module reloading mode:

```sh
npm start
```

To create a production build:

```sh
npm run build-prod
```

## Credits

Made with [createapp.dev](https://createapp.dev/)

[1]: https://developers.giphy.com/dashboard/?create=true
[2]: https://www.npmjs.com/package/giphy
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
