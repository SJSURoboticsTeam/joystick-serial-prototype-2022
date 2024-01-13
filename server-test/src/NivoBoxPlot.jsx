import { ResponsiveBoxPlot } from '@nivo/boxplot'

const MyResponsiveBoxPlot = ({ data }) => {

    
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vh',
          
        }}>
            <div style={{ height: '50%', width: '50%' }}>


                <ResponsiveBoxPlot
                    data={data}
                    layout="vertical"
                    margin={{ top: 60, right: 60, bottom: 60, left: 60 }}
                    minValue="auto"
                    maxValue="auto"
                    subGroupBy="subgroup"
                    quantiles={[0, 0.25, 0.5, 0.75, 1]}
                    padding={0.12}
                    enableGridX={true}
                    axisTop={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '',
                        legendOffset: 36
                    }}
                    axisRight={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: '',
                        legendOffset: 0
                    }}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'group',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'value',
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    colors={{ scheme: 'nivo' }}
                    borderRadius={2}
                    borderWidth={2}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.3
                            ]
                        ]
                    }}
                    medianWidth={2}
                    medianColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.3
                            ]
                        ]
                    }}
                    whiskerEndSize={0.6}
                    whiskerColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.3
                            ]
                        ]
                    }}
                    motionConfig="stiff"
                    legends={[
                        {
                            anchor: 'right',
                            direction: 'column',
                            justify: false,
                            translateX: 100,
                            translateY: 0,
                            itemWidth: 60,
                            itemHeight: 20,
                            itemsSpacing: 3,
                            itemTextColor: '#999',
                            itemDirection: 'left-to-right',
                            symbolSize: 20,
                            symbolShape: 'square',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000'
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
        </div>
    );
};


export default MyResponsiveBoxPlot