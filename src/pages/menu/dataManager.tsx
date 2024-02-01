import { theme } from 'antd';
import React, { useState } from 'react';


import DataTable from '../../components/data';
import TrackerTable from '../../components/track';
import { DataType } from '../../types/type';
import HeaderContent from '../../components/header';

const DataManager = () => {

  const [showDataTable , setShowDataTable] = useState<boolean>(true);
  const [uriLink, setUriLink] = useState<string>('\\');
  const [csvData, setCsvData] = useState<DataType[]>([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const handleDataUpdate = (data : DataType[]) => {
    setCsvData(data);
  };

  const generateCsvContent = (data: DataType[]) => {
    if(!data){
      return '';
    }
    const sanitizeData = data.map(({key, ...rest}) => rest);
    const header = Object.keys(sanitizeData[0]).join(',') + '\n';
    const rows = sanitizeData.map((item) => Object.values(item).join(',')).join('\n');
    return header + rows;
  };

  const downloadCSV = () =>{
    console.log(csvData);
    const csvContent = generateCsvContent(csvData);
    console.log(csvContent, '[csvContent]');
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);

    console.log(encodedUri, '[encodedUri]');

    setUriLink(encodedUri);
  }


  return (
    <>
    <HeaderContent submitToggle={showDataTable} toggleTable={setShowDataTable}/>


    <div
      style={{
      padding: 24,
      minHeight: 360,
      background: colorBgContainer,
      borderRadius: borderRadiusLG,
      }}
  >
      {
        showDataTable ? <DataTable onDataUpdate={handleDataUpdate}/> : <TrackerTable onDataUpdate={handleDataUpdate}/>
      }


  </div>

  <div className='download-button'>
      <a href={uriLink} download='data.csv'>
          <button type='button' onMouseOver={downloadCSV} >Downdload CSV</button>
      </a>
  </div>

    </>
  )
}

export default DataManager;
