const { displayError, clearErrors } = require('./messages')

const PhotosUpload = {
    input: "",
    previewRecipe: document.querySelector('.recipe-creation-edition-fields'), 
    previewChef: document.querySelector('.admin-chef-photos-preview'),
    upLoadLimit: 5,
    files: [],
    AddRecipePhoto(event){

        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if(PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {
            PhotosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.previewRecipe.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    addChefAvatar(event){
        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if(PhotosUpload.hasChefLimit(event)) return

        Array.from(fileList).forEach(file => {
            PhotosUpload.files.push(file)
            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getChefPhotoContainer(image)

                PhotosUpload.previewChef.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event){
        const { upLoadLimit, input, previewRecipe } = PhotosUpload
        const { files: fileList } = input

        if(fileList.length > upLoadLimit) {
            event.preventDefault()

            displayError(`Envie no máximo ${upLoadLimit} fotos.`)
            clearErrors()
            return true
        }

        const photosDiv = []
        previewRecipe.childNodes.forEach(item => {
            if (item.classList && item.classList.value == "photo-box")
                photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length
        if(totalPhotos > upLoadLimit) {
            event.preventDefault()

            displayError(`Envie no máximo ${upLoadLimit} fotos.`)
            clearErrors()

            return true
        }

        return false
    },
    hasChefLimit(event){
        const chefUploadLimit = 1
        const { input, previewChef } = PhotosUpload
        const { files: fileList } = input

        if(fileList.length > chefUploadLimit) {
            event.preventDefault()

            displayError(`Envie no máximo ${chefUploadLimit} fotos.`)
            clearErrors()

            return true
        }

        const photosDiv = []
        previewChef.childNodes.forEach(item => {
            if (item.classList && item.classList.value == "chef-avatar")
                photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length
        if(totalPhotos > chefUploadLimit) {
            event.preventDefault()

            displayError(`Envie no máximo ${chefUploadLimit} fotos.`)
            clearErrors()
            
            return true
        }

        return false
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    },
    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photo-box')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getChefPhotoContainer(image) {
        const div = document.createElement('div')
        div.classList.add('chef-avatar')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removeChefPhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getRemoveButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode 
        const photosArray = Array.from(PhotosUpload.previewRecipe.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()
    },
    removeChefPhoto(event) {
        const photoDiv = event.target.parentNode 
        const photosArray = Array.from(PhotosUpload.previewChef.children) 
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()
    },
    removeOldPhoto(event) {
        const photoDiv = event.target.parentNode

        if(photoDiv.id){
            const removedFiles = document.querySelector('input[name="removed_files"]')

            if(removedFiles){
                removedFiles.value += `${photoDiv.id},`
            }
        }
        photoDiv.remove()
    }
}
