import { CardCategory, CardCategoryColor } from "@/enums/ECard"
import { IRecordItem } from "@/model/CardModel"
import { Container, Theme } from "@mui/material"
import { Bar } from "react-chartjs-2"


type Props = {
    choices: CardCategory[],
    inputDate: Date,
    inputDateRecordList: IRecordItem[],
    theme: Theme
}

export const ExpensesDetails = ({ choices, inputDate, inputDateRecordList, theme }: Props) => {

    const colorPalette = theme.palette.text.primary;

    const inputMonth: Date[] = [];

    const date = new Date(inputDate.getFullYear(), inputDate.getMonth(), 1)
    while (date.getMonth() === inputDate.getMonth()) {
        (inputDateRecordList.find(item => {

            if (item.date.getDate() === date.getDate() &&
                item.category !== CardCategory.INCOME
            ) {
                if (inputMonth.length > 0) {
                    if (inputMonth[inputMonth.length - 1].getDate() !== date.getDate())
                        inputMonth.push(new Date(date));
                }
                else if (inputMonth.length === 0)
                    inputMonth.push(new Date(date));

            }
        }))
        date.setDate(date.getDate() + 1)
    }

    const cardData = {
        labels: inputMonth.map(day => `${day.toLocaleString('default', { month: 'short' })} ${day.getDate()}`),
        datasets: choices.filter(choice => choice !== CardCategory.INCOME)
            .map(choice => {
                return {
                    label: choice,
                    data: inputMonth.map((day) => {
                        let incomeData = inputDateRecordList.filter(i => i.category === choice)
                        let output: number = 0;
                        incomeData.filter(item => {
                            if (item.date.getDate() === day.getDate())
                                output += item.amount
                        })
                        return output
                    }),
                    backgroundColor: CardCategoryColor[choice]
                }
            })
    }

    const options = {
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: `Expenses this ${inputDate.toLocaleString('default', { month: 'long', year: 'numeric' })}`,
                color: colorPalette
            },
            legend: {
                labels: {
                    color: colorPalette
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: colorPalette
                },
                ticks: {
                    color: colorPalette
                },
            },
            y: {
                grid: {
                    color: colorPalette
                },
                ticks: {
                    color: colorPalette
                }
            }
        }
    }



    return (
        <Container sx={{ height: 400 }}>
            <Bar options={options}
                data={cardData} />
        </Container>
    )
}
