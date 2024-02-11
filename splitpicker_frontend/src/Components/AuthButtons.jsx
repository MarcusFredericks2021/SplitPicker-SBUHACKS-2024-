import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Divider,
    IconButton, ListItem, OrderedList, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Skeleton,
} from '@chakra-ui/react';
import { UserAuth } from '../Context/AuthContext';
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import axios from 'axios';
import { API_URL } from '../Variables/apiVariables';

function AuthButtons(props) {
    const { user, anonymousUser, googleSignIn, anonymousSignIn, logOut } = UserAuth();
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (!user && !anonymousUser) {
            anonymousSignIn();
        }
        console.log(user);
    }, [user, anonymousSignIn, anonymousUser]);

    const loggedInComponent = <Popover>
        <PopoverTrigger>
            <IconButton as={CgProfile} onClick={() => { setRefresh(!refresh) }}>Profile</IconButton>
        </PopoverTrigger>
        <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
                {
                    //scoresComponent
                }
                <Button onClick={() => {
                    logOut();
                }}>Log Out</Button></PopoverBody>
        </PopoverContent>
    </Popover>

    const Component = !user ? (
        <IconButton as={FiLogIn} onClick={() => {
            googleSignIn();
            //refreshApp();
        }}>Sign In/Up (Google)</IconButton>) :
        loggedInComponent

    //console.log(user);

    return (
        Component
    );
}

export default AuthButtons;
