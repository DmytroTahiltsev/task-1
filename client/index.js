import {createButtonListener, removeButtonListener, reArchiveButtonListener, editButtonListener} from './listeners.js'
import {createActiveTable} from './tables/activeTable.js'
import {createSummaryTable} from './tables/summaryTable.js'
import {createArchiveTable} from './tables/archiveTable.js'
import { category, notes } from './data.js'


const activeTable = createActiveTable(notes)
const summaryTable = createSummaryTable(notes, category)
const archiveTable = createArchiveTable(notes)
document.querySelector('.active-table').append(activeTable)
document.querySelector('.summary-table__wrapper').append(summaryTable)
document.querySelector('.archive-table__wrapper').append(archiveTable)

document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', (e) => {editButtonListener(e, notes, category)})    
})

document.querySelectorAll('.remove-button').forEach(button => {
    button.addEventListener('click', removeButtonListener)
})

document.querySelectorAll('.archive-button').forEach(button => {
    button.addEventListener('click', (e) => {reArchiveButtonListener(e, true)})    
})

document.querySelectorAll('.unarchive-button').forEach(button => {
    button.addEventListener('click', (e) => {reArchiveButtonListener(e, false)})    
})

document.querySelector('.create-button').addEventListener('click', createButtonListener)





