import { ResponsiveLine } from '@nivo/line'

function Chart ({data}) {
    const theme = {
        "background": "rgba(0,0,0,0)",
        "textColor": "#85858c",
        "fontSize": 12,
        "axis": {
            "domain": {
                "line": {
                    "stroke": "#ebebf5",
                    "strokeWidth": 1
                }
            },
            "ticks": {
                "line": {
                    "stroke": "#210303",
                    "strokeWidth": 0
                }
            }
        },
        "grid": {
            "line": {
                "stroke": "#f7f7fa",
                "strokeWidth": 1
            }
        }
    }
    const colors = ['#403DD5','#F61E52', '#13CA72', '#FFC32A', '#1D85FF']
    return(
        <div className="Chart">
            <ResponsiveLine
                data={data}
                margin={{ top: 40, right: 40, bottom: 80, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                yFormat=" >-.2f"
                curve="natural"
                //curve="catmullRom"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 0,
                    tickPadding: 8,
                    tickRotation: -30,
                    legend: '',
                    legendOffset: 40,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 0,
                    tickPadding: 8,
                    tickRotation: 0,
                    legend: '',
                    legendOffset: -44,
                    legendPosition: 'middle'
                }}
                enableGridY={false}
                colors={colors}
                lineWidth={2}
                enablePoints={false}
                pointSize={2}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={1}
                pointBorderColor={{ from: 'serieColor', modifiers: [] }}
                pointLabelYOffset={-12}
                useMesh={true}
                theme={theme}
                enableSlices="x"
                sliceTooltip={({ slice }) => {
                    return (
                        <div
                            style={{
                                fontSize: '12px',
                                background: 'white',
                                padding: '12px',
                                borderRadius : '8px',
                                boxShadow: '0px 4px 24px 0px rgba(34, 34, 34, 0.1)'
                            }}
                        >
                            {slice.points.map(point => (
                                <div key={point.id} style={{ padding: '2px 0' }}>
                                    <strong style={{ 
                                        color: point.serieColor,
                                        paddingRight: '6px'
                                    }}>
                                        {point.serieId}
                                    </strong>
                                    {point.data.yFormatted}
                                </div>
                            ))}
                        </div>
                    )
                }}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 54,
                        itemWidth: 90,
                        itemHeight: 10,
                        itemsSpacing: 0,
                        symbolSize: 8,
                        symbolShape: 'circle',
                        itemDirection: 'left-to-right',
                        itemTextColor: '#777',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    )
}

export default Chart