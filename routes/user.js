import express from "express";
import {
  deleteUser,
  getUserById,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

// Route pour obtenir un user par son ID
router.get("/user/:id_user", getUserById);

// Route pour se connecter
router.post("/user/login", loginUser);

// Route pour ajouter un user
router.post("/user/register", registerUser);

// Route pour ajouter un user
router.put("/user/update/:id_user", updateUser);

// Route pour supprimer un user
router.put("/user/delete/:id_user", deleteUser);

export default router;
