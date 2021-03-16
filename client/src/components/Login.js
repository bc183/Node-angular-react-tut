import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }

        this.submit = this.submit.bind(this);
    }

    submit() {
        console.log(this.state);
    }

    render() {
        return (
            <div className="col-12 col-md-5">
                <Card className="card">
                    <CardTitle className="card-header" tag="h3">
                        Login
                    </CardTitle>
                    <CardBody>
                        <Form noValidate>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text" name="username" id="username" placeholder="Enter Username" value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="Enter Password" value={this.state.password}  onChange={(event) => this.setState({ password: event.target.value })}/>
                            </FormGroup>
                            <Button onClick={this.submit}>Submit</Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
