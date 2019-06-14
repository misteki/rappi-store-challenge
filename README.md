# Rappi Store Challenge

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Assumptions and considerations
- Spanish was assumed to be the desired language.
- A unique ID was not available for each category in the original source data. Change IDs so each category would have a unique one. IDs have been assumed to be only valid if they are numbers bigger than 0 (0 not admitted).
- When selected a category, filter includes the category itself and all its subcategories.
- The paginator size ( number of pages it displayed) was not capped due to the fact that there are at most 7 pages with the set page size and the amount of products in the hardcoded data; but it should be!
- Products that are not available can be added to the cart 
- Products can be removed from the cart only from the Cart view
- Service method errors are only informed using the console. For UX's sake this should not be the case, but the UI implementation was not explicitly required and thus was not implemented.
- Considering there's only two distinct views (product list and cart), routing was not added.
- When fetching local storage fails for any reason, an empty cart is returned and the storage is cleared to avoid future errors. The promises related to this always resolve successfully to save the time from writing error handling code on the consumers, but those should be in there when using actual HTTP calls instead of fetching hardcoded data.
- The assignement said: "Un subnivel final es aquel que no tiene más subniveles, en éste caso debe aparecer una caja de texto que permita realizar búsquedas de productos por nombre en dichos subniveles." It is confusing: at a final sublevel there no mpore sublevels to search in, as it says. Since I was unable to determine when the search box had to be displayed I display it by default (which makes more much sense form a UX perspective as well).
- All filtering and sorting occurs on the fronetnd, with data being fetched only once at the beggining. For larger volumes of data it might be deasirable to make separate HTTP calls with different parameters for these operations, and return the result; but since the example data is a small volume, the app was simplified by choosing this apporach instead.
- HTTP call delay was not mocked (might have been done by using timers), to simplify the frontend implementation (no transitional state display login needed anywhere).


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
