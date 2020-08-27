const { displayError, clearErrors } = require('./messages')

function createNewInput({ inputName, placeholder, parentDivClass }) {
    const new_input = document.createElement('input')
    new_input.name = inputName
    new_input.placeholder = placeholder
    document.querySelector(parentDivClass).appendChild(new_input)
}

const AddNewInputField = {
    apply(func){
        setTimeout(function() {
            AddNewInputField[func]()
        }, 1)
    },
    addIngredient() {
        const ingredientsFields = document.querySelectorAll('input[name="ingredients"]')
        const lastIngredientField = ingredientsFields[ingredientsFields.length - 1].value

        if(lastIngredientField == ''){
            displayError('Você já possui um campo vazio para adicionar um ingrediente!')
            clearErrors()

        } else {

            const fields = {
                inputName: 'ingredients',
                placeholder: 'Adicione um novo ingrediente',
                parentDivClass: '.ingredients'
            }
            createNewInput(fields)
        }
    },
    addPreparation() {
        const preparationField = document.querySelectorAll('input[name="preparation"]')
        const lastPreparationField = preparationField[preparationField.length - 1].value

        if(lastPreparationField == ''){
            displayError("Você já possui um campo vazio!")
            clearErrors()
        } else {

            const fields = {
                inputName: 'preparation',
                placeholder: 'Adicione um novo passo na preparação',
                parentDivClass: '.preparation-fields'
            }
            createNewInput(fields)
        }
    }
}