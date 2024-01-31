/**
 * This service handles all the users related actions on the system
 */
import Hash from '@ioc:Adonis/Core/Hash'
import BadRequestException from 'App/Exceptions/BadRequestException'
import ForbiddenException from 'App/Exceptions/ForbiddenException'
import NotFoundException from 'App/Exceptions/NotFoundException'
import User from 'App/Models/User'
import {
  ChangeUserPasswordInterface,
  CompleteUserProfileInterface,
} from 'App/Shared/Interfaces/UserInterface'

/**
 * Product class module
 */
export class UserService {
  /**
   * This returns the user details
   */
  public static async getUser(userId: string): Promise<User> {
    try {
      const user = await User.query().where('id', userId).first()
      if (!user) throw new NotFoundException('User record does not exisit')
      return user
    } catch (error) {
      throw error
    }
  }

  /**
   * Change user password
   */
  public static async changePassword({
    userId,
    oldPassword,
    newPassword,
    confirmNewPassword,
  }: ChangeUserPasswordInterface) {
    try {
      const user = await User.query().where('id', userId).select(['id', 'password']).first()
      if (!user) throw new NotFoundException('User record does not exisit')
      const verifyPassword = await Hash.verify(user.password, oldPassword)
      if (!verifyPassword) throw new ForbiddenException('Incorrect password')
      if (newPassword !== confirmNewPassword)
        throw new BadRequestException('Password does not match')

      user.password = newPassword
      await user.save()

      return {
        status: true,
        message: 'Password changed successfuuly',
        data: null,
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Change user password
   */
  public static async completeUserProfile({
    userId,
    address,
    profession,
    phoneNumber,
    avatar,
  }: CompleteUserProfileInterface) {
    try {
      const user = await User.query().where('id', userId).select(['id', 'password']).first()
      if (!user) throw new NotFoundException('User record does not exisit')
      user.phoneNumber = phoneNumber
      user.address = address
      user.profession = profession
      user.avatar = avatar
      await user.save()

      return {
        status: true,
        message: 'Profile completed successfuuly',
        data: null,
      }
    } catch (error) {
      throw error
    }
  }
}
