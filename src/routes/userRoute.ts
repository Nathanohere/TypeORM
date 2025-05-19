import Router from 'express';
import userController from '../controllers/userController';

const router = Router();

router.route('/').get(userController.getAllUsers).post(userController.createUser);

router.route('/:id').get(userController.getUserById).put(userController.updateUser).delete(userController.deleteUser);


export default router;
