import {Router} from 'express';
import {createIssue, deleteIssue, getAllIssues, getDeveloperIssues, getUserIssues, updateIssue} from "../controllers/issues.controller.js";

const router = Router();

// GET ROUTERS
router.route('/getAllIssues').get(getAllIssues);
router.route('/developerIssues').get(getDeveloperIssues);
router.route('/getUserIssues').get(getUserIssues);

//  POST ROUTES
router.route("/createIssue").post(createIssue); 


//DELETE ROUTES
router.route("/deleteIssue/:id").delete(deleteIssue);

//UPDATE ROUTES
router.route("/updateIssue").put(updateIssue);

export default router;