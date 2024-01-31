import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'
import { AuthService } from 'App/Service/AuthService'
import { UserService } from 'App/Service/UserService'
import { HttpResponse } from 'App/Utils/ResponseUtil'
import {
  CompleteUserProfileAuthValidator,
  LoginUserAuthValidator,
  RegisterUserAuthValidator,
  VerifyUserEmailAuthValidator,
} from 'App/Validators/AuthValidator'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const payload = await request.validate(RegisterUserAuthValidator)
    try {
      const resp = await AuthService.registerUser(payload)
      return HttpResponse({
        response,
        code: 200,
        message: resp.message,
        data: resp.data,
      })
    } catch (error) {
      throw error
    }
  }

  public async verifyEmail({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(VerifyUserEmailAuthValidator)
    try {
      const resp = await AuthService.verifyVerificationToken(payload.token, auth)
      return HttpResponse({
        response,
        code: 200,
        message: resp.message,
        data: resp.data,
      })
    } catch (error) {
      throw error
    }
  }

  public async completeProfile({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CompleteUserProfileAuthValidator)
    try {
      if (!auth.user) throw new UnauthorizedException('You can not perform this action')
      const resp = await UserService.completeUserProfile({ ...payload, userId: auth.user.id })
      return HttpResponse({
        response,
        code: 200,
        message: resp.message,
        data: resp.data,
      })
    } catch (error) {
      throw error
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(LoginUserAuthValidator)
    try {
      const resp = await AuthService.loginUser({
        email: payload.email,
        password: payload.password,
        auth,
      })
      return HttpResponse({
        response,
        code: 200,
        message: resp.message,
        data: resp.data.token,
      })
    } catch (error) {
      throw error
    }
  }

  public async currentUser({ response, auth }: HttpContextContract) {
    try {
      if (!auth.user) throw new UnauthorizedException('You can not perform this action')
      const resp = await AuthService.currentUser(auth.user.id)
      return HttpResponse({
        response,
        code: 200,
        message: resp.message,
        data: resp.data,
      })
    } catch (error) {
      throw error
    }
  }
}
