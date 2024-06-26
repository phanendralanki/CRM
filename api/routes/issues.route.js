import {Router} from 'express';
import {createIssue, deleteIssue, getAllIssues} from "../controllers/issues.controller.js";

const router = Router();

// GET ROUTERS
router.route('/getAllIssues').get(getAllIssues);


//  POST ROUTES
router.route("/createIssue").post(createIssue); 


//DELETE ROUTES
router.route("/deleteIssue/:id").delete(deleteIssue);

export default router;