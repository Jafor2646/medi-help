
export const LoginPage = () => {
    return (
        <form className="d-grid justify-content-center m-4">
            <div className="mb-3">

                <label htmlFor="InputEmail" className="form-label">Email</label>

                <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp"/>

            </div>
            <div className="mb-3">

                <label htmlFor="InputPassword" className="form-label">Password</label>

                <input type="password" className="form-control" id="InputPassword"/>

            </div>
            <button type="submit" className="btn btn-outline-dark">Log In</button>
        </form>
    );
};
