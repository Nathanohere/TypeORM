import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/userService';
import { UserDTO } from '../dto/userDto';
import AppError from '../utils/appError';

const userService = new UserService();

class userController {
  static async createUser(req: Request, res: Response): Promise<void> {
    const userDto: UserDTO = req.body;
    const user = await userService.create(userDto);
    res.status(201).json({
      status: 'success',
      user,
    });
  }

  static async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await userService.getAll();
    res.status(200).json({
      status: 'success',
      users,
    });
  }
  static async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const user = await userService.getById(+req.params.id);

    if (!user) {
      return next(new AppError('No user with that Id exists', 404));
    }
    res.status(200).json({
      status: 'success',
      user,
    });
  }
  static async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userDto: UserDTO = req.body;

    const updatedUser = await userService.update(+req.params.id, userDto);

    if (!updatedUser) {
      return next(new AppError('No user with that Id exists', 404));
    }
    res.status(200).json({
      status: 'success',
      updatedUser,
    });
  }
  static async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const isDeleted = await userService.delete(+req.params.id);

    if (!isDeleted) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
}
export default userController;