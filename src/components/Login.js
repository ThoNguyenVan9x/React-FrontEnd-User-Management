import React, { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
        <>
            <div className="login-container col-12 col-sm-4">
                <div className="title">Login</div>
                <div className="text">Email or Username</div>
                <input
                    type="text"
                    placeholder="Email or username..."
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <div class="position-relative">
                    <input
                        className="w-100"
                        type={isShowPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <i
                        className={
                            isShowPassword
                                ? "fa-solid fa-eye position-absolute eye"
                                : "fa-solid fa-eye-slash position-absolute eye"
                        }
                        onClick={() => setIsShowPassword(!isShowPassword)}
                    ></i>
                </div>
                <button
                    disabled={email && password ? false : true}
                    className={email && password ? "active" : ""}
                >
                    Login
                </button>
                <div className="text-center mt-3">
                    <i className="fa-solid fa-angles-left"></i> Go back
                </div>
            </div>
        </>
    );
}

export default Login;
