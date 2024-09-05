import { User } from "../entities/User";
interface APIUserRepositoryProps{
    token:string,
}

export class APIUserRepository{ 
    private token: string;

    constructor({token}: APIUserRepositoryProps){
        this.token = token;
    }
    async getUserInfo():Promise<User>{
        const res = await fetch("http://localhost:1337/v1/user/kyc", {
            headers:{
                'Authorization': `Bearer ${this.token}`
            }
        });
        if (!res.ok){
            throw new Error("Failed to fetch info");
        }
        return res.json();
    }

}