import AuthController from "../controller/AuthController";
import UserController from "../controller/UserController";
import {Router} from 'express'
import * as passport from 'passport'

const router = Router();


const publicRoutes = [{
    route: "/auth",
    controller: AuthController,
}];


const privateRoutes = [{
    route: "/user",
    controller: UserController,
}];


publicRoutes.map(({route,controller})=>{
    router.use(route,controller())
})

privateRoutes.map(({route,controller})=>{
    router.use(route,passport.authenticate('jwt', { session: false }),controller())
});


export default router;