import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddEditComponents({ addData }) {
    const [modal, setModal] = useState(false);
    const [date, setDate] = useState(new Date());
    const [type, setType] = useState('');
    const [amount, setAmount] = useState(0);
    const [comment, setComment] = useState('');
    const toggle = () => setModal(!modal);
    const handleDateChange = (date) => {
        setDate(date);
    }
    const showTypeModal = (type) => {
        setModal(true);
        setType(type);
        setAmount(0);
        setComment('');
    }

    const submitData = () => {
        let x = {
            amount,
            comment,
            type,
            addedOnDate: date
        }
        setModal(false);
        addData(x);

    }
    return (
        <Container>
            <Row className="button-container">
                <Col md={6} xs={6} className="text-right">
                    <Button color="success" onClick={() => showTypeModal('income')}>Add Income</Button>
                </Col>
                <Col md={6} xs={6}>
                    <Button color="danger" onClick={() => showTypeModal('spending')}>Add Spending</Button>
                </Col>
            </Row>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader className={type == "income" ? "incomeHeaderBg" : "spendHeaderBg"}>ADD{' '}{type.toUpperCase()}</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={6} xs={4}>
                            <FormGroup>
                                <Label for="exampleText">Amount <small>(INR)</small></Label>
                                <Input type="text" name="text" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col md={6} xs={8}>
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

export default AddEditComponents;
