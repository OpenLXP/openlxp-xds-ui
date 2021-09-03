# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### Core Configurations in Django admin console

Basic Configurations
XDS Configurations: 
    Enter target metadata api (ex:http://openlxp-xis:8020/api/metadata/)
Xdsui configurations: 
    Enter Search results per page (ex:10)
    Select XDS Configuration from previous step (ex:1)
    optional - Add course image to display on every course image
Course information mapping: Course details page mapping
    Enter course title corresponding to elastic search (ex:Course.CourseTitle) 
    Enter course description corresponding to elastic search (ex:Course.CourseShortDescription) 
    Enter course url corresponding to elastic search (ex:CourseInstance.CourseURL) 
    Select XDS UI Configuration from previous step (ex:1)


Optional Configurations
Course detail highlights: configure details to display pertaining to each course
    Enter display name (ex:End Date)
    Enter field name as correlating to elastic search (ex: General_Information.EndDate)
    Select XDS UI Configuration from previous step (ex:1)
    Select highlight icon (ex:calendar)
    Enter rank for display order
Course spotlights: spotlight courses to show up on home page
    Enter course id from search engine or url of course  page (ex:0b89c4f7ba43c5e076cf621d0e567c60)
Reciever email configurations:
    Add email address of people to recieve log data
Search filter: on search results page, set filters to search by
    Enter a display name (ex:Provider)
    Enter a field name from elastic search (ex:Course.CourseProviderName)
    Select XDS UI Configuration from previous step (ex:1)
    Select filter type (ex:Checkbox)
Search sort options:
    Enter a display name (ex:Description)
    Enter a field name from elastic search (ex:Course.CourseShortDescription)
    Select XDS UI Configuration from previous step (ex:1)
Reciever email configurations:
    Add email address to send log data from


Other Configurations - usually not to be edited
Expereinces: list of courses that have been added to any interest list
Interest Lists: list of interest lists by owner and list names
Saved Filters: list of saved filter searches
Users: List of users with personal information, can make a staff member setting change here