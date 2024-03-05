import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Realtor from 'App/Models/Realtor'
import RealtorFactory from 'Database/factories/RealtorFactory'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Realtor.query().delete() // Clear existing records
    await RealtorFactory.createMany(100)
  }
}
