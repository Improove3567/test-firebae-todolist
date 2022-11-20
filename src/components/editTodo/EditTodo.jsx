import React, { useState } from 'react';
import style from './EditTodo.module.less'
import {
    doc,
    updateDoc,
} from "firebase/firestore";
import { db } from '../../firebase';

const EditTodo = ({ todo, toggleComplete, id }) => {
    const [newTitle, setNewTitle] = useState(todo.title)
    const [newDesc, setNewDesc] = useState(todo.desc)
    const [newDate, setNewDate] = useState(todo.date)
    const [isCheckActive, setIsCheckActive] = useState(false);

    /** Отправка новых данных в firestore, а затем релоад страницы */
    const handleSubmit = async (id) => {
        await updateDoc(doc(db, "todoes", id), { title: newTitle, desc: newDesc, date: newDate });
        window.location.reload()
    };

    return (
        < div className={style.container} key={id} >
            <div>
                <input type='checkbox' onClick={() => {
                    /** Работа с состоянием checkbox, и отправка в состояние чтобы потом отправить в firestore */
                    toggleComplete(todo)
                    setIsCheckActive(!isCheckActive)
                }} />
            </div>
            <form>
                <input
                    type="text"
                    name="New title"
                    placeholder="New title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                <input
                    type="text"
                    name="New description"
                    placeholder="New description"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                />
                <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                />
                <label className={style.input_file_container}>
                    <input type="file" name="file" />
                    <span className={style.input_file_btn}>Выберите файл</span>
                </label>
            </form>
            <div className={style.btns_container}>
                <input type="submit" value="Save" className={style.submit_btn} onClick={() => handleSubmit(id)} />
            </div>
        </div >
    );
}

export default EditTodo;
