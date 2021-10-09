import React, { useState, useEffect } from 'react'
import { Jumbotron, Container } from 'react-bootstrap'
import sampleToDoResources from '../../Utilities/sampleToDoResources'
import Logout from '../Auth/LogOut'
import { useAuth } from '../../Contexts/AuthContext'
import axios from 'axios'
import './Todo.css'

import SingleToDoResource from './SingleToDoResource'
import ToDoCreate from './ToDoCreate'

export default function ToDoResource() {
    const { currentUser } = useAuth();
    const [todo, setTodo] = useState(sampleToDoResources);

    //Create hook
    const [categories, setCategories] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const [effectTrigger, setEffectTrigger] = useState(false);

    //READ
    const getTodo = () => {
        axios.get('http://localhost:58327/api/todo').then(response => {
            setTodo(response.data)
        })
    }

    //CREATE
    const addToDo = (toDo) => {
        // console.log(toDo);

        axios.post('http://localhost:58327/api/todo', toDo).then(response => {
            let updatedToDo = todo;
            updatedToDo.push(response.data);
            setTodo(updatedToDo);
            setEffectTrigger(!effectTrigger);
            setShowCreateForm(false);
        })
    }

    //DELETE
    const deleteTodo = (todo) => {
        axios.delete(`http://localhost:58327/api/todo/${todo.TodoId}`).then(() => {

            let updatedTodo = todo;
            let index = updatedTodo.findIndex(x => x.TodoId === todo.TodoId)
            updatedTodo.splice(index, 1);
            setTodo(updatedTodo);
            setEffectTrigger(!effectTrigger);
        })
    }


    const getCategories = () => {
        axios.get('http://localhost:58327/api/categories').then(response => {
            setCategories
                (response.data)
        })
    }

    useEffect(() => {
        getTodo();
        getCategories();
    }, [effectTrigger])

    return (
        <section>
            <Jumbotron className="bg-ingo m-0">
                <h1 className="text-center">ToDo</h1>
            </Jumbotron>
            {currentUser.email === 'ashleynicholelea@outlook.com' &&
                <div className="todoOptions text-center bg-dark p-3">
                    <button className="btn btn-info" onClick={() => setShowCreateForm(!showCreateForm)}>{!showCreateForm ? 'Create New ToDo' : 'Cancel'}
                    </button>
                    <div>
                        {showCreateForm &&
                            <ToDoCreate
                                categories={categories}
                                todo={todo}
                                addToDo={addToDo} />
                        }
                    </div>
                </div>
            }
            <Container>
                <article className="todoGallery row justify-content-center">
                    {todo.map(x =>
                        <SingleToDoResource
                            key={x.TodoId}
                            todo={x}
                            deleteTodo={deleteTodo}
                            categories={categories}
                            effectTrigger={effectTrigger}
                            setEffectTrigger={setEffectTrigger} />
                    )}
                </article>
            </Container>

            {currentUser &&
                <Logout />
            }
        </section>
    )
}
