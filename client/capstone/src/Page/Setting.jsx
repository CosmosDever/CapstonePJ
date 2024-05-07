import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/Setting.css";
import Sidebar from "../Components/Sidebar";



function Home() {


    return (
        <> 
        <Sidebar/>
        <div className="background" ></div>
        </>
    )

}

export default Home