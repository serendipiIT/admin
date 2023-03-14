export const data = {
  labels: ['Jackets', 'Pants', 'Shirts', 'Dresses'],
  datasets: [
    {
      backgroundColor: [
        'rgba(65, 184, 131, 0.2)',
        'rgba(228, 102, 81, 0.2)',
        'rgba(0, 216, 255, 0.2)',
        'rgba(221, 27, 22, 0.2)'],
      borderColor: [
        'rgba(65, 184, 131, 1)',
        'rgba(228, 102, 81, 1)',
        'rgba(0, 216, 255, 1)',
        'rgba(221, 27, 22, 1)'
      ],
      data: [40, 20, 80, 10]
    }
  ]
}

export const options = {
  responsive: true,
  maintainAspectRatio: false
}
