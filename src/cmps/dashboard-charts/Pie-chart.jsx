import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { LightenDarkenColor } from "lighten-darken-color"

ChartJS.register(ArcElement, Tooltip, Legend)

export const PieChart = ({ labelsValues, labelsIds }) => {

  const board = useSelector(state => state.boardModule.board)

  labelsIds = labelsIds.map(labelId => board.labels.find(label => label.id === labelId))

  const data = {
    labels: labelsIds.map(label => {
      if (label.title) return label.title
      else return label.id
    }),
    datasets: [
      {
        label: '# of Tasks',
        data: labelsValues,
        backgroundColor:
          labelsIds.map(label => LightenDarkenColor(label.color, 30)),
        borderColor:
          labelsIds.map(label => label.color),
        borderWidth: 1,
      },
    ],
  }
  const options = {
    plugins: {
      legend: {
        display: false,

      }
    }
  }
  return <Doughnut data={data} options={options} />
}

