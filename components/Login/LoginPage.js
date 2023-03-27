import { useRouter } from "next/router";
import { useState } from "react";
import Card from "../UI/Card";
import { signIn } from "next-auth/react";
import styles from "./LoginPage.module.css";

const LoginPage = (props) => {
  const router = useRouter();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("An error occurred");
  const [loginMode, setLoginMode] = useState(true);
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });
  const [registerValues, setRegisterValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeToSignupHandler = () => {
    setLoginMode(false);
    setError(false);
  };
  const changeToLoginHandler = () => {
    setLoginMode(true);
    setError(false);
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      username: loginValues.username,
      password: loginValues.password,
      redirect: false,
    });

    if (result.status == 200) {
      router.push("/");
    } else {
      setError(true);
      setErrorMessage("Username or password is wrong!");
    }
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:8080/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerValues),
    });
    if (res.status != 200) {
      const data = await res.json();
      setError(true);
      setErrorMessage(data.message);
    } else {
      setLoginMode(true);
    }
  };

  return (
    <Card className={styles.wrapper}>
      <div className={styles.titleText}>
        <p className={styles.title}>{loginMode ? "Login" : "Register"} Form</p>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.slideCont}>
          <input
            className={styles.hidden}
            type="radio"
            name="slide"
            id="login"
          />
          <input
            className={styles.hidden}
            type="radio"
            name="slide"
            id="signup"
          />
          <label
            htmlFor="login"
            style={{ color: loginMode ? "white" : "#2a2a00" }}
            onClick={changeToLoginHandler}
          >
            Login
          </label>
          <label
            htmlFor="signup"
            style={{ color: loginMode ? "#2a2a00" : "white" }}
            onClick={changeToSignupHandler}
          >
            Register
          </label>
          <div
            style={{ marginLeft: loginMode ? "0" : "50%" }}
            className={styles.slideTab}
          ></div>
        </div>
        <div className={styles.formInner}>
          {loginMode && (
            <form onSubmit={loginHandler}>
              <div className={styles.field}>
                <input
                  onBlur={(e) =>
                    setLoginValues({ ...loginValues, username: e.target.value })
                  }
                  type="text"
                  placeholder="Username"
                  required
                />
              </div>
              <div className={styles.field}>
                <input
                  onChange={(e) =>
                    setLoginValues({ ...loginValues, password: e.target.value })
                  }
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className={styles.passLink}>
                <a href="#">Forgot password?</a>
              </div>
              <div className={styles.field + styles.btn}>
                <div className={styles.btnLayer}></div>
                <input
                  className={styles.submitBtn}
                  type="submit"
                  value="Login"
                />
                {error && <div className={styles.error}>{errorMessage}</div>}
              </div>
              <div className={styles.signupLink}>
                Not registered?{" "}
                <a onClick={changeToSignupHandler}>Sign up now</a>
              </div>
            </form>
          )}

          {!loginMode && (
            <form onSubmit={signupHandler}>
              <div className={styles.field}>
                <input
                  onBlur={(e) =>
                    setRegisterValues({
                      ...registerValues,
                      username: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Username"
                  required
                />
              </div>
              <div className={styles.field}>
                <input
                  onBlur={(e) =>
                    setRegisterValues({
                      ...registerValues,
                      email: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div style={{ marginBottom: "5%" }} className={styles.field}>
                <input
                  onChange={(e) =>
                    setRegisterValues({
                      ...registerValues,
                      password: e.target.value,
                    })
                  }
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className={styles.field + styles.btn}>
                <div className={styles.btnLayer}></div>
                <input
                  className={styles.submitBtn}
                  type="submit"
                  value="Register"
                  onClick={changeToSignupHandler}
                />
                {error && <div className={styles.error}>{errorMessage}</div>}
              </div>
            </form>
          )}
        </div>
      </div>
    </Card>
  );
};

export default LoginPage;
