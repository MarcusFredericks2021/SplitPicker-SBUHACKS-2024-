import { Box, Button, Card, CardBody, CardHeader, IconButton, Modal, Portal, Tab, TabList, TabPanel, TabPanels, Tabs, Tag, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { SplitData } from '../Context/SplitContext';


const ExerciseSelector = (props) => {
    const { setExercise } = SplitData();
    const [visible, setVisible] = useState(false);
    const [tab, setTab] = useState('preset'); // Default tab, change later.

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 30 };

    const [refreshExerciseCard, setRefreshExerciseCard] = props.refreshExerciseCard;
    const exerciseName = props?.exerciseName;
    const exerciseNumber = props?.exerciseNumber;
    const dayNumber = props?.dayNumber;
    const presetExercises = props.presetExercises;


    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const tempPresetExercises = [
        {
            blankExercise: false,
            exerciseName: "Dumbbell Bench Press",
            amountOfReps: 5,
            amountOfSets: 5,
            machineName: "Dumbbell",
            bodyPartsWorked: ["Chest"]
        },
        {
            blankExercise: false,
            exerciseName: "Barbell Bench Press",
            amountOfReps: 5,
            amountOfSets: 5,
            machineName: "Flat Bench Barbell",
            bodyPartsWorked: ["Chest"]
        },
        {
            blankExercise: false,
            exerciseName: "Dumbbell Shoulder Press",
            amountOfReps: 5,
            amountOfSets: 5,
            machineName: "Dumbbell",
            bodyPartsWorked: ["Shoulder"]
        },
        {
            blankExercise: false,
            exerciseName: "Lat Pulldown",
            amountOfReps: 5,
            amountOfSets: 5,
            machineName: "Lat Pulldown",
            bodyPartsWorked: ["Back"]
        }
    ]



    const presetExerciseCards = () => {
        // Some list of exercises
        // Replace this with database stuff
        return (
            presetExercises.map((exerciseData, index) => {
                if (exerciseData.exerciseName.toLowerCase().includes(searchQuery.toLowerCase()))
                    return (
                        <Card key={index + "_preset_exercise_card"}>
                            <CardHeader
                                title={exerciseData.exerciseName}
                            />
                            <CardBody>
                                <Text>
                                    Yes.
                                </Text>
                                <IconButton
                                    icon="checkbox-marked-circle-plus-outline"
                                    size={20}
                                    onPress={() => {
                                        console.log("PLUS!!");
                                        setExercise(dayNumber - 1, exerciseNumber - 1, exerciseData);
                                        setRefreshExerciseCard(!refreshExerciseCard);
                                    }}
                                />
                            </CardBody>
                        </Card>
                    )
            })
        )
    }


    const exerciseTab = () => {
        switch (tab) {
            case 'preset':
                //style={tw`w-full flex justify-center items-center flex-col`}
                return (<>
                    {presetExerciseCards()}
                </>
                );
            case 'community':
                return <Text> Community! </Text>;
            case 'user':
                return <Text> User! </Text>;
            case 'create':
                return <Text> Create! </Text>
            default:
                return <Text> IDK. </Text>;
        }
    }

    return (
        <Box>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Tabs>
                        <TabList>
                            <Tab>Preset Exercises</Tab>
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
                </Modal>
            </Portal>
            <Button icon="arm-flex-outline" mode="contained" onPress={showModal}>
                Select Exercise
            </Button>
        </Box>

    );
}
export default ExerciseSelector;