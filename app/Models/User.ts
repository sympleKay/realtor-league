import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { v4 } from 'uuid'
import {
  column,
  beforeSave,
  beforeCreate,
  beforeFetch,
  beforeFind,
  computed,
  afterFind,
} from '@ioc:Adonis/Lucid/Orm'
import { softDeleteQuery, softDelete } from 'App/Actions/SoftDeleteAction'
import AppBaseModel from 'App/Models/AppBaseModel'
import { UserType } from 'App/Shared/Enums/UserEnum'

export default class User extends AppBaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column()
  public phoneNumber: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public avatar: string

  @column()
  public address: string

  @column()
  public profession: string

  @column()
  public type: UserType

  @column({ serializeAs: null })
  public isTermsAndConditionsAccepted: boolean

  @column()
  public isEmailVerified: boolean

  @column()
  public isPhoneNumberVerified: boolean

  @column()
  public isActive: boolean

  @column()
  public isVerified: Boolean

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public rememberMeToken: string

  @column({ serializeAs: null })
  public token: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @computed()
  public get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  @beforeCreate()
  public static async assignUuid(user: User) {
    user.id = v4()
  }

  @afterFind()
  public static prepareFetchResponse(user: User) {
    user.isTermsAndConditionsAccepted = !!user.isTermsAndConditionsAccepted
    user.isEmailVerified = !!user.isEmailVerified
    user.isPhoneNumberVerified = !!user.isPhoneNumberVerified
    user.isActive = !!user.isActive
    user.isVerified = !!user.isVerified
  }

  @beforeSave()
  public static async hash(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeFind()
  public static softDeletesFind = softDeleteQuery

  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  public async softDelete(column?: string) {
    await softDelete(this, column)
  }
}
