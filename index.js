function renderEditedTable(createFunction ,selector, parentSelector, data){
    const editedTable = createFunction(data)
    document.querySelector(selector) && document.querySelector(selector).remove()
    document.querySelector(parentSelector).append(editedTable)
}




const category = [
    {name: 'Task', activeCount: 0, archiveCount: 0},
    {name:'Random Thought', activeCount: 0, archiveCount: 0},
    {name:'Idea', activeCount: 0, archiveCount: 0}
]
let notes = [
    {id: 1, name: 'Shopping list', created: new Date(2021, 3, 21), category: category[0], content: 'Tomatoes, bread', archived: false},
    {id: 2, name: 'The theory of evolution', created: new Date(2021, 3, 27), category: category[1], content: 'The evolution is good thing', archived: false},
    {id: 3, name: 'New Feature', created: new Date(2021, 4, 5), category: category[2], content: 'Implement new feature', archived: false},
    {id: 4, name: 'William Gaddis', created: new Date(2021, 4, 7), category: category[2], content: 'Power doesnt context', archived: false},
    {id: 5, name: 'Books', created: new Date(2021, 4, 15), category: category[0], content: 'The Lean Startup', archived: false},
    {id: 6, name: 'Note 6', created: new Date(2021, 4, 30), category: category[0], content: 'Note 6 content', archived: false},
    {id: 7, name: 'Note 7', created: new Date(2021, 5, 2), category: category[1], content: 'Note 7 content', archived: true},
]
console.log(notes)
const activeTable = createActiveTable(notes)
const summaryTable = createSummaryTable(category)



document.querySelector('.active-table').append(activeTable)
document.querySelector('.summary-table__wrapper').append(summaryTable)


document.querySelectorAll('.edit-button').forEach(button => {
    const buttonListener = (e) => {
        const editListener = (e) => {
            e.preventDefault()
            const form = document.forms.edit

            editedNote.name = form.name.value
            editedNote.category = category.find(item => item.name == form.category.value)
            editedNote.content = form.content.value

            document.querySelector('.edit-form').remove()
            renderEditedTable(createActiveTable ,'.notes-table', '.active-table', notes)
            renderEditedTable(createSummaryTable,'.summary-table', '.summary-table__wrapper', category)
            document.querySelectorAll('.edit-button').forEach(button => {
                button.addEventListener('click', buttonListener)
            })

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
    button.addEventListener('click', buttonListener)    
})

document.querySelectorAll('.remove-button').forEach(button => {
    const buttonListener = (e) => {
        const id = e.target.dataset.id
        let removeIndex = notes.findIndex(item => item.id == id)
        notes.splice(removeIndex, 1)
        renderEditedTable(createActiveTable ,'.notes-table', '.active-table', notes)
        renderEditedTable(createSummaryTable,'.summary-table', '.summary-table__wrapper', category)
        document.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', buttonListener)
        })
    }
    button.addEventListener('click', buttonListener)
})




