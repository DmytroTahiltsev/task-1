function createForm(options){
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
    form.classList.add('create-form')
    form.name="create"
        form.innerHTML=`
        <input type="text" name="name" placeholder="input name" value=""> <br>
        <textarea name="content" id="content" cols="30" rows="10" placeholder="input content" ></textarea> <br>
    `
    form.append(createSelect(options))
    form.insertAdjacentHTML('beforeend',`
        <br> <input class="create-form__submit" type="submit" value="Создать">
            <button class="create-form__close">Закрыть</button>

    `)
    return form

}
export {createForm}