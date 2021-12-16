# Open LXP

[![Version](https://img.shields.io/badge/version-prototype-yellow)](https://github.com/OpenLXP/openlxp-xds-ui)
[![yarn](https://img.shields.io/badge/yarn-1.22.1-blue)](https://yarnpkg.com/)
[![license](https://img.shields.io/badge/license-Apache_2.0-green)](https://github.com/OpenLXP/openlxp-xds-ui/blob/main/LICENSE)

[![next](https://img.shields.io/badge/nextjs-11.1.2-61dafb)](https://nextjs.org/)
[![reactQuery](https://img.shields.io/badge/react_query-3.26.0-764abc)](https://react-query.tanstack.com/)
[![tailwind](https://img.shields.io/badge/tailwind-2.2.2-22d3ee)](https://tailwindcss.com/)

## Table of content

- [**Installation**](#installation)
  - [Clone Project](#clone-project)
  - [_Install Project Dependencies_](#install-project-dependencies)
- [**Getting started**](#getting-started)
  - [Environment Variables](#environment-variables)
  - [Creating a local env](#creating-a-local-environment-file)
    - [_Walk through_](#walk-through)
    - [_Template_](#env-template)
  - [Important Notes](#important-notes)
- [**Available Scripts**](#available-scripts)
  - [yarn start](#yarn-start)
  - [yarn test](#yarn-test)
  - [yarn build](#yarn-build)
  - [yarn coverage](#yarn-coverage)

---

## Installation

### Clone Project

```bash
git clone git@github.com:OpenLXP/openlxp-xds-ui.git
```

### Install Project Dependencies

Start off by verifying that you have `yarn` installed.

```ps1
yarn -version
```

If `yarn` is not installed use the following command to install it. This will install the `yarn` package manager globally on your system.

_**global install**_

```ps1
npm install yarn -g
```

_**local install**_

```ps1
npm install yarn
```

Once yarn has been installed you will need to install the project dependencies. Using the following command we will manually set your yarn version for this project.

```ps1
yarn set version 1.22.1
```

After the version has been installed and set we will install the dependencies. Using the following command we will install all the project dependencies.

```bash
yarn install package.json
```

---

## Getting started

### Environment Variables

This project makes use of globally available environment variables. Below are the required environment variables required for this project.

#### **NEXT_PUBLIC_BACKEND_HOST**

This is the root API endpoint used by the config file to dynamically generate the various endpoints.

```yaml
http://<YOUR_BACKEND_ENDPOINT>/
```


### Creating a local environment file

#### **Walk through**

Let's create a local `.env.local` file. If you are in a code editor you can right click and create new file.

If you are using the terminal use the following command to create a new file.

_**bash command**_

```bash
touch <PATH_TO_YOUR_PROJECT_ROOT>/.env.local
```

_**powershell**_

```ps1
New-Item -Path <PATH_TO_YOUR_PROJECT_ROOT>\.env.local -ItemType File
```

Navigate to the newly created file and paste the template (_below_) into the file. Replace `<YOUR_BACKEND_ENDPOINT>` with your localhost setup **or** your live endpoint.

#### **.env Template**

```text
NEXT_PUBLIC_BACKEND_HOST=<YOUR_BACKEND_ENDPOINT>
```

### Important Notes

To use this piece of code without any issues you will need the XDS component to accompany it.

[OpenLXP XDS](https://github.com/OpenLXP/openlxp-xds)

### **You're all set! Explore the commands below to run, build, or test the app.**

---

## Available Scripts

In the project directory, you can run the following.

### `yarn dev`

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
### `yarn start`

Runs the produciton optimized application. Please note that this will only work if the build command has been run before.

### `yarn coverage`

Launches the test runner with coverage mode enabled.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Learn More

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

---

## Color Guide

[![base-blue](https://img.shields.io/badge/base_blue-005ea2-005ea2)](https://github.com/OpenLXP/openlxp-xds-ui)

[![bright-blue](https://img.shields.io/badge/bright_blue-008cf0-008cf0)](https://github.com/OpenLXP/openlxp-xds-ui)

[![light-blue](https://img.shields.io/badge/light_blue-2f6194-2f6194)](https://github.com/OpenLXP/openlxp-xds-ui)

[![dark-blue](https://img.shields.io/badge/dark_blue-0b3d70-0b3d70)](https://github.com/OpenLXP/openlxp-xds-ui)

[![icon-blue](https://img.shields.io/badge/icon_blue-337ab7-337ab7)](https://github.com/OpenLXP/openlxp-xds-ui)

[![body-gray](https://img.shields.io/badge/body_gray-f4f4f4-f4f4f4)](https://github.com/OpenLXP/openlxp-xds-ui)

---

## Core Configurations Checklist

These configurations are required.

- [ ] XDS Configurations
- [ ] XDS UI Configurations
- [ ] Course Detail Highlights
- [ ] Course Information Mappings

---
