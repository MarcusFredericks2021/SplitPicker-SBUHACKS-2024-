import { Button, Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'

const ScoreBoard = () => {
    /*
    <CardFooter>
        <Button>View here</Button>
    </CardFooter>
    */
    return (
        <SimpleGrid className='outline grid-flow-col p-5 mx-16' spacing={4}>
            <Card>
                <CardHeader>
                    <Heading size='md'>Score</Heading>
                </CardHeader>
                <CardBody>
                    <Text>4/5</Text>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                    <Heading size='md'>Total Volume</Heading>
                </CardHeader>
                <CardBody>
                    <Text>100</Text>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                    <Heading size='md'>Time For Completion</Heading>
                </CardHeader>
                <CardBody>
                    <Text>2 Seconds</Text>
                </CardBody>
            </Card>
        </SimpleGrid >
    )
}

export default ScoreBoard