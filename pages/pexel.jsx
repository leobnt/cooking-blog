
'use strict'

import React from 'react'
import { TwitterPicker } from 'react-color'

class PxlComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            config: { tabWidth: 10, tabHeight: 10 },
            displayColorPicker: false,
            color: '#000000',
            handleHook: 0,
            handleNumb: 0,
            pos: { x: 0, y: 0 },
            pixelTab: this.buildPixelTable(10, 10)
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
                // case 67:
                //     break;
                default:
                    break;
            }
        }
    }

    updatePixelColor = (x, y, colorHex) => {
        let newPixelTab = this.state.pixelTab;

        newPixelTab[y][x] = colorHex;
        this.setState({ color: colorHex, pixelTab: newPixelTab })
    }

    handleChange = (color, event) => {
        this.updatePixelColor(this.state.pos.x, this.state.pos.y, color.hex);
    };

    handleClickOnPixel = (x, y) => {
        this.setState({ pos: { x: x, y: y }, displayColorPicker: !this.state.displayColorPicker });
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.pixelTab.map((row, idRow) => (
                        <div key={`row_${idRow}`} style={{ display: 'flex' }}>
                            {row.map((cell, idCell) => (
                                <div onClick={() => this.handleClickOnPixel(idCell, idRow)} key={`cel_${idCell}`}
                                    className={(idRow % this.state.config.tabHeight == this.state.pos.y && idCell % this.state.config.tabWidth == this.state.pos.x ? 'selectedPixel' : 'basicPixel')}
                                    style={{ width: '50px', height: '50px', margin: '2px', backgroundColor: cell, borderColor: this.state.color }}></div>
                            ))}
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: '10px' }}>
                    <TwitterPicker color={this.state.color} onChange={this.handleChange} />
                </div>
            </div>
        )
    }
}

export default PxlComponent