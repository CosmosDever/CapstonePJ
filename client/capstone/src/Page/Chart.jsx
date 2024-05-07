import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import "../css/Chart.css";



function Home() {


    return (
        <> 
        <Sidebar/>
        <div className="background" ></div>
        
        </>
    )

}

export default Home