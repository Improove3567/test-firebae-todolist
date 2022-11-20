import React, { useState } from 'react'
import style from './AddTodo.module.less'
import { addDoc, collection } from 'firebase/firestore';
import { db, app } from '../../firebase';

export default function AddTodo() {

    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');


    /** Отправка данных в firestore */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title !== '') {
            await addDoc(collection(db, "todoes"), {
                title,
                desc,
                date,
                completed: false
            })
        }

    }

    /** Отправка файла в storage */
    const fileHandler = ((e) => {
       const file = e.target.files[0]
       const storageRef = app.storage().ref()
       const fileRef = storageRef.child(file.name)
       fileRef.put(file).then(() => {
        console.log('Uploaded file', file.name )
       })
    })



    return (
        <div className={style.wrapper}>
            <p>Добавить задачу</p>
            <form>
                <input type="text" name="title" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />

                <input type="text" name="description" placeholder="Description" onChange={(e) => setDesc(e.target.value)} />

                <input type="date" onChange={(e) => setDate(e.target.value)} />

                <label className={style.input_file_container}>
                    <input type="file" name="file" onChange={fileHandler} />
                    <span className={style.input_file_btn}>Выберите файл</span>
                </label>

                <input type="submit" value="Add" className={style.submit_btn} onClick={handleSubmit} />
            </form>
        </div>
    )
}
