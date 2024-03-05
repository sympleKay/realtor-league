import Realtor from 'App/Models/Realtor'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Realtor, ({ faker }) => {
  const pts2022 = faker.helpers.rangeToNumber({ min: 100, max: 800 })
  const pts2023 = faker.helpers.rangeToNumber({ min: 100, max: 800 })
  const agentName = faker.person.fullName()
  return {
    name: agentName,
    price: faker.helpers.rangeToNumber({ min: 9, max: 20 }),
    pts_2022: pts2022,
    pts_2023: pts2023,
    totalPts: pts2022 + pts2023,
    brokerage: faker.company.name(),
    sold: faker.helpers.rangeToNumber({ min: 50, max: 150 }),
    image: faker.image.urlPicsumPhotos(),
    listed: faker.helpers.rangeToNumber({ min: 10, max: 53 }),
    sellerAgentName: agentName,
    buyerAgentName: faker.person.fullName(),
    bedroom: faker.helpers.rangeToNumber({ min: 1, max: 6 }),
    bathroom: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
    squareFt: faker.helpers.rangeToNumber({ min: 1000, max: 5000 }),
    lotSquareFt: faker.helpers.rangeToNumber({ min: 10000, max: 40000 }),
    dom: faker.helpers.rangeToNumber({ min: 30, max: 180 }),
    soldAbove: faker.helpers.rangeToNumber({ min: 0, max: 20 }),
    soldBelow: faker.helpers.rangeToNumber({ min: 0, max: 20 }),
    listPrice: faker.helpers.rangeToNumber({ min: 200000, max: 800000 }),
    soldPrice: faker.helpers.rangeToNumber({ min: 70000, max: 300000 }),
  }
}).build()
