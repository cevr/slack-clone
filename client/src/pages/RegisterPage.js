import React, { Component } from 'react';
import { Container, Header, Button, Form, Message } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';

import { errorParser } from '../helpers/index';
import { REGISTER_USER } from '../apollo/mutations/userMutations';

class RegisterPage extends Component {
    state = {
        form: {
            username: '',
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
    };

    componentWillUnmount() {
        this.setState({
            form: {
                username: '',
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
        this.setState(prevState => {
            return {
                form: {
                    ...prevState.form,
                    [name]: value
                }
            };
        });
        console.log(this.state.form);
    };

    handleSubmit = async registerUser => {
        const { username, email, password } = this.state.form;
        try {
            const response = await registerUser({
                variables: {
                    email,
                    username,
                    password
                }
            });
            const { successful, errors } = response.data.register;
            if (successful) {
                this.setState({
                    success: {
                        flag: true,
                        content: 'Sign up successful!'
                    }
                });
                setTimeout(() => this.props.history.push('/'), 2000);
            } else if (!successful) {
                this.setState({
                    error: {
                        flag: true,
                        content: errorParser(errors)
                    }
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        const {
            form: { username, email, password },
            error,
            success
        } = this.state;

        return (
            <Mutation mutation={REGISTER_USER}>
                {mutation => (
                    <Container text>
                        <Header as="h2">Register</Header>
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
                                <label>Username:</label>
                                <Form.Input
                                    placeholder="Username"
                                    name="username"
                                    value={username}
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
                                content="You're all signed up!"
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

export default RegisterPage;
