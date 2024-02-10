import { Box, Button, Card, CardBody, CardHeader, FormControl, FormLabel, Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, StackDivider, Switch, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useControllableState, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'

export const Day = (props) => {
    const [isRest, setRest] = useControllableState({ defaultValue: false });
    const handleRestChange = (newValue) => {
        setRest(newValue);
        console.log(isRest);
        // You can perform additional actions here based on the new value
    };

    const dayNumber = props?.dayNumber;
    const exerciseList = props?.exerciseList;

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Card className='mt-10'>
            <CardHeader>
                <Stack>
                    <Heading size='md'>{`Day ${dayNumber}`}</Heading>
                    <FormControl display='flex' alignItems='center'>
                        <FormLabel htmlFor='rest-or-not' mb='0'>
                            Rest?
                        </FormLabel>
                        <Switch id='rest-or-not'
                            isChecked={isRest}
                            onChange={handleRestChange} />
                    </FormControl>
                </Stack>

            </CardHeader>

            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    <HStack spacing={4} align="center">
                        <Box>
                            <>
                                <Button onClick={onOpen}>Select Exercise</Button>
                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Select Exercise</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <Tabs>
                                                <TabList>
                                                    <Tab>One</Tab>
                                                    <Tab>Two</Tab>
                                                    <Tab>Three</Tab>
                                                </TabList>

                                                <TabPanels>
                                                    <TabPanel>
                                                        <p>one!</p>
                                                    </TabPanel>
                                                    <TabPanel>
                                                        <p>two!</p>
                                                    </TabPanel>
                                                    <TabPanel>
                                                        <p>three!</p>
                                                    </TabPanel>
                                                </TabPanels>
                                            </Tabs>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                                Close
                                            </Button>
                                            <Button variant="ghost">Secondary Action</Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </>
                        </Box>
                    </HStack>
                </Stack>
            </CardBody>
        </Card>
    )
}
