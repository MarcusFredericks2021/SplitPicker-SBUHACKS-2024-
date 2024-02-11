import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Text, Button, Select, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Accordion, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Stack, StackDivider, UnorderedList, ListItem } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const ExerciseCard = (props) => {

    const [allExercise, setAllExercise] = useState(undefined)

    const { exerciseData, reps, sets, rest } = props;

    useEffect(() => {
        (async () => {
            try {
                await axios.get('http://127.0.0.1:5000/get/exercise_coll/')
                    .then((res) => {
                        console.log("Recieved exercise data")
                        //console.log(res)
                        setAllExercise(res)
                    }, (error) => {
                        console.log(error)
                    })
            }
            catch (err) {
                console.log('Error occurred reloading/mounting and fetching exercise info')
            }
        })()
        //If doesnt work put state variables in dependency array

    }, [])




    //console.log(allExercise?.data)

    // allExerciseDropDown = 

    let setNumArray = Array.from({ length: 10 }, (v, i) => i + 1);

    let repsNumArray = Array.from({ length: 30 }, (v, i) => i + 1);

    let restNumArray = Array.from({ length: 600 / 30 }, (_, index) => (index * 30) + 30);


    const setDropDownList = setNumArray.map((number) => (
        <option key={number} value={number}>{number}</option>
    ));

    const repsDropDownList = repsNumArray.map((number) => (
        <option key={number} value={number}>{number}</option>
    ));

    const restDropDownList = restNumArray.map((number) => (
        <option key={number} value={number}>{number}</option>
    ));

    const capitalizeWords = (inputString) => {
        return inputString
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return (
        <SimpleGrid className='mx-auto' spacing={25} columns={5}>
            <Card>
                <CardHeader>
                    <Heading size='sm'>Exercise Name</Heading>
                </CardHeader>
                <CardBody>
                    {/* <Select placeholder='Select option'>
                            <option value='option1'>Get rid of dropdown</option>
                        </Select> */}
                    <Heading size='sm'>{exerciseData.name}</Heading>
                </CardBody>
                <CardFooter>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <Heading size='sm'>Select # of Sets</Heading>
                </CardHeader>
                <CardBody>
                    <Select placeholder={sets}>
                        {setDropDownList}
                    </Select>
                </CardBody>
                <CardFooter>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <Heading size='sm'>Select # of Reps</Heading>
                </CardHeader>
                <CardBody>
                    <Select placeholder={reps}>
                        {repsDropDownList}
                    </Select>
                </CardBody>
                <CardFooter>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <Heading size='sm'>Select Rest Time</Heading>
                </CardHeader>
                <CardBody>
                    <Select placeholder={rest}>
                        {restDropDownList}
                    </Select>
                </CardBody>
                <CardFooter>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <Heading size='sm'>Information About Exercise</Heading>
                </CardHeader>
                <CardBody>
                    <Popover>
                        <PopoverTrigger>
                            <Button>Click For Info</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Information About This Exercise</PopoverHeader>
                            <PopoverBody>
                                <Card key={exerciseData.name} className='outline my-10 mx-2'>
                                    <CardHeader fontSize='2xl'>{exerciseData.name}</CardHeader>
                                    <CardBody>
                                        <Stack divider={<StackDivider />} spacing='4'>
                                            <SimpleGrid columns={2} spacing={10}>
                                                <Box>
                                                    <Heading size='xs' textTransform='uppercase'>
                                                        Body Part Hit
                                                    </Heading>
                                                    <Text pt='2' fontSize='sm'>
                                                        {capitalizeWords(exerciseData.bodyPart)}
                                                    </Text>
                                                </Box>
                                                <Box>
                                                    <Heading size='xs' textTransform='uppercase'>
                                                        Target
                                                    </Heading>
                                                    <Text pt='2' fontSize='sm'>
                                                        {capitalizeWords(exerciseData.target)}
                                                    </Text>
                                                </Box>
                                            </SimpleGrid>
                                            <Box>
                                                <Heading size='xs' textTransform='uppercase'>
                                                    Equipment
                                                </Heading>
                                                <Text pt='2' fontSize='sm'>
                                                    {capitalizeWords(exerciseData.equipment)}
                                                </Text>
                                            </Box>
                                            <Box>
                                                <Heading size='xs' textTransform='uppercase'>
                                                    Secondary Muscles
                                                </Heading>
                                                <Text pt='2' fontSize='sm'>
                                                    <UnorderedList>
                                                        {Array.from(exerciseData.secondaryMuscles).map((muscle) => {
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
                                                        {exerciseData.instructions && exerciseData.instructions.map((instruction, idx) => (
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
                                </Card>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </CardBody>
            </Card>
        </SimpleGrid>
    )
}

export default ExerciseCard

