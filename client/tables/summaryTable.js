 function createSummaryTable(notes, category){
    const summaryTable = document.createElement('table')
    summaryTable.classList.add('summary-table')
    summaryTable.innerHTML=`
        <th>Note Category</th>
        <th>Active</th>
        <th>Archieved</th>
    `
    category.forEach(item => {
        item.activeCount=0
        item.archiveCount=0
    })
    notes.forEach(item => {
        if(!item.archived){
            item.category.activeCount++
        }
        if(item.archived){
            item.category.archiveCount++
        }
    })

    for(let elem of category){
        summaryTable.insertAdjacentHTML('beforeend', `
            <tr class="table__row">
                <td class="table__item">${elem.name}</td>
                <td class="table__item">${elem.activeCount}</td>
                <td class="table__item">${elem.archiveCount}</td>
            </tr>
        `)
    }
    return summaryTable
}
export {createSummaryTable}



