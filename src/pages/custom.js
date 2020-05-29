import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Pimp from '../components/pimp';
import '../App.css';

function CustomPage() {

  return (
    <div className="custom">
        <div id="customshoes">
            <Pimp />
        </div>
                <button className="launch">Authorize</button>
                <div id="validate" ></div>
                <div id="colorInterface"></div>
                <div id="slider" className="swipe">
                    <div className="swipe-wrap">
                        <div className="swipe-element" id="color_green_2"
                        hex="#1CC800"
                        value="color_green_2"
                        r="0.1098"
                        g="0.7843"
                        b="0.0"
                        rgba="rgb(28, 200, 0)">
                            <div id="colorGreen_2"></div>
                        </div>
                        <div className="swipe-element" id="color_green"
                        hex="#537E4C"
                        value="color_green"
                        r="0.2705"
                        g="0.4510"
                        b="0.2666"
                        rgba="rgba(69,115,68,1)">
                            <div id="colorGreen"></div>
                        </div>
                        <div className="swipe-element" id="color_yellow"
                        hex="#C8B46B"
                        value="color_yellow"
                        r="0.7764"
                        g="0.6902"
                        b="0.4392"
                        rgba="rgb(247, 185, 0)">
                            <div id="colorYellow"></div>
                        </div>
                        <div className="swipe-element" id="color_orange"
                        hex="#EEB020"
                        value="color_orange"
                        r="0.9333"
                        g="0.6902"
                        b="0.1255"
                        rgba="rgb(238, 176, 32)">
                            <div id="colorOrange"></div>
                        </div>
                        <div className="swipe-element" id="color_red"
                        hex="#AB3E3F"
                        value="color_red"
                        r="0.6902"
                        g="0.3059"
                        b="0.2941"
                        rgba="rgba(176,78,75,1)">
                            <div id="colorRed"></div>
                        </div>
                        <div className="swipe-element" id="color_violet"
                        hex="#AC2FC9"
                        value="color_violet"
                        r="0.6745"
                        g="0.1843"
                        b="0.7882"
                        rgba="rgba(172,47,201,1)">
                            <div id="colorViolet"></div>
                        </div>
                        <div className="swipe-element" id="color_blue"
                        hex="#537E4C"
                        value="color_blue"
                        r="0.1255"
                        g="0.1255"
                        b="0.6824"
                        rgba="rgba(32,32,174,1)">
                            <div id="colorBlue"></div>
                        </div>
                        <div className="swipe-element" id="color_blue_sky"
                        hex="#7CA3FE"
                        value="color_blue_sky"
                        r="0.4862"
                        g="0.6392"
                        b="0.9960"
                        rgba="rgba(124,163,254,1)">
                            <div id="colorBlue_sky"></div>
                        </div>
                        <div className="swipe-element" id="color_white"
                        hex="#F0F0F0"
                        value="color_white"
                        r="0.9411"
                        g="0.9411"
                        b="0.9411"
                        rgba="rgba(240,240,240,1)">
                            <div id="colorWhite"></div>
                        </div>
                        <div className="swipe-element" id="color_grey"
                        hex="#8E8E8E"
                        value="color_grey"
                        r="0.5568"
                        g="0.5568"
                        b="0.5568"
                        rgba="rgba(142,142,142,1)">
                            <div id="colorGrey"></div>
                        </div>
                        <div className="swipe-element" id="color_black"
                        hex="#000005"
                        value="color_black"
                        r="0"
                        g="0"
                        b="0.0196"
                        rgba="rgba(0,0,5,1)">
                            <div id="colorBlack"></div>
                        </div>
                    </div>
                </div>
    </div>
  );
}

export default CustomPage;