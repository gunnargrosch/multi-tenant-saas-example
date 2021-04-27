// Permission is hereby granted, free of charge, to any person obtaining a copy of this
// software and associated documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights to use, copy, modify,
// merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so.
// //
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
// PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
import React, { useState } from "react";
import { connect } from "react-redux";
import { closeModal } from "../actions";
import { addUser } from "../../users/actions";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AddUserModal(props) {
  const {
    show,
    title = "Add User",
    buttonText = "Add User",
    addUser,
    closeModal,
  } = props;

  const tiers = [
    {
      id: "Standard",
      name: "Standard User",
    },
    {
      id: "Professional",
      name: "Professional User",
    },
    {
      id: "Advanced",
      name: "Advanced User",
    },
  ];

  const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    return {
      value,
      setValue,
      reset: () => setValue(""),
      bind: {
        value,
        onChange: (event) => {
          setValue(event.target.value);
        },
      },
    };
  };

  const { value: given_name, bind: bindGivenName } = useInput("");
  const { value: family_name, bind: bindFamilyName } = useInput("");
  const { value: email, bind: bindEmail } = useInput("");
  const { value: tier, bind: bindTier } = useInput(tiers[0].name);

  const submitUserAdd = () => {
    const user = {
      given_name,
      family_name,
      email,
      tenant_id: sessionStorage.tenant_id,
      company_name: "-",
      tier,
      role: "Standard",
    };

    addUser(user);
  };

  return (
    <>
      <Modal show={show} onHide={closeModal} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="userGivenName">
              <Form.Label>Given name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter given name"
                {...bindGivenName}
              />
            </Form.Group>
            <Form.Group controlId="userFamilyName">
              <Form.Label>Family name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter family name"
                {...bindFamilyName}
              />
            </Form.Group>
            <Form.Group controlId="userEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user email"
                {...bindEmail}
              />
            </Form.Group>
            <Form.Group controlId="signUpFormTier">
              <Form.Label>Tier</Form.Label>
              <Form.Control as="select" {...bindTier}>
                {tiers.map((tier) => (
                  <option key={tier.id} value={tier.name}>
                    {tier.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="success" onClick={submitUserAdd}>
            {buttonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapDispatchToProps = {
  addUser,
  closeModal,
};

const mapStateToProps = (state) => {
  return {
    currentModal: state.modal.currentModal,
    show: state.modal.currentModal !== null,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserModal);
