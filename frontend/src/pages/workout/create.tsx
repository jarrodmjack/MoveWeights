import AddNewExerciseForm from '@/components/form/AddNewExerciseForm'
import Layout from '@/components/layout/Layout'
import React from 'react'

const create = () => {

  const createWorkout = async (data: {muscleGroup: string, exerciseName: string}) => {
    console.log('HIT')
    // /create-workout
  }

  return (
    <Layout>
        This is where to create a new workout
        <AddNewExerciseForm handleSubmit={createWorkout} />
    </Layout>
  )
}

export default create