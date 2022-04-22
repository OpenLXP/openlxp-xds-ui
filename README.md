# Open LXP: Experience Discovery Service UI

This is the UI for the Open LXP: Experience Discovery Service. It allows you to create and manage your own experience collection, subscribe to other people's experience collections, and search for experiences indexed in the service.

_Note_: For this service to work properly you will need the XDS Backend component to accompany it.

## Table of Contents

- [**Installation**](#installation)
- [**Development**](#development)
  - [**Frontend Stack Documentation**](#frontend-stack-documentation)
  - [**Devtools Documentation**](#dev-tools-documentation)
- [**Testing**](#testing)

## Installation

### Step 1: Clone the project

```terminal
git clone git clone git@github.com:OpenLXP/openlxp-xds-ui.git
```

### Step 2: Install yarn

This project uses yarn as the package manager. If you already have yarn installed or are using a different package manager feel free to skip this step.

> Start by installing yarn globally

```terminal
npm install -g yarn
```

> Verify yarn was installed

```terminal
yarn -version
```

### Step 3: Install project dependencies

> Installs all requirements for development

```terminal
yarn
```

### Step 4: Update .env file

The `.env` file can be found in the root directory of the project folder

> Example `.env` file

```js
// api gateway
NEXT_PUBLIC_BACKEND_HOST=
NEXT_PUBLIC_XAPI_LRS_ENDPOINT=
NEXT_PUBLIC_XAPI_LRS_KEY=
NEXT_PUBLIC_XAPI_LRS_SECRET=
```

**NEXT_PUBLIC_BACKEND_HOST**: The url for the XDS component

> Note: the lrs component is not required for the UI to function.

**NEXT_PUBLIC_XAPI_LRS_ENDPOINT**: The url for the LRS component

**NEXT_PUBLIC_XAPI_LRS_KEY**: The key for the LRS component

**NEXT_PUBLIC_XAPI_LRS_SECRET**: The secret for the LRS component

### Step 5: Run the project

> Run the project in development mode

```terminal
yarn dev
```

### Step 6: Run the project in production mode

> Build the docker image

```terminal
docker build -t openlxp-xds-ui .
```

> Run the docker image

```terminal
docker run -p 3000:3000 openlxp-xds-ui
```

## Development

### Frontend Stack Documentation

[Next.js Documentation can be found here](https://nextjs.org/docs)

[React-Query Documentation can be found here](https://react-query.tanstack.com/overview)

[TailwindCSS Documentation can be found here](https://tailwindcss.com/docs/installation)

[Axios Documentation can be found here](https://axios-http.com/docs/intro)

[HeadlessUi Documentation can be found here](https://headlessui.dev/)

### Dev Tools Documentation

[Eslint Documentation can be found here](https://eslint.org/docs/user-guide/configuring)

[Prettier Documentation can be found here](https://prettier.io/docs/en/install.html)

[Jest Documentation can be found here](https://jestjs.io/docs/en/getting-started)

## Testing

All of the components in the project are unit tested and are covered by the [Jest](https://jestjs.io/) testing framework. When testing components there are three key files to utilize:

1. **jest.setup.js**: This file is used to configure the testing environment including any mocks and setup functions for the code to work.
2. **mockSetUp.js**: This file is used to mock any functions that are reliant on external APIs or services.
3. **.test.js**: This file is used to test the components. Any file in the **tests** directory will be run by the testing framework as long as the child components are appended with `.test.js` or `.spec.js`.

### Our current threshold for testing coverage is:

- **Statement Coverage**: 80%
- **Branch Coverage**: 80%
- **Function Coverage**: 80%
- **Line Coverage**: 80%

### Command to run tests

> Runs all the tests in the project with cached results

```terminal
yarn test
```

> Runs all the tests in the project without cached results produces a coverage report which can be viewed in the terminal or in the browser by opening the `/coverage/Icov-report/index.html` file in the project directory.

```terminal
yarn coverage
```
