import {Link} from "react-router-dom";

export const SignupPage = () => {
    return (
        <div>
            <form className="card shadow m-4">
                <div className="m-5">
                    <div className="mb-3">

                        <label htmlFor="InputEmail" className="form-label">Email</label>

                        <input type="email" className="form-control shadow" id="InputEmail" aria-describedby="emailHelp"/>

                    </div>
                    <div className="mb-3">

                        <label htmlFor="InputPassword" className="form-label">Password</label>

                        <input type="password" className="form-control shadow" id="InputPassword"/>

                    </div>
                    <button type="submit" className="btn btn-outline-dark me-3 shadow">Log In</button>
                    <span className="me-3">or</span>
                    <Link to="/signup">Create an account</Link>
                </div>
            </form>
        </div>
    );
};
