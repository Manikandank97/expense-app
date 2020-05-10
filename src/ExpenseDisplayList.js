import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Logo from './icon-delete.png';

function ExpenseDisplayList({ data, editData }) {
  return (
    <Container fluid>
      <Row className="table-header-container">
        <Col md={1} xs={2}>
          S.No
        </Col>
        <Col md={2} xs={2}>
          Date
        </Col>
        <Col md={3} xs={3}>
          Description
        </Col>
        <Col md={3} xs={3}>
          Amount <small className="d-none d-sm-block">(INR)</small>
        </Col>
        <Col md={2} xs={2}>
          Edit
        </Col>
      </Row>
      {data && data.length > 0 ? data.map((result, index) => {
        return (
          <React.Fragment key={index}>
            <Row className='table-data-container'>

              <Col md={1} xs={1}>{index + 1}</Col>

              <Col md={2} xs={3}>{result.addedOnDate.toDateString()}</Col>

              <Col md={3} xs={3}> {result.comment}</Col>

              <Col md={3} xs={3} className={result.type == 'spending' ? 'spend' : 'income'}>{result.amount}</Col>

              <Col md={2} xs={1} className="edit-pointer" onClick={() => editData(result, true)}><i className="fa fa-pencil-square-o fa-lg" /></Col>
            </Row>
          </React.Fragment>
        )
      }) : ''}
    </Container>
  );
}

export default ExpenseDisplayList;
