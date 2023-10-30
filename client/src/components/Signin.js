import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  // const history = useHistory();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, number, password, cpassword } = user;
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        number,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if (data.error) {
      console.log(data.error);
      // window.alert("Invalid registration");
      console.log("Invalid registration");
    }
    // if (data.status === 422 || !data) {
    //   window.alert("Invalid registration");
    //   console.log("Invalid registration");
    else {
      window.alert("Successfull registration");
      console.log("valid registration");
      // history.push("/login");
      navigate("/login");
    }
  };

  return (
    <>
      <section className="vh-70">
        <div className="container h-70">
          <div className="row d-flex justify-content-center align-items-center h-70">
            <div className="col-lg-8 col-xl-8">
              <div className="card text-black">
                <div className="card-body p-md-20">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-0 mt-4">
                        Sign up
                      </p>

                      <form
                        method="POST"
                        className="mx-1 mx-md-2"
                        id="register-form"
                      >
                        <div className="d-flex flex-row align-items-center mb-2.9">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="name"
                              className="form-control"
                              name="name"
                              value={user.name}
                              onChange={handleInputs}
                            />
                            <label className="form-label" for="form3Example1c">
                              Your Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2.9">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              name="email"
                              value={user.email}
                              onChange={handleInputs}
                            />
                            <label className="form-label" for="form3Example3c">
                              Your Email
                            </label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-2.9">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="tel"
                              id="form3Example4c"
                              className="form-control"
                              name="number"
                              value={user.number}
                              onChange={handleInputs}
                            />
                            <label className="form-label" for="form3Example4c">
                              Number
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2.9">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4c1"
                              className="form-control"
                              name="password"
                              value={user.password}
                              onChange={handleInputs}
                            />
                            <label className="form-label" for="form3Example4c1">
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4cd"
                              className="form-control"
                              name="cpassword"
                              value={user.cpassword}
                              onChange={handleInputs}
                            />
                            <label className="form-label" for="form3Example4cd">
                              Repeat your password
                            </label>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-3">
                          {/* <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                          /> */}
                          <label
                            className="form-check-label"
                            for="form2Example3"
                          >
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-1 mb-1 mb-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={PostData}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;

{
  /* <section className="signup">
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form - title">Sign up</h2>
              <form action="" className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlFor="name">
                    <i class="zmdi zmdi-account-add"></i>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <i class="zmdi zmdi-email"></i>
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="off"
                    placeholder="Your email address"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">
                    <i class="zmdi zmdi-phone-in-call"></i>
                  </label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    autoComplete="off"
                    placeholder="Your Mobile number"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <i class="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    placeholder="Your password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cpassword">
                    <i class="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    autoComplete="off"
                    placeholder="confirm your password"
                  />
                </div>

                <div className="form-group form button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="register"
                  />
                </div>
              </form>
              <div className="signup-image">
                <figure>
                  <img src="{signuppic}" alt="registration pic" />
                </figure>

                {/* <Navlink to "/login" className = "signup-image-link"></Navlink> */
}
{
  /* </div>
            </div>
          </div>
        </div>
      </section> */
}
