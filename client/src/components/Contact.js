import React from "react";

const Contact = () => {
  return (
    <>
      <div className="contact_info d-flex">
        <div className="container-fluid card justify-center align-items-center">
          <div className=" row">
            <div className=" col-lg-10 offset-lg-1">
              <div className="contact_info_item d-flex justify-content-start align items-center">
                <img src="#" alt="phone" />
                <div className="contact_info_content">
                  <div className="contact_info_title">Phone</div>
                  <div className="contact_info_text">7036479549</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid card">
          <div className=" row">
            <div className=" col-lg-10 offset-lg-1">
              <div className="contact_info_item d-flex justify-content-start align items-center">
                <img src="#" alt="phone" />
                <div className="contact_info_content">
                  <div className="contact_info_title">Phone</div>
                  <div className="contact_info_text">7036479549</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid card">
          <div className=" row">
            <div className=" col-lg-10 offset-lg-1">
              <div className="contact_info_item d-flex justify-content-start align items-center">
                <img src="#" alt="phone" />
                <div className="contact_info_content">
                  <div className="contact_info_title">Phone</div>
                  <div className="contact_info_text">7036479549</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-form">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                <div className="contact_form_title">Get in Touch</div>
                <form action="" id="contact_form">
                  <div className="contact_form_name d-flex justify-content-between align-items-between">
                    <input
                      type="text"
                      id="contact_form_name"
                      className="contact_form_name input_field"
                      placeholder="Youe name"
                      required="true"
                    />
                    <input
                      type="email"
                      id="contact_form_email"
                      className="contact_form_name input_field"
                      placeholder="Youe email"
                      required="true"
                    />
                    <input
                      type="number"
                      id="contact_form_phone"
                      className="contact_form_name input_field"
                      placeholder="Youe number"
                      required="true"
                    />
                  </div>
                  <div className="contact_form_text mt-5">
                    <textarea
                      className="text_field contact_form_message "
                      placeholder="Message"
                      cols="6 0"
                      rows="10"
                    ></textarea>
                  </div>
                  <div className="contact_form_button">
                    <button
                      type="submit"
                      className="button contact_submit_buttom"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
