import 'core-js'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { boardService } from '../services/board.service'
import {
    addBoard,
    loadBoards,
    getBoard,
    removeBoard,
    updateBoard,
    toggleQuickEdit,
    resizeLabel,
    setTaskDetailsModal,
    addGroup,
    removeGroup,
    setBoardBackgroundColor
} from './board.actions'
jest.mock('../services/board.service')

describe.skip('Board actions', () => {
    let mockStore, store
    const mockBoard = {
        "_id": "B101",
        "title": "Company Overview",
        "isStarred": false,
        "createdAt": 1664380690416,
        "createdBy": {
            "_id": "u101",
            "fullname": "Maor Layani",
            "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
        },
        "style": {
            "bgColor": "#0079bf",
            "imgUrl": null,
            "thumbUrl": null
        },
        "activities": [
            {
                "txt": "created this board",
                "task": {
                    "task": "",
                    "title": ""
                },
                "id": "uNJDlX",
                "createdAt": 1664381690416.0,
                "byMember": {
                    "_id": "63343b65c6b5a26b005fdacc",
                    "fullname": "Risan Benichou",
                    "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03KXR3PJD9-80fc7c6ab3fb-512"
                }
            }
        ],
        "labels": [
            {
                "id": "l101",
                "title": "",
                "color": "#7BC86C"
            }
        ],
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            }
        ],
        "groups": []
    }

    beforeEach(() => {
        const middlewares = [thunk]
        mockStore = configureMockStore(middlewares)
        store = mockStore({})
    })
    describe('board CRUDL', () => {
        it('creates SET_BOARD when call getBoard function', async () => {
            expect.assertions(1)
            const httpResp = mockBoard
            boardService.getById.mockResolvedValue(httpResp)
            await store.dispatch(loadBoards({}))

            const action = store.getActions()[0]
            expect(action.type).toBe('SET_BOARDS')
        })
        it('creates SET_BOARDS when call loadBoard function', async () => {
            expect.assertions(1)
            const httpResp = mockBoard
            boardService.query.mockResolvedValue(httpResp)
            await store.dispatch(getBoard(httpResp._id))

            const action = store.getActions()[0]
            expect(action.type).toBe('SET_BOARD')
        })
        it('creates REMOVE_BOARD when user delete Board', async () => {
            expect.assertions(1)
            const httpResp = { msg: 'Removed succesfully' }
            boardService.remove.mockResolvedValue(httpResp)
            await store.dispatch(removeBoard(mockBoard._id))

            const action = store.getActions()[0]
            expect(action.type).toBe('REMOVE_BOARD')
        })
        it('creates ADD_BOARD when user add new board to workspace', async () => {
            expect.assertions(1)
            const httpResp = mockBoard
            boardService.save.mockResolvedValue(httpResp)
            await store.dispatch(addBoard(httpResp))

            const action = store.getActions()[0]
            expect(action.type).toBe('ADD_BOARD')
        })
        it('creates UPDATE_BOARD when user update board', async () => {
            expect.assertions(1)
            const httpResp = mockBoard
            boardService.save.mockResolvedValue(httpResp)
            await store.dispatch(updateBoard(httpResp))

            const action = store.getActions()[0]
            expect(action.type).toBe('UPDATE_BOARD')
        })
    })
    describe('group CRUD', () => {
        it('creates UPDATE_BOARD when user add group', async () => {
            expect.assertions(1)
            const httpResp = mockBoard
            boardService.addGroupToBoard.mockResolvedValue(httpResp)
            await store.dispatch(addGroup(httpResp))

            const action = store.getActions()[0]
            expect(action.type).toBe('UPDATE_BOARD')
        })
        it('creates UPDATE_BOARD when user delete group', async () => {
            expect.assertions(1)
            const httpResp = mockBoard
            boardService.removeGroupFromBoard.mockResolvedValue(httpResp)
            await store.dispatch(removeGroup(httpResp))

            const action = store.getActions()[0]
            expect(action.type).toBe('UPDATE_BOARD')
        })
    })
    describe('general actions', () => {
        it('creates SET_TASK_DETAILS_MODAL when user open task details/quick edit screens', () => {
            expect.assertions(1)
            store.dispatch(setTaskDetailsModal({ isOpen: true, type: 'cover' }))

            const action = store.getActions()[0]
            expect(action.type).toBe('SET_TASK_DETAILS_MODAL')
        })
        it('creates TOGGALE_TASK_QUICK_EDIT when user open/close task quick edit screen', async () => {
            expect.assertions(1)
            await store.dispatch(toggleQuickEdit(true))

            const action = store.getActions()[0]
            expect(action.type).toBe('TOGGALE_TASK_QUICK_EDIT')
        })
        it('creates SET_BOARD_THEME_COLOR when user choose board', async () => {
            expect.assertions(1)
            await store.dispatch(setBoardBackgroundColor('#0079bf'))

            const action = store.getActions()[0]
            expect(action.type).toBe('SET_BOARD_THEME_COLOR')
        })
        it('creates RESIZE_LABEL when user click on label displayed in task preview', () => {
            expect.assertions(1)
            store.dispatch(resizeLabel(true))

            const action = store.getActions()[0]
            expect(action.type).toBe('RESIZE_LABEL')
        })
    })
})