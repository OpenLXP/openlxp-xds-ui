# OpenLXP: Experience Discovery Service UI (XDS UI)

This is the UI for the OpenLXP: Experience Discovery Service. It allows you to create and manage your own experience collection, subscribe to other people's experience collections, and search for experiences indexed in the service.

**Note: For this service to work properly you will need the XDS Backend component to accompany it.**

## Prerequisites
### Install Docker & docker-compose
#### Windows & MacOS
- Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop) (docker compose included)


#### Linux
You can download Docker Compose binaries from the
[release page](https://github.com/docker/compose/releases) on this repository.

Rename the relevant binary for your OS to `docker-compose` and copy it to `$HOME/.docker/cli-plugins`

Or copy it into one of these folders to install it system-wide:

* `/usr/local/lib/docker/cli-plugins` OR `/usr/local/libexec/docker/cli-plugins`
* `/usr/lib/docker/cli-plugins` OR `/usr/libexec/docker/cli-plugins`

(might require making the downloaded file executable with `chmod +x`)

## 1. Clone the repository
Clone the Github repository
```terminal
git clone https://github.com/OpenLXP/openlxp-xds-ui.git
```  

## 2. Set up your environment variables
- Create a `.env` file in the root directory
- The following environment variables are required:

| Environment Variable            | Description                       |
| ------------------------------- | --------------------------------- |
| NEXT_PUBLIC_BACKEND_HOST        | The endpoint for your XDS backend |
| NEXT_PUBLIC_XAPI_LRS_ENDPOINT   | The endpoint for your SQL-LRS     |
| NEXT_PUBLIC_XAPI_LRS_KEY        | The SQL-LRS key                   |
| NEXT_PUBLIC_XAPI_LRS_SECRET     | The SQL-LRS secret                |

**Note: These environment variables need to be set up at build time**

## 3. Deployment
1. Create the OpenLXP docker network. Open a terminal and run the following command in the root directory of the project.

    ```terminal
    docker network create openlxp
    ```

2. Run the command below to build your image for XDS UI

    ```terminal
    docker build -t xdsui .
    ```
  
3. Run the command below to deploy the image built in step 2

    ```terminal
    docker run -p 3000:3000 xdsui -d
    ```

## Local development/testing
### 1. Install yarn

This project uses yarn as the package manager. If you already have yarn installed or are using a different package manager feel free to skip this step.

 - Start by installing yarn globally

    ```terminal
    npm install -g yarn
    ```
 
 - Verify yarn was installed

    ```terminal
    yarn -version
    ```

### 2: Install project dependencies

   - Installs all requirements for development
      
      ```terminal
      yarn install
      ```

### 3. Build the project

  - bundle your app into static files

      ```terminal
      yarn build
      ``` 

### 4. Run your project
  
  - Run the project in development mode

    ```terminal
    yarn start
    ```

## Testing

All of the components in the project are unit tested and are covered by the [Jest](https://jestjs.io/) testing framework. When testing components there are three key files to utilize:

1. `jest.setup.js`: This file is used to configure the testing environment including any mocks and setup functions for the code to work.
2. `mockSetUp.js`: This file is used to mock any functions that are reliant on external APIs or services.
3. `.test.js`: This file is used to test the components. Any file in the **tests** directory will be run by the testing framework as long as the child components are appended with `.test.js` or `.spec.js`.

### Our current threshold for testing coverage is:

- **Statement Coverage**: 80%
- **Branch Coverage**: 80%
- **Function Coverage**: 80%
- **Line Coverage**: 80%

### Command to run tests

 - Runs all the tests in the project with cached results

    ```terminal
    yarn test
    ```

- Run all the tests in the project without cached results. This produces a coverage report which can be viewed in the terminal or in the browser by opening the `/coverage/Icov-report/index.html` file in the project directory.

    ```terminal
    yarn coverage
    ```

## Documentation

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
