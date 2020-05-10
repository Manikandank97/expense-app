import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ExpenseUpdateComponents({ updateDataSubmit, updateData, initUpdate }) {
    const [modal, setModal] = useState(false);
    const [date, setDate] = useState(new Date());
    const [type, setType] = useState('');
    const [amount, setAmount] = useState(0);
    const [comment, setComment] = useState('');
    const [id, updateId] = useState('');
    const toggle = () => setModal(!modal);
    const handleDateChange = (date) => {
        setDate(date);
    }
    const showTypeModal = (type) => {
        setModal(true);
        setType(updateData.type);
        setAmount(updateData.amount);
        setComment(updateData.comment);
        setDate(updateData.addedOnDate);
        updateId(updateData.id);
    }

    const submitData = () => {
        let x = {
            id,
            amount,
            comment,
            type,
            addedOnDate: date
        }
        setModal(false);
        updateDataSubmit(x);

    }

    useEffect(() => {
        if (initUpdate) showTypeModal()
    }, [initUpdate]);

    return (
        <Container>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className={type == "income" ? "incomeHeaderBg" : "spendHeaderBg"}>EDIT{' '}</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label for="exampleText">Amount <small>(INR)</small></Label>
                                <Input type="text" name="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label for="exampleText">Date</Label>
                                <DatePicker selected={date} onChange={(date) => handleDateChange(date)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="exampleText">Comments</Label>
                                <Input type="textarea" name="comments" id="comments" value={comment} onChange={(e) => setComment(e.target.value)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <Button color="primary" disabled={amount > 1 ? false : true} onClick={() => submitData()}>Submit</Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </Container>
    );
}

export default ExpenseUpdateComponents;
