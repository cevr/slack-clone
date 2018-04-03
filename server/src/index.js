import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import path from 'path';

import models from './models';

const resolvers = mergeResolvers(
    fileLoader(path.join(__dirname, './graphql/resolvers'))
);
const typeDefs = mergeTypes(
    fileLoader(path.join(__dirname, './graphql/schema'))
);

const schema = makeExecutableSchema({ typeDefs, resolvers });
const app = express();
const PORT = 4000;

const graphqlURL = '/graphql';

app.use(
    graphqlURL,
    bodyParser.json(),
    graphqlExpress({
        schema,
        context: { models }
    })
);

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlURL }));

models.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
});
