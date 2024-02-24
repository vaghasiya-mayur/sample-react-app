import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { getTaskListAction, addTaskAction, deleteTaskAction } from "./actions/HomeAction";
import { GET_USER_TASK_LIST, DELETE_USER_TASK, ADD_UPDATE_USER_TASK } from "./utils/URL";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Home = () => {
    const dispatch = useDispatch();
    const { taskList, addedTask, deleteTask } = useSelector((store) => store.HomeReducer);
    const [todoTask, setTodoTask] = useState([]);
    const [progressTask, setProgressTask] = useState([]);
    const [doneTask, setDoneTask] = useState([]);
    const [showAddTask, setShowAddTask] = useState(false);

    const [label, setLabel] = useState("");
    const [desc, setDesc] = useState("");

    const [editObj, setEditObj] = useState({});

    useEffect(() => {
        dispatch(getTaskListAction(GET_USER_TASK_LIST));
    }, []);

    useEffect(() => {
        if (taskList && taskList.data) {
            let todo = taskList.data.filter((x) => x.status == 'drpTodoTask');
            let progress = taskList.data.filter((x) => x.status == 'drpProgressTask');
            let done = taskList.data.filter((x) => x.status == 'drpDoneTask');

            setTodoTask(todo);
            setProgressTask(progress);
            setDoneTask(done);
        }
    }, [taskList]);

    useEffect(() => {
        if (addedTask && addedTask.data) {
            dispatch(getTaskListAction(GET_USER_TASK_LIST));
            setLabel("");
            setDesc("");
        }
    }, [addedTask]);

    useEffect(() => {
        if (deleteTask && deleteTask.message == "success") {
            dispatch(getTaskListAction(GET_USER_TASK_LIST));
        }
    }, [deleteTask]);

    const handleAddTask = () => {
        let payload = {
            label: label,
            desc: desc,
            status: "drpTodoTask"
        }
        dispatch(addTaskAction(ADD_UPDATE_USER_TASK, payload));
    }

    const handleEditTask = (obj) => {
        setEditObj(obj);
        setLabel(obj.label);
        setDesc(obj.desc);
        setShowAddTask(true);
    }

    const handleUpdateTask = () => {
        let payload = {
            _id: editObj._id,
            label: label,
            desc: desc,
            status: editObj.status,
        }
        dispatch(addTaskAction(ADD_UPDATE_USER_TASK, payload));
    }

    const handleDeleteTask = (id) => {
        dispatch(deleteTaskAction(DELETE_USER_TASK, { _id: id }));
    }


    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const move = (source, destination, droppableSource, droppableDestination) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destClone.splice(droppableDestination.index, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    const getList = (id) => {
        if (id == 'drpTodoTask') {
            return todoTask;
        } else if (id == "drpProgressTask") {
            return progressTask;
        } else if (id == "drpDoneTask") {
            return doneTask;
        }
    }

    const onDragEnd = result => {
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            if (source.droppableId === 'drpTodoTask') {
                setTodoTask(items);
            }

            if (source.droppableId === 'drpProgressTask') {
                setProgressTask(items);
            }

            if (source.droppableId === 'drpDoneTask') {
                setDoneTask(items);
            }
        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );

            if (source.droppableId === 'drpTodoTask' || destination.droppableId === "drpTodoTask") {
                setTodoTask(result.drpTodoTask);
            }
            if (source.droppableId === 'drpProgressTask' || destination.droppableId === "drpProgressTask") {
                setProgressTask(result.drpProgressTask);
            }
            if (source.droppableId === 'drpDoneTask' || destination.droppableId === "drpDoneTask") {
                setDoneTask(result.drpDoneTask)
            }

            let updatedTask = {};
            if (source.droppableId === 'drpTodoTask') {
                updatedTask = todoTask[source.index];
            } else if (source.droppableId === 'drpProgressTask') {
                updatedTask = progressTask[source.index];
            } else if (source.droppableId === 'drpDoneTask') {
                updatedTask = doneTask[source.index];
            }
            updatedTask.status = destination.droppableId;
            dispatch(addTaskAction(ADD_UPDATE_USER_TASK, updatedTask));
        }
    };

    return (
        <div className="container">
            <Link className="btn btn-profile" to={"/profile"}>Profile</Link>
            <button className="btn btn-profile" style={{ marginLeft: "10px" }} onClick={() => setShowAddTask(!showAddTask)}>Add</button>

            {
                showAddTask &&
                <div style={{ width: "50%" }}>
                    <label for="email"><b>Label</b></label>
                    <input type="text" placeholder="Enter label" value={label} onChange={(e) => setLabel(e.target.value)} />

                    <label for="email"><b>Description</b></label>
                    <input type="text" placeholder="Enter description" value={desc} onChange={(e) => setDesc(e.target.value)} />
                    {Object.keys(editObj).length > 0 ?
                        <button type="button" className="registerbtn" onClick={handleUpdateTask}>Update</button>
                        :
                        <button type="button" className="registerbtn" onClick={handleAddTask}>Save</button>
                    }
                </div>
            }

            <div className="task-main-block">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="drpTodoTask">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className="tasklist-block">
                                <div>
                                    <h3>TO-DO</h3>
                                </div>
                                {todoTask.length > 0 &&
                                    todoTask.map((item, index) => (
                                        <Draggable
                                            key={item._id}
                                            draggableId={item._id}
                                            index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    className="taskitem-block"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{ ...provided.draggableProps.style }}>
                                                    <p>{item.label}</p>
                                                    <p>{item.desc}</p>
                                                    <div>
                                                        <button type="button" className="smallBtn" onClick={() => handleEditTask(item)}>Edit</button>
                                                        <button type="button" className="smallBtn" onClick={() => handleDeleteTask(item._id)}>Delete</button>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="drpProgressTask">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className="tasklist-block"
                            >
                                <div>
                                    <h3>Progress</h3>
                                </div>
                                {progressTask.map((item, index) => (
                                    <Draggable
                                        key={item._id}
                                        draggableId={item._id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                className="taskitem-block"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{ ...provided.draggableProps.style }}>
                                                <p>{item.label}</p>
                                                <p>{item.desc}</p>
                                                <div>
                                                    <button type="button" className="smallBtn" onClick={() => handleEditTask(item)}>Edit</button>
                                                    <button type="button" className="smallBtn" onClick={() => handleDeleteTask(item._id)}>Delete</button>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="drpDoneTask">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                className="tasklist-block"
                            >
                                <div>
                                    <h3>Done</h3>
                                </div>
                                {doneTask.map((item, index) => (
                                    <Draggable
                                        key={item._id}
                                        draggableId={item._id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                className="taskitem-block"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{ ...provided.draggableProps.style }}>
                                                <p>{item.label}</p>
                                                <p>{item.desc}</p>
                                                <div>
                                                    <button type="button" className="smallBtn" onClick={() => handleEditTask(item)}>Edit</button>
                                                    <button type="button" className="smallBtn" onClick={() => handleDeleteTask(item._id)}>Delete</button>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
}

export default Home;

