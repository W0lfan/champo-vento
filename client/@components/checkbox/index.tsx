import '../../@styling/components/checkbox.scss';
import React from 'react';

interface NaflowsCheckBoxPropTypes {
    label: string;
    checked: boolean;
    onUserChange: (checked: boolean) => void;
    disabled: boolean;
}



const NaflowsCheckBox: React.FC<NaflowsCheckBoxPropTypes> = ({
    label,
    checked,
    onUserChange,
    disabled
}) => {
    return (
        <div className={
            'naflows-checkbox' + (checked ? ' checked' : '') + (disabled ? ' disabled' : '')
        } onClick={() => {
            if (!disabled) {
                onUserChange(!checked);
            }
        }}>
            <div className="checker">
                <div className="check"></div>
            </div>
            <div className="content">
                {label}
            </div>
        </div>
    )
}



export default NaflowsCheckBox;