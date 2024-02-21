import { runCronJobs } from 'App/Utils/CronjobUtil'
import { DailyPerformanceCreatorController } from 'App/BackgroundJobs/RealtorScorePerformance'

export default async function start() {
  const jobs = [...DailyPerformanceCreatorController.getJobs()] // You can add multiple jobs here

  await runCronJobs(jobs)

  return true
}
