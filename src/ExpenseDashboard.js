import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import ExpenseDisplayHeader from './ExpenseDisplayHeader';
import ExpenseDisplayList from './ExpenseDisplayList';
import AddEditComponents from './AddEditComponents';
import ExpenseUpdateComponents from './ExpenseUpdateComponents';

function ExpenseDashboard() {

  useEffect(() => {
    const incomeData = { id: 0, comment: 'Salary from work', amount: '50000', type: 'income', addedOnDate: new Date('05-09-2020') }
    calculateIncome(prevState => [...prevState, incomeData]);
  }, []);

  const [income, calculateIncome] = useState([]);
  const [updateData, updateDataChange] = useState([]);
  const [initUpdate, updateInitChange] = useState(false);

  const editData = (data, bool) => {
    updateDataChange(data)
    updateInitChange(bool)
    // calculateIncome(income.filter(item => item.id !== id));
  }

  const updateDataSubmit = (data) => {
    calculateIncome(prevState => [...prevState, ...data]);
  }
  const submitData = (data) => {
    calculateIncome(prevState => [...prevState, { id: income.length, amount: data.amount, comment: data.comment, type: data.type, addedOnDate: data.addedOnDate }]);
  }

  return (
    <Container>
      <ExpenseDisplayHeader data={income} />
      <ExpenseDisplayList data={income} editData={editData} />
      <AddEditComponents addData={submitData} />
      <ExpenseUpdateComponents updateDataSubmit={updateDataSubmit} updateData={updateData} initUpdate={initUpdate} />
    </Container>
  );
}

export default ExpenseDashboard;
