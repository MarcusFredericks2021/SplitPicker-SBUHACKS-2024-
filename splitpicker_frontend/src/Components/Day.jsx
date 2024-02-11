import { Box, Button, Card, CardBody, CardHeader, FormControl, FormLabel, Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, StackDivider, Switch, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useControllableState, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ExerciseSelector from './ExerciseSelector';

export const Day = (props) => {
    const [isRest, setRest] = useControllableState({ defaultValue: false });
    const handleRestChange = (newValue) => {
        setRest(newValue);
        console.log(isRest);
        // You can perform additional actions here based on the new value
    };

    const split = props?.split;
    const dayNumber = props?.dayNumber;

    const { isOpen, onOpen, onClose } = useDisclosure();

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
                    <Heading size='md'>{`Day ${dayNumber}`}</Heading>
                    <FormControl display='flex' alignItems='center'>
                        <FormLabel htmlFor='rest-or-not' mb='0'>
                            Rest?
                        </FormLabel>
                        <Switch id='rest-or-not' />
                    </FormControl>
                </Stack>

            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    <HStack spacing={4} align="center">
                        <Box>
                            <ExerciseSelector />
                        </Box>
                    </HStack>
                </Stack>
            </CardBody>
        </Card>
    )
}
