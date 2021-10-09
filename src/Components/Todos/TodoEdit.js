import axios from "axios";
import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";


export default function TodoEdit(props) {
    const [action, setAction] = useState(props.todo.Action);
    const [done, setDone] = useState(props.todo.Done);
    const [categoryId, setCategoryId] = useState(props.todo.CategoryId);

    const [valSummary, setvalSummary] = useState('');
    const [actionVal, setActionVal] = useState('');
    const [doneVal, setDoneVal] = useState();

    const validate = (todo) => {
        let action = todo.Action
        let done = todo.Done

        action.length > 1000 ? setActionVal('** Max 1,000 Characters') : setActionVal('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const todo = {
            ToDoId: props.todo.ToDoId,
            Action: action,
            Done: done,
            CategoryId: categoryId
        };

        validate(todo);


        axios.put(`http://localhost:58327/api/todo/${todo.ToDoId}`, todo).then(() => {
            props.setEffectTrigger(!props.effectTrigger);
            props.setShowEdit(false);
        })
    }


    return (
        <section className="todos">
            <Modal show={props.ShowEdit} onHide={() => props.setShowEdit(false)} size="lg" >
                <Modal.Header closeButton>
                    <h1 className="text-center w-100">Edit</h1>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {valSummary !== '' &&
                            <div className="alert alert-danger">
                                <strong>
                                    {valSummary}
                                </strong>
                            </div>}


                        <Form.Group id="action" className="text-left">
                            <lavel>Action</lavel>
                            <Form.Control type-="text" defaultValue={action} onChange={(e) => setAction(e.target.value)} required />
                            <div className="text-danger">
                                {actionVal}
                            </div>
                        </Form.Group>

                        <Form.Group id="done" className="text-left">
                            <label>Done</label>
                            <Form.Control type="text" defaultValue={done} onChange={(e) => setDone(e.target.value)} required />
                            <div className="text-danger">
                                {doneVal}
                            </div>
                        </Form.Group>

                        <Form.Group id="cat" className="text-left">
                            <label>Category</label>
                            <select className="form-control" defaultValue={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                                {props.categories.map(cat => <option key={cat.CategoryId} value={cat.CategoryId}>{cat.CategoryName}
                                </option>
                                )}
                            </select>
                        </Form.Group>
                        <Button type="submit" className="btn btn-info w-100">Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </section>
    )
}
