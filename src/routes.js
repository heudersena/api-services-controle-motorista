const router = require("express").Router();

const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const CnhController = require("./controllers/CnhController");
const CondutorController = require("./controllers/CondutorController");
const BlsController = require("./controllers/BlsController");
const CveController = require("./controllers/CveController");

const AuthMiddleware = require("./middlewares/AuthMiddleware");

// Users
router.get("/user", AuthMiddleware, UserController.index);
router.post("/user", UserController.store);
router.patch("/user/:id/update", AuthMiddleware, UserController.update);
router.delete("/user/:id/delete", AuthMiddleware, UserController.delete);

// Sessions
router.post("/session/create", SessionController.create);
router.get("/cliente_token", AuthMiddleware, SessionController.create);

// Cnh
router.get("/cnh", AuthMiddleware, CnhController.index);
router.post("/cnh", AuthMiddleware, CnhController.store);
router.post("/cnh/user/register", AuthMiddleware, CnhController.get_register);

// Condutores
router.get("/condutor/todos", AuthMiddleware, CondutorController.listAll);
router.get("/condutor", AuthMiddleware, CondutorController.index);
router.post("/condutor", AuthMiddleware, CondutorController.store);

// Bls
router.post("/bls", AuthMiddleware, BlsController.store);
router.post("/bls/user/register", AuthMiddleware, BlsController.get_register);

// Cve
router.post("/cve", AuthMiddleware, CveController.store);
router.post("/cve/user/register", AuthMiddleware, CveController.get_register);

module.exports = router;
