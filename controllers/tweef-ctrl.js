const Tweef = require('../models/tweef-model')


createTweef = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a Tweef',
    })
  }

  const tweef = new Tweef(body)

  if (!tweef) {
    return res.status(400).json({ succcess: false, error: err})
  }

  tweef
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: tweef._id,
        message: 'Tweef created!',
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Tweef not created!',
      })
    })
}

updateTweef = async (req, res) => {
  const body = req.body

  if(!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  Tweef.findOne({_id: req.params.id}, (err, tweef) => {
    if(err) {
      return res.status(404).json({
        err,
        message: 'Tweef not found!',
      })
    }

    tweef.name = body.name
    tweef.time = body.time
    tweef.rating = body.rating
    tweef
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: tweef._id,
          message: 'Tweef updated!',
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Tweef not updated',
        })
      })
  })
}

deleteTweef = async (req, res) => {
  await Tweef.findOneAndDelete({_id: req.params.id}, (err, tweef) => {
    if(err) {
      return res.status(400).json({success: false, error: err})
    }

    if(!tweef) {
      return res
        .status(404)
        .json({ success: false, error: 'Tweef not found' })
    }

    return res.status(200).json({ success: true, data: tweef})
  }).catch(err => console.log(err))
}


getTweefById = async (req, res) => {
  await Tweef.findOne({ _id: req.params.id}, (err, tweef) => {
    if(err) {
      return res.status(400).json({ success: false, error: err})
    }

    if(!tweef) {
      return res
        .status(404)
        .json({ success: false, error: 'Tweef not found'})
    }
    return res.status(200).json({ success: false, error: err})
  }).catch(err => console.log(err))
}

getTweefs = async (req, res) => {
  await Tweef.find({}, (err, tweefs) => {
    if (err) {
      return res.status(400).json({ success: false, error: err})
    }

    if(!tweefs.length) {
      return res
        .status(404)
        .json({ success: false, error: 'Tweefs not found'})
    }

    return res.status(200).json({ success: true, data: tweefs})
  }).catch(err => console.log(err))
}


module.exports = {
  createTweef,
  updateTweef,
  deleteTweef,
  getTweefs,
  getTweefById,
}
