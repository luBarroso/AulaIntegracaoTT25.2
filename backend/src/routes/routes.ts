import passport from "passport";
import { Router } from "express";
import bookController from "../controllers/bookController";
import multer from "multer";
import authController from "../controllers/authController";

const router = Router();

/* const upload = multer({ storage: storage }); */
// Permite que o acesso aos arquivos armazenados na pasta uploads no servidor
const upload = multer({ dest: "uploads/" });

/* ============= AUTH ROUTES ============= */
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get(
  "/getData",
  passport.authenticate("jwt", { session: false }),
  authController.getData
);

/* ============= POST ROUTES ============= */
router.post(
  "/book",
  passport.authenticate("jwt", { session: false }),
  bookController.createBook
);
router.get(
  "/book/:id",
  passport.authenticate("jwt", { session: false }),
  bookController.getBook
);
router.get("/books", bookController.getBooks);

export default router;
