

export const RegisterScreen = (props:any) => {
    return (
        <div className="parentBlock">
            <div className="wrapper">
                <h2>Are you new here?</h2>
                <h3>Register to use Integrate</h3>

                <input type="text" className="input" placeholder="email"/>
                <input type="password" className="input" placeholder="password"/>
                <div className="button">Sign up</div>
            </div>
        </div>
    )
}
