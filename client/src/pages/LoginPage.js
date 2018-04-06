import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Container, Header, Button, Form, Message } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';

import { errorParser } from '../helpers/index';
import { LOGIN_USER } from '../apollo/mutations/userMutations';

export default observer(
    class LoginPage extends Component {
        constructor(props) {
            super(props);
            extendObservable(this, {
                form: {
                    email: '',
                    password: ''
                },
                success: {
                    flag: false,
                    content: ''
                },
                error: {
                    flag: false,
                    content: ''
                }
            });
        }

        handleChange = (e, { name, value }) => {
            console.log(this.form);
            this.form[name] = value;
        };

        handleSubmit = async loginUser => {
            const { email, password } = this.form;
            try {
                const response = await loginUser({
                    variables: {
                        email,
                        password
                    }
                });
                const {
                    successful,
                    errors,
                    refreshToken,
                    token
                } = response.data.login;
                if (successful) {
                    this.success = {
                        flag: true,
                        content: 'Login successful!'
                    };
                    localStorage.setItem('token', token);
                    localStorage.setItem('refreshToken', refreshToken);

                    setTimeout(() => this.props.history.push('/'), 2000);
                } else if (!successful) {
                    this.error = {
                        flag: true,
                        content: errorParser(errors)
                    };
                }
            } catch (err) {
                console.log(err);
            }
        };

        render() {
            const { email, password } = this.form;
            const { error, success } = this;
            return (
                <Mutation mutation={LOGIN_USER}>
                    {mutation => (
                        <Container text>
                            <Header as="h2">Login</Header>
                            <Form
                                success={success.flag}
                                error={error.flag}
                                onSubmit={() => this.handleSubmit(mutation)}
                            >
                                <Form.Field>
                                    <label>Email:</label>
                                    <Form.Input
                                        placeholder="email"
                                        name="email"
                                        value={email}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Password:</label>
                                    <Form.Input
                                        placeholder="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Form.Field>
                                <Message
                                    success
                                    header="Form Completed"
                                    content={success.content}
                                />
                                <Message
                                    error
                                    header="Something went wrong!"
                                    content={error.content}
                                />
                                <Button type="submit">Submit</Button>
                            </Form>
                        </Container>
                    )}
                </Mutation>
            );
        }
    }
);
