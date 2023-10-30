import React, { useState, useEffect } from "react";
import "../styles/transaction.css";
import "../styles/modal.css";
import phone from "../images/phone.png";
import { Button, Modal, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const Mypage = () => {
  const [showModal, setShowModal] = useState(false);
  const [frequency, setFrequency] = useState("default");
  const [transaction1, setTransaction1] = useState([]);

  // const MyComponent = () => {

  // };
  const fetchData = () => {
    // Make an API request to fetch data based on the selected frequency
    const apiUrl = `http://localhost:5000/transactions?dateRange=${frequency}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setTransaction1(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const apiUrl = `http://localhost:5000/transactions?dateRange=${frequency}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setTransaction1(data))
      .catch((error) => console.error(error));
  }, [frequency]);

  const handleFrequencyChange = (e) => {
    const selectedFrequency = e.target.value;
    setFrequency(selectedFrequency);
    // MyComponent(); // Call MyComponent when the date range changes
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  // const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your Express.js server
    fetch("http://localhost:5000/data") // This URL should match the Express.js route
      .then((res) => res.json())
      .then((data) => setTransaction1(data))
      .catch((error) => console.error(error));
  }, []);
  const [transaction, setTransaction] = useState({
    transactionName: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleDelete = (transactionId) => {
    // Make a DELETE request to the server to delete the transaction
    fetch(`http://localhost:5000/delete?${transactionId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          // The transaction was successfully deleted
          // Refresh the modal content by fetching the updated data
          fetchData(); // Implement a function to fetch the updated data
        } else {
          console.error("Failed to delete transaction");
        }
      })
      .catch((error) => console.error(error));
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { transactionName, amount, category, description, date } =
      transaction;
    const res = await fetch("http://localhost:5000/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transactionName,
        amount,
        category,
        description,
        date,
      }),
    });
    const data = await res.json();
    if (data.error) {
      console.log(data.error);
      console.log("Invalid field entering");
    } else {
      window.alert("Successfully added to the expense");
      // history.push("/login");
      // navigate("/login");
    }
  };
  return (
    <>
      <div class="img-form">
        <div class="image">
          <img src={phone} alt="" />
        </div>
        <div>
          <div class="jumbotron">
            <h1 class="display-3 ">
              <b>Manage Your Expenses </b>
            </h1>
            <p class="lead">
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <hr class="my-7" />

            <div class="card" style={{ marginLeft: "200px" }}>
              <div class="card-body">
                <h1>Enter Transaction Details</h1>
                <div className="transaction_form">
                  <input
                    id="transactionName"
                    name="transactionName"
                    class="form-control"
                    type="text"
                    placeholder="Transaction Name"
                    value={transaction.transactionName}
                    onChange={handleInputs}
                  />
                  <input
                    id="amount"
                    name="amount"
                    class="form-control"
                    type="number"
                    placeholder="Enter your amount"
                    value={transaction.amount}
                    onChange={handleInputs}
                  />

                  <input
                    id="category"
                    name="category"
                    class="form-control"
                    type="text"
                    placeholder="category"
                    value={transaction.category}
                    onChange={handleInputs}
                  />
                  <input
                    id="description"
                    name="description"
                    class="form-control"
                    type="textarea"
                    value={transaction.description}
                    onChange={handleInputs}
                    placeholder="description"
                  />
                  <input
                    id="date"
                    name="date"
                    class="form-control"
                    type="date"
                    value={transaction.date}
                    onChange={handleInputs}
                  />
                  <button className="form-control" onClick={PostData}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Button variant="primary" onClick={handleShowModal}>
          Open Modal
        </Button>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>My Modal</Modal.Title>
          </Modal.Header>
          <div className="filters">
            <div>
              <h6>Select Frequency</h6>
              <Form>
                <Form.Select value={frequency} onChange={handleFrequencyChange}>
                  <option value="all">All</option>
                  <option value="lastWeek">Last 1 Week</option>
                  <option value="lastMonth">Last 1 Month</option>
                  <option value="lastYear">Last 1 year</option>
                </Form.Select>
              </Form>
            </div>
          </div>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(transaction1) && transaction1.length > 0 ? (
                  transaction1.map((item, index) => (
                    <tr key={index}>
                      <td>{item.TransactionName}</td>
                      <td>{item.amount}</td>
                      <td>{item.category}</td>
                      <td>{item.description}</td>
                      <td>{item.date}</td>
                      <td>
                        <button
                          class="btn btn-success"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No data available.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Mypage;
