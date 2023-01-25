const Options = (title, subtitle) => {
  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        align: 'start',
        text: title,
        padding: {
          top: 10,
          bottom: 10,
        },
        font: {
          size: 18,
          fontFamily: 'Quicksand',
        },
        color: 'rgba(3, 41, 62, 0.5)',
      },
      subtitle: {
        display: true,
        text: subtitle,
        align: 'start',
        padding: {
          top: 0,
          bottom: 30,
        },
        font: {
          // weight: 'bold',
          size: 12,
          fontFamily: 'Quicksand',
        },
        color: 'rgba(3, 41, 62, 0.5)',
      },
      legend: {
        position: 'left',
        labels: {
          padding: 20,
        },
        title: {
          display: true,
          text: 'EC2 Instance Ids',
          font: {
            weight: 'bold',
            size: 12,
            fontFamily: 'Quicksand',
          },
          color: 'rgba(3, 41, 62, 0.5)',
          padding: {
            top: 20,
            bottom: 0,
          },
        },
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
    },
    transitions: {
      show: {
        animations: {
          x: {
            from: 0,
          },
          y: {
            from: 0,
          },
        },
      },
      hide: {
        animations: {
          x: {
            to: 0,
          },
          y: {
            to: 0,
          },
        },
      },
    },
  };

  return options;
};

export default Options;
