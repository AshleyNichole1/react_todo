import React, { useState, useEffect } from 'react'
import { Jumbotron, Container } from 'react-bootstrap'
import sampleCategories from '../../Utilities/sampleCategories'
import axios from 'axios'
import { useAuth } from '../../Contexts/AuthContext'
import CategoriesCreate from './CategoriesCreate'
import './Categories.css'

import SingleCategory from './SingleCategory'
import LogOut from '../Auth/LogOut'

export default function Categories() {
    const [categories, setCategories] = useState(sampleCategories);

    //Create Hooks
    const { currentUser } = useAuth();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [effectTrigger, setEffectTrigger] = useState(false);

    //READ
    const getCategories = () => {
        axios.get('http://localhost:58327/api/categories').then(response => {
            setCategories(response.data)
        })
    }

    //CREATE
    const addCategory = (category) => {
        axios.post('http://localhost:58327/api/categories', category).then(response => {
            let updatedCategories = categories;
            updatedCategories.push(response.data);
            setCategories(updatedCategories);
            setEffectTrigger(!effectTrigger);
            setShowCreateForm(false);
        })
    }

    //DELETE
    const deleteCategory = (category) => {
        axios.delete(`http://localhost:58327/api/categories/${category.CategoryId}`).then(() => {
            let updatedCategories = categories;
            let index = updatedCategories.findIndex(x => x.CategoryId === category.CategoryId);
            updatedCategories.splice(index, 1);
            setCategories(updatedCategories);
            setEffectTrigger(!effectTrigger);
        })
    }


    useEffect(() => {
        getCategories();
    }, [effectTrigger])

    return (
        <section className="categories">
            <Jumbotron className="bg-info m-0">
                <h1 className="text-center">Categories</h1>
            </Jumbotron>
            <div className="db-dark mb-3 p-2">
                {(currentUser.email === 'ashleynicholelea@outlook.com' &&
                    showCreateForm) ?
                    <>
                        <button onClick={() => setShowCreateForm(false)} className="btn btn-warning">Cancel</button>
                        <CategoriesCreate categories={categories} addCategory={addCategory} />
                    </> :
                    <button onClick={() => setShowCreateForm(true)} className="btn btn-info">Create Category</button>
                }
            </div>
            <Container>
                <table className="table table-striped tab-light rounded mt-3 mb-3">
                    <thead className="bg-info text uppercase">
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            {currentUser.email === 'ashleynicholelea@outlook.com' &&
                                <th>
                                    Actions
                                </th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat =>
                            <SingleCategory
                                key={cat.CategoryId}
                                category={cat}
                                deleteCategory={deleteCategory}
                                effectTrigger={effectTrigger}
                                setEffectTrigger={setEffectTrigger} />
                        )}
                    </tbody>
                </table>
            </Container>
            <LogOut />
        </section>
    )
}
