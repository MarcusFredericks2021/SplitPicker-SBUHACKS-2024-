import { Stack, Text } from '@chakra-ui/react';
import React from 'react'
import { Day } from '../Components/Day';
import ScoreBoard from '../Components/ScoreBoard';

const Builder = () => {
    const exercises = ["One", "Two", "Three"];
    return (
        <section className="Builder">
            <Text fontSize='4xl' className='my-5'>Choose Your Exercises</Text>
            <Stack className='flex justify-center'>
                <ScoreBoard />
                {
                    exercises.map((exercise) =>
                        <Day key={exercise} />
                    )
                }
            </Stack>
        </section>
    )
}

export default Builder;