import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const test = (req, res) => {
  res.json({ message: 'API is working!' });
};

export const updateUser = async (req, res, next) => {
  let tokenUserId = req.user?.id || req.user?._id;
  if (!tokenUserId) return next(errorHandler(401, 'Unauthorized'));

  tokenUserId = tokenUserId.toString();
  const requestedUserId = req.params?.userId?.toString();

  // Security: only allow updating your own profile.
  if (requestedUserId && tokenUserId !== requestedUserId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return next(errorHandler(400, 'No data provided'));
  }

  const updateFields = {};

  if (req.body.username !== undefined) {
    const username = req.body.username;

    if (username.length < 7 || username.length > 20) {
      return next(
        errorHandler(400, 'Username must be between 7 and 20 characters'),
      );
    }
    if (username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if (username !== username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'));
    }
    if (!username.match(/^[a-z0-9]+$/)) {
      return next(
        errorHandler(
          400,
          'Username can only contain lowercase letters and numbers',
        ),
      );
    }

    updateFields.username = username;
  }

  if (req.body.email !== undefined) {
    updateFields.email = req.body.email;
  }

  if (req.body.profilePicture !== undefined) {
    updateFields.profilePicture = req.body.profilePicture;
  }

  if (req.body.password !== undefined) {
    // If user cleared the password field, treat it as 'no password update'.
    if (
      typeof req.body.password !== 'string' ||
      req.body.password.trim() === ''
    ) {
      // Do nothing.
    } else {
      if (req.body.password.length < 6) {
        return next(
          errorHandler(400, 'Password must be at least 6 characters'),
        );
      }
      updateFields.password = bcrypt.hashSync(req.body.password, 10);
    }
  }

  if (Object.keys(updateFields).length === 0) {
    return next(errorHandler(400, 'No valid fields to update'));
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      tokenUserId,
      { $set: updateFields },
      { new: true },
    );

    if (!updatedUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const updated = updatedUser.toObject();
    delete updated.password;
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};
