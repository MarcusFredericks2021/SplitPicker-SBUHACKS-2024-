import { Card, CardHeader, CardBody, CardFooter , SimpleGrid, Heading, Text, Button, Select} from '@chakra-ui/react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const ExerciseCard = ()  => {

    const [allExercise, setAllExercise] = useState(undefined)

    useEffect(() => {
        (async () => {
            try{
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
                console.log('Error occured reloading/mounting and fetching exercise info')
            }
        })()
        //If doesnt work put state variables in dependency array

    },[])




    //console.log(allExercise?.data)

    // allExerciseDropDown = 

    let setNumArray = Array.from({ length: 10 }, (v, i) => i+1);

    let repsNumArray = Array.from({ length: 30 }, (v, i) => i+1);

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

        return (
            <>
                <SimpleGrid spacing={25} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    <Card>
                        <CardHeader>
                        <Heading size='sm'> Select Exercise</Heading>
                        </CardHeader>
                        <CardBody>
                        {/* <Select placeholder='Select option'>
                            <option value='option1'>Get rid of dropdown</option>
                        </Select> */}
                        <Heading size='sm'> Insert Exercise Selected </Heading>
                        </CardBody>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                    <Card>
                    <CardHeader>
                        <Heading size='sm'> Select # of Sets</Heading>
                        </CardHeader>
                        <CardBody>
                        <Select placeholder='Select option'>
                            {setDropDownList}
                        </Select>
                        </CardBody>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                    <Card>
                    <CardHeader>
                        <Heading size='sm'> Select # of Reps</Heading>
                        </CardHeader>
                        <CardBody>
                        <Select placeholder='Select option'>
                            {repsDropDownList}
                        </Select>
                        </CardBody>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                    <Card>
                    <CardHeader>
                        <Heading size='sm'> Select Rest Time</Heading>
                        </CardHeader>
                        <CardBody>
                        <Select placeholder='Select option'>
                            {restDropDownList}
                        </Select>
                        </CardBody>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                    <Card>
                    <CardHeader>
                        <Heading size='sm'> Description/Gif</Heading>
                        </CardHeader>
                        <CardBody>
                        <Heading size='sm'> WIP (maybe a hover for gif showing but default is description)</Heading>
                        </CardBody>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                    </SimpleGrid>
    
    
            </>
        )
}
    
export default ExerciseCard

