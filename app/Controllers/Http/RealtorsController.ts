import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ForbiddenException from 'App/Exceptions/ForbiddenException'
import { RealtorService } from 'App/Service/RealtorService'
import { HttpResponse } from 'App/Utils/ResponseUtil'
import QueryValidator from 'App/Validators/QueryValidator'

export default class RealtorsController {
  public async index({ response, auth, request }: HttpContextContract) {
    const query = await request.validate(QueryValidator)
    try {
      if (!auth.user) throw new ForbiddenException('You can not perform this action')
      const resp = await RealtorService.getRealtors(query)
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
