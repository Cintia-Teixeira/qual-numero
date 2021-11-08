import React from "react";
import './Number.css';

class Number extends React.PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            top: '#DDDDDD',
            left1: '#DDDDDD',
            right1: '#DDDDDD',
            bottom: '#DDDDDD',
            left2: '#DDDDDD',
            right2: '#DDDDDD',
            center: '#DDDDDD'
        }
    }

    componentDidMount() {
        this.setNumber(this.props.number);
    }

    setNumber(number) {
        let color = '#262A34';
        let obj = this.state;

        if (this.props.color) {
            color = this.props.color;
        }

        switch (number) {

            case '1':
                this.setState(Object.keys(obj).map(key => {
                    if (['right1', 'right2'].includes(key)) {
                        obj[key] = color;
                    }
                    return this.state;
                }));
                break

            case '2':
                this.setState(Object.keys(obj).map(key => {
                    if (['top', 'right1', 'bottom', 'left2', 'center'].includes(key)) {
                        obj[key] = color;
                    }
                    return this.state;
                }));
                break

            case '3':
                this.setState(Object.keys(obj).map(key => {
                    if (['top', 'right1', 'bottom', 'right2', 'center'].includes(key)) {
                        obj[key] = color;
                    }
                    return this.state;
                }));
                break

            case '4':
                this.setState(Object.keys(obj).map(key => {
                    if (['left1', 'right1', 'right2', 'center'].includes(key)) {
                        obj[key] = color;
                    }
                    return this.state;
                }));
                break

            case '5':
                this.setState(Object.keys(obj).map(key => {
                    if (['top', 'left1', 'bottom', 'right2', 'center'].includes(key)) {
                        obj[key] = color;
                    }
                    return this.state;
                }));
                break

            case '6':
                this.setState(Object.keys(obj).map(key => {
                    if (['top', 'left1', 'bottom', 'left2', 'right2', 'center'].includes(key)) {
                        obj[key] = color;
                    }
                    return this.state;
                }));
                break

            case '7':
                this.setState(Object.keys(obj).map(key => {
                    if (['top', 'right1', 'right2'].includes(key)) {
                        obj[key] = color;
                    }
                    return this.state;
                }));
                break

            case '8':
                this.setState(Object.keys(obj).map(key => obj[key] = color));
                break

            case '9':
                this.setState(Object.keys(obj).map(key => {
                    if (['top', 'left1', 'right1', 'bottom', 'right2', 'center'].includes(key)) {
                        obj[key] = color;
                    }
                    return this.state;
                }));
                break

            default:
                this.setState(Object.keys(obj).map(key => {
                    if (['top', 'left1', 'right1', 'bottom', 'left2', 'right2'].includes(key)) {
                        obj[key] = color;
                    }
                    return this.state;
                }));
        }
    }


    render() {
        return (
            <svg className="number" width="56" height="100" viewBox="0 0 56 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="top" d="M12.7918 10.9848H42.6309L52.9545 1.18126C51.9989 0.442677 50.8034 4.76837e-06 49.5038 4.76837e-06H5.65773C4.36601 4.76837e-06 3.18002 0.436367 2.2276 1.16469L12.7918 10.9848Z" fill={this.state.top} />
                <path id="left-1" d="M1.27122 2.08556C0.477403 3.06007 0 4.30288 0 5.65694V44.0221C0 46.2212 1.257 48.1229 3.09003 49.0588L11.7352 42.5796V11.8126L1.27122 2.08556Z" fill={this.state.left1} />
                <path id="right-1" d="M43.4255 12.049V42.5707L52.0707 49.0498C53.9037 48.114 55.1607 46.2123 55.1607 44.0131V5.64801C55.1607 4.30184 54.6888 3.06851 53.9053 2.09794L43.4255 12.049Z" fill={this.state.right1} />
                <path id="bottom" d="M12.7918 89.0144H42.6309L52.9545 98.8187C51.9989 99.5557 50.8034 100 49.5038 100H5.65773C4.36601 100 3.18002 99.5621 2.2276 98.8337L12.7918 89.0144Z" fill={this.state.bottom} />
                <path id="left-2" d="M1.27122 97.9218C0.477403 96.9481 0 95.7061 0 94.3512V55.9861C0 53.7869 1.257 51.886 3.09003 50.9494L11.7352 57.4285V88.1956L1.27122 97.9218Z" fill={this.state.left2} />
                <path id="right-2" d="M43.4255 87.9413V57.4196L52.0707 50.9405C53.9037 51.8771 55.1607 53.778 55.1607 55.9772V94.3423C55.1607 95.6877 54.6888 96.921 53.9053 97.8932L43.4255 87.9413Z" fill={this.state.right2} />
                <path id="center" d="M42.5551 43.9926H12.6056L4.62952 49.8721L12.6056 55.7523H24.0243H31.1363H42.5551L50.5312 49.8721L42.5551 43.9926Z" fill={this.state.center} />
            </svg>
        )
    }

}

export default Number;