import { useState } from "react";
import useSignIn from "./useSignIn";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRowVertical from "../../ui/FormRowVertical";

function LoginForm() {
    const [email, setEmail] = useState("test@test.com");
    const [password, setPassword] = useState("22222222");
    const { isLoadingSignIn, signIn } = useSignIn();

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) return;
        signIn(
            { email, password },
            {
                onSettled: () => {
                    setEmail("");
                    setPassword("");
                },
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormRowVertical>
            <FormRowVertical label="Password">
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button size="large">
                    {isLoadingSignIn ? <SpinnerMini /> : "Login"}
                </Button>
            </FormRowVertical>
        </Form>
    );
}

export default LoginForm;
