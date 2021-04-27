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
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  addTenantModal,
  deleteTenantModal,
  editTenantModal,
} from "../../modals/actions";
import { fetchTenants } from "../actions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

function Tenants(props) {
  const {
    tenants,
    addTenantModal,
    deleteTenantModal,
    editTenantModal,
    fetchTenants,
  } = props;

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  return (
    <Container fluid style={{ height: "45vh" }}>
      <h2>Tenants</h2>
      <Container>
        <Row className="mb-2">
          <Col>
            <Button
              onClick={addTenantModal}
              variant="success"
              className="float-right"
            >
              {" "}
              Add Tenant <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Col>
        </Row>
        <Row>
          <Table>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Email</th>
                <th>Tier</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {tenants
                ? tenants.map((tenant) => {
                    const { tenant_id, company_name, email, tier, status } = tenant;
                    return (
                      <tr key={tenant_id}>
                        <td>{company_name}</td>
                        <td>{email}</td>
                        <td>{tier}</td>
                        <td>{status}</td>
                        <td className="text-center">
                          <Button
                            variant="secondary"
                            onClick={() => editTenantModal(tenant)}
                          >
                            {" "}
                            Edit <FontAwesomeIcon icon={faEdit} />
                          </Button>{" "}
                          <Button
                            onClick={() => deleteTenantModal(tenant)}
                            variant="danger"
                          >
                            {" "}
                            Del <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
        </Row>
      </Container>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    tenants: state.tenants.tenants,
  };
};

const mapDispatchToProps = {
  addTenantModal,
  deleteTenantModal,
  editTenantModal,
  fetchTenants,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tenants);
