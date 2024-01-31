import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UnauthorizedException from 'App/Exceptions/UnauthorizedException'
import { UserService } from 'App/Service/UserService'
import { HttpResponse } from 'App/Utils/ResponseUtil'
import { ChangeUserPasswordValidator } from 'App/Validators/UserValidator'

export default class UsersController {
  public async changePassword({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(ChangeUserPasswordValidator)
    try {
      if (!auth.user) throw new UnauthorizedException('You can not perform this action')
      const resp = await UserService.changePassword({ ...payload, userId: auth.user.id })
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
