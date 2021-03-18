
'use strict'

import React from 'react'
import { TwitterPicker } from 'react-color'

class PxlComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            config: { tabWidth: 20, tabHeight: 20 },
            screenRatio: 'vw',
            screenBalance: 95,
            displayColorPicker: false,
            color: '#000000',
            handleHook: 0,
            handleNumb: 0,
            pos: { x: 0, y: 0 },
            pixelTab: this.buildPixelTable(20, 20)
        };
    }

    buildPixelTable(width, height) {
        var arr = [];
        for (var iRow = 0; iRow < height; iRow++) {
            arr[iRow] = [];
            for (var iCell = 0; iCell < width; iCell++) {
                arr[iRow][iCell] = "#FFFFFF";
            }
        }
        return arr;
    }

    componentDidUpdate(nextProps) {
        if (this.props.handleHook && this.props.handleNumb != nextProps.handleNumb) {
            switch (this.props.handleHook) {
                case 32:
                    this.updatePixelColor(this.state.pos.x, this.state.pos.y, this.state.color);
                    break;
                case 37:
                    if (this.state.pos.x - 1 < 0 && this.state.pos.y - 1 >= 0)
                        this.setState({ pos: { x: this.state.config.tabWidth - 1, y: this.state.pos.y - 1 }, handleNumb: this.props.handleNumb });
                    else if (this.state.pos.x - 1 >= 0)
                        this.setState({ pos: { x: this.state.pos.x - 1, y: this.state.pos.y }, handleNumb: this.props.handleNumb });
                    break;
                case 38:
                    if (this.state.pos.y - 1 >= 0)
                        this.setState({ pos: { x: this.state.pos.x, y: this.state.pos.y - 1 }, handleNumb: this.props.handleNumb });
                    break;
                case 39:
                    if (this.state.pos.x + 1 >= this.state.config.tabWidth && this.state.pos.y + 1 < this.state.config.tabHeight)
                        this.setState({ pos: { x: 0, y: this.state.pos.y + 1 }, handleNumb: this.props.handleNumb });
                    else if (this.state.pos.x + 1 < this.state.config.tabWidth)
                        this.setState({ pos: { x: this.state.pos.x + 1, y: this.state.pos.y }, handleNumb: this.props.handleNumb });
                    break;
                case 40:
                    if (this.state.pos.y + 1 < this.state.config.tabHeight)
                        this.setState({ pos: { x: this.state.pos.x, y: this.state.pos.y + 1 }, handleNumb: this.props.handleNumb });
                    break;
                default:
                    break;
            }
        }
    }

    componentDidMount() {
        if (typeof window !== 'undefined' && window.innerWidth <= 760)
            this.setState({screenRatio: 'vw', screenBalance: 95});
        else
            this.setState({screenRatio: 'vh', screenBalance: 80});
    }

    updatePixelColor = (x, y, colorHex) => {
        let newPixelTab = this.state.pixelTab;

        newPixelTab[y][x] = colorHex;
        this.setState({ pixelTab: newPixelTab })
    }

    handleChange = (color, event) => {
        this.setState({ color: color.hex })
    };

    handleClickOnPixel = (x, y) => {
        this.setState({ pos: { x: x, y: y } });
        this.updatePixelColor(x, y, this.state.color);
    }

    render() {
        const colorList = () => (
            (this.state.screenRatio == 'vw' ? ['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C'] : ['#000000', '#FFFFFF', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'])
        )
        return (
            <div style={{ margin: '10px'}}>
                <div>
                    {this.state.pixelTab.map((row, idRow) => (
                        <div className="rowPixel" key={`row_${idRow}`} style={{ display: 'flex', height: `${this.state.screenBalance / this.state.config.tabHeight}${this.state.screenRatio}` }}>
                            {row.map((cell, idCell) => (
                                <div onClick={() => this.handleClickOnPixel(idCell, idRow)} key={`cel_${idCell}`}
                                    className={(idRow % this.state.config.tabHeight == this.state.pos.y && idCell % this.state.config.tabWidth == this.state.pos.x ? 'selectedPixel' : 'basicPixel')}
                                    style={{ width: `${this.state.screenBalance / this.state.config.tabHeight}${this.state.screenRatio}`, margin: '2px', backgroundColor: cell, borderColor: this.state.color }}></div>
                            ))}
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: '10px' }}>
                    <TwitterPicker color={this.state.color} onChange={this.handleChange} width={(this.state.screenRatio == 'vw' ? '100%' : '50%')} colors={colorList()} triangle='hide' />
                </div>
            </div>
        )
    }
}

export default PxlComponent