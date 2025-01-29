import "../../@styling/components/operator.scss";

const Operator = () => {
    return (
        <div className="operator-informations">
            <div className="operator">
                <div className="text">
                Operated by
                </div>
                <img src='https://public.naflows.com/@assets/logo/naflows_long_logotype.svg' />
            </div>
            <div className="operator-links">
                <a href="https://discord.com/invite/hXsrvCjDmF" target="_blank">
                    Community
                </a>
                <a href="mailto:support@naflows.com" target="_blank">
                    Support
                </a>
                <a href="">
                    Terms of service
                </a>
            </div>
        </div>
    );
}

export default Operator;