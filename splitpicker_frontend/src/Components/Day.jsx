import { Box, Button, Card, CardBody, CardHeader, Center, Divider, FormControl, FormLabel, Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, StackDivider, Switch, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useControllableState, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ExerciseSelector from './ExerciseSelector';
import ExerciseCard from './ExerciseCard';
import { SplitData } from '../Context/SplitContext';

export const Day = (props) => {

    const [isRest, setRest] = useControllableState({ defaultValue: false });
    const handleRestChange = (newValue) => {
        setRest(newValue);
        console.log(isRest);
        // You can perform additional actions here based on the new value
    };

    const data = props.data;
    console.log("Day Data", data.exercises);
    const dayNumber = props?.dayNumber;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { userData } = SplitData();

    useEffect(() => {
        // get splitData
        // iterate through the days and get exercise id
        // query api for exercise id's


        //for testing, use split["exercises"]

    }, [])

    return (
        <Card className='mt-10 mx-20'>
            <CardHeader>
                <Stack>
                    <Heading size='xl'>{`Day ${dayNumber}`}</Heading>
                </Stack>
                <Divider className=' mt-6' />
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    <HStack spacing={4} align="center">
                        <Stack divider={<StackDivider />} spacing='4'>

                            {data && Array.from(data.exercises).map((exercise, idx) => {
                                let reps = data.reps && data.reps.length >= idx ? data.reps[idx] : 8;
                                let sets = data.sets && data.sets.length >= idx ? data.sets[idx] : 3
                                let rest = data.sets && data.rest.length >= idx ? data.rest[idx] : 180;;
                                return <ExerciseCard exerciseData={exercise} reps={reps} sets={sets} rest={rest} />
                            }
                            )}
                            <Center>
                                <ExerciseSelector dayNumber={dayNumber} />
                            </Center>
                        </Stack>
                    </HStack>
                </Stack>
            </CardBody>
        </Card>
    )
}
