import React from 'react'
import { useAuth } from '../context/Auth';

const DataList = (props) => {
    const { list, setList, deleteOneListItame, delteAll } = useAuth();
    const clickCheckBox = (id) => {
        const clickElement = list.find((e) => {
            return e.id === id;
        });
        if (clickElement.checked === false) {
            setList(
                list.map((e) => {
                    if (e.id === id) {
                        return { ...e, checked: true };
                    }
                    return e;
                })
            );
        } else {
            setList(
                list.map((e) => {
                    if (e.id === id) {
                        return { ...e, checked: false };
                    }
                    return e;
                })
            );
        }

    }
    const checkboxChecked = {
        transform: "rotateX(360deg)",
        transition: "all 0.5s ease-in-out",
        textDecoration: "line-through",
        color: "black",
        background: "#1d1452",
        borderRadius: "6px",
        marginTop: "10px",
        fontSize: "large",
        padding: "9px 3px",
        overflowY: "auto",
        overflowX: "hidden",
    };
    const checkBoxUnChecked = {
        backgroundColor: "#57007E",
        color: "#ebe4e4",
        borderRadius: "6px",
        marginTop: "10px",
        fontSize: "large",
        padding: "9px 3px",
        overflowY: "auto",
        overflowX: "hidden",
    };
    return (
        <>
            {/* itame list */}

            <div className="list">
                <ul>
                    {list && list.map && list.map((elem) => {
                        return (
                            <li key={elem.id}>
                                <p style={elem.checked ? checkboxChecked : checkBoxUnChecked}>
                                    <span className="ckBox_span">
                                        <input type="checkbox" className="ckBOX" id="box"
                                            onChange={() => clickCheckBox(elem.id)}
                                        />
                                    </span>
                                    {elem.name}
                                    <span className={`edite_icon ${elem.checked ? "d-none" : ""}`}>
                                        <i className="fa-regular fa-pen-to-square edite"
                                            title="click here for Edite"
                                            onClick={async () => {
                                                props.handler(elem.id, elem.name);
                                            }}></i>

                                        <i className="fa fa-xmark delete"
                                            title="Delete"
                                            onClick={() => deleteOneListItame(elem.id)}></i>
                                    </span>
                                </p>
                            </li>
                        )
                    })}
                </ul>
            </div>


            {/* all delete itame button */}
            <div className="deleteAll">
                <button className="btn" data-sm-link-text="Remove All" title="Delete all add Data" onClick={delteAll}>
                    CHECK LIST
                </button>
            </div>
        </>
    )
}

export default DataList
