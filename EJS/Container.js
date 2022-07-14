class Container {
    constructor() {
        this.array = []
    }

    getAllItems() {
        return this.array
    }

    getItemById(id) {
        const index = this.array.findIndex(item => item.id === id)
        if (index === -1)
            return null

        return this.array[index]
    }

    add(item) {
        const currentLength = this.array.length
        item.id = currentLength === 0 ? 1 : this.array[currentLength - 1].id + 1
        this.array.push(item)

        return item
    }

    modifyItemById(id, newData) {
        const index = this.array.findIndex(item => item.id === id)
        if (index === -1)
            return null

        this.array[index].title = newData.title
        this.array[index].price = newData.price
        this.array[index].thumbnail = newData.thumbnail

        return this.array[index]
    }

    deleteItemById(id) {
        const index = this.array.findIndex(item => item.id === id)
        if (index === -1)
            return null

        return this.array.splice(index, 1)[0]
    }
}

export default Container