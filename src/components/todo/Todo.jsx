import React, { useState, useEffect } from 'react';
import EditTodo from '../editTodo/EditTodo';
import MoreTodo from '../moreTodo/MoreTodo';
import style from './Todo.module.less'
import dayjs from 'dayjs';

const Todo = ({ title, id, handleDelete, toggleComplete, todo, date }) => {
    const [isCheckActive, setIsCheckActive] = useState(false);
    const [isChangeActive, setIsChangeActive] = useState(false)

    useEffect(() => {
        /** Получаем текущую дату с dayjs, затем приводим ее в правильный формат (урезаем лишнее(время и тд)), и сравниваем с датой Todo, если даты совпадают
         * то делаем чекбокс true и задание перечеркивается
         */
        const now = dayjs()
        const nowFormat = now?.format()
        const ready = nowFormat.split('T')[0]
        if (ready === date) {
            setIsCheckActive(true)
        }
    }, [date]);

    if (isChangeActive === 'edit') {
        return <EditTodo todo={todo} toggleComplete={toggleComplete} id={id} />
    } if (isChangeActive === 'more') {
        return <MoreTodo todo={todo} />
    }
    else {
        return (
            < div className={style.container} key={id} >
                <div>
                    <input type='checkbox' onClick={() => {
                        /** работа с checkbox, при клике */
                        toggleComplete(todo)
                        setIsCheckActive(!isCheckActive)
                    }} checked={isCheckActive} />
                </div>
                <div className={style.text_container}>
                    <p className={isCheckActive ? style.completed : null}>{title}</p>
                </div>
                <div className={style.btns_container}>
                    <img src='/images/eye.png' alt='edit-logo' onClick={() => setIsChangeActive('more')} />

                    <img src='/images/delete.png' alt='delete-logo' onClick={() => handleDelete(id)} />
                    <img src='/images/edit.png' alt='edit-logo' onClick={() => setIsChangeActive('edit')} />
                </div>
            </div >
        );
    }
}

export default Todo;
