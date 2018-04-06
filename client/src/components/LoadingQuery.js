import React from 'react';
import { Query } from 'react-apollo';
import Spinner from 'react-spinkit';

function defaultLoadingRender() {
    return <Spinner name="ball-scale-ripple" fadeIn="half" />;
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
