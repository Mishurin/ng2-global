export class User {

    static token: string = 'user'

    static toObject(json: string): User {
        return <User>JSON.parse(json)
    }

    constructor(public name: string) { }

    toString() {
        return JSON.stringify(this)
    }

}