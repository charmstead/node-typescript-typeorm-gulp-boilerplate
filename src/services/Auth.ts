import Account from '../entity/Account'
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import CONFIG from '../config'


export const Login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { email, password } = req.body;

    if (!(email && password)) {
        return res.status(401).send("Wrong username or password");
    }

    //Get user from database
    let account: Account;
    try {
        account = await Account.findOneOrFail({ where: { email },select:["password","email","roles","id"]});

    } catch (error) {
        return res.status(401).send("Wrong username or password");
    }

    //Check if encrypted password match
    if (!account.checkIfUnencryptedPasswordIsValid(password)) {
        res.status(401).send("Wrong password");
        return;
    }

    //sign JWT, valid for 1 hour
    const token = jwt.sign(
        { id: account.id, email: account.email,roles:account.roles },
        CONFIG.jwtSecret,
        { expiresIn: "1h" }
    );

    //Send the jwt in the response
    return res.send({
        access_token:token,
        token_type:'Bearer',
        expires_in:60*60*60,
    });
};