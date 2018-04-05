import React from 'react';
import { Query } from 'react-apollo';

function defaultLoadingRender() {
    return <div>Loading...</div>;
}

export default ({ loadingRender = defaultLoadingRender, ...props }) => {
    return (
        <Query {...props}>
            {({ loading, ...queryResponse }) => {
                if (loading) {
                    return loadingRender();
                }

                return props.children(queryResponse);
            }}
        </Query>
    );
};
