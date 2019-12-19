# Authors

- [José Eguiguren](https://github.com/JamesJose7/) (developer)
- [Nelson Piedra](https://investigacion.utpl.edu.ec/es/nopiedra) (supervisor)

# Setup guide

This project requires a backend powered by Elasticsearch and this codebase is the frontend that consumes it.

## Backend setup

### Elastic stack installation

The Elastic stack (ELK) is the combination of both Elasticsearch and Kibana.

Elasticsearch is the real time search engine that uses this application.

Kibana allows us to easily manage the entire Elasticsearch instance.

Please follow the official documentation to properly install both Elasticsearch and Kibana on your local environment. The execution steps are included as well.

[https://www.elastic.co/start](https://www.elastic.co/start) 

## Uploading data to Elasticsearch

> Requirements
> - NodeJS [Download](https://nodejs.org/en/download/)
> - Elasticsearch server running

Clone the following [repository](https://github.com/JamesJose7/elasticsearch-dummy-uploader.git) that will upload test data in your Elasticsearch instance:

```bash
git clone https://github.com/JamesJose7/elasticsearch-dummy-uploader.git
```

If you changed the port, domain, or your instance requires authentication, please make the appropriate changes in ``index.js``

```javascript
const client = new elasticsearch.Client({
    // Default port and localhost 
    hosts: [ 'http://localhost:9200'],

   // If you need to upload to an authenticated instance
   /* host: [
        {
        host: 'your-host-domain',
        auth: 'user:password',
        protocol: 'https',
        port: 9243
        } 
    ] */
});
```

Execute the following scripts:

1. ``npm install``

2. ``node index.js``

## Frontend setup

> Requirements
> - NodeJS [Download](https://nodejs.org/en/download/)
> - Elasticsearch server running

### Configuration

Edit the file named ``.env.development`` to change the connection parameters based on your Elasticsearch instance if needed.

Default configuration:
```
REACT_APP_ELASTICSEARCH_URL=http://localhost:9200
REACT_APP_ELASTICSEARCH_CREDENTIALS=
```
In case you need to setup credentials, they require basic authorization format as such: ``user:password``.

### Running the application

The following documentation is provided by [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
