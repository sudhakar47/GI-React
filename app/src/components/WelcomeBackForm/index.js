import React, { Component } from "react";

/* Import Components */
import Input from "../Input/input";
import Button from "../Button/button";

class WelcomeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: "",
                password: "",
            },
        };
        this.handleInput = this.handleInput.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

  /* This lifecycle hook gets executed when the component mounts */

    handlePassword(e) {
        let value = e.target.value;
        this.setState(
        prevState => ({
            user: {
            ...prevState.user,
            password: value
            }
        }),
        () => console.log(this.state.user)
        );
    }

    handleInput(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState(
        prevState => ({
            user: {
            ...prevState.user,
            [name]: value
            }
        }),
        () => console.log(this.state.user)
        );
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let userData = this.state.user;

        fetch("", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
        }).then(response => {
        response.json().then(data => {
            console.log("Successful" + data);
        });
        });
    }

    render() {
        return (
            <form className="container-fluid" onSubmit={this.handleFormSubmit}>
                <Input
                    inputType={"text"}
                    title={"ENTER EMAIL/MOBILE NUMBER"}
                    name={"name"}
                    value={this.state.user.name}
                    placeholder={"Enter your email or mobile number"}
                    handleChange={this.handleInput}
                />
                {/* Name or email of the user */}
                <Input
                    inputType={"password"}
                    name={"password"}
                    title={"ENTER PASSWORD"}
                    value={this.state.user.password}
                    placeholder={"Enter your password"}
                    handleChange={this.handlePassword}
                />
                {/* Password of the user */}
                <Button
                    action={this.handleFormSubmit}
                    type={"primary"}
                    title={"Submit"}
                />
                {/*Submit */}
            </form>
        );
    }
}


export default WelcomeForm;
