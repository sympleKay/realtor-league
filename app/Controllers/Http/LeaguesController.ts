import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import ForbiddenException from 'App/Exceptions/ForbiddenException'
import { LeagueService } from 'App/Service/LeagueService'
import { HttpResponse } from 'App/Utils/ResponseUtil'
import {
  CreateLeagueValidator,
  QueryLeagueByTypeValidator,
  UpdateLeagueValidator,
} from 'App/Validators/LeagueValidator'

export default class LeaguesController {
  public async store({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreateLeagueValidator)
    try {
      if (!auth.user) throw new ForbiddenException('You can not perform this action')
      const resp = await LeagueService.create({ ...payload, createdBy: auth.user.id })
      return HttpResponse({
        response,
        code: 201,
        message: resp.message,
        data: resp.data,
      })
    } catch (error) {
      throw error
    }
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(UpdateLeagueValidator)
    try {
      if (!auth.user) throw new ForbiddenException('You can not perform this action')
      const resp = await LeagueService.update({ ...payload, createdBy: auth.user.id })
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

  public async destroy({ request, response, auth }: HttpContextContract) {
    try {
      if (!auth.user) throw new ForbiddenException('You can not perform this action')
      const { id } = request.params()
      if (!id) throw new BadRequestException('Id not provided')
      const resp = await LeagueService.delete(id, auth.user.id)
      return HttpResponse({
        response,
        code: 204,
        message: resp.message,
        data: resp.data,
      })
    } catch (error) {
      throw error
    }
  }

  public async index({ response, auth }: HttpContextContract) {
    try {
      if (!auth.user) throw new ForbiddenException('You can not perform this action')
      const resp = await LeagueService.getAllLeagues()
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

  public async showByType({ response, auth, request }: HttpContextContract) {
    const payload = await request.validate(QueryLeagueByTypeValidator)
    try {
      if (!auth.user) throw new ForbiddenException('You can not perform this action')
      const resp = await LeagueService.getLeagueByType(payload.type)
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

  public async showMyLeagues({ response, auth }: HttpContextContract) {
    try {
      if (!auth.user) throw new ForbiddenException('You can not perform this action')
      const resp = await LeagueService.getMyLeagues(auth.user.id)
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
