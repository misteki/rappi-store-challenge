# Rappi Store Challenge
This README files provides instructions on how to execute the app, as well as in-details explanaitions and justifications for the techical and UI-UX choices that were taken during its development.

## Quick set up
In the project directory, you first need to run `npm i` to install all dependencies.
You can then  run `npm start` to run the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You can see the `Other scripts` section of this document for alternative commands.

## About the project
This section contains a more in-depth analysis of my implementation of the app which might come in handy for reviewers.

### Requirement assumptions
The project requirements were specified as an assignment in an document file. During development, several matters which were not directly addressed in that document (or were, but in a not entirely clear manner) led to speculation on how to implement some of the requested features, which led to several assumptions on my side in order to bring the project to an successful end:

- Support was only assumed to be desired only for **MODERN BROWSERS** (mainly Chrome, Firefox, Safari, and Edge, on relatively updated versions). Support for more browsers could easily be added (see the technical choices section below).
- Spanish was assumed to be the desired language to be used on the platform.
- When selected a category, filter includes the category itself and all its subcategories.
- Products that are not available can be added to the cart.
- Products can be removed and edited only form the Cart view, not the product view.

### Other assumptions and technical/UI/UX choices
For anyone taking a more in-depth look at the app's overall design and code, it might be worth it to explain some of the choices made for the app. 

From a UI/UX standpoint:
- Considering the small scope and size of the app (and to keep it that way), a reponsive library was not used. Instead, responsiveness was enforced by using only CSS media queries and  a single width breakpoint (`1024px`); everything under that width is considered mobile and styled as such. The idea, besides not bringing any heavy dependencies, is that the simplicity of the app as requested should be accompanied by a similarly simple implementation of responsiveness, and this is enough to ensure it looks properly accross devices.
- Since it was not explicitly requested and it is not strictly necessary, user alerts for successful or failing asynchronous operations (like removing a product form the cart or buying them) were not added. If desired, I'd probably do it via a snackbar component that informs of the status of this operations. Right now, the UI changes communicate these things.
- The size of the paginator was not capped, due to the fact that there'll only be a limited, small amount of product entries. For actrual data, is most definitely should have a fixed maximum size of pages to be displayed.
- There are some other UI additions that were not requested but might make the user experience better. Some of these include: a breadcrumb component to move between categories and a rework of the search by name feature in order to make it more visually attached to the category selection that it is linked to.
- Generally speaking, several improvements can be made to embellish and polish the general look and feel of the app; but it is understood that that is not the main focus on the excercise, and thus it was skipped to favor sooner delivery.

In the code side of things:
- The idea was to keep the app as small as possible in terms of dependencies, being it a pretty straightforward thing. The `create-react-app` tool was used for convenience, and it has several dependencies on its own, but the idea was to try to install as few extra packages as possible.
- It's in that vein that, considering there are as mnuch as three distinct views (products, filters, and cart), routing was not added to the app, choosing instead to interchange components based on a view id parameter at the root app level.
- Also, Redux (or any other state management library) was not added due to the size of the app. The state was instead concentrated on a root component (App, in this case), as well as the functions to mutate it. It mostly only flows down from it to children functional components. Redux might be desirable if the app was bigger and was designed like this one is, but I think it is not justified for its current size.
- Support for Internet Explorer can be added by using `react-polyfills` package and getting rid of the modern-browser only CSS rules (like `var`) and replacing them with older-bnrowser friendly alternatives.
- A unique ID was not available for each category in the original source data (there were some repeated ones). This is doubtlessly a desirable thing in a data structure like this, so the IDs were changes so each category has unique one, without changing at all the category each product is in.
- Service method errors are only informed using the console, since it was chosen not to implement the UI to alert users about these (see above).
- When fetching local storage fails for any reason, an empty cart is returned and the storage is cleared to avoid future errors. The promises related to this always resolve successfully to save the time from writing error handling code on the consumers, but those should be in there when using actual HTTP calls instead of fetching hardcoded data.
- All filtering and sorting occurs on the fronetnd, with data being fetched only once at the beggining. For larger volumes of data it might be deasirable to make separate HTTP calls with different parameters for these operations, and return the result; but since the example data is a small volume, the app was simplified by choosing this apporach instead.
- HTTP call delay was not mocked (might have been done by using timers), to simplify the frontend implementation (no transitional state display login needed anywhere).

### Other scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The following lines are verbatim from the automatically generated README file for apps bootstrapped using this tool.

The page will reload if you make edits. You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

