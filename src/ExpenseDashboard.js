import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ExpenseDisplayHeader from './ExpenseDisplayHeader';
import ExpenseDisplayList from './ExpenseDisplayList';
import AddEditComponents from './AddEditComponents';
import ExpenseUpdateComponents from './ExpenseUpdateComponents';
import axios from 'axios'

function ExpenseDashboard() {
  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://cors-anywhere.herokuapp.com/https://3d.bk.tudelft.nl/opendata/cityjson/1.0/DenHaag_01.json',
    })
      .then(function (response) {
        const cityObjectData = response.data.CityObjects;
        updateCityData(prevState => [...prevState, cityObjectData])
      });
  }, []);

  useEffect(() => {
    const incomeData = { id: 0, comment: 'Salary from work', amount: '50000', type: 'income', addedOnDate: new Date('05-09-2020') }
    calculateIncome(prevState => [...prevState, incomeData]);
  }, []);

  const [income, calculateIncome] = useState([]);
  const [updateData, updateDataChange] = useState([]);
  const [initUpdate, updateInitChange] = useState(false);
  const [cityData, updateCityData] = useState([]);

  const editData = (data, bool) => {
    updateDataChange(data)
    updateInitChange(bool)
  }

  const updateDataSubmit = (data) => {
    if (data) {
      income.map((item) => {
        if (item.id === data.id) {
          return income.splice(data.id, 1, data);
        }
      })
    }
    calculateIncome(prevState => [...prevState]);
    updateInitChange(false);
  }
  const submitData = (data) => {
    calculateIncome(prevState => [...prevState, { id: income.length, amount: data.amount, comment: data.comment, type: data.type, addedOnDate: data.addedOnDate }]);
  }

  const cityDetailDisp = Object.keys(cityData).forEach(function (key, index) {
    return (
      <React.Fragment key={index}>
        <Col md={3} xs={1}>{key}</Col>
        <Col md={2} xs={1}>{cityData[key].type}</Col>
      </React.Fragment>
    )
  });


  return (
    <Container>

      <Row>
        {cityDetailDisp}
      </Row>
      <ExpenseDisplayHeader data={income} />
      <ExpenseDisplayList data={income} editData={editData} cityData={cityData} />
      <AddEditComponents addData={submitData} />
      <ExpenseUpdateComponents updateDataSubmit={updateDataSubmit} updateData={updateData} initUpdate={initUpdate} />
    </Container>
  );
}

export default ExpenseDashboard;
