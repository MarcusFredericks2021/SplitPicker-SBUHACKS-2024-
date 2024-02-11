import React, { useEffect, useState } from 'react'
import { SplitData } from '../Context/SplitContext';
import { Box, Select } from '@chakra-ui/react';
import { Day } from './Day';

const Split = () => {
    const { userData, saveDataToDatabase } = SplitData();
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
        splitData && console.log(Object.keys(splitData[splitId]));
    }, [splitId])
    */
    return (
        <Box className='mt-5'>
            <Box className='mx-96'>
                <Select isRequired placeholder='Select Split To View/Edit' onChange={(ev) => setSplitId(ev.target.value)}>
                    {
                        userData && userData["splits"].map((split, idx) => {
                            return <option key={split._id.$oid} value={idx}> {split?.name}</option>
                        }
                        )
                    }
                </Select>
            </Box>
            <Box className='mt-5'>
                {
                    splitId != -1 && splitData[splitId] != undefined && Object.keys(splitData[splitId]).map((field, idx) => {
                        console.log(splitData[splitId][field]);
                        if (field.includes("day"))
                            return <Day key={splitId + idx} data={splitData[splitId][field]} dayNumber={field.replace('day', '')} />
                        return <></>
                    }
                    )
                }
            </Box>
        </Box >
    )
}

export default Split