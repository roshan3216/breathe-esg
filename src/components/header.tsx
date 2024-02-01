import { Button, Dropdown, Space } from "antd"
import { Header } from "antd/es/layout/layout"
import { DownOutlined } from "@ant-design/icons";
import React, { useState } from "react";


import Logo from '../assets/Logo.png';
import Business from "../assets/svg/business.svg"
import BellIcon from "../assets/svg/bell.svg";
import Avatar from "../assets/svg/avatar.png";
import BuildingLogo from "../assets/svg/building_icon.svg";

const dropDownItems = [
    {
        label: "North India Region",
        key: "0",
    },
    {
        label: "East India Region",
        key: "1",
    },
    {
        label: "West India Region",
        key: "2",
    },
    {
        label: "South India Region",
        key: "3",
    }
];

const dropDownYears = [
    {
        label: "FY 2023-24",
        key: "0",
    },
    {
        label: "FY 2022-23",
        key: "1",
    },
    {
        label: "FY 2021-22",
        key: "2",
    },
    {
        label: "FY 2020-21",
        key: "3",
    }
];

type ToggleTableFunction = (value: any) => void;

type HeaderProps = {
    submitToggle : boolean;
    toggleTable  : ToggleTableFunction;
}


const HeaderContent: React.FC<HeaderProps> = ({submitToggle, toggleTable}) =>{
    const [region, setRegion] = useState(dropDownItems[0]);
    const [year, setYear] = useState(dropDownYears[0]);
    const [buttonControl, setButtonControl ] = useState(submitToggle);

    const [fontColor , setFontColor] = useState(true);

    const toggleColor = () =>{
        setFontColor( prev => !prev);
        toggleTable(( prev: any)=> !prev);
        setButtonControl(prev => !prev);
    }



    const handleDropDownItems = (e: any) =>{
        setRegion(dropDownItems[e.key]);
    }


    const dropDownMenuProps = {
        items: dropDownItems,
        onClick: handleDropDownItems,
    }


    const hanldeDropDownYear = (e: any) =>{
        console.log(e,  '[hanldeDropDownYearProps');
        setYear(dropDownYears[e.key]);
    }

    const dropDownYearProps = {
        items: dropDownYears,
        onClick: hanldeDropDownYear,
    }


    return (
        <Header
            className='header'
            >
                <div className='banner-l1'>
                    <div className='logo-and-slicer'>
                        <div >
                            <img src={Logo} alt='logo' />
                            <p>View Name</p>
                        </div>
                        
                        <div>
                            <Dropdown menu={dropDownMenuProps}>
                                <Button >
                                    <Space>
                                        <img src = {Business} alt ='business' />
                                            {region.label}
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </div>
                    </div>

                    <div className='notification-and-user'>
                        <img src={BellIcon} alt = 'bell' />
                        <div>
                            <p>John Doe</p>
                            <img src = {Avatar} alt = 'avatar' />
                        </div>
                    </div>
                </div>

                <div className='banner-l1'>

                    <div className='stepper'>

                        <Button 
                            icon = {<img src = {BuildingLogo} alt="building-logo" /> } 
                            ghost 
                            size='large' 
                            style={{
                                color: fontColor ? "#4FA556":"#333333",
                                position:"relative"
                            }}
                            disabled = {buttonControl}
                            className={buttonControl ? "active-button" : ""}
                            onClick={toggleColor}
                            >
                            DATA ENTRY
                        </Button>

                        <Button 
                            icon = {<img src = {BuildingLogo} alt='track-changes' />} 
                            ghost 
                            size='large' 
                            style={{
                                color: fontColor ? "#333333" : "#4FA556",
                                position:"relative"
                            }}
                            disabled ={!buttonControl}
                            className={!buttonControl ? "active-button" : ""}
                            onClick={toggleColor}
                            >
                            TRACKER
                        </Button>
                    </div>

                    <div className='fy-submit-container'>
                        <div>
                            <p>For:</p>
                            <Dropdown menu={dropDownYearProps}>
                                <Button className='header-content-button-items' >
                                    {year.label}
                                    <DownOutlined />
                                </Button>
                            </Dropdown>
                        </div>

                        { submitToggle && <Button className='submit-approval-button' >
                            Submit for Approval
                        </Button>}
                    </div>
                    
                </div>

            </Header>
    )
}

export default HeaderContent;