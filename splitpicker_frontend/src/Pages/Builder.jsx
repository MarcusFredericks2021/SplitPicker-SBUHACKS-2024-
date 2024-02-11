import { Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { Day } from '../Components/Day';
import ScoreBoard from '../Components/ScoreBoard';
import { SplitData } from '../Context/SplitContext';
import Split from '../Components/Split';

const Builder = () => {
    const exercises = ["One", "Two", "Three"];
    return (
        <section className="Builder">
            <Text fontSize='4xl' className='my-5'>Choose Your Exercises</Text>
            <Stack className='flex justify-center'>
                <ScoreBoard />
                <Split />
            </Stack>
        </section>
    )
}

export default Builder;