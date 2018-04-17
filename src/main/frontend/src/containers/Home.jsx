import React from "react"
        import PropTypes from "prop-types"
        import {connect} from "react-redux"
        import ReactHighcharts from 'react-highcharts'
        import Approximation from '../lib/Approximation'

        import {loadC, doIncrementC} from "../store/increment-c"

        class Page extends React.Component {

    static propTypes = {
        loading: PropTypes.bool,
        error: PropTypes.node,
        value: PropTypes.number,
        loadB: PropTypes.func.isRequired,
        doIncrementB: PropTypes.func.isRequired
    }

    static defaultProps = {
        loading: false,
        error: null,
        value: null
    }

    constructor() {
        super()

        this.handleLoad = this.handleLoad.bind(this)
        this.handleIncrement = this.handleIncrement.bind(this)
    }

    componentWillMount() {
        this.handleLoad()
    }

    shouldComponentUpdate(nextProps) {
        return this.props.loading !== nextProps.loading ||
                this.props.error !== nextProps.error ||
                this.props.value !== nextProps.value
    }

    componentWillUnmount() {
        if (this.currentRequest) {
            this.currentRequest.abort()
        }
    }

    currentRequest = null

    handleLoad() {
        if (!this.props.value) {
            if (this.currentRequest) {
                this.currentRequest.abort()
            }

            const promise = this.props.loadC()

            this.currentRequest = promise.request
            promise
                    .then(() => {
                        this.currentRequest = null
                    })
                    .catch(() => {
                        this.currentRequest = null
                    })
        }
    }

    handleIncrement() {
        if (this.currentRequest) {
            this.currentRequest.abort()
        }

        const incrementing = this.props.doIncrementC()

        this.currentRequest = incrementing.request
        return incrementing
                .then(() => {
                    this.currentRequest = null
                })
                .catch(() => {
                    this.currentRequest = null
                })
    }

    render() {
        let x = [83, 71, 64, 69, 69, 64, 68, 59, 81, 91, 57, 65, 58, 62];
        let y = [183, 168, 171, 178, 176, 172, 165, 158, 183, 182, 163, 175, 164, 175];

        var approx = new Approximation(x, y);

        const {loading, error, value} = this.props
        var config = {
            chart: {
                polar: true
            },
            title: {
                text: 'Аппроксимация функции'
            }, xAxis: {
                gridLineWidth: 1,
                title: {
                    enabled: true,
                    text: 'Time (s)'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'Value '
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            series: [{
                    type: 'line',
                    name: 'Гиперболическая аппроксимация',
                    data: approx.hyperbolicApproximation(),
                    marker: {
                        enabled: false
                    },
                    states: {
                        hover: {
                            lineWidth: 0
                        }
                    },
                    enableMouseTracking: false
                }, {
                    type: 'line',
                    name: 'Линейная аппроксимация',
                    data: approx.linearApproximation(),
                    marker: {
                        enabled: false
                    },
                    states: {
                        hover: {
                            lineWidth: 0
                        }
                    },
                    enableMouseTracking: false
                }, {
                    type: 'line',
                    name: 'Квадратичная аппроксимация',
                    data: approx.quadraticApproximation(),
                    marker: {
                        enabled: false
                    },
                    states: {
                        hover: {
                            lineWidth: 0
                        }
                    },
                    enableMouseTracking: false
                }, {
                    name: 'Точки',
                    type: 'scatter',
                    data: approx.getXY()

                }],
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x}, {point.y}'
            }
        }
        return (
                <article>
                    <ReactHighcharts config = {config}></ReactHighcharts>
                    <p>Значение - <strong>{value}</strong></p>
                </article>
                )
    }
}

export default connect(
        state => ({
                loading: state.incrementC.wait,
                error: state.incrementC.error,
                value: state.incrementC.value
            }),
        {loadC, doIncrementC}
)(Page)
