function createEditForm(options, values){
    function createSelect(options){
        const select = document.createElement('select')
        select.name="category"
        for(let option of options){
            select.insertAdjacentHTML('beforeend',`
                <option value="${option.name}">${option.name}</option>
            `)
        }
        return select
    }
    const form = document.createElement('form')
    form.classList.add('edit-form')
    form.name="edit"
    form.innerHTML=`
        <input type="text" name="name" placeholder="input new name" value="${values.name}"> <br>
        <textarea name="content" id="content" cols="30" rows="10" placeholder="input new content" >${values.content}</textarea> <br>
    `
    form.append(createSelect(options))
    form.insertAdjacentHTML('beforeend',`
        <br> <input class="edit-form__submit" type="submit" value="Редактировать">
    `)
    return form
}
export {createEditForm}
