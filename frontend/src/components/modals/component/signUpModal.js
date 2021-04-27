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
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions';
import { registerUser } from '../../user/actions';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';

function SignUpModal(props) {
    const {
        show,
        title = 'Sign Up',
        buttonText = 'Sign Up',
        privacyMessage = 'Your email will never be shared.',
        closeModal,
        registerUser,
    } = props;

    const tiers = [
        {
            id: 'Standard',
            name: 'Standard Tier',
        },
        {
            id: 'Professional',
            name: 'Professional Tier',
        },
        {
            id: 'Advanced',
            name: 'Advanced Tier',
        }
    ];

    const [validated, setValidated] = useState(false);

    const useInput = initialValue => {
        const [value, setValue] = useState(initialValue);

        return {
            value,
            setValue,
            reset: () => setValue(''),
            bind: {
                value,
                onChange: event => {
                    setValue(event.target.value)
                }
            },
        };
    };

    const { value: company, bind: bindCompany } = useInput('');
    const { value: firstName, bind: bindFirstName } = useInput('');
    const { value: lastName, bind: bindLastName } = useInput('');
    const { value: email, bind: bindEmail } = useInput('');
    const { value: tier, bind: bindTier } = useInput(tiers[0].name);

    const submitRegisterUser = event => {
        const form = event.currentTarget;
        const submitButton = document.getElementById('signUpFormSubmitButton');
        const user = {
            firstName,
            lastName,
            email,
            company,
            tier,
        };

        event.preventDefault();

        if(form.checkValidity() === false) {
            form.reportValidity();
            event.stopPropagation();
        } else {
            submitButton.disabled = true;
            setValidated(true);
            registerUser(user);
        }
    };

    return (
        <>
            <Modal
                show={show}
                onHide={closeModal}
                centered
            >
                <Form id="signUpForm" noValidate validated={validated} onSubmit={submitRegisterUser}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                            <Form.Group controlId="signUpFormCompany">
                                <Form.Label>Company</Form.Label>
                                <Form.Control type="text" placeholder="CompanyName" required {...bindCompany} />
                            </Form.Group>
                            <Form.Group controlId="signUpFormFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="FirstName" required {...bindFirstName} />
                            </Form.Group>
                            <Form.Group controlId="signUpFormLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="LastName" required {...bindLastName} />
                            </Form.Group>
                            <Form.Group controlId="signUpFormEmail">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" placeholder="EmailAddress" required {...bindEmail} />
                                <Form.Text className="text-muted">
                                    {privacyMessage} <FontAwesomeIcon icon={faAward} />
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="signUpFormTier">
                                <Form.Label>Tier</Form.Label>
                                <Form.Control as="select" {...bindTier} >
                                    {
                                        tiers.map(tier => <option key={tier.id} value={tier.name}>{tier.name}</option>)
                                    }
                                </Form.Control>
                            </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        <Button type="submit" id="signUpFormSubmitButton" variant="success">
                            {buttonText}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

const mapDispatchToProps = {
    closeModal,
    registerUser,
};

const mapStateToProps = state => {
    return {
        currentModal: state.modal.currentModal,
        show: state.modal.currentModal !== null,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpModal);
