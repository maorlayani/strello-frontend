import { useEffect, useState } from "react"
import closeIcon from '../../../assets/img/icon-close-task-details.svg'
import { boardService } from "../../../services/board.service"

export const TaskDetailsCoverModal = ({ toggleModal, task, onUpdateTask }) => {

    const [backgroundImages, setBackgroundImages] = useState([])
    const [backgroundColors, setBackgroundColors] = useState([])

    useEffect(() => {
        loadBackGround()
    }, [])

    const loadBackGround = () => {
        setBackgroundImages(boardService.getTaskBackground('url'))
        setBackgroundColors(boardService.getTaskBackground('color'))
    }

    const onSetColor = (newColor) => {
        if (!task.style) task.style = { bg: { color: newColor } }
        else task.style.bg.color = newColor
        task.style.bg.imgUrl = null
        onUpdateTask(task)
    }

    const onSetImg = (img) => {
        if (!task.style) task.style = { bg: { imgUrl: img.thumbUrl } }
        else task.style.bg.imgUrl = img.thumbUrl
        task.style.bg.color = null
        onUpdateTask(task)
    }

    const onRemoveCover = () => {
        delete task.style
        onUpdateTask(task)
        toggleModal()
    }

    const attacmentToDisplayAsCover = (attachments) => {
        if (!attachments) return []
        const attacmentToDisplay = attachments.filter(attach => (/\.(jpeg|jpg|png|gif)\b/i).test(attach.url))
        if (attacmentToDisplay) return []
        return attacmentToDisplay
    }

    return (
        <section className="cover-modal">
            <img src={closeIcon} onClick={toggleModal} alt="close" className="close-btn" />
            <div className="cover-modal-title">Cover</div>
            <button className="btn-remove" onClick={onRemoveCover}>Remove cover</button>

            <section>
                <span className="sub-title">Colors</span>
                <ul className="cover-color">
                    {backgroundColors.map(color =>
                        <li className="cover-color-container" key={color}>
                            <div onClick={() => onSetColor(color)} className="cover-color" style={{ backgroundColor: color }} />
                        </li>
                    )}
                </ul>
            </section>

            {attacmentToDisplayAsCover(task.attachments).length > 0 &&
                <section>
                    <span className="sub-title">Attachments</span>
                    <ul className="cover-imgs">
                        {attacmentToDisplayAsCover(task.attachments).map(attach =>
                            <li className="cover-img-container" key={attach.id}>
                                <img className="cover-img" alt="cover-img" src={`${attach.url}`} onClick={() => onSetImg(attach.url)}></img>
                            </li>
                        )}
                    </ul>
                </section>}

            <section>
                <span className="sub-title">Photos</span>
                <ul className="cover-imgs">
                    {backgroundImages.map(img =>
                        <li className="cover-img-container" key={img.thumbUrl}>
                            <img className="cover-img" src={`${img.thumbUrl}`} onClick={() => onSetImg(img)}></img>
                        </li>
                    )}
                </ul>
            </section>
        </section>
    )
}