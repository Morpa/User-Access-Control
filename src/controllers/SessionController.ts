import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import UserRepository from 'repositories/UserRepository';
import { getCustomRepository } from 'typeorm';

class SessionController {
  async create(request: Request, response: Response) {
    const { username, password } = request.body;
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({ username });

    if (!user) {
      return response.status(400).json({ error: 'User not found' });
    }

    const matchPassword = await compare(password, user.password);

    if (!matchPassword) {
      return response
        .status(400)
        .json({ error: 'Incorrect password or username' });
    }

    const token = sign({}, '93eea6a2c12628b3a3b7618f6882c912', {
      subject: user.id,
      expiresIn: '1d',
    });

    return response.json({
      token,
      user,
    });
  }
}

export default new SessionController();
