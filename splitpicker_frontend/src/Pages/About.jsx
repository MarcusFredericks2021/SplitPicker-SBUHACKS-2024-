import { Box, SimpleGrid, Heading, Text, Image } from "@chakra-ui/react";
import sbuhacks2024 from '../sbuhacks2024.jpg';

const About = () => {
    return (
        <SimpleGrid columns={2} spacing={10} height="100vh" bgRepeat="no-repeat" bgSize="100% 100%" position="relative">
            <Box height='full' p="6" paddingTop="110" paddingLeft="50" fontSize='3xl' color='white' style={{ fontFamily: "monospace" }}><Heading style={{ fontStyle: "italic", fontFamily: "monospace" }} >About Us</Heading>
                We wanted to create this web application to reduce the time it takes to get a proper gym schedule and actually get someone into the gym. We combined all of our experiences with the help of studies to make a scoring system. This system takes into account [marcus adds whatever its comprised of].
            </Box>
            <Box height='full' justifyContent="center" alignItems="center" display="flex">
                <Image
                    src={sbuhacks2024}
                    borderRadius='85%'
                    boxSize='85%' />
            </Box>
        </SimpleGrid>
    )
}
export default About;