// test purposes
const today = new Date()
const yesterday = new Date(today)
yesterday.setDate(today.getDate() - 1)

export const testWorkouts = [
	{
		id: "1",
		date: new Date(),
		exercises: [
			{
				id: "blabla1",
				workoutId: "1",
				name: "Barbell Row",
				muscleGroup: "Back",
				sets: [
					{
						id: "1",
						weight: 100,
						reps: 10,
					},
					{
						id: "2",
						weight: 155,
						reps: 8,
					},
					{
						id: "3",
						weight: 125,
						reps: 9,
					},
					{
						id: "4",
						weight: 110,
						reps: 11,
					},
				],
			},
			{
				id: "blabla2",
				workoutId: "1",
				name: "Bicep Curl",
				muscleGroup: "Biceps",
				sets: [
					{
						id: "1",
						weight: 50,
						reps: 10,
					},
					{
						id: "2",
						weight: 60,
						reps: 8,
					},
				],
			},
            {
				id: "blabla2",
				workoutId: "1",
				name: "Hammer Curl",
				muscleGroup: "Biceps",
				sets: [
					{
						id: "1",
						weight: 50,
						reps: 10,
					},
					{
						id: "2",
						weight: 60,
						reps: 8,
					},
				],
			},
            {
				id: "blabla2",
				workoutId: "1",
				name: "Lat Pulldown",
				muscleGroup: "Back",
				sets: [
					{
						id: "1",
						weight: 70,
						reps: 10,
					},
					{
						id: "2",
						weight: 80,
						reps: 10,
					},
					{
						id: "3",
						weight: 75,
						reps: 8,
					},
					{
						id: "4",
						weight: 70,
						reps: 8,
					},
				],
			},
            {
				id: "blabla2",
				workoutId: "1",
				name: "Hammer Curl",
				muscleGroup: "Biceps",
				sets: [
					{
						id: "1",
						weight: 50,
						reps: 10,
					},
					{
						id: "2",
						weight: 60,
						reps: 8,
					},
				],
			},
            {
				id: "blabla2",
				workoutId: "1",
				name: "Hammer Curl",
				muscleGroup: "Biceps",
				sets: [
					{
						id: "1",
						weight: 50,
						reps: 10,
					},
					{
						id: "2",
						weight: 60,
						reps: 8,
					},
				],
			},
		],
	},
	{
		id: "2",
		date: yesterday,
		exercises: [
			{
				id: "blabla1",
				workoutId: "1",
				name: "Barbell Row",
				muscleGroup: "Back",
				sets: [
					{
						id: "1",
						weight: 100,
						reps: 10,
					},
					{
						id: "2",
						weight: 155,
						reps: 8,
					},
					{
						id: "3",
						weight: 125,
						reps: 9,
					},
					{
						id: "4",
						weight: 110,
						reps: 11,
					},
				],
			},
			{
				id: "blabla2",
				workoutId: "2",
				name: "Tricep Pushdown",
				muscleGroup: "Biceps",
				sets: [
					{
						id: "1",
						weight: 50,
						reps: 10,
					},
					{
						id: "2",
						weight: 60,
						reps: 8,
					},
				],
			},
		],
	},
	{
		id: "3",
		date: yesterday,
		exercises: [
			{
				id: "blabla1",
				workoutId: "1",
				name: "Bench Press",
				muscleGroup: "Back",
				sets: [
					{
						id: "1",
						weight: 100,
						reps: 10,
					},
					{
						id: "2",
						weight: 155,
						reps: 8,
					},
					{
						id: "3",
						weight: 125,
						reps: 9,
					},
					{
						id: "4",
						weight: 110,
						reps: 11,
					},
				],
			},
			{
				id: "blabla2",
				workoutId: "3",
				name: "Bicep Curl",
				muscleGroup: "Biceps",
				sets: [
					{
						id: "1",
						weight: 50,
						reps: 10,
					},
					{
						id: "2",
						weight: 60,
						reps: 8,
					},
				],
			},
		],
	},

	{
		id: "4",
		date: yesterday,
		exercises: [
			{
				id: "blabla1",
				workoutId: "1",
				name: "Barbell Row",
				muscleGroup: "Back",
				sets: [
					{
						id: "1",
						weight: 100,
						reps: 10,
					},
				],
			},
		],
	},
]
