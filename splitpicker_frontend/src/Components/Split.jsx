import React, { useEffect, useState } from 'react'
import { SplitData } from '../Context/SplitContext';
import { Box, Select, Text } from '@chakra-ui/react';
import { Day } from './Day';

const Split = (props) => {
    const { refresh } = props;
    const { userData, saveDataToDatabase, selectedSplitId, setSelectedSplitId } = SplitData();
    const [splitData, setSplitData] = useState([]);
    const [splitId, setSplitId] = useState(-1);
    useEffect(() => {
        //console.log(JSON.stringify(userData));
        // Iterate through userData splits and send axios requests
        // setSplitData

        // test using userData["splits"]
        setSplitData(userData["splits"]);

        //(saveDataToDatabase)();
        //if (userData["splits"].length > 0)
        //setSplitId(userData["splits"][0]?._id?.$oid)
        // console.log("Split", splitData);
    }, [setSplitData, userData]);

    /*
    useEffect(() => {
        splitData && console.log(Object.keys(splitData[selectedSplitId]));
    }, [selectedSplitId])
    */
    return (
        <Box className='mt-5'>
            <Box className='mx-96'>
                <Select isRequired placeholder='Select Split To View/Edit' onChange={(ev) => setSelectedSplitId(ev.target.value)}>
                    {
                        userData && userData["splits"].map((split, idx) => {
                            //console.log(refresh);
                            return <option key={split._id.$oid} value={idx}> {split?.name}</option>
                        }
                        )
                    }
                </Select>
            </Box>
            <Box className='mt-5'>
                {
                    selectedSplitId != -1 && splitData[selectedSplitId] != undefined && Object.keys(splitData[selectedSplitId]).map((field, idx) => {
                        console.log(splitData[selectedSplitId][field]);
                        if (field.includes("day"))
                            return <Day key={selectedSplitId + idx} data={splitData[selectedSplitId][field]} dayNumber={field.replace('day', '')} />
                        return <></>
                    }
                    )
                }
            </Box>
        </Box >
    )
}

export default Split