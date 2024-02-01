import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider"
import React, { useState } from "react";

// import BreatheEsgLogo from '../assets/Breathe ESG Logo.png';
import BreatheEsgLogo from '../assets/Logo_horizontal_1 White.png';
import BarChart from "../assets/svg/bar_chart.svg";
import Gridview from "../assets/svg/grid_view.svg";
import Summarize from "../assets/svg/summarize.svg";
import Materials from "../assets/svg/materials.svg";
import AutoGraph from "../assets/svg/auto_graph.svg";
import TrackChanges from "../assets/svg/track_changes.svg";
import LogOut from "../assets/svg/logout.svg";
import SuperevisedUserCircle from '../assets/svg/user_circle.svg';
import PieChart from '../assets/svg/pie_chart.svg';
import Logo from '../assets/Logo.png';
import { useAppDispatch } from "../app/hooks";
import {pageControl} from '../features/pageControl/pageSlice';
import { logoutThunk } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";



type MenuItem = Required<MenuProps>['items'][number];

function getItem(label:React.ReactNode, key: React.Key, icon: string): MenuItem {
    return {
        key,
        icon: <img src={icon} alt ='' />,
        label,
    } as MenuItem;
}

const menuItems: MenuItem[] = [
    getItem('Dashboard', 'dashboard', BarChart ),
    getItem('Entity Manager', 'entityManager', Gridview ),
    getItem('Data Manager', 'dataManager', PieChart ),
    getItem('Reporting', 'reporting', Summarize ),
    getItem('Materiality', 'materiality', Materials ),
    getItem('Suppliers', 'suppliers', SuperevisedUserCircle ),
    getItem('Analytics', 'analytics', AutoGraph ),
    getItem('Targets', 'targets', TrackChanges),
    getItem('Logout', 'logout', LogOut),
];

const SideBar = () =>{

    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [positionTrigger, setpositionTrigger] = useState<string> ('160px');
    const [logoSrc, setLogoSrc] = useState<string>(BreatheEsgLogo);
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const handleSider = (value: boolean) =>{
        console.log(value, '[value]-[home.js]');
        setCollapsed(!value);
        console.log(logoSrc, '[logoSrc]');
        setpositionTrigger(prev => prev === '40px' ? '160px' : "40px");
        value ? setLogoSrc(BreatheEsgLogo) : setLogoSrc(Logo);
    }

    const handleMenuSelect: MenuProps['onClick'] = (e) => {
        console.log(selectedKeys, '[selectedKeys]');
        setSelectedKeys([e.key]);
        if(e.key ==='logout'){
            dispatch(logoutThunk());
            navigate('/');
        }else{
            dispatch(pageControl(e.key));
        }
    };

    return (
    <Sider trigger={null} collapsible collapsed={collapsed} className='sidebar' >

        <div  className="sidebar-menu-item-image">
            <img src ={logoSrc} alt= 'breatheEsgLogo' width = {collapsed ? '18px' : '100%'} height ='17px' />
        </div>

            <Button 
                icon = {collapsed ? <RightCircleFilled style={{fontSize: "30px", color: "#181818", }}/> : <LeftCircleFilled style={{fontSize: "30px", color: "#181818",}}/>}
                onClick={() => handleSider(collapsed)}
                className='trigger-button'
                shape='circle'
                style={{marginLeft: positionTrigger,}}

                ghost
                size='large'
            />

        <div className="menu-container">

            <Menu
                theme="dark"
                defaultSelectedKeys={['dataManager']}
                mode="vertical"
                className="menu"
                onClick={(e) => handleMenuSelect(e)}
                >
                {menuItems.map((item: any) => (
                    <Menu.Item key={item.key} icon={item.icon} className={`custom-menu-item ${item.key === 'logout' ? 'logout-item' : ''}`} >
                        {item.label}
                    </Menu.Item>
                ))}
            </Menu>

        </div>

    </Sider>);
}

export default SideBar;