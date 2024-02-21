/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { CronShedule } from 'App/BackgroundJobs/CronScheduleEnum'
import Env from '@ioc:Adonis/Core/Env'
import { DailyPerformanceCreatorService } from './DailyPerformanceCreator.service'

/**
 * This is a quick reference to cron syntax and also shows the options supported by node-cron.
 * Allowed fields
 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
 */
export class DailyPerformanceCreatorController {
  static getJobs() {
    const jobs = [
      {
        cron_time: Env.get('NODE_ENV') === 'development' ? CronShedule.MINUTES : CronShedule.DAILY,
        fn: DailyPerformanceCreatorService.dailyPerformanceCreator,
      },
    ]

    return jobs
  }
}
