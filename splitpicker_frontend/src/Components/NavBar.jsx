import {
    Box,
    Flex,
    Avatar,
    HStack,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useToast,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom'
import AuthButtons from './AuthButtons';
import { SplitData } from '../Context/SplitContext';
import { UserAuth } from '../Context/AuthContext';
import { useRef, useState } from 'react';

const Links = ['builder', 'exercises', 'splits', 'about'];

export default function NavBar(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { createNewSplit } = SplitData();
    const { user } = UserAuth();
    const toast = useToast();

    const { isOpen: createIsOpen, onOpen: onCreateIsOpen, onClose: onCreateIsClose } = useDisclosure();
    const cancelRef = useRef()


    const [newSplitName, setNewSplitName] = useState('');
    const [newSplitDesc, setNewSplitDesc] = useState('');

    const { refreshApp } = props;
    const createNewSplitHandler = async () => {
        if (user) {
            const createNewSplitPromise = createNewSplit(user.uid, newSplitName, newSplitDesc, refreshApp);
            toast.promise(createNewSplitPromise, {
                success: { title: 'New Split Created', description: 'Created New Split! Select it!' },
                error: { title: 'Split Failed To Create :(', description: 'Something went wrong... Please contact an administrator' },
                loading: { title: 'Creating New Split...', description: 'Please wait! :)' },
            })
            //refreshApp();
        }
    }


    const handleNameChange = (e) => setNewSplitName(e.target.value);
    const handleDescChange = (e) => setNewSplitDesc(e.target.value);

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>SplitPicker</Box>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink to={link} className={({ isActive }) => isActive ? 'text-green-500' : 'text-white'}>{link.charAt(0).toUpperCase() + link.slice(1)}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Button
                            variant={'solid'}
                            colorScheme={'blue'}
                            size={'sm'}
                            mr={4}
                            leftIcon={<AddIcon />}
                            onClick={onCreateIsOpen}>
                            Create New Split
                        </Button>
                        <AlertDialog
                            isOpen={createIsOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={onCreateIsClose}
                        >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                        Create New Split
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        <FormControl>
                                            <FormLabel>New Split Name</FormLabel>
                                            <Input onChange={handleNameChange} input={newSplitName} type='name' />
                                            <FormHelperText>Enter a Name for the new Split</FormHelperText>
                                        </FormControl>

                                        <FormControl className='my-5'>
                                            <FormLabel>New Split Description</FormLabel>
                                            <Input onChange={handleDescChange} input={newSplitDesc} type='description' />
                                            <FormHelperText>Enter a Description for the new Split</FormHelperText>
                                        </FormControl>
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={onCreateIsClose}>
                                            Cancel
                                        </Button>
                                        <Button colorScheme='green' onClick={async () => {
                                            await createNewSplitHandler();
                                            onCreateIsClose();
                                        }} ml={3}>
                                            Create
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                        <AuthButtons />
                        {/*
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <AuthButtons />
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Link 1</MenuItem>
                                <MenuItem>Link 2</MenuItem>
                                <MenuDivider />
                                <MenuItem>Link 3</MenuItem>
                            </MenuList>
                        </Menu>
                        */}
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink to={link}>{link.charAt(0).toUpperCase() + link.slice(1)}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    )
}