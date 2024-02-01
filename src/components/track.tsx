import React, { useEffect, useState } from 'react';
import {  Table, TableColumnsType, Tag, Typography } from 'antd';

import UpwardArrow from '../assets/svg/upward_arrow.svg';
import DownArrow from '../assets/svg/downward_arrow.svg';
import Track from '../assets/svg/track_changes.svg';
import ReviewIcon from '../assets/svg/review_icon.svg';
import SearchIcon from '../assets/svg/search_icon.svg';
import { getTrackChangesData } from '../api/api';
import { useNavigate } from 'react-router-dom';




const { Text } = Typography;

type DataType = {
    key: React.Key,
    month: String,
    status: String,
    completion: String, 
    businessUnit: String,
}

const columns: TableColumnsType<DataType>  = [
    {
        title: 'Month'.toUpperCase(),
        dataIndex: 'month',
        render: (text) => (<Text style={{color: "#333",fontSize: "16px", fontWeight:"400", fontStyle:"normal"}}>{text}</Text>),
        sorter: (a,b) =>  {
            if(a.month> b.month){
                return 1;
            }else if(a.month < b.month){
                return -1;
            }
            return 0;
        },
        sortIcon: ({sortOrder}) => ( sortOrder === 'ascend'? <img src={UpwardArrow} alt ='upward-arrow' /> : <img src={DownArrow} alt='downward-arrow' />),
    },
    {
        title: 'STATUS',
        dataIndex: 'status',
        render: (text) =>{
            let bgColor   = 'rgba(46, 152, 68, 0.20)';
            let textColor = '#4FA556';
            if(text.toLowerCase().includes( 'pending')){
                bgColor   = 'rgba(240, 79, 109, 0.20)';
                textColor = '#F04F6D';
            }else if(text.toLowerCase().includes('incomplete')){
                bgColor = 'rgba(240, 153, 72, 0.24)';
                textColor = '#F09948';
            }

            return <Tag color={bgColor} style={{color: textColor, fontSize:"10px", fontStyle: "normal", fontWeight: "600"}}> {text.toUpperCase()} </Tag>
        },
        sorter: (a,b) =>  {
            if(a.status> b.status){
                return 1;
            }else if(a.status < b.status){
                return -1;
            }
            return 0;
        },
        sortIcon: ({sortOrder}) => ( sortOrder === 'ascend'? <img src = {UpwardArrow} alt ='upward-arrow'/> : <img src={DownArrow} alt ='down-arrow'/>),
    },
    {
        title: 'completion %'.toUpperCase(),
        dataIndex: 'completion',
        render: (text) =>(<Text style={{color:"#333", fontSize:"16px", fontStyle: "normal",fontWeight: "400"}}>{text}</Text>),
        sorter: (a,b) =>  {
            if(a.completion> b.completion){
                return 1;
            }else if(a.completion < b.completion){
                return -1;
            }
            return 0;
        },
        sortIcon: ({sortOrder}) => ( sortOrder === 'ascend'? <img src = {UpwardArrow} alt ='upward-arrow'/> : <img src={DownArrow} alt ='down-arrow'/>),
    },
    {
        title: 'business unit'.toUpperCase(),
        dataIndex: 'businessUnit',
        render: (text) =>(<Text style={{color:"#333", fontSize:"16px", fontStyle: "normal",fontWeight: "400"}}>{text}</Text>)
    },
];


const data : DataType[] = [
    {
        key: 0,
        month: 'Jan 2023',
        status: 'pending approval (1/12)',
        completion: '20%',
        businessUnit: 'Business Unit 1',
    },
    {
        key: 1,
        month: 'Feb 2023',
        status: 'approved (2/12)',
        completion: '30%',
        businessUnit: 'Business Unit 2',
    },
    {
        key: 2,
        month: 'Mar 2023',
        status: 'incomplete (4/12)',
        completion: '50%',
        businessUnit: 'Business Unit 3',
    },
];

type TrackerTableProps = {
    onDataUpdate : (data: DataType[]) => void;
}

const TrackerTable: React.FC<TrackerTableProps> = ({onDataUpdate}) => {
    const [tableData , setTableData] = useState<DataType[]>([]);
    const [search , setSearch] = useState <string> ('');
    const navigate = useNavigate();

    useEffect(() => {
        onDataUpdate(tableData);
    }, [tableData, onDataUpdate]);


    useEffect(() =>{
        (async()=>{
            try {
                const resp = await getTrackChangesData();
                const axiosHeaders = resp.headers;
                const authHeaders = axiosHeaders['authorization'];
                if(authHeaders){
                    localStorage.setItem('accessToken',authHeaders);
                }
                setTableData(resp.data);
                
            } catch (err) {
                navigate('/');
            }
        })();
    },[navigate]);

    const handleChange = (e: any) =>{
        setSearch(e.target.value);
    }
    
    useEffect(()=>{
        const delayDebounceFn = setTimeout(()=>{

            if(search.trim()!==''){
                const filteredBusinessUnit = data.filter((d) => d.businessUnit.toLowerCase().includes(search.toLowerCase()));
                setTableData(filteredBusinessUnit);
            }
        },3000);

        return ()=> clearTimeout(delayDebounceFn);
    },[search]);

    return (
        <div className='tracker-container'>

            <div className='tracker-card'>
                <div className='tracker-card-content'>
                    <div>
                        <p className='tracker-card-content-heading'>PENDING TRACKERS</p>
                        <p className='tracker-card-content-value'>45/60</p>
                    </div>
                    <img src={Track} alt="track-changes" color='#666666' />
                </div>

                <div className='tracker-card-content'>
                    <div>
                        <p className='tracker-card-content-heading'>PENDING REVIEWS</p>
                        <p className='tracker-card-content-value'>3</p>
                    </div>
                    <img src={ReviewIcon} alt="review-icon"  />
                </div>

            </div>


            <div className='search-box-container'>
                <img src={SearchIcon} alt="search-icon" />
                <input type="text" name = "search" value = {search} onChange={handleChange} placeholder='Search for a business unit'/>
            </div>
        
            <Table pagination={false} columns={columns} dataSource={tableData} style={{color:"red", fontSize:"16px", fontWeight:"400"}}/>
            
        </div>
    );
};
export default TrackerTable;