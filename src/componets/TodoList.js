import React, { useState } from "react";
import logo from "../image/list.png";
import { useAuth } from "../context/Auth";
import DataList from "./DataList";
import { toast } from 'react-toastify';


const TodoList = () => {
    const { addAnotherOneList, UpdateList } = useAuth();

    const [data, setData] = useState("");
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [editeId, setEditeId] = useState("");

    const toDay = new Date().getDay();
    const dayName = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
  
    const addNewList = () => {
        if (!data) {
            toast.info("Please fill the data");
        } else if (data && !toggleSubmit) {
            const allInPutData = {
                id: editeId,
                name: data.trim(),
                checked: false
            };
            UpdateList(allInPutData);
            setToggleSubmit(true);
            setData("");
        } else {
            const allInPutData = {
                id: new Date().getTime().toString(),
                name: data.trim(),
                checked: false
            };
            if (allInPutData.name !== '') {
                addAnotherOneList(allInPutData)
                setData("");

            } else {
                toast.info("please Write Data input file");
            }
        }
    }
    const editeItame = (id, value) => {
        if (editeItame !== "") {
            setData(value);
            setEditeId(id);
            setToggleSubmit(false);
        }
    }
    // window.addEventListener('beforeunload', (event) => {
    //     event.preventDefault();
    //     event.returnValue = `Are you sure you want to leave?`
    // });
    return (
        <div className="main_div">
            <div className="image">
                <img src={logo} alt="logo" width={100} />
            </div>
            <p className="logo_dis">
                oh my,its {dayName.filter((day, i) => {
                    return i === toDay;
                })} 😊🍵
            </p>

            {/* add itame */}
            <div className="input_type">
                <input
                    type="text"
                    placeholder="✍️Add item..."
                    name="inputList"
                    // value={editeValue ? editeValue.name : data}
                    value={data}

                    onChange={(e) => setData(e.target.value)}
                    className="form-control"
                    maxLength={30}
                    autoComplete="off"
                />
                {toggleSubmit ?
                    (<i
                        className="fa-solid fa-plus add_btn"
                        title="add"
                        onClick={addNewList}
                    ></i>
                    ) : (
                        <i
                            className="far fa-file-pen add_btn"
                            title="Edite"
                            onClick={addNewList}
                        ></i>)
                }
            </div>

            <DataList handler={editeItame} />

        </div>
    )
};

export default TodoList;