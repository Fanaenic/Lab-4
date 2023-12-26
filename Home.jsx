import React, { useState } from 'react'
import {
    chakra,
    Button,
    List,
    ListItem,
    Heading,
    Flex,
    Input,
    Text,
} from '@chakra-ui/react'

export const Home = () => {
    const [todos, setTodos] = useState([])
    const [text, setText] = useState('')
    const [filterText, setFilterText] = useState('');
    const [sortByCompleted, setSortByCompleted] = useState(false);

    const createTodoHandler = (text) => {
        setTodos((prevState) => [
            ...prevState,
            { id: Date.now(), text, completed: false }, // Add the 'completed' property
        ]);
        setText('');
    };

    const removeTodoHandler = (id) => {
        setTodos((prevState) => prevState.filter((todo) => todo.id !== id))
    }
    const toggleTodoCompletion = (id) => {
        setTodos((prevState) =>
            prevState.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const filteredTodos = todos.filter((todo) =>
        todo.text.toLowerCase().includes(filterText.toLowerCase())
    );
    const sortedTodos = [...filteredTodos].sort((a, b) => {
        if (sortByCompleted) {
            return a.completed ? 1 : b.completed ? -1 : 0;
        } else {
            return 0;
        }
    });



    return (
        <Flex
            flexDirection="column"
            h="100vh"
            w="100vw"
            m="1rem"
            gap="1rem"
            alignItems="center"
        >
            <Heading textTransform="uppercase">Todo List</Heading>
            <Input
                placeholder="Фильтр по имени"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                w="300px"
                h="32px"
            />
            <Button
                onClick={() => setSortByCompleted(!sortByCompleted)}
                w="fit-content"
                background="purple.500"
                color="white"
                _hover={{
                    background: 'purple.600',
                }}
            >
                {sortByCompleted ? 'Сортировать по имени' : 'Сортировать по состоянию'}
            </Button>
            <List
                h="60vh"
                w="70vw"
                display="flex"
                flexDirection="column"
                overflowY="scroll"
                border="2px solid black"
                borderRadius="md"
                p="10px"
            >
                {filteredTodos.map((todo) => (
                    <ListItem
                        key={todo.id}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom="1px solid gray"
                        py="8px"
                    >
                        <Text>{todo.text}</Text>
                        <Button
                            onClick={() => removeTodoHandler(todo.id)}
                            background="red.500"
                            color="white"
                            _hover={{
                                background: 'red.600',
                            }}
                        >
                            Удалить
                        </Button>
                    </ListItem>
                ))}
                {sortedTodos.map((todo) => (//сортировка по состоянию
                    <ListItem
                        key={todo.id}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom="1px solid gray"
                        py="8px"
                    >
                        <Text
                            textDecoration={todo.completed ? 'line-through' : 'none'}
                            color={todo.completed ? 'gray.400' : 'inherit'}
                        >
                            {todo.text}
                        </Text>
                        <Button//создание кнопки для состояния
                            onClick={() => toggleTodoCompletion(todo.id)}
                            background={todo.completed ? 'green.500' : 'red.500'}
                            color="white"
                            _hover={{
                                background: todo.completed ? 'green.600' : 'red.600',
                            }}
                        >
                            {todo.completed ? 'Отменить' : 'Завершить'}
                        </Button>
                    </ListItem>
                ))}
            </List>
            <chakra.form
                onSubmit={(e) => {
                    e.preventDefault() // Без перезагрузки приложения после добавления задачи
                    createTodoHandler(text)
                }}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="20px"
            >
                <Input
                    placeholder="Напишите задачу..."
                    maxLength={80}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    w="300px"
                    h="32px"
                />
                <Button
                    isDisabled={!text.trim().length}
                    type="submit"
                    w="fit-content"
                    background="blue.500"
                    color="white"
                    _hover={{
                        background: 'blue.600',
                    }}
                >
                    Добавить задачу
                </Button>
            </chakra.form>
        </Flex>
    )
}