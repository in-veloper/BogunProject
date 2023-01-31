import { useEffect } from "react";

const Toast = ({ setToast, text }) => {
    debugger
    useEffect(() => {
        const timer = setTimeout(() => {
            setToast(false);
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, [setToast]);

    return (
        <div className= 'modal is-active'>
            <div className='modal-background'></div>
            <div className='modal-card'>
                <header className='modal-card-head'>
                    <p className='modal-card-title' style={{ fontSize : 20, fontWeight : 'bold' }}>Alert</p>
                </header>
                <section className='modal-card-body'>
                    <p>{text}</p>
                </section>
            </div>
        </div>
    );
}

export default Toast;