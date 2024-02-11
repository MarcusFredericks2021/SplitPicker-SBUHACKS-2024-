import { Card, CardHeader, CardBody, CardFooter , SimpleGrid, Heading, Text, Button, Select} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const ExerciseModalGrid = ()  => {

    const [maxIndex, setMaxIndex] = useState(9)
    const [allExercise, setAllExercise] = useState(undefined)
    const [currExerciseRange, setCurrExerciseRange] = useState(undefined)
    const [currGifUrls, setCurrGifUrls] = useState(undefined)


    useEffect(() => {
        (async () => {
            try{
                await axios.get('http://127.0.0.1:5000/get/exercise_coll/')
                .then((res) => {
                    console.log("Recieved exercise data")
                    //console.log(res)
                    setAllExercise(res.data);
                }, (error) => {
                    console.log(error)
                })
            } 
            catch (err) {
                console.log('Error occured reloading/mounting and fetching exercise info')
            }
        })()
        //If doesnt work put state variables in dependency array

    },[])

    useEffect(() => {
        (async () => {
            if (allExercise){
                // get gifs
                let exerciseCopy = [...allExercise]
                let putin = exerciseCopy.splice(0,maxIndex)
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

        if(direction == 0){
            if(maxIndex <= 9){
                return
            } else {
                if(maxIndex-9 < 9){
                    setMaxIndex(9)
                } else {
                    setMaxIndex(maxIndex-9)
                }
            } 
        } else {
            //If 1 (forward)
            if(maxIndex >= allExercise.data.length){
                setMaxIndex(allExercise.data.length-1)
            } else {
                setMaxIndex(maxIndex+9)
            }
        }

    }

    //const currExerciseRange = allExercise?.data.slice(maxIndex-9, maxIndex);

    let gifResponse = undefined

    


    let exerciseModalCards = (currExerciseRange?.map((exercise, index) => {
    
        return (
            <Card size='lg'>
                <CardHeader>
                    <Heading size='sm'>Exercise: {exercise.name}</Heading>
                    <Text size='sm'>Target Muscles: {exercise.target}</Text>
                    <Text size='sm'>Secondary Muscles: {exercise.secondaryMuscles.join(', ')}</Text>
                </CardHeader>
                <CardBody>
                {/* <img src={currGifUrls[index]} alt="Exercise GIF" /> */}
                </CardBody>
                <CardFooter>
                    <Text size='sm'>Equipment: {exercise.equipment}</Text>
                    {/* <Text size='sm'>{exercise.instructions.join(' ')}</Text> */}
                </CardFooter>
            </Card>
        );
    }));
    
    return (
        <SimpleGrid columns={[2, null, 3]} spacing='40px'>
            {exerciseModalCards}
        </SimpleGrid>
    );


}

export default ExerciseModalGrid