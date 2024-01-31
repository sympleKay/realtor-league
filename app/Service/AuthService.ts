/**
 * This service handles all the authentication required for the application to work
 */

import User from 'App/Models/User'
import { LoginUserInterface, RegisterUserInterface } from 'App/Shared/Interfaces/AuthInterface'
import { ChangeUserPasswordInterface } from 'App/Shared/Interfaces/UserInterface'
import { UserService } from 'App/Service/UserService'
import Encryption from '@ioc:Adonis/Core/Encryption'
import ForbiddenException from 'App/Exceptions/ForbiddenException'
import NotFoundException from 'App/Exceptions/NotFoundException'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'

/**
 * Authentication class module
 */
export class AuthService {
  /**
   * This register a new user account to the application
   */
  public static async registerUser({
    email,
    password,
    firstName,
    lastName,
    frontendUrl,
  }: RegisterUserInterface) {
    try {
      const user = await User.create({
        email,
        firstName,
        lastName,
        type: 'user',
        password,
        isTermsAndConditionsAccepted: true,
        isEmailVerified: false,
        isActive: true,
      })
      const verificationURL = await this.generateVerificationToken(user, frontendUrl)
      return {
        status: true,
        message: 'User registration successful',
        data: {
          id: user.id,
          firstName,
          lastName,
          email,
          verificationLink: verificationURL.data,
        },
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * This logs in and authenticate users to the application
   */
  public static async loginUser({ email, password, auth }: LoginUserInterface) {
    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '30 days',
      })

      return {
        status: true,
        message: 'User logged in',
        data: { token },
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * This returns the details of the current authenticated user
   */
  public static async currentUser(userId: string) {
    try {
      const user = await User.query().where('id', userId).first()
      if (!user) throw new NotFoundException('Invalid user details supplied')
      return {
        status: true,
        message: 'Current user',
        data: {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          type: user.type,
        },
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * This changes the authenticated user passsword
   */
  public static async changePassword(payload: ChangeUserPasswordInterface) {
    try {
      await UserService.changePassword(payload)

      return {
        status: true,
        message: 'User password changed successfully.',
        data: null,
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * This generates the verification token
   */
  public static async generateVerificationToken(user: User, frontEndUrl: string) {
    try {
      const encrypt = Encryption.encrypt({
        id: user.id,
        email: user.email,
      })
      const verificationURL = `${frontEndUrl}?token=${encrypt}`
      return {
        status: true,
        message: 'Email token generated',
        data: verificationURL,
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * This verififies the generated token
   */
  public static async verifyVerificationToken(encryptedToken: string, auth: AuthContract) {
    try {
      const decrypt = Encryption.decrypt(encryptedToken)
      if (!decrypt) throw new ForbiddenException('Invalid verification link')
      const decryptedData = decrypt as { id: string; email: string }
      const user = await UserService.getUser(decryptedData.id)
      const token = await this.authenticateUser(user, auth)

      return {
        status: true,
        message: 'Email verified succesffully',
        data: token.data,
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * This authenticate users
   */
  public static async authenticateUser(user: User, auth: AuthContract) {
    try {
      const authToken = await auth.use('api').generate(user)

      return {
        status: true,
        message: 'Email verified succesffully',
        data: {
          token: authToken.token,
        },
      }
    } catch (error) {
      throw error
    }
  }
}
