import { NextFunction, Request, Response, Router } from "express";
import Account from "../entity/Account";
import {Login} from '../services/Auth'
import { validate } from 'class-validator'



export default () => {

    let router = Router();

    router.post('/register', async (req: Request, res: Response, next: NextFunction) => {

        const { email, password } = req.body;
        const user = { email, password };
        const errors = await validate(user);

        if (errors.length > 0) {
            return res.status(400).send(errors);
        }
        const account = Account.create(user).hashPassword();

        try {
            await account.save();
        } catch (e) {
            return res.status(409).send("Email address already in use");
        }

        res.status(201).send("User registration successful");
    });



    router.post('/login', Login);

    return router;
}
