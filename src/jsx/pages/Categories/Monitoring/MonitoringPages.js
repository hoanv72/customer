import MonitoringHeader from './MonitoringHeader';
import MonitoringContent1 from './MonitoringContent1';
import MonitoringContent2 from './MonitoringContent2';
import MonitoringContent3 from './MonitoringContent3';
import MonitoringContent4 from './MonitoringContent4';
import React, {useState} from 'react';
import './style.css';

function MonitoringPages() {
  const [option, setOption] = useState('')

  const sendDataToParent = (option) => { // the callback. Use a better name
    console.log(option);
    setOption(option);
  };

  if(option === 1){
    return (
      <>
         <div className="monitoring-page-wrap">
           <MonitoringHeader sendDataToParent={sendDataToParent}/>
           <MonitoringContent1 />
         </div>
      </>
     );
  }
  if(option === 2){
    return (
      <>
         <div className="monitoring-page-wrap">
           <MonitoringHeader sendDataToParent={sendDataToParent}/>
           <MonitoringContent2 />
         </div>
      </>
     );
  }
 
  if(option === 3){
    return (
      <>
         <div className="monitoring-page-wrap">
           <MonitoringHeader sendDataToParent={sendDataToParent}/>
           <MonitoringContent3 />
         </div>
      </>
     );
  }
  if(option === 4){
    return (
      <>
         <div className="monitoring-page-wrap">
           <MonitoringHeader sendDataToParent={sendDataToParent}/>
           <MonitoringContent4 />
         </div>
      </>
     );
  }

  return (
   <>
      <div className="monitoring-page-wrap">
        <MonitoringHeader sendDataToParent={sendDataToParent}/>
        <MonitoringContent2 />
      </div>
   </>
  );
}

export default MonitoringPages;