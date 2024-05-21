import React from "react";
import "../css/Sidebar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import axios from "axios";
import { axiosinstant } from "../lib/axiosinstant";

function sidebar() {
  const [username, setUsername] = useState("");
  const [accountBalance, setAccountBalance] = useState("0");
  const [activeLink, setActiveLink] = useState(location.pathname);
  const isChartPath = location.pathname === "/";
  const isTradePath = location.pathname === "/Trading";
  const isSettingPath = location.pathname === "/Setting";
  const [statesd, setStatesd] = useState(false);
  const [showsdbar, setShowsdbar] = useState({});
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);
  useEffect(() => {
    if (statesd) {
      setShowsdbar({
        transform: "translateX(0%)",
      });
    } else {
      setShowsdbar({});
    }
  }, [statesd]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosinstant.get("Account/getBalance");

        console.log(response.data);
        if (response.data === "Please set API_KEY and API_SECRET") {
          window.location.href = "/Setting";
        }
        if (
          response.data.usdt !== NaN &&
          response.data.usdt !== null &&
          response.data.usdt !== undefined &&
          response.data.usdt !== ""
        ) {
          setAccountBalance(Number(response.data.usdt).toFixed(2));
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    const fetchUsername = async () => {
      try {
        const response = await axiosinstant.get("checkToken");
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching username: ", error);
      }
    };
    fetchData();
    fetchUsername();
  });

  return (
    <div>
      <div className="sdbar_bg" style={showsdbar}></div>
      <div className="sdbar" style={showsdbar}>
        <div
          onClick={() => setStatesd((prevState) => !prevState)}
          className="arrow"
        >
          {statesd ? (
            <Icon icon="iconamoon:arrow-left-2-light" width="48" height="48" />
          ) : (
            <Icon icon="iconamoon:arrow-right-2-light" width="48" height="48" />
          )}
        </div>
        <div className="text_name"> {username} </div>
        <div className="acc_balance"> Account Balance</div>
        <div className="dollar_balance">{accountBalance} $ </div>
        <div className="chart_box">
          <Link
            to="/"
            className={`chart ${activeLink === "/" ? "active" : ""}`}
          >
            Chart
          </Link>
          <div className={`chart_bg ${isChartPath ? "" : "hidden"}`}>
            <div className="tag_yellow"></div>
          </div>
        </div>
        <div className="trade_box">
          <Link
            to="/Trading"
            className={`trade ${activeLink === "/Trading" ? "active" : ""}`}
          >
            Trading
          </Link>
          <div className={`trade_bg ${isTradePath ? "" : "hidden"}`}>
            <div className="tag_yellow"></div>
          </div>
        </div>
        <div className="setting_box">
          <Link
            to="/Setting"
            className={`setting ${activeLink === "/Setting" ? "active" : ""}`}
          >
            Setting
          </Link>
          <div className={`setting_bg ${isSettingPath ? "" : "hidden"}`}>
            <div className="tag_yellow"></div>
          </div>
        </div>
        <div className="logout">Log out</div>
      </div>
    </div>
  );
}

export default sidebar;
