# wwf-tippspiel

[![Netlify Status](https://api.netlify.com/api/v1/badges/53f24a2d-9b67-4a41-924b-1f648964a8aa/deploy-status)](https://app.netlify.com/sites/wwf-tippspiel/deploys)

## Project setup

```
npm install
```

Create a `.env.local` file at the root of the project containing the environment variables needed for the facebook graph api requests.

```properties
VUE_APP_FACEBOOK_APP_ID=<APP_ID>
VUE_APP_FACEBOOK_GROUP_ID=<GROUP_ID>
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Deployment

### Netlify

The master branch and pull requests against it are automatically deployed with netflify. To ensure the page
will work the environment variables that are locally set have to be provided as well.
