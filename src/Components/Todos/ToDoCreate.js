import React, { useState, useRef } from 'react'
import { Form, Button, Card } from 'react-bootstrap'


export default function ToDoCreate(props) {

    const actionRef = useRef();
    const doneRef = useRef();
    const catRef = useRef();

    const [valSummary, setValSummary] = useState('');
    const [actionVal, setActionVal] = useState('');
    const [doneVal, setDoneVal] = useState('');
    const [catVal, setCatVal] = useState('');

    const validate = (toDo) => {
        let action = toDo.Action
        let done = toDo.Done
        let cat = toDo.CategoryId

        action.length > 1000 ? setActionVal('** Max 1,000 Characters') : setActionVal('')

        // Figure out done (bit), & category

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const toDo = {
            Action: actionRef.current.value,
            Done: doneRef.current.value,
            CategoryId: catRef.current.value
        }

        validate(toDo)

        if (actionVal === '' && doneVal === '' && catVal === '') {
            props.addToDo(toDo)
        }
        else {
            setValSummary('Correct the inputs below to submit the Todo.')
        }
    }

    return (
        <article className="createTodo m-2 text-white align-items-center">
            <Card bg="dark">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <h1 className="m-2">Create ToDo</h1>
                        <br />
                        {valSummary !== '' &&
                            <div className="alert alert-danger">
                                <strong>{valSummary}</strong>
                            </div>
                        }
                        <Form.Group id="Action" className="text-left">
                            <label>Action</label>
                            <Form.Control type="text" ref={actionRef} required />
                            <div className="text-danger">{actionVal}</div>
                        </Form.Group>
                        <Form.Group id="Done" className="text-left">
                            <label>Done</label>
                            <Form.Control type="text" ref={doneRef} required />
                            <div className="text-danger">{doneVal}</div>
                            {/* type='checkbox' label='done' */}
                        </Form.Group>
                        <Form.Group id="cat" className="text-left">
                            <label>Category</label>
                            <select className="form-control" ref={catRef} required>
                                {props.categories.map(cat =>
                                    <option value={cat.CategoryId} key={cat.CategoryId}>
                                        {cat.Name}
                                    </option>
                                )}
                            </select>
                        </Form.Group>
                        <Button type="submit" className="btn btn-info w-100">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </article>
    )
}

                    //             {/* <input type="checkbox" checked={ this.props.item.Done}
                    // onChange={() => this.props.callback(this.props.item)}/> */}