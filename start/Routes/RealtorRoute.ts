import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.resource('/', 'RealtorsController')
    }).prefix('/realtor')
  }).prefix('/v1')
})
  .prefix('/api')
  .middleware(['auth:api'])
