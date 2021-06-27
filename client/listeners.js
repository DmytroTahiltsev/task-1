import {createEditForm} from './forms/edit-form.js'
import {createForm} from './forms/create-form.js'
import {createActiveTable} from './tables/activeTable.js'
import {createSummaryTable} from './tables/summaryTable.js'
import {createArchiveTable} from './tables/archiveTable.js'
import { category, notes } from './data.js'


function setListeners(){
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', (e) => {editButtonListener(e, notes, category)})
    })
    document.querySelectorAll('.archive-button').forEach(button => {
        button.addEventListener('click', (e) => {reArchiveButtonListener(e, true)})
    })
    document.querySelectorAll('.unarchive-button').forEach(button => {
        button.addEventListener('click', (e) => {reArchiveButtonListener(e, false)})
    })
    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', removeButtonListener)
    })
}
function renderEditedTable(createFunction ,selector, parentSelector, notes, category){
    const editedTable = createFunction(notes, category)
    document.querySelector(selector) && document.querySelector(selector).remove()
    document.querySelector(parentSelector).append(editedTable)
}

const editButtonListener = (e, notes, category) => {
    const editListener = (e) => {
        e.preventDefault()
        const form = document.forms.edit

        editedNote.name = form.name.value
        editedNote.category = category.find(item => item.name == form.category.value)
        editedNote.content = form.content.value

        document.querySelector('.edit-form').remove()
        renderEditedTable(createActiveTable ,'.notes-table', '.active-table', notes, category)
        renderEditedTable(createSummaryTable,'.summary-table', '.summary-table__wrapper', notes, category)
        setListeners()

    }
    const id = e.target.dataset.id
    let editedNote = notes.find(item => item.id == id)
    const values = {
        name: editedNote.name,
        content: editedNote.content
    }

    document.querySelector('.edit-form') && document.querySelector('.edit-form').remove()

    const form = createEditForm(category, values)
    document.querySelector('.edit-form__wrapper').append(form)
    document.querySelector('.edit-form__submit').addEventListener('click', editListener)
}

const reArchiveButtonListener = (e, bool) => {
    const id = e.target.dataset.id
    notes.find(item => item.id == id).archived=bool
    renderEditedTable(createActiveTable ,'.notes-table', '.active-table', notes, category)
    renderEditedTable(createSummaryTable,'.summary-table', '.summary-table__wrapper', notes, category)
    renderEditedTable(createArchiveTable,'.archive-table', '.archive-table__wrapper', notes, category)
    setListeners()
}

const removeButtonListener = (e) => {
    const id = e.target.dataset.id
    let removeIndex = notes.findIndex(item => item.id == id)
    notes.splice(removeIndex, 1)
    renderEditedTable(createActiveTable ,'.notes-table', '.active-table', notes, category)
    renderEditedTable(createSummaryTable,'.summary-table', '.summary-table__wrapper', notes, category)
    setListeners()
}

const createButtonListener = (e) => {
    document.querySelector('.create-form') && document.querySelector('.create-form').remove()
    const form = createForm(category)
    document.querySelector('.edit-form__wrapper').append(form)
    document.querySelector('.create-form__submit').addEventListener('click', (e) => {
        e.preventDefault()
        const newNote = {
            id: Date.now(),
            name: form.name.value || 'NAME',
            created: new Date(),
            category: category.find(item => item.name == form.category.value),
            content: form.content.value || "CONTENT",
            archived: false
        }
        notes.push(newNote)
        renderEditedTable(createActiveTable ,'.notes-table', '.active-table', notes)
        renderEditedTable(createSummaryTable,'.summary-table', '.summary-table__wrapper', notes, category)
        renderEditedTable(createSummaryTable,'.summary-table', '.summary-table__wrapper', notes, category)
        setListeners()
        form.remove()
    })
    document.querySelector('.create-form__close').addEventListener('click', () => {
        form.remove()
    })
}



export {createButtonListener, removeButtonListener, reArchiveButtonListener, editButtonListener}