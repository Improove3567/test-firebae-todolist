import React, { useState, useEffect } from 'react'
import AddTodo from '../components/addTodo/AddTodo'
import {
    query,
    onSnapshot,
    updateDoc,
    deleteDoc,
    collection,
    doc
} from "firebase/firestore";
import { db } from '../firebase';
import Todo from '../components/todo/Todo';

export default function HomePage() {

    const [todoes, setTodoes] = useState();


    /** Получение данных с firestore */
    useEffect(() => {
        const q = query(collection(db, "todoes"));

        const unsub = onSnapshot(q, (querySnapshot) => {
            let todoesArray = [];
            querySnapshot.forEach((doc) => {
                todoesArray.push({ ...doc.data(), id: doc.id })
            });
            setTodoes(todoesArray)
        })
        return () => unsub();
    }, [])


    /** Фунция удаления todo */
    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "todoes", id));
    }

    /** Функция изменения состояние completed, тоесть checkbox'a */
    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, "todoes", todo.id), { completed: !todo.completed });
    };



    return (
        <div>
            <AddTodo />
            <div>
                {
                    /** maping todo и передача данных через props */
                    todoes?.map((el) => (
                        <Todo
                            title={el.title}
                            id={el.id}
                            date={el.date}
                            todo={el}
                            handleDelete={handleDelete}
                            toggleComplete={toggleComplete}
                        />
                    ))
                }
            </div>
        </div>
    )
}
