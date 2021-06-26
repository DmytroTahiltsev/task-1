const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function createActiveTable(notes){
    const activeTable = document.createElement('table')
    activeTable.classList.add('notes-table')
    activeTable.innerHTML=`
        <th>Name</th>
        <th>Created</th>
        <th>Category</th>
        <th>Content</th>
        <th>Dates</th>
    `
    for(let elem of notes){
        if(!elem.archived){
            activeTable.insertAdjacentHTML('beforeend', `
                <tr class="notes-table__row">
                    <td class="notes-table__item">${elem.name}</td>
                    <td class="notes-table__item">${monthNames[elem.created.getMonth()]} ${elem.created.getDate()}, ${elem.created.getFullYear()}</td>
                    <td class="notes-table__item">${elem.category.name}</td>
                    <td class="notes-table__item">${elem.content}</td>
                    <td class="notes-table__item">                  </td>
                    <td class="notes-table__item">
                        <button class="edit-button" data-id=${elem.id}>Редактировать</button>
                        <button class="archive-button" data-id=${elem.id}>Архивировать</button>
                        <button class="remove-button" data-id=${elem.id}>Удалить</button>
                    </td>
                </tr>
            `)
        }
    }
    return activeTable
}