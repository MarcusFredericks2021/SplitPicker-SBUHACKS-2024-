import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Stack, StackDivider, Tag, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { SplitData } from '../Context/SplitContext';

const ScoreBoard = () => {
    const { userData } = SplitData();

    const { isOpen, onOpen, onClose } = useDisclosure()
    /*
    <CardFooter>
        <Button>View here</Button>
    </CardFooter>
    */
    return (
        <Box className='outline mx-48'>
            <Center>
            </Center>
            <SimpleGrid className='grid-flow-col p-5' spacing={4}>
                <Card size="sm">
                    <CardHeader>
                        <Heading size='md'>Score</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>3/4</Text>
                    </CardBody>
                </Card>
                <Card size='sm'>
                    <CardHeader>
                        <Heading size='md'>Total Volume</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>93 sets</Text>
                    </CardBody>
                </Card>
                <Card size='sm'>
                    <CardHeader>
                        <Heading size='md'>Time For Completion</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>1.5 Hours</Text>
                    </CardBody>
                </Card>
            </SimpleGrid >
            <>
                <Button onClick={onOpen}>Open Modal</Button>

                <Modal isOpen={isOpen} size='full' onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Why Did I Get This Score?</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Card>
                                <CardBody>
                                    <Stack divider={<StackDivider />} spacing='4'>
                                        <Box>
                                            <Heading size='md' textTransform='uppercase'>
                                                All Muscle Groups Hit?
                                            </Heading>
                                            <Center><Text pt='2' fontSize='sm'>
                                                <Center><Text className=' text-red-600'> 0/1 </Text></Center> You aren't hitting every muscle! Try adding more exercises or exercises that better fit!
                                            </Text></Center>
                                            <Center><Text>
                                                Missing Muscles: Teres Major, Rear Deltoid, Hamstrings, Calves
                                            </Text></Center>
                                        </Box>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Too Much or Too Little Volume?
                                            </Heading>
                                            <Center><Text pt='2' fontSize='sm'>
                                                <Center><Text className=' text-green-600'> 1/1 </Text></Center> You are hitting the optimal amount of volume per week!
                                            </Text></Center>
                                            <Center><Text>
                                                Each muscle is being hit on average 11.54 times per week (Should Be Within: [10-20])
                                            </Text></Center>
                                        </Box>
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Overlapping Muscle Groups?
                                            </Heading>
                                            <Text pt='2' fontSize='sm'>
                                                <Center><Text pt='2' fontSize='sm'>
                                                    <Center><Text className=' text-green-600'> 1/1 </Text></Center> You are resting each muscle as optimally as possible in between each day!
                                                </Text></Center>
                                                <Center><Text>
                                                    Some Muscles You May Want To Rest More: Upper Chest, Anterior Deltoid
                                                </Text></Center>
                                            </Text>
                                        </Box>

                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Rest Times
                                            </Heading>
                                            <Text pt='2' fontSize='sm'>
                                                <Center><Text pt='2' fontSize='sm'>
                                                    <Center><Text className=' text-green-600'> 1/1 </Text></Center> You are resting enough between each set for every workout. Great job!
                                                </Text></Center>
                                                <Center><Text>
                                                    No Issues.
                                                </Text></Center>
                                            </Text>
                                        </Box>
                                    </Stack>
                                </CardBody>
                                <CardFooter>
                                    Total: 3/4
                                </CardFooter>
                            </Card>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>

        </Box>
    )
}

export default ScoreBoard;