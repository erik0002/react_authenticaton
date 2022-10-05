import classes from './ProfileForm.module.css';
import {useRef, useContext } from "react";
import authContext from "../../store/auth-context";
import {useHistory} from "react-router-dom";

const ProfileForm = () => {
    const history = useHistory();
    const newPasswordInputRef = useRef();
    const authCtx = useContext(authContext);

    const submitHandler = event => {
            event.preventDefault();

            const enteredNewPassword = newPasswordInputRef.current.value;

           fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB5yrXG53j9G-ec262g-AkLzwBuaGuIPKk', {
               method: 'POST',
               body: JSON.stringify({
                   idToken: authCtx.token,
                   password: enteredNewPassword,
                   returnSecureToken: false
               }),
               headers: {
                   'Content-Type': 'application/json'
               }
           }).then(res => {
                history.replace('/');
           })
    };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
