const express = require('express');
const fs = require('fs');

const tourRouter = express.Router();
/* Reading tours data from a json file */
const jsonFile = `${__dirname}/../dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
// Todo: Delete tour
const delete_tour = (req, res) => {
  return res.status(204).json({
    status: 'SUCCESS',
    data: null,
  });
};
// Todo: Create a new Toure
const new_tour = (req, res) => {
  const body = req.body;
  const id = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign(body, { id });
  // Alternative way to do above tark
  const newTour = { ...body, id };
  tours.push(newTour);
  fs.writeFile(jsonFile, JSON.stringify(tours), (err) => {
    res.status(201).json({
      result: 'success',
      data: {
        tour: newTour,
      },
    });
  });
};
// Todo: Get a single tours
/* To define default params using ? . example /api/v1/tours/:id/userId?  */
const get_single_tour = (req, res) => {
  const { id, userId } = req.params;
  console.log(userId);
  const tour = tours.find((el) => el.id === id * 1);
  if (!tour) {
    return res.status(404).json({
      status: 'success',
      message: 'Invalid ID',
    });
  }
  return res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
// Todo: Get all tours
const get_all_tours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
};
// Todo: Update a tour
const update_tour = (req, res) => {
  try {
    const { id } = req.body.params;
    return res.status(200).json({
      status: 'SUCCESS',
      message: 'Update successfully.',
      data: {
        tour: `<Updated tours with id ${id} is here...>`,
      },
    });
  } catch (err) {
    return res.status(412).json({
      status: 'ERROR',
      message: err.message,
      data: null,
    });
  }
};

//  ? ROUTES
tourRouter.route('/').get(get_all_tours).post(new_tour);
tourRouter
  .route('/:id')
  .get(get_single_tour)
  .patch(update_tour)
  .delete(delete_tour);

module.exports = tourRouter;