export class UserInfo {
    constructor(public name: string) { }
}

export class User {

    static tokenKey: string = 'user'

    static toObject(json: string): User {
        return <User>JSON.parse(json)
    }

    static toUserInfo(json: string) {
        return <UserInfo>JSON.parse(json)
    }

    constructor(public token: string) { }

    toString(): string {
        return JSON.stringify(this)
    }

}