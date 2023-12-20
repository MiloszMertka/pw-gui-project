export const fakeSellStatistics = {
  earnings: {
    today: {
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
      datasets: [
        {
          label: "Current",
          data: [30, 40, 50, 45, 55, 60, 70],
        },
        {
          label: "Previous",
          data: [20, 25, 30, 35, 40, 45, 50],
        },
      ],
    },
    currentWeek: {
      labels: ["Pn", "Wt", "Śr", "Czw", "Pt", "Sb", "Nd"],
      datasets: [
        {
          label: "Current",
          data: [120, 140, 130, 160, 150, 180, 170],
        },
        {
          label: "Previous",
          data: [100, 110, 95, 120, 115, 130, 125],
        },
      ],
    },
    previousWeek: {
      labels: ["Pn", "Wt", "Śr", "Czw", "Pt", "Sb", "Nd"],
      datasets: [
        {
          label: "Current",
          data: [100, 110, 95, 120, 115, 130, 125],
        },
        {
          label: "Previous",
          data: [80, 90, 85, 100, 95, 110, 105],
        },
      ],
    },
  },
  soldAmount: {
    today: {
      labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"],
      datasets: [
        {
          label: "Current",
          data: [20, 25, 30, 35, 40, 45, 50],
        },
        {
          label: "Previous",
          data: [15, 20, 25, 30, 35, 40, 45],
        },
      ],
    },
    currentWeek: {
      labels: ["Pn", "Wt", "Śr", "Czw", "Pt", "Sb", "Nd"],
      datasets: [
        {
          label: "Current",
          data: [60, 80, 70, 90, 85, 100, 95],
        },
        {
          label: "Previous",
          data: [50, 60, 55, 70, 65, 80, 75],
        },
      ],
    },
    previousWeek: {
      labels: ["Pn", "Wt", "Śr", "Czw", "Pt", "Sb", "Nd"],
      datasets: [
        {
          label: "Current",
          data: [50, 60, 55, 70, 65, 80, 75],
        },
        {
          label: "Previous",
          data: [40, 50, 45, 60, 55, 70, 65],
        },
      ],
    },
  },
};
