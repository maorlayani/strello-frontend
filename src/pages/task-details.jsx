
import { useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { TaskDetailsCoverModal } from "../cmps/task-details-cover-modal"
import { taskService } from "../services/task.service"
import { utilService } from "../services/util.service"
// import {  } from 'react-icons';


export const TaskDetails = ({ props }) => {

    const params = useParams()
    const navigate = useNavigate()

    const [task, setTask] = useState(null)
    const [bgColor, setBgColor] = useState('blue')
    const [showModal, setShowModal] = useState(null)
    const [imgName, setImgName] = useState(null)
    const [coverImg, setCoverImg] = useState(null)
    // const [activities, setActivities] = useState(null)

    // const coverImg = useRef(false);

    useEffect(() => {
        const id = params.id
        // console.log('props', props);
        // const id = props
        console.log('id', id);
        if (!id) return
        taskService.getById(id)
            .then(task => setTask(task))

        // activityService.query({ taskId: id })
        // .then(activity => setActivities(activity))
    }, [])

    const onBack = () => {
        navigate('/')
    }

    const onSetColor = (ev) => {
        console.log('ev', ev.target.value);
        setBgColor(ev.target.value)
        // coverImg.current=false
        setCoverImg(false)
    }

    const onShowModal = () => {
        // showModal.current=!showModal.current
        setShowModal(!showModal)
    }

    const onSetImg = (ev) => {
        console.log('ev', ev.target.value);
        setImgName(ev.target.value)
        // coverImg.current=true
        setCoverImg(true)
    }

    console.log('coverImg', coverImg);
    if (!task) return <div>Loading...</div>
    return (
        <section className="task-details-container">
            <section style={{ backgroundColor: bgColor }} className="task-cover">
                <button onClick={onBack} className="btn close">x</button>
                {coverImg && <img src={require(`../assets/img/${imgName}.jpg`)} alt="Cover" />}
                <button onClick={onShowModal} className="btn close">Cover</button>
                {showModal && <TaskDetailsCoverModal onSetColor={onSetColor} onSetImg={onSetImg} className="cover-modal" />}
            </section>
            <section className="task-details">
                <h1>{task.title}</h1>
                <h4>Members</h4>
                <h1>Description</h1>
                <h2>{task.description}</h2>
                {/* <p> {task.createdBy} added this card</p> */}
            </section>

            <section className="task-abilities">
                <button className="btn close">Members</button>
                <button className="btn close">Labels</button>
                <button className="btn close">Checklist</button>
                <button className="btn close">Dates</button>
                <button className="btn close">Attachment</button>
            </section>

            {/* {activities && <section className="tasks-activities">
                {activities.map(activity => (
                    <article key={activity.id}>
                        <h3>{activity.txt}</h3>
                        <h3>{activity.byMember.fullname}</h3>
                        <p> {(new Date(activity.createdAt)).toLocaleDateString('en-US')}</p>
                        
                    </article>
                ))}
            </section>} */}

        </section>
    )
}

// {
//     "id": "c104",
//     "title": "Help me",
//     "status": "in-progress",
//     "description": "description",
//     "comments": [
//         {
//             "id": "ZdPnm",
//             "txt": "also @yaronb please CR this",
//             "createdAt": 1590999817436.0,
//             "byMember": {
//                 "_id": "u101",
//                 "fullname": "Tal Tarablus",
//                 "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//             }
//         }
//     ],
//     "checklists": [
//         {
//             "id": "YEhmF",
//             "title": "Checklist",
//             "todos": [
//                 {
//                     "id": "212jX",
//                     "title": "To Do 1",
//                     "isDone": false
//                 }
//             ]
//         }
//     ],
//     "memberIds": ["u101"],
//     "labelIds": ["l101", "l102"],
//     "createdAt": 1590999730348,
//     "dueDate": 16156215211,
//     "byMember": {
//         "_id": "u101",
//         "username": "Tal",
//         "fullname": "Tal Tarablus",
//         "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
//     },
//     "style": {
//         "bgColor": "#26de81"
//     }
// }
// ],
// "style": {}
// }
// ],
// "activities": [
// {
// "id": "a101",
// "txt": "Changed Color",
// "createdAt": 154514,
// "byMember": {
// "_id": "u101",
// "fullname": "Abi Abambi",
// "imgUrl": "http://some-img"
// },
// "task": {
// "id": "c101",
// "title": "Replace Logo"
// }
// }
// ]