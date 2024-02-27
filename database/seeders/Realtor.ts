import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RealtorFactory from 'Database/factories/RealtorFactory'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await RealtorFactory.createMany(100)
  }
}
