'use client'

import {
  Box,
  VStack,
  Button,
  Flex,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
} from '@chakra-ui/react'



const Feature = ({ heading, text }) => {
  return (
    <GridItem>
      <chakra.h3 fontSize="xl" fontWeight="600">
        {heading}
      </chakra.h3>
      <chakra.p>{text}</chakra.p>
    </GridItem>
  )
}

const GridListWithCTA = () => { 
    const handleLearnMoreClick = () => {
        window.location.href = "/studies";
    }

  return (
    <Box as={Container} maxW="7xl" mt={14} p={4}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        gap={4}>
        <GridItem colSpan={1}>
          <VStack alignItems="flex-start" spacing="20px">
            <chakra.h2 fontSize="3xl" fontWeight="700">
              Recommendations backed by science.
            </chakra.h2>
            <Button onClick = {handleLearnMoreClick} colorScheme="green" size="md">
              See our sources
            </Button>
          </VStack>
        </GridItem>
        <GridItem>
          <Flex>
            <chakra.p>
              We did the research so you don't have. Never get fooled by the latest trend or sellout influencers.
            </chakra.p>
          </Flex>
        </GridItem>
      </Grid>
      <Divider mt={12} mb={12} />
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        gap={{ base: '8', sm: '12', md: '16' }}>
        <Feature
          heading={'Build Your Workout Split'}
          text={'Build your own workout split with over 1000+ exercises options for all muscle groups'}
        />
        <Feature
          heading={'Optimized Workout Assured'}
          text={'Our scoring system ensures that you have an optimal workouts so you make the most of your efforts'}
        />
        <Feature
          heading={'Share Your Split With Others'}
          text={'Share your split with friends and use other workouts published in the SplitPicker community'}
        />
        <Feature
          heading={'Create exercises'}
          text={'One of your favorite exercises missing? No worries. Add your own and continue split picking.'}
        />
      </Grid>
    </Box>
  )
}

export default GridListWithCTA