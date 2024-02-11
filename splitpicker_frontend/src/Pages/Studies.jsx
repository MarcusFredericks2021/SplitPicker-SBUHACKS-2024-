import { Box, Heading, Stack, SimpleGrid, Link, Card, CardHeader, CardBody, StackDivider, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons';

const Studies = () => {
    return (
        <div>
            <Heading align="center" p="4" style={{ fontFamily: "monospace" }}>
                Studies
            </Heading>
            <SimpleGrid columns={2} spacing={5} height="100vh" p="5" >
                <Box bg="gray.300" p={4} h="full" border="1px solid">
                    <Card h="full">
                        <CardHeader>
                            <Heading size='md'>Weekly Rest Study</Heading>
                        </CardHeader>
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Summary
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        The most optimal amount of time to rest is 48 hours in between workout days.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Impact on the scoring system
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Schedules with the rest time close to 48 hours will have a higher bias.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Link to the Study
                                    </Heading>
                                    <Link href='https://www.betterhealth.vic.gov.au/health/healthyliving/resistance-training-health-benefits' isExternal>
                                        Better Health <ExternalLinkIcon mx='2px' />
                                    </Link>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                </Box>

                <Box bg="gray.300" p={4} h="full" border="1px solid">
                    <Card h="full">
                        <CardHeader>
                            <Heading size='md'>Reaching Failure Study</Heading>
                        </CardHeader>
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Summary
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Failure can be reached in multiple different ways. Through pushing yourself with a heavy load and low rep count or a low load and high rep count.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Impact on the scoring system
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        It was found that failing through medium to high load produces the most efficient results. Schedules with these loads will have a higher bias.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Link to the Study
                                    </Heading>
                                    <Link href='https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8126497/' isExternal>
                                        NCBI <ExternalLinkIcon mx='2px' />
                                    </Link>
                                    <Link href='https://journals.lww.com/nsca-jscr/fulltext/2012/07000/Muscle_Activation_Strategies_During_Strength.21.aspx' isExternal pl="5">
                                        JSCR <ExternalLinkIcon mx='2px' />
                                    </Link>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                </Box>

                <Box bg="gray.300" p={4} h="full" border="1px solid">
                    <Card h="full">
                        <CardHeader>
                            <Heading size='md'>Efficient Rep Range Study</Heading>
                        </CardHeader>
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Summary
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        Using lower body exercises, this study found that applying a "medium" amount of reps was the most efficient for building muscle. This study used the same weights for all rep ranges: small, medium, and large.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Impact on the scoring system
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        We priortize having the user program a medium rep range for their schedule.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Link to the Study
                                    </Heading>
                                    <Link href='https://www.ingentaconnect.com/content/wk/jsc/2022/00000036/00000003/art00007' isExternal>
                                        Progressive Resistance Training Volume <ExternalLinkIcon mx='2px' />
                                    </Link>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                </Box>

                <Box bg="gray.300" p={4} h="full" border="1px solid">
                    <Card h="full">
                        <CardHeader>
                            <Heading size='md'>Varying Exercises Study</Heading>
                        </CardHeader>
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Summary
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        It was found that even though the exercises may be different, if they both workout the same muscle groups, they are effectivly the same in terms of muscle growth efficiency.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Impact on the scoring system
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        More variety of exercises will be offered if they work the same parts of the body.
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Link to the Study
                                    </Heading>
                                    <Link href='https://journals.lww.com/nsca-jscr/fulltext/2022/11000/does_varying_resistance_exercises_for_the_same.7.aspx' isExternal>
                                        JSCR <ExternalLinkIcon mx='2px' />
                                    </Link>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                </Box>
            </SimpleGrid>
        </div>
    )
}

export default Studies;