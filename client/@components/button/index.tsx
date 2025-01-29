import '../../@styling/components/button.scss';
import React from "react";

interface NaflowsButtonProps {
    onUserClick: () => void;
    type: string;
    style: object;
    content: string[];
}

const NaflowsButton: React.FC<NaflowsButtonProps> = ({
    onUserClick = () => {},
    type='tertiary',
    style={},
    content
}) => {
    return (
        <button style={style} onClick={onUserClick} className={type}>
           {
            content.map((element, index) => {
                return (
                    <span key={index} dangerouslySetInnerHTML={{__html: element}}>

                    </span>
                )
            })
           }
        </button>
    )
}


export default NaflowsButton;
