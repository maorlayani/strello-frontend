import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadBoards, updateBoard } from '../store/board.actions'
import { useState } from 'react'
import { BoardEdit } from '../cmps/board-edit'
import { HiOutlineStar, HiStar } from 'react-icons/hi'
import { Loader } from '../cmps/loader'

export function BoardPage() {

    const boards = useSelector(state => state.boardModule.boards)
    const [isModalNewBoard, setIsModalNewBoard] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadBoards())
    }, [])

    const getBoardBg = (board) => {
        let style = {}
        if (board.style?.imgUrl) {
            if (board.style?.thumbUrl) style.backgroundImage = `url(${board.style.thumbUrl})`
            else style.backgroundImage = `url(${board.style.imgUrl})`
        } else style = { backgroundColor: board.style.bgColor }
        return style
    }

    const toggleCreateBoardModal = () => {
        setIsModalNewBoard(!isModalNewBoard)
    }

    const filterBoardsByStarred = () => {
        return boards.filter(board => board.isStarred)
    }

    const toggleStarredBoard = (ev, board) => {
        ev.preventDefault()
        ev.stopPropagation()
        board.isStarred = !board.isStarred
        dispatch(updateBoard(board))
    }

    if (!boards) return <Loader />
    return (
        <div className="board-page ">

            <div className="board-list-container">
                {filterBoardsByStarred()[0] && <div className="board-list-title">
                    <span className="board-list-title-icon"></span>
                    <h3>Starred boards</h3>
                </div>}
                <ul className="board-list">
                    {filterBoardsByStarred().map(board => {
                        return <Link
                            to={`/board/${board._id}`}
                            key={board._id}>
                            <li className="board-preview" style={getBoardBg(board)}>
                                <div className="board-preview-content">
                                    <div className="board-title">{board.title}</div>
                                    <div className="star marked"
                                        onClick={(ev) => toggleStarredBoard(ev, board)}>
                                        <HiStar />
                                    </div>
                                </div>
                            </li>
                        </Link>
                    })}
                </ul>
            </div>

            <div className="board-list-container ">
                <div className="board-list-title">
                    <span className="board-list-title-icon"></span>
                    <h3>Your boards</h3>
                </div>
                <ul className="board-list">
                    {boards.map(board => {
                        return <Link
                            to={`/board/${board._id}`}
                            key={board._id}>
                            <li className="board-preview" style={getBoardBg(board)}>
                                <div className="board-preview-content">
                                    <div className="board-title">{board.title}</div>
                                    {board.isStarred &&
                                        <div
                                            className="star marked"
                                            onClick={(ev) => toggleStarredBoard(ev, board)}>
                                            <HiStar />
                                        </div>}
                                    {!board.isStarred &&
                                        <div
                                            className="star"
                                            onClick={(ev) => toggleStarredBoard(ev, board)}>
                                            <HiOutlineStar />
                                        </div>}
                                </div>
                            </li>
                        </Link>
                    })}

                    <li className="board-preview full" onClick={toggleCreateBoardModal}>
                        <div className="board-preview-content full">
                            <div className="board-title create-new"><span>Create new board</span></div>
                        </div>
                    </li>

                </ul>
            </div>
            {isModalNewBoard && <BoardEdit toggleCreateBoardModal={toggleCreateBoardModal} />}
        </div >
    )
}