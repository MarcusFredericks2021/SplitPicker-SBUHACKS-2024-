import { useContext, createContext, useState, useEffect } from 'react';
import { UserAuth } from './AuthContext';
import axios from "axios";

const SplitContext = createContext()

export const SplitContextProvider = ({ children }) => {
    const { user } = UserAuth();

    const exampleExercise = {
        "_id": { "$oid": "9031230902349" },
        "bodyPart": "waist",
        "equipment": "body weight",
        "gifUrl": "https://v2.exercisedb.io/image/Hw0imkDQHuJxNO",
        "id": "0001",
        "name": "3/4 sit-up",
        "target": "abs",
        "secondaryMuscles": ["hip flexors", "lower back"],
        "instructions": [
            "Lie flat on your back with your knees bent and feet flat on the ground.",
            "Place your hands behind your head with your elbows pointing outwards.",
            "Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle.",
            "Pause for a moment at the top, then slowly lower your upper body back down to the starting position.",
            "Repeat for the desired number of repetitions."
        ]
    }

    const exampleSplit = {
        "_id": { "$oid": "65c704ff8db5d588ced50627" },
        "name": "Da Greatest PPL TEST WOOWOOWOWOWO",
        "description": "Whats there to describe? Its the greatest PPL",
        "day1": {
            "is_rest": false,
            "description": "This is day 1",
            "exercises": [exampleExercise, exampleExercise],
            "set": [3, 3],
            "reps": [10, 10],
            "rest": [30, 30],
        },
        "day2": {
            "is_rest": false,
            "description": "This is day 2",
            "exercises": [],
            "set": [3, 3],
            "reps": [10, 10],
            "rest": [30, 30],
        },
        "day3": {
            "is_rest": false,
            "description": "This is day 3",
            "exercises": [],
            "set": [3, 3],
            "reps": [10, 10],
            "rest": [30, 30],
        },
        "day4": {
            "is_rest": true,
            "description": "This is day 4",
            "exercises": [],
            "set": [],
            "reps": [],
            "rest": [],
        },
        "day5": {
            "is_rest": true,
            "description": "This is day 5",
            "exercises": [],
            "set": [],
            "reps": [],
            "rest": [],
        },
        "day6": {
            "is_rest": true,
            "description": "This is day 6",
            "exercises": [],
            "set": [],
            "reps": [],
            "rest": [],
        },
        "day7": {
            "is_rest": false,
            "description": "This is day 7",
            "exercises": [exampleExercise],
            "set": [3, 3],
            "reps": [10, 10],
            "rest": [30, 30],
        },
    }

    const exampleUserData = {
        "_id": "1",
        "firebase_id": "129012903212",
        "username": "chris@gmail.com",
        "email": "chris@gmail.com",
        "full_name": "chris kim",
        "splits": [exampleSplit],
    }

    const generateObjectId = () => {
        const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
            return (Math.random() * 16 | 0).toString(16);
        }).toLowerCase();
    }

    const randomObjectId = String(generateObjectId());
    console.log(randomObjectId);

    const [currentSplitId, setCurrentSplitId] = useState("1");
    const [dataLoaded, setDataLoaded] = useState(false);

    const [userData, setUserData] = useState(exampleUserData);
    const [selectedSplitId, setSelectedSplitId] = useState(-1);

    useEffect(() => {
        if (user)
            (loadUserData)();
        else if (dataLoaded) {
            setSelectedSplitId(-1);
            setUserData(exampleUserData);
            setDataLoaded(false);
        }
    }, [user])


    const loadUserData = async () => {
        try {
            await axios.get('http://127.0.0.1:5000/get_user_by_firebase_id/' + user.uid).then(async (response) => {
                console.log("LOADED USER DATA: ");
                //setUserData(response.data[0]);

                console.log(JSON.stringify(response.data));
                let user_data = response.data;
                let splits = response.data.splits;
                let split_ids = [];
                for (let split in splits) {
                    //"/get_by_ids/<collection_name>/";
                    //console.log(split);
                    let id = splits[split]["$oid"];
                    split_ids.push(id);
                }
                let final_splits = [];
                //console.log(split_ids);
                await axios.post('http://127.0.0.1:5000/get_by_ids/Splits/',
                    {
                        "ids": split_ids

                    }).then(async (response) => {
                        //console.log(JSON.stringify(response.data));
                        for (let split_index in response.data) {
                            let split = response.data[split_index];
                            for (let split_key in split) {
                                if (split_key.includes("day")) {
                                    let split_data = split[split_key];
                                    let exercise_oids = split_data["exercises"];
                                    let exercise_ids = [];;
                                    for (let exercise_index in exercise_oids) {
                                        //console.log(exercise_oids[exercise_index])
                                        let exercise_id = exercise_oids[exercise_index]["$oid"];
                                        exercise_ids.push(exercise_id);
                                    }
                                    //console.log("exerciseid" + exercise_id);

                                    await axios.post('http://127.0.0.1:5000/get_by_ids/exercise_coll/',
                                        {
                                            "ids": exercise_ids

                                        }).then(async (response) => {
                                            //console.log('exercisedata', JSON.stringify(response.data));
                                            split_data["exercises"] = response.data;
                                        }, (error) => {
                                            console.log(error);
                                        });
                                    split[split_key] = split_data;
                                }
                            }
                            final_splits.push(split);
                        }
                    }, (error) => {
                        console.log(error);
                    });
                user_data.splits = final_splits;
                setUserData(user_data);
                //(saveDataToDatabase)();
                setDataLoaded(true);
                //(saveDataToDatabase)();
            }, (error) => {
                console.log(error);
            });
        } catch (err) {
            console.log('Error occurred when fetching User Data.');
            console.log(err);
        }
    }
    //console.log(JSON.stringify(userData));

    const saveDataToDatabase = async () => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.stsTokenManager.accessToken
            }
        }

        if (!dataLoaded) {
            console.log("Data not loaded yet! Not Updating on MongoDB!")
            return;
        }
        console.log("Data loaded!!!");

        let splits = userData.splits;

        for (let split_index in splits) {
            let split = splits[split_index];
            for (let split_key in split) {
                if (split_key.includes("day")) {
                    let exercise_oids = [];
                    let exercises = split[split_key]["exercises"];
                    for (let exercise_index in exercises) {
                        let oid = exercises[exercise_index]["_id"];
                        exercise_oids.push(oid);
                    }
                    split[split_key]["exercises"] = exercise_oids;
                }
            }
            //splits[split_index] = split;
            await axios.post('http://127.0.0.1:5000/update/Splits/',
                {
                    "document": split

                }).then(async (response) => {
                    //console.log('exercisedata', JSON.stringify(response.data));
                    console.log(response.data)
                }, (error) => {
                    console.log(error);
                });
        }


        //setUserData(userData);
    }

    const getSplitsFromDatabase = async (ids) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.stsTokenManager.accessToken
            }
        }
        await axios.post('http://127.0.0.1:5000/getUserSplits', {
            'user_id': user.uid,
            'data': ids
        }, options).then((response) => {
            console.log("Grabbed From Database (mongodb)");
            console.log(JSON.stringify(response.data));
            return response.data.splits;
        }, (error) => {
            console.log(error);
        });
    }

    const createNewSplit = async (owner_id, name, description, refreshApp) => {//, name, description) => {
        if (name == '') {
            name = "Blank Name"
        }
        if (description == '') {
            description = "Blank Description"
        }
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.stsTokenManager.accessToken
            }
        }
        console.log("Sending request to create new split");
        await axios.post('http://127.0.0.1:5000/create_new_split',
            {
                "owner": owner_id,
                "name": name,
                "description": description

            }).then(async (response) => {
                console.log("new split response:", response.data._id.$oid);
                setCurrentSplitId(response.data._id.$oid)

                //console.log(response.data)
                refreshApp();
            }, (error) => {
                console.log(error);
            });
    }
    //clearAsyncStorage();

    const deleteSplit = (split_id) => {
        var index = userData["splits"].indexOf(split_id);
        if (index > -1) {
            userData["splits"].splice(index, 1);
        }
        setUserData(userData);
    }

    const changeSplitName = (split_id, new_split_name) => {
        userData["splits"][split_id]["name"] = new_split_name;
        userData(userData);
    }

    const addNewSplit = async (name, description) => {
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user.stsTokenManager.accessToken
            }
        }

        await axios.post('http://127.0.0.1:5000/createNewSplit', {
            'user_id': user.uid,
            'name': name,
            'description': description,
        }, options).then((response) => {
            console.log("Saved to Database (mongodb)");
            console.log(JSON.stringify(response.data));
            userData["splits"].append(response["_id"]["$oid"])
            setUserData(userData);
        }, (error) => {
            console.log(error);
        });
    }

    const setSplit = (split_id) => {
        setCurrentSplitId(split_id);
        //saveSplitDataLocally();
    }

    /*
    const addExerciseToDay = (day_number, exerise) => {
        let newSplitData = splitData[currentSplitId].split_data.push({
            day_name: "",
            exercises: []
        })
        setSplitData(newSplitData);
    }
     
    const setExercise = (dayIndex, exerciseIndex, exerciseData) => {
        //let exerciseData = exerciseData;
        
        exerciseData = {
            exercise_name: "",
            reps: 0,
            sets: 0
        }
        
    splitData[currentSplitId].split_data[dayIndex]['exercises'][exerciseIndex] = exerciseData
    setSplitData(splitData);
    saveSplitDataLocally();
    //console.log(day);
    //console.log(splitData[dayIndex])
     
     
    //let newSplitData = splitData.find((split_day) => split_day.day_name == day).exercises.push(exerciseData);
    //setSplitData(newSplitData);
    }
     
    const setExerciseSetsandReps = (dayIndex, exerciseIndex, newSets, newReps) => {
    splitData[currentSplitId].split_data[dayIndex]['exercises'][exerciseIndex]["amountOfSets"] = newSets;
    splitData[currentSplitId].split_data[dayIndex]['exercises'][exerciseIndex]["amountOfReps"] = newReps;
    console.log(splitData[currentSplitId].split_data[dayIndex]['exercises'][exerciseIndex]);
    setSplitData(splitData);
    saveSplitDataLocally();
    }
     
    const addNewExercise = () => {
     
    }
     
    const removeExercise = (dayIndex, exerciseIndex) => {
    splitData[currentSplitId].split_data[dayIndex]["exercises"].splice(exerciseIndex, 1);
    setSplitData(splitData);
    saveSplitDataLocally();
    }
    */
    return (<SplitContext.Provider value={{ selectedSplitId, setSelectedSplitId, loadUserData, userData, currentSplitId, createNewSplit, saveDataToDatabase, addNewSplit, setSplit, changeSplitName, deleteSplit }}>{children}</SplitContext.Provider>)
}

export const SplitData = () => {
    return useContext(SplitContext)
}