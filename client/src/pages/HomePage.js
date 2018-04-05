import React, { Component } from 'react';
import Query from '../components/LoadingQuery';

import { allUsersQuery } from '../apollo/queries/userQueries';
class HomePage extends Component {
    renderUsers = users => {
        return users.map(user => (
            <div key={user.id}>
                <h3>{user.username}</h3>
                <h3>{user.email}</h3>
            </div>
        ));
    };

    render() {
        return (
            <Query query={allUsersQuery}>
                {({ loading, data: { allUsers } }) => {
                    return !loading ? (
                        this.renderUsers(allUsers)
                    ) : (
                        <div>Loading...</div>
                    );
                }}
            </Query>
        );
    }
}

export default HomePage;
