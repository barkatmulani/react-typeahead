# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# Usage

<Typeahead {parameters} />

## Parameters

### list
An array of strings to serve as the list for typeahead search.

### className (optional)
Class name for the entire typeahead control

### limit (optional - default 15)
Number of search results to show.

### label (optional)
Label to show on the left side of the typeahead.

### debounceTime (optional - default 200)
Debounce time (in milliseconds).

### placeholder (optional - default 'Type any text')

### labelClass (optional)
Class name for label.

### typeaheadClass (optional)
Class name for typeahead input.

### onChange (optional)
Method to call when an item from the provided list is selected with the selected item as it parameter.

# Demo
https://typeahead.appshowcase.net/
