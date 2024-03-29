import Realtor from 'App/Models/Realtor'

export class DailyPerformanceCreatorService {
  public static async dailyPerformanceCreator() {
    try {
      const realtors = await Realtor.query()
      // Generate random score for each realtor here
      for (const realtor of realtors) {
        realtor.sold = Math.floor(Math.random() * 100)
        realtor.totalPts = realtor.pts_2022 + realtor.pts_2023
        await realtor.save()
      }
    } catch (error) {
      throw error
    }
  }
}
