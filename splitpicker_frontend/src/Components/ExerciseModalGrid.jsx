import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Text, Button, Select, StackDivider, Stack, Box, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, ListItem, UnorderedList } from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { SplitData } from '../Context/SplitContext'

const ExerciseModalGrid = (props) => {

    const [maxIndex, setMaxIndex] = useState(9)
    const [allExercise, setAllExercise] = useState(undefined)
    const [currExerciseRange, setCurrExerciseRange] = useState(undefined)
    const [currGifUrls, setCurrGifUrls] = useState(undefined)

    const { dayNumber, closeModal } = props;

    const { addExerciseToDay } = SplitData();

    useEffect(() => {
        (async () => {
            try {
                await axios.get('http://127.0.0.1:5000/get/exercise_coll/')
                    .then((res) => {
                        console.log("Received exercise data")
                        //console.log(res)
                        setAllExercise(res.data);
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

    useEffect(() => {
        (async () => {
            if (allExercise) {
                // get gifs
                let exerciseCopy = [...allExercise]
                let putin = exerciseCopy.splice(0, maxIndex)
                console.log(putin)
                setCurrExerciseRange(putin)
                const getGifURL = async (id) => {
                    const options = {
                        method: 'GET',
                        url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
                        headers: {
                            'X-RapidAPI-Key': 'a5af30b89emshb4a9968c2717d01p15a4d5jsn4a11f4562624',
                            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                        }
                    };

                    try {
                        gifResponse = await axios.request(options);
                        console.log(gifResponse.data.gifUrl);
                        console.log("returning url")

                        return gifResponse.data.gifUrl
                    } catch (error) {
                        console.error(error);
                    }
                }
                let temp = []
                console.log(putin)
                // for(let exer_idx in putin){
                //     //let currExercise = currExerciseRange[exer_idx];
                //     // get id let exerid = ....
                //     console.log("printind")
                //     console.log(exer_idx.id)
                //     await getGifURL(exer_idx.id).then((res) => {
                //         console.log(res)
                //         temp.push(res);
                //     })


                // }

                // console.log(temp)

                // setCurrGifUrls(temp)


            }
        })()
    }, [allExercise, maxIndex])

    const interceptIndexChangeState = (direction) => {
        //If direction is == 0, means go back. If == 1, then go forward.

        if (direction == 0) {
            if (maxIndex <= 9) {
                return
            } else {
                if (maxIndex - 9 < 9) {
                    setMaxIndex(9)
                } else {
                    setMaxIndex(maxIndex - 9)
                }
            }
        } else {
            //If 1 (forward)
            if (maxIndex >= allExercise.data.length) {
                setMaxIndex(allExercise.data.length - 1)
            } else {
                setMaxIndex(maxIndex + 9)
            }
        }

    }

    //const currExerciseRange = allExercise?.data.slice(maxIndex-9, maxIndex);

    let gifResponse = undefined


    const capitalizeWords = (inputString) => {
        return inputString
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    const handleExerciseSelection = (exercise_data) => {
        console.log(dayNumber);
        addExerciseToDay(dayNumber, exercise_data);
    }

    let exerciseModalCards = (currExerciseRange?.map((exercise, index) => {
        let name = exercise.name;
        let bodypart = exercise.bodyPart;
        let equipment = exercise.equipment;
        let instructions = Array.from(exercise.instructions);
        let target = exercise.target;
        let secondaryMuscles = Array.from(exercise.secondaryMuscles);
        return (
            <Card key={name} className='outline my-10 mx-2'>
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
                <CardFooter>
                    <Button onClick={() => {
                        addExerciseToDay(dayNumber, exercise);
                        closeModal();
                    }}>
                        Set
                    </Button>
                </CardFooter>
            </Card>
        );
    }));

    return (
        <SimpleGrid columns={[2, null, 3]} spacing='40px'
            maxHeight="70vh" // Set the desired height
            overflowY="scroll" // Enable vertical scrolling
        >
            {exerciseModalCards}
        </SimpleGrid >
    );


}

export default ExerciseModalGrid