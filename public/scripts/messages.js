module.exports = {

    displayError(error) {
        const messageError = document.createElement('div')
        messageError.classList.add('messages', 'error')
        messageError.innerHTML = error
        document.querySelector('body').appendChild(messageError)
    },

    async clearErrors() {
        const errorDiv = document.querySelector('.messages.error')
        await new Promise(r => setTimeout(r, 2000))
        if (errorDiv)
            errorDiv.remove()
    }
}


