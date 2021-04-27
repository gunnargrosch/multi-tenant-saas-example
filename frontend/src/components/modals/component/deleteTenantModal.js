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
import React from 'react';
import { connect } from 'react-redux';
import {
    closeModal,
} from '../actions';
import {
    deleteTenant,
} from '../../tenants/actions';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DeleteTenantModal(props) {
    const {
        show,
        title = 'Delete Tenant',
        buttonText = 'Delete Tenant',
        tenant,
        closeModal,
        deleteTenant,
    } = props;

    return (
        <>
            <Modal
                show={show}
                onHide={closeModal}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Are you sure you want to delete: <strong>{tenant.name}</strong>?</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => deleteTenant(tenant)}>
                        {buttonText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapDispatchToProps = {
    closeModal,
    deleteTenant,
};

const mapStateToProps = state => {
    return {
        currentModal: state.modal.currentModal,
        show: state.modal.currentModal !== null,
        tenant: state.modal.tenant,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTenantModal);
