import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../components/Layout"
 

function CreateAccount() {
    const [username] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/");
        }
    }, [])

    const axiosInstance = axios.create({
        baseURL: 'https://mock-api.binaryboxtuts.com/',
    });

    const handleSave = () => {
        setIsSaving(true);
        axiosInstance.post('/api/projects', {
            username: username,
            name: name,
            description: description
        })
            .then(function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Akun berhasil dibuat!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                setName('')
                setDescription('')
            })
            .catch(function () {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Tambah akun</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/dashboard">Lihat Semua Akun
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                        <div className="form-group">
                                <label htmlFor="name">Username</label>
                                <input
                                    onChange={(event) => { setName(event.target.value) }}
                                    value={username}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Nama</label>
                                <input
                                    onChange={(event) => { setName(event.target.value) }}
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Email</label>
                                <textarea
                                    value={description}
                                    onChange={(event) => { setDescription(event.target.value) }}
                                    className="form-control"
                                    id="email"
                                    rows="1"
                                    name="description"></textarea>
                            </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-primary mt-3">
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CreateAccount;