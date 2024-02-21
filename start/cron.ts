import start from 'App/BackgroundJobs'

start().then(() => console.log(`Cron started successfully as at ${new Date()}`))
