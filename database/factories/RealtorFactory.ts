import Realtor from 'App/Models/Realtor'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Realtor, ({ faker }) => {
  const pts2022 = faker.helpers.rangeToNumber({ min: 100, max: 800 })
  const pts2023 = faker.helpers.rangeToNumber({ min: 100, max: 800 })
  return {
    //
    name: faker.person.fullName(),
    price: faker.helpers.rangeToNumber({ min: 9, max: 20 }),
    pts_2022: pts2022,
    pts_2023: pts2023,
    totalPts: pts2022 + pts2023,
    brokerage: faker.company.name(),
    sold: faker.helpers.rangeToNumber({ min: 50, max: 150 }),
    image: faker.image.urlPicsumPhotos(),
    listed: faker.helpers.rangeToNumber({ min: 10, max: 53 }),
  }
}).build()
