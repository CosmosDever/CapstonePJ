import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/Trading.css";
import Sidebar from "../Components/Sidebar";



function Trading() {

    return (
        <> 
        <Sidebar/>
        <div className="background" >
            <div className="Price_box"></div>
        </div>
        </>
    )

}

export default Trading