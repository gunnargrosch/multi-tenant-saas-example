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
import {
    closeModal,
} from '../actions';
import {
    editTenant,
} from '../../tenants/actions';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function EditTenantModal(props) {
    const {
        show,
        tenant,
        title = tenant ? `Edit ${tenant.name}` : 'Edit Tenant',
        buttonText = 'Edit Tenant',
        editTenant,
        closeModal,
    } = props;

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

    const { value: sku, bind: bindSku } = useInput(tenant.sku);
    const { value: name, bind: bindName } = useInput(tenant.name);
    const { value: price, bind: bindPrice } = useInput(tenant.price);
    const { value: category, bind: bindCategory } = useInput(tenant.category);

    const submitTenantUpdate = () => {
        const updatedTenant = {
            tenant_id: tenant.tenant_id,
            sku,
            name,
            price,
            category,
        };

        editTenant(updatedTenant);
    };
    
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
                    <Form>
                        <Form.Group controlId="tenantSKU">
                            <Form.Label>SKU</Form.Label>
                            <Form.Control type="text" placeholder="Enter SKU" value={tenant.sku} {...bindSku} />
                        </Form.Group>
                        <Form.Group controlId="tenantName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter tenant name" {...bindName} />
                        </Form.Group>
                        <Form.Group controlId="tenantName">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" placeholder="Enter tenant price" {...bindPrice} />
                        </Form.Group>
                        <Form.Group controlId="tenantCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" {...bindCategory}>
                                <option key='0' value=''></option>
                                <option key='1' value='Category 1'>Category 1</option>
                                <option key='2' value='Category 2'>Category 2</option>
                                <option key='3' value='Category 3'>Category 3</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="success" onClick={submitTenantUpdate}>
                        {buttonText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapStateToProps = state => {
    return {
        currentModal: state.modal.currentModal,
        show: state.modal.currentModal !== null,
        tenant: state.modal.tenant,
        categories: state.tenants.categories,
    };
}

export default connect(mapStateToProps, { closeModal, editTenant })(EditTenantModal);
