import React from 'react';
import { Container, Row, Col } from 'reactstrap';


function ExpenseDisplayHeader({ data }) {
  const displayData = () => {
    let income = 0;
    let spending = 0;
    let finalamount = 0;
    if (data && data.length > 0) {
      data.map((result, idx) => {
        if (result.type === 'income') {
          income += parseInt(result.amount);
        } else if (result.type === 'spending') {
          spending += parseInt(result.amount);
        }
      })
    }
    finalamount = income - spending;
    return (
      <React.Fragment>
        <Row className="py-2 total-info-container">
        <Col md={1} xs={3}><h3><b>Total: </b></h3></Col>
        <Col md={11} xs={9}><h3><b>{finalamount} {"INR"}</b></h3></Col>
        </Row>
        <Row className="py-2 income-spending-info-container">
        <Col md={3} xs={6}>
            <span className="income">Income: {income} {"INR"}</span>
          </Col>
          <Col md={3} xs={6}>
            <span className="spend">Spendings: {spending} {"INR"}</span>
          </Col>
        </Row>
      </React.Fragment>
    )
  }

  return (
    <Container fluid>
      {displayData()}
    </Container>
  );
}

export default ExpenseDisplayHeader;
