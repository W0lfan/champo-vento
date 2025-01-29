import '../../@styling/components/popup.scss';
import NaflowsButton from '../button';
import React from 'react';

interface NaflowsPopupProps {
    type: string;
    title: string;
    content: string;
    additionnalClasses: string;
    close: boolean;
    setHidePopup: (hide: boolean) => void;
}

const NaflowsPopup: React.FC<NaflowsPopupProps> = ({
    type,
    title,
    content,
    additionnalClasses = [],
    close = false,
    setHidePopup = () => {}
}) => {
    return (
        <div className={
            `naflows-popup-box ${additionnalClasses ? additionnalClasses : ""}`
        } id={`naflows-popup-box-${type}`}>
            <div className="naflows-popup-content">
                <div className="naflows-popup-container">
                    <div className="naflows-popup-title" style={{
                        display : title ? "block" : "none"
                    }}>
                        {title}
                    </div>
                    <div className="naflows-popup-body">
                        {content}
                    </div>
                </div>
                {
                    close && <NaflowsButton
                        content={['Close']}
                        type={`primary popup-${type}`}
                        onUserClick={() => {
                            const popup = document.querySelector(`#naflows-popup-box-${type}`);
                            if (popup) {
                                popup.classList.add('naflows-popup-hide');
                                setTimeout(() => {
                                    setHidePopup(true);
                                    popup.classList.remove('naflows-popup-hide');
                                }, 500);
                            }
                        }}
                        style = {{}}
                    />
                }
            </div>
        </div>
    )
}



export default NaflowsPopup;