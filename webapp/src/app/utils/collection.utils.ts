export function getIndexById<T>(id: number, collection: T[]): number {
    let collectionIndex = null

    collection.forEach((item: any, index) => {
        if (item.id === id) {
            collectionIndex = index
            return
        }
    })

    return collectionIndex
}