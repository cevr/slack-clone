import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import path from 'path';
import cors from 'cors';

import models from './models';

// merge all resolvers to a root resolver
const resolvers = mergeResolvers(
    fileLoader(path.join(__dirname, './graphql/resolvers'))
);

//merge all types into a root type
const typeDefs = mergeTypes(
    fileLoader(path.join(__dirname, './graphql/schema'))
);

//translate string to graphql schema
const schema = makeExecutableSchema({ typeDefs, resolvers });
const app = express();
const PORT = 4000;
const graphqlURL = '/graphql';

app.use(
    graphqlURL,
    bodyParser.json(),
    graphqlExpress({
        schema,
        //inject models into graphql to make alter the database using sequelize
        context: {
            models,
            user: {
                id: 1
            }
        }
    })
);

//enable graphical GraphQL helper
app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlURL }));

//initiate the database first then listen to calls
models.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
});
