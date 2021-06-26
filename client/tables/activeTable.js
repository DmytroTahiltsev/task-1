const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function createActiveTable(notes){
    function getDates(str){
        const regexp = /\d\/\d\/\d\d\d\d/
        let dates =[]
        let i = 0
        /*while(i < str.length){ 
            const result = str.match(regexp)
            if(result){ 
                dates.push(result)
                i+=result.length
                str = str.substring(i, result.length)
                console.log(str)
            }

        }*/
        let result = str.match(regexp)
        while(result){
            dates.push(result)
            str = str.slice(result.index + result.length)
            result = str.match(regexp)
        }

        return dates.join(', ')
    }

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
                    <td class="notes-table__item">${getDates(elem.content)}</td>
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