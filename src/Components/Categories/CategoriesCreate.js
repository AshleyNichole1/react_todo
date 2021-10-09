import React, { useRef, useState } from 'react'
import { Form, Card, Button } from 'react-bootstrap'

export default function CategoriesCreate(props) {

    //Create the refs
    const nameRef = useRef();
    const descRef = useRef();

    //validation hooks
    const [valSummary, setValSummary] = useState('');
    const [nameVal, setNameVal] = useState('');
    const [descVal, setDescVal] = useState('');

    const validate = (category) => {
        let name = category.CategoryName;
        let desc = category.CategoryDescription;

        name.length > 50 ? setNameVal('** Max 50 Characters') : setNameVal('')
        desc.length > 100 ? setDescVal('** Max 100 Characters') : setDescVal('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const category = {
            CategoryName: nameRef.current.value,
            CategoryDescription: descRef.current.value
        };

        validate(category);

        if (nameVal === '' && descVal === '') {
            props.addCategory(category);
        }
        else {
            setValSummary('Correct the inputs below to submit the category.')
        }
    }

    return (
        <article className="createCategory m-2 align-item-center">
            <Card bg="light">
                <Form onSubmit={handleSubmit} className="p-4 bg-dark text-white">
                    <h1 className="m-2">Create New Category</h1>
                    <br />
                    {valSummary !== '' &&
                        <div className="alert alert-danger">
                            <strong>{valSummary}</strong>
                        </div>
                    }
                    <Form.Group id="name" className="text-left">
                        <label>Name</label>
                        <Form.Control type="text" ref={nameRef} Required />
                        <div className="text-danger">{nameVal}</div>
                    </Form.Group>
                    <Form.Group id="description" className="text-left">
                        <label>Description</label>
                        <Form.Control as="textarea" type="text" ref={descRef} Required />
                        <div className="text-danger">{descVal}</div>
                    </Form.Group>
                    <Form.Group id="button" className="text-center">
                        <Button type="submit" className="btn btn-info">Create</Button>
                    </Form.Group>
                </Form>
            </Card>
        </article>
    )
}