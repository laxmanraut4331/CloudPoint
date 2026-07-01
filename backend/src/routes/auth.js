import  { Router } from "express";
import { checkAuth, signup, login, logout,googleAuth } from  "../controllers/auth.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js"; 
const router = Router();


router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.get("/check",isLoggedIn,checkAuth)
router.post("/google", googleAuth);
export default router;  