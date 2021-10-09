import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '../../Contexts/AuthContext'
import TodoEdit from './TodoEdit'

library.add(fas);

export default function SingleToDoResource(props) {
    const { currentUser } = useAuth();

    const [showEdit, setShowEdit] = useState(false);

    return (
        <div className="SingleToDoResource col-md-5 m-4">
            <h3>{props.todo.ToDoId}</h3>
            {props.todo.Action !== null ?
                <p>{props.todo.Action}</p> :
                <p>No Action Provided</p>
            }
            <h3>{props.todo.category}</h3>
            <h3>{props.todo.done}</h3>

            {currentUser.email === 'ashleynicholelea@outlook.com' &&
                <div>
                    <button id="editLink" onClick={() => setShowEdit(!showEdit)}>
                        <FontAwesomeIcon icon={['fas', 'edit']} />
                    </button>
                    <button id="deleteLink" onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${props.todo.Action}?`)) {
                            props.deleteTodo(props.todo)
                        }
                    }}>
                        <FontAwesomeIcon icon={['fas', 'trash-alt']} />
                    </button>
                </div>
            }

            <TodoEdit
                todo={props.todo}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                effectTrigger={props.effectTrigger}
                setEffectTrigger={props.effectTrigger}
                categories={props.categories}
            />
        </div>
    )
}

// /* <input type="checkbox" checked={this.props.item.Done}
//                     onChange={() => this.props.callback(this.props.item)} />    