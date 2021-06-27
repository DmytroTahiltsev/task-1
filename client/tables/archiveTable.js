function createArchiveTable(notes){
    const archiveTable = document.createElement('table')
    let countNotes = 0
    archiveTable.classList.add('archive-table')
    archiveTable.innerHTML=`
        <caption>Archived notes</caption>
        <th>Name</th>
        <th>Content</th>
    `
    for(let elem of notes){
        if(elem.archived){
            archiveTable.insertAdjacentHTML('beforeend', `
                <tr class="table__row">
                    <td class="table__item">${elem.name}</td>
                    <td class="table__item">${elem.content}</td>
                    <td class="table__item">
                        <button class="unarchive-button" data-id=${elem.id}>Разархивировать</button>
                    </td>
                </tr>
            `)
            countNotes++
        }
    }
    if(!countNotes){
        return ''
    }
    return archiveTable
}
export {createArchiveTable}