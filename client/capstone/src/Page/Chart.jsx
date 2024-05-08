import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/Chart.css";
import Sidebar from "../Components/Sidebar";



function Chart() {


    return (
        <> 
        <Sidebar/>
        <div className="background" ></div>
        </>
    )

}

export default Chart