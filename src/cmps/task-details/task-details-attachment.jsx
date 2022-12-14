import React, { useState } from "react"
import { ImAttachment } from "react-icons/im"
import { TaskModalAttachment } from "../task-details/task-details-modals/task-modal-attachment"
// import { TaskAttachmentEditName } from "../task-details-modals/task-attachment-edit-name"
import { TaskAttachmentEditName } from "./task-details-modals/task-attachment-edit-name"
import { utilService } from "../../services/util.service"
import attachmentImg from '../../assets/img/attac-icon.svg'
import moment from 'moment'
import { useSelector } from "react-redux"

export const TaskDetailsAttachment = ({ task, onUpdateTask, toggleModal }) => {

    const [editAttachNameModalPos, setEditAttachNameModalPos] = useState(null)
    const [attachmentToEdit, setAttachmentToEdit] = useState(null)
    const [isEditAttachName, setIsEditAttachName] = useState(false)
    const taskDetailsModal = useSelector(state => state.boardModule.taskDetailsModal)

    const onAddAttachment = (ev, url, name, fileFormat = null) => {
        ev.preventDefault()
        const newAttachment = {
            id: utilService.makeId(),
            url,
            name,
            fileFormat,
            createdAt: new Date()
        }
        if (!task.attachments) task.attachments = [(newAttachment)]
        else task.attachments.unshift((newAttachment))
        onUpdateTask(task)
        toggleModal()
    }

    const onDeleteAttachment = (attachmentId) => {
        const idx = task.attachments.findIndex(attachment => attachment.id === attachmentId)
        task.attachments.splice(idx, 1)
        onUpdateTask(task)
    }

    const toggleEditAttachNameModal = (ev, attachmentId) => {
        setAttachmentToEdit(attachmentId)
        if (!isEditAttachName) {
            const parentEl = ev.currentTarget.parentNode
            const position = parentEl.getBoundingClientRect()

            const style = {
                top: ev.target.offsetTop - 300,
                left: ev.target.offsetLeft
            }
            let pos = {
                position: position,
                style: style
            }
            setEditAttachNameModalPos(pos)
            setIsEditAttachName(!isEditAttachName)
        } else {
            setIsEditAttachName(false)
        }
    }

    const getTime = (attachment) => {
        return moment(attachment.createdAt).fromNow()
    }

    const getImgToDisplay = (attachment) => {
        const isImageAttachment = (/\.(jpeg|jpg|png|gif)\b/i).test(attachment.url)
        if (isImageAttachment) return <img className="img-attachment" src={attachment.url} />
        else return <img className="img-attachment default-img" src={attachmentImg} />
    }

    return (
        <React.Fragment>
            {task?.attachments && task?.attachments?.length > 0 && <section className="task-details-attachment">
                <div className="attachment-title-container">
                    <span className="icon"><ImAttachment /></span>
                    <span className="section-title">Attachment</span>
                </div>
                <div className="attachment-list">
                    {task?.attachments.map(attachment => {
                        return (
                            <div className="attachment-container" key={attachment.id}>
                                <a className="attach-img-container" href={`https://${attachment.url}`} target='_blank'>
                                    {getImgToDisplay(attachment)}
                                </a>
                                <div className="attachment-content">
                                    <span className="attachment-title">{attachment.name}</span>
                                    <div className="attachment-details">
                                        <span className="created-at">Added {getTime(attachment)}</span>
                                        <span>-</span>
                                        <span className="btn-update-attachment"
                                            onClick={() => onDeleteAttachment(attachment.id)}>Delete</span>
                                        <span>-</span>
                                        <span className="btn-update-attachment"
                                            onClick={(ev) => toggleEditAttachNameModal(ev, attachment)}>Edit</span>
                                    </div>
                                </div>
                            </div>)
                    })}
                    {isEditAttachName && <TaskAttachmentEditName
                        toggleEditAttachNameModal={toggleEditAttachNameModal}
                        attachment={attachmentToEdit}
                        task={task}
                        onUpdateTask={onUpdateTask}
                        editAttachNameModalPos={editAttachNameModalPos} />}
                    <button className="btn-add-attachment" onClick={() => toggleModal('attachment')}>Add an attachment
                    </button>
                </div>
            </section>}
            {taskDetailsModal.isOpen && taskDetailsModal.type === 'attachment' &&
                <TaskModalAttachment
                    toggleModal={toggleModal}
                    onAddAttachment={onAddAttachment} />}
        </React.Fragment>
    )
}