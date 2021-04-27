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
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    addUserModal,
    editUserModal,
    deleteUserModal,
} from '../../modals/actions';
import {
    fetchUsers,
} from '../actions';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faEdit,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';

function Users(props) {
    const {
        users,
        fetchUsers,
        addUserModal,
        editUserModal,
        deleteUserModal,
     } = props;

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <Container fluid style={{height: '45vh'}}>
            <h2>Users</h2>
            <Container>
                <Row className='mb-2'>
                    <Col>
                        <Button onClick={addUserModal} variant='success' className="float-right"> Add User <FontAwesomeIcon icon={faPlus} /></Button>
                    </Col>
                </Row>
                <Row>
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users ?
                                    users.map((user) => {
                                        const { username,
                                            given_name,
                                            family_name,
                                            email,
                                        } = user;

                                        return (
                                            <tr key={username}>
                                                <td>{given_name} {family_name}</td>
                                                <td>{email}</td>
                                                <td className="text-center"><Button variant='secondary' onClick={() => editUserModal(user)}> Edit <FontAwesomeIcon icon={faEdit} /></Button> <Button onClick={() => deleteUserModal(user)} variant='danger'> Del <FontAwesomeIcon icon={faTrash} /></Button></td>
                                            </tr>
                                        );
                                    }
                                    )
                                    :
                                    null
                            }
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </Container>
    )
}

const mapDispatchToProps = {
    fetchUsers,
    addUserModal,
    editUserModal,
    deleteUserModal,
};

const mapStateToProps = state => {
    return {
        users: state.users.users,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
