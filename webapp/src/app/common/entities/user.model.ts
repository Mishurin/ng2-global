export class User {

    static tokenKey: string = 'user'

    static toObject(json: string): User {
        return <User>JSON.parse(json)
    }

    constructor(public token: string) { }

    toString(): string {
        return JSON.stringify(this)
    }

}