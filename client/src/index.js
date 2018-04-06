import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import 'semantic-ui-css/semantic.min.css';

import registerServiceWorker from './registerServiceWorker';
import Routes from './pages/index';
import client from './apollo/createClient';

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Routes />
        </ApolloProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
