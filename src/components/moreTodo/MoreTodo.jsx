import React from 'react'
import style from './MoreTodo.module.less'

/** получаем с props данные о Todo и показываем их */
export default function MoreTodo({ todo }) {

    return (
        <div className={style.container}>
            <div className={style.content_wrapper}>
                <div>
                    <input type='checkbox' checked={todo.completed} />
                </div>
                <div className={style.text_wrapper}>
                    <div className={style.text_block}>
                        <h2>{todo.title}</h2>
                        <h5>{todo.desc}</h5>
                    </div>
                </div>
                <div className={style.date_wrapper}>
                    deadline: {todo.date}
                </div>
                <div className={style.btns_wrapper}>
                    <img src='/images/file.png' alt='file-logo' />
                </div>
            </div>
            <div className={style.btn_container}>
                <input type="submit" value="Back" className={style.submit_btn} onClick={() => window.location.reload()} />
            </div>
        </div>

    )
}
