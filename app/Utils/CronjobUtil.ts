import BadRequestException from 'App/Exceptions/BadRequestException'
import { DateTime } from 'luxon'
import cron from 'node-cron'

interface Job {
  cron_time: string
  fn: Function
}

export async function runCronJobs(jobs: Job[]) {
  for (const job of jobs) {
    if (!cron.validate(job.cron_time)) {
      throw new BadRequestException(
        `Cron time ${job.cron_time} for job ${job.fn.name} is not valid, hence cannot run job`
      )
    }

    cron.schedule(job.cron_time, () => {
      console.log(`Running Job ${job.fn.name} at ${DateTime.now().toLocaleString()}`)
      job.fn()
    })
  }

  return true
}
