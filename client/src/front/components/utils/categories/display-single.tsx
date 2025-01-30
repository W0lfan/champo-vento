import '../../../../../public/styles/components/utils/category.scss';


interface DisplaySingleProps {
    category : {
        name : string;
        color : string;
        id : number;
    }
}

const DisplaySingle = ({ category } : DisplaySingleProps) => {
    return (
        <div className="category" style={{
            backgroundColor : category.color
        }}>
            <div className="category-name">
                {category.name}
            </div>
        </div>
    )
}

export default DisplaySingle;