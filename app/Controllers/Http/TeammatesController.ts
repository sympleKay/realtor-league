import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ForbiddenException from 'App/Exceptions/ForbiddenException'
import { TeammateService } from 'App/Service/TeammateService'
import { HttpResponse } from 'App/Utils/ResponseUtil'
import {
  AddRemoveTeammateFromTeamValidator,
  CreateTeammateValidator,
  UpdateTeamValidator,
} from 'App/Validators/TeammateValidator'

export default class TeammatesController {
  public async store({ response, request, auth }: HttpContextContract) {
    const payload = await request.validate(CreateTeammateValidator)
    try {
      if (!auth.user) throw new ForbiddenException('You can not perform this action')
      const resp = await TeammateService.createTeammate({ ...payload, userId: auth.user.id })
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

  public async update({ response, request, auth }: HttpContextContract) {
    const payload = await request.validate(UpdateTeamValidator)
    try {
      if (!auth.user) throw new ForbiddenException('You can not perform this action')
      const resp = await TeammateService.updateTeam({ ...payload, userId: auth.user.id })
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

  public async addRemoveTeam({ response, request, auth }: HttpContextContract) {
    const payload = await request.validate(AddRemoveTeammateFromTeamValidator)
    try {
      if (!auth.user) throw new ForbiddenException('You can not perform this action')
      const resp = await TeammateService.addRemoveTeammate({ ...payload, userId: auth.user.id })
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

  public async index({ response, auth }: HttpContextContract) {
    try {
      if (!auth.user) throw new ForbiddenException('You can not perform this action')
      const resp = await TeammateService.getMyTeammates(auth.user.id)
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
