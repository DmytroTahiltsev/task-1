const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function createActiveTable(notes, category){
    function getDates(str){
        const regexp1 = /\s[1-9]\/[1-9]\/\d\d\d\d/
        const regexp2 = /\s[0][1-9]\/[1-9]\/\d\d\d\d/
        const regexp3 = /\s[1-3][0-9]\/[1-9]\/\d\d\d\d/
        const regexp4 = /\s[1-9]\/[0][1-9]\/\d\d\d\d/
        const regexp5 = /\s[0][1-9]\/[0][1-9]\/\d\d\d\d/
        const regexp6 = /\s[1-3][0-9]\/0[1-9]\/\d\d\d\d/
        const regexp7 = /\s[1-9]\/[1][0-2]\/\d\d\d\d/
        const regexp8 = /\s[0][1-9]\/[1][0-2]\/\d\d\d\d/
        const regexp9 = /\s[1-3][0-9]\/[1][0-2]\/\d\d\d\d/

        let dates =[]
        let i = 0
        let result = str.match(regexp1) || str.match(regexp2) || str.match(regexp3) || str.match(regexp4) || str.match(regexp5) || str.match(regexp6) || str.match(regexp7) || str.match(regexp8) || str.match(regexp9)
        while(result){
            dates.push(result)
            str = str.slice(result.index + result.length)
            result = str.match(regexp1) || str.match(regexp2) || str.match(regexp3) || str.match(regexp4) || str.match(regexp5) || str.match(regexp6) || str.match(regexp7) || str.match(regexp8) || str.match(regexp9)
        }

        return dates.join(',')

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
                <tr class="table__row">
                    <td class="table__item">${elem.name}</td>
                    <td class="table__item">${monthNames[elem.created.getMonth()]} ${elem.created.getDate()}, ${elem.created.getFullYear()}</td>
                    <td class="table__item">${elem.category.name}</td>
                    <td class="table__item">${elem.content}</td>
                    <td class="table__item">${getDates(elem.content)}</td>
                    <td class="table__item">
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
export {createActiveTable}