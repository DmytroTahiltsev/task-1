const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function createActiveTable(notes, category){
    function getDates(str){
        const regExpArray = [
            /\s[1-9]\/[1-9]\/\d\d\d\d/,
            /\s[0][1-9]\/[1-9]\/\d\d\d\d/,
            /\s[1-3][0-9]\/[1-9]\/\d\d\d\d/,
            /\s[1-9]\/[0][1-9]\/\d\d\d\d/,
            /\s[0][1-9]\/[0][1-9]\/\d\d\d\d/,
            /\s[1-3][0-9]\/0[1-9]\/\d\d\d\d/,
            /\s[1-9]\/[1][0-2]\/\d\d\d\d/,
            /\s[0][1-9]\/[1][0-2]\/\d\d\d\d/,
            /\s[1-3][0-9]\/[1][0-2]\/\d\d\d\d/
        ]

        let dates =[]
        let i = 0
        let result = regExpArray.reduce((prev, item) =>{
            return prev || str.match(item)
        }, null)
        while(result){
            dates.push(result)
            str = str.slice(result.index + result.length)
            result = regExpArray.reduce((prev, item) =>{
                return prev || str.match(item)
            }, null)
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