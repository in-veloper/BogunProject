import { BiInfoSquare } from 'react-icons/bi';

const Notification = () => {
    return (
        <div className="notification is-warning" style={{ marginTop : 30, marginLeft : 277, marginRight : 277 }}>
            <button class="delete"></button>
            <BiInfoSquare/>
            금일 등록된 보건일정이 없습니다.
        </div>
    )
}

export default Notification;