/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('exercises').del()
    .then(function () {
      return knex('exercises').insert([
        {name: "Squat", muscle: "Quadriceps, Glutes"},
        {name: "Deadlift", muscle: "Back, Hamstrings"},
        {name: "Bench Press", muscle: "Chest, Triceps, Shoulders"},
        {name: "Pull Ups", muscle: "Back, Biceps"},
        {name: "Push Ups", muscle: "Chest, Shoulders, Triceps"},
        {name: "Shoulder Press", muscle: "Shoulders, Triceps"},
        {name: "Lunges", muscle: "Quadriceps, Glutes, Hamstrings"},
        {name: "Calf Raise", muscle: "Calves,"},
        {name: "Crunches", muscle: "Abs,"},
        {name: "Sit Ups", muscle: "Abs,"}
      ]);
    });
};
