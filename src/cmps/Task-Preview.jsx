import React, { useEffect, useState } from "react"
import { BsFillPencilFill } from 'react-icons/bs'
import { TaskQuickEdit } from "./task-quick-edit"

export const TaskPreview = ({ task }) => {
    const [isFullCover, setIsFullCover] = useState(false)
    const [isQuickEditOn, setIsQuickEditOn] = useState(false)
    useEffect(() => {
        if (task.style) setIsFullCover(task.style.bg.fullCover)
    }, [])

    const setTaskCoverStyle = () => {
        let style = {}
        if (!task.style) return style
        if (task.style.bg.color) style = { backgroundColor: task.style.bg.color }
        else if (task.style.bg.imgUrl) {
            style = {
                backgroundImage: `url(${task.style.bg.imgUrl})`,
                backgroundSize: "cover",
                height: "180px",
                borderRadius: "3px"
            }
        }
        return style
    }

    const toggaleQuickEdit = (ev) => {
        ev.stopPropagation()
        setIsQuickEditOn(!isQuickEditOn)
    }

    return (
        <section className="task-preview">
            <button className="quick-edit-btn hide" onClick={toggaleQuickEdit}>
                <BsFillPencilFill />
            </button>
            {isQuickEditOn && <TaskQuickEdit />}
            {!isFullCover && task?.style && <div className="task-cover" style={setTaskCoverStyle()}></div>}
            {!isFullCover && <span>{task.title}</span>}

            {isFullCover && task?.style?.bg?.imgUrl && <span className="title-img-cover" style={setTaskCoverStyle()}>{task.title}</span>}
            {isFullCover && task?.style?.bg?.color && <React.Fragment>
                <div className="task-cover" style={setTaskCoverStyle()}></div>
                <span style={setTaskCoverStyle()}>{task.title}</span>
            </React.Fragment>}

        </section >
    )
}
