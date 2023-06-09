import express from 'express'
import Ninja from '../Model/ninjas';

const router = express.Router()

//Test with longitude=-25.856077 and latitude=70.848447

router.get("/ninjas", (req, res) => {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const maxDistance = parseFloat(req.query.maxDistance) || 10000;

  Ninja.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        spherical: true,
        distanceField: "dist.calculated",
        maxDistance: maxDistance
      }
    }
  ])
    .then(function (results) {
      res.send(results);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    });
});
// router.get("/ninjas", (req, res) => {

//   const lng = parseFloat(req.query.lng);
//   const lat = parseFloat(req.query.lat);
//   const maxDistance = 10000;

//   Ninja.aggregate([
//     {
//       $geoNear: {
//         near: {
//           type: 'Point',
//           coordinates: [lng, lat]
//         },
//         spherical: true,
//         distanceField: "dist.calculated",
//         maxDistance: parseFloat(maxDistance)
        
//       }
//     }
//   ])
//     .then(function (results) { 
//       res.send(results);
//     })
//     .catch(error => {
//       console.error(error);
//       res.status(500).json({ error: "An error occurred" });
//     });
// });



//add ninja to the db
router.post("/ninjas", (req, res, next) => {
  //create method return a promise
  Ninja.create(req.body)
    .then((ninja) => {
      res.send(ninja);
    }).catch(next)
  // .catch(err=>{
  //     res.send(err.message)
  // })

  // var ninja = new Ninja(req.body);
  // ninja.save();

  //     res.send({
  //         name:req.body.name,
  //         rank: req.body.rank,
  //         availability: req.body.availability
  // });

})

//update a ninja in the db
router.put("/ninjas/:id", (req, res) => {

  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Ninja.findOne({ _id: req.params.id }).then((ninja) => {
        res.send(ninja);
      })
    })


})
//delete an existing a ninja in the db
router.delete("/ninjas/:id", (req, res) => {
  Ninja.findByIdAndRemove({ _id: req.params.id })
    .then((ninja) => {
      res.send(ninja);
    })
  // res.send({type: "DELETE"});

})


export default router;