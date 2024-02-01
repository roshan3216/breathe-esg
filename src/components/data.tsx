import React, { useState,useEffect } from 'react';
import { Badge, Space, Table, Tag, Typography } from 'antd';
import type { TableColumnsType } from 'antd';

import ShareIcon from '../assets/svg/share.svg';
import DeleteIcon from '../assets/svg/bin.svg';
import { getDataEntryData } from '../api/api';
import { DataType } from '../types/type';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const columns : TableColumnsType<DataType> = [
    {
        title: 'ASSESSMENT TITLE',
        dataIndex: 'assessmentTitle',
        render: (text: String) => (<Text style={{color: "#4FA556", fontSize: "16px", fontWeight: "600", fontStyle: "normal", lineHeight : "150%"}} >{text}</Text>),
    },
    {
        title: 'TYPE',
        dataIndex: 'type',
        render: (text: String) => (<Text>{text.toUpperCase()}</Text>)
    },
    {
        title: 'NO. OF SUPPLIERS',
        dataIndex: 'numberOfSuppliers',
    },
    {
        title: 'SCORE',
        dataIndex: 'score',
        render: (text: String | '') => (text ? text: "-")
    },
    {
        title: 'RISK CLASSIFICATION',
        dataIndex: 'riskClassification',
        render: (text: String | '') =>{
            let color = '';
            if(text ==='low'){
                color = '#2E9844';
            }else if(text==='medium'){
                color = '#F09948';
            }else if(text ==='high'){
                color = '#ED6262';
            }
            return <Badge color={color} style={{fontWeight: "400"}} text ={text.toUpperCase()}/>
        }
    },
    {
        title: 'STATUS',
        dataIndex: 'status',
        render: (text) =>{
            let bgColor   = 'rgba(46, 152, 68, 0.20)';
            let textColor = '#4FA556';
            if(text.toLowerCase() ==='pending'){
                bgColor   = 'rgba(240, 79, 109, 0.20)';
                textColor = '#F04F6D';
            }

            return <Tag color={bgColor} style={{color: textColor}}> {text.toUpperCase()} </Tag>
        }
    },
    {
        title: 'RESULT',
        dataIndex: 'result',
        render: (text) =>(text ? <Text style={{color:"#4FA556", fontSize:"16px", fontStyle: "normal",fontWeight: "600"}}>{text.toUpperCase()}</Text> : '-')
    },
    {
        title: 'ACTIONS',
        dataIndex: 'actions',
        render: () => (
            <Space size={20}>
                <img src = {ShareIcon} alt = 'share' />
                <img src = {DeleteIcon} alt = 'delete' />
            </Space>
        )
    },
];


type DataTableProps = {
    onDataUpdate: (data: DataType[]) => void;
}

const DataTable: React.FC<DataTableProps> = ({onDataUpdate}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>();
    const [tableData, setTableData ] = useState<DataType[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        onDataUpdate(tableData);
    }, [tableData, onDataUpdate]);

    useEffect(() =>{
        (async()=>{
            try {
                const resp = await getDataEntryData();
                console.log(resp,'[resp]');
                const axiosHeaders = resp.headers
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

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <div>
        
            <Table rowSelection={rowSelection} columns={columns}  pagination={false} dataSource={tableData} style={{color:"red", fontSize:"16px", fontWeight:"400"}}/>
        </div>
    );
};
export default DataTable;