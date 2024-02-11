import { DistributionDetails, ExpensesDetails, MonthsDistributionDetails } from '@/common/ChartDetails'
import { getMediaMatch } from '@/customHooks'
import { CardCategory } from '@/enums/ECard'
import ChartDetailsType from '@/enums/EChart/EChartDetailsType'
import { type IRecord, type IRecordItem } from '@/model/CardModel'
import { Box, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent, type Theme } from '@mui/material'
import { useEffect, useState } from 'react'

interface Props {
    inputDate: Date
    inputDateRecordList: IRecordItem[] | never
    record: IRecord
    theme: Theme
}

const ChartsDetails = ({ inputDate, inputDateRecordList, record, theme }: Props) => {
    const choices: CardCategory[] = (Object.keys(CardCategory) as Array<keyof typeof CardCategory>).map(key => CardCategory[key])
    const match = getMediaMatch()

    const [chartSelectorOptions, setChartSelectorOptions] = useState<ChartDetailsType>(ChartDetailsType.DISTRIBUTION_DETAILS)
    const [prevSelectedOptions, setPrevSelectedOptions] = useState<ChartDetailsType>(ChartDetailsType.DISTRIBUTION_DETAILS)

    const handleChange = (event: SelectChangeEvent): void => {
        const selectedChart = event.target.value as ChartDetailsType
        setChartSelectorOptions(selectedChart)
        setPrevSelectedOptions(selectedChart)
    }

    useEffect(() => {
        if (match) { setChartSelectorOptions(ChartDetailsType.DEFAULT) }
        if (!match) {
            if (prevSelectedOptions !== undefined) { setChartSelectorOptions(prevSelectedOptions) }
        }
    }, [match, prevSelectedOptions])

    return (
        <>
            {// Larger Media View
                chartSelectorOptions === ChartDetailsType.DEFAULT
                    ? <Box
                        display={'flex'}
                        maxWidth={'100%'}
                        height={400}
                        alignItems={'center'}
                    >
                        <DistributionDetails
                            choices={choices}
                            inputDateRecordList={inputDateRecordList}
                            theme={theme}
                        />

                        <ExpensesDetails
                            choices={choices}
                            inputDate={inputDate}
                            inputDateRecordList={inputDateRecordList}
                            theme={theme}
                        />

                        <MonthsDistributionDetails
                            choices={choices}
                            inputDate={inputDate}
                            record={record}
                            theme={theme}
                        />
                    </Box>
                    :// Shorter Media View
                    <Box>
                        <FormControl fullWidth>
                            <InputLabel id='chartSelectorLabel'>Details</InputLabel>
                            <Select
                                labelId="chartSelectorLabel"
                                id="chartSelector"
                                value={chartSelectorOptions}
                                label="Details"
                                onChange={(e) => { handleChange(e) }}
                            >
                                <MenuItem value={ChartDetailsType.DISTRIBUTION_DETAILS} >Distribution Details</MenuItem>
                                <MenuItem value={ChartDetailsType.EXPENSES_DETAILS} >Expenses Details</MenuItem>
                                <MenuItem value={ChartDetailsType.MONTHLY_DETAILS} >Past 3 Months Comparison</MenuItem>
                            </Select>

                            {
                                chartSelectorOptions === ChartDetailsType.DISTRIBUTION_DETAILS &&
                                <DistributionDetails
                                    choices={choices}
                                    inputDateRecordList={inputDateRecordList}
                                    theme={theme}
                                />
                            }
                            {
                                chartSelectorOptions === ChartDetailsType.EXPENSES_DETAILS &&
                                <ExpensesDetails
                                    choices={choices}
                                    inputDate={inputDate}
                                    inputDateRecordList={inputDateRecordList}
                                    theme={theme}
                                />
                            }

                            {
                                chartSelectorOptions === ChartDetailsType.MONTHLY_DETAILS &&
                                <MonthsDistributionDetails
                                    choices={choices}
                                    inputDate={inputDate}
                                    record={record}
                                    theme={theme}
                                />
                            }
                        </FormControl>
                    </Box>
            }
        </>
    )
}

export default ChartsDetails
