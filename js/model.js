export default class Model {
    constructor() {
        this.view = null
        this.toDos = JSON.parse(localStorage.getItem('toDos'))
        if(!this.toDos || this.toDos.length < 1) {
            this.toDos = [
                {
                    id: 0, 
                    title: 'Example',
                    description: 'This is a To-Do Example',
                    completed: false
                }
            ]
            this.currentId = 1
        } else
            this.currentId = this.toDos[this.toDos.length - 1].id + 1
    }

    setView(view) {
        this.view = view
    }

    save() {
        localStorage.setItem('toDos', JSON.stringify(this.toDos))
    }

    getToDos() {
        // Devolvemos una copia de la lista de toDos, para evitar problemas de referencias
        return this.toDos.map((toDo) => ({...toDo})) 
    }

    findToDo(id) {
        return this.toDos.findIndex((toDo) => toDo.id === id)
    }

    toggleCompleted(id) {
        const index = this.findToDo(id)
        const toDo = this.toDos[index]
        toDo.completed = !toDo.completed
        console.log(this.toDos)

        this.save()
    }

    editToDo(id, values) {
        const index = this.findToDo(id)
        Object.assign(this.toDos[index], values) // Actualiza los valores en nuestro objeto
        this.save()
    }

    addToDo(title, description) {
        // Si una propiedad se llama igual que su valor, podemos dejar solamente el valor
        const toDo = {
            id: this.currentId++, 
            title,
            description, 
            completed: false
        }

        this.toDos.push(toDo)
        console.log(this.toDos)

        this.save()
    
        // Retornamos un objeto que expanda las propiedades del objeto toDo para que nadie las pueda modificar despues
        return {... toDo}
    }

    removeToDo(id) {
        const index = this.findToDo(id)
        this.toDos.splice(index, 1)

        this.save()
    }
}