import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.post('/', 'TeammatesController.store')
      Route.get('/', 'TeammatesController.index')
      Route.patch('/update', 'TeammatesController.update')
      Route.patch('/teammate-action', 'TeammatesController.addRemoveTeam')
      Route.get('/realtors', 'TeammatesController.getRealtors')
    }).prefix('/team')
  }).prefix('/v1')
})
  .prefix('/api')
  .middleware(['auth:api'])
