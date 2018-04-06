import React, { Component } from 'react';
import Query from '../components/LoadingQuery';

import { ALL_USERS_QUERY } from '../apollo/queries/userQueries';
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
            <Query query={ALL_USERS_QUERY}>
                {({ data: { allUsers } }) => this.renderUsers(allUsers)}
            </Query>
        );
    }
}

export default HomePage;
