/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1647977689")

  // update collection data
  unmarshal({
    "createRule": "",
    "viewRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1647977689")

  // update collection data
  unmarshal({
    "createRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
})
