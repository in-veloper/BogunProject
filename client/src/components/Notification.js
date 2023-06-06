/* eslint-disable */

import React, { useState } from 'react';
import { BiInfoSquare } from 'react-icons/bi';

const Notification = () => {
    const [close, setClose] = useState(false);
    const handleClose = () => setClose(true);

    return (
        <div className="notification is-info" hidden={close} style={{ marginTop : 30, marginLeft : 277, marginRight : 277 }}>
            <button className="delete" onClick={handleClose}></button>
            <BiInfoSquare style={{ fontSize : 20, verticalAlign : 'middle', marginTop : -5, marginRight : 10 }}/>
            금일 등록된 보건일정이 없습니다.
        </div>
    )
}

export default Notification;