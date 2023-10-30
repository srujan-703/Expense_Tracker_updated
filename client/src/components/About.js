import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const callAboutPage = async () => {
    try {
      const res = await fetch("http://localhost:5000/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
      } else {
        const error = await res.json();
        console.error(error);
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);
  return (
    <>
      <div className="container emp-profile">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <img src="{}" alt="Srujan" />
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>Srujan Lolam</h5>
                <h6>Time pass doer</h6>
                <p className="profile-rating mt-3 mb-5">RATING</p>

                <ul className="dropdown-menu" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      role="tab"
                      data-toggle="tab"
                      href="#"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="profile-tab"
                      role="tab"
                      data-toggle="tab"
                      href="#"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="submit"
                className="profile-edit-btn"
                name="btnAddMore"
                value="Edit-profile"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                <p>Work Link</p>
                <a href="https://www.youtube.com">Youtube</a>
                <br />
                <a href="https://www.youtube.com">Youtube</a>
                <br />
                <a href="https://www.youtube.com">Youtube</a>
                <br />
                <a href="https://www.youtube.com">Youtube</a>
                <br />
              </div>
            </div>
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div className="tab-phone fade show active" id="home"></div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
