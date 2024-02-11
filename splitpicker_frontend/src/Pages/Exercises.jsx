import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, CardBody, CardFooter, CardHeader, Heading, ListIcon, ListItem, SimpleGrid, Stack, StackDivider, Text, UnorderedList } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import axios from "axios";

const capitalizeWords = (inputString) => {
    return inputString
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const Exercises = () => {

    ///get_by_ids/<collection_name>/
    //'/get/<collection_name>/'
    const [exercises, setExercises] = useState();
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/get/exercise_coll');
                // console.log('exercisedata', JSON.stringify(response.data));
                console.log("exercises all: ", response.data.slice(0, 100));
                setExercises(response.data.slice(0, 100));
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])
    return (
        <Box>
            <Text fontSize='4xl' className='my-5'>List of Preset Exercises</Text>
            <SimpleGrid className='mt-16 mx-20' columns={2} spacing={10}>
                {exercises && exercises.map((exercise, idx) => {
                    let name = exercise.name;
                    let bodypart = exercise.bodyPart;
                    let equipment = exercise.equipment;
                    let instructions = Array.from(exercise.instructions);
                    let target = exercise.target;
                    let secondaryMuscles = Array.from(exercise.secondaryMuscles);
                    return (<Card key={name}>
                        <CardHeader fontSize='2xl'>{name}</CardHeader>
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='4'>
                                <SimpleGrid columns={2} spacing={10}>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Body Part Hit
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {capitalizeWords(bodypart)}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Target
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {capitalizeWords(target)}
                                        </Text>
                                    </Box>
                                </SimpleGrid>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Equipment
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        {capitalizeWords(equipment)}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Secondary Muscles
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        <UnorderedList>
                                            {secondaryMuscles.map((muscle) => {
                                                return <ListItem>{capitalizeWords(muscle)}</ListItem>
                                            })}
                                        </UnorderedList>
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='md' textTransform='uppercase'>
                                        Instructions
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        <Accordion allowMultiple>
                                            {instructions && instructions.map((instruction, idx) => (
                                                <AccordionItem>
                                                    <h2>
                                                        <AccordionButton>
                                                            <Box as="span" flex='1' textAlign='left'>
                                                                {`Step ${idx + 1}`}
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                    </h2>
                                                    <AccordionPanel pb={4}>
                                                        {instruction.charAt(0).toUpperCase() + instruction.slice(1)}
                                                    </AccordionPanel>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </Text>
                                </Box>
                            </Stack></CardBody>
                        <CardFooter></CardFooter>
                    </Card>)
                })}
            </SimpleGrid>
        </Box>
    )
}

export default Exercises