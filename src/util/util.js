import moment from "moment";

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    // Usa Intl.NumberFormat para formato angolano (pt-PT é o mais próximo)
    return new Intl.NumberFormat("pt-PT", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(num);
};

export const prepareIncomeLineChartData = (data = []) => {
    // Agrupar por data
    const groupedByDate = data.reduce((acc, item) => {
        const dateKey = item.date; // formato YYYY-MM-DD

        if (!acc[dateKey]) {
            acc[dateKey] = {
                date: dateKey,
                totalAmount: 0,
                items: [],
            };
        }

        acc[dateKey].totalAmount += item.amount;
        acc[dateKey].items.push(item);
        return acc;
    }, {});

    let chartData = Object.values(groupedByDate);

    // Ordenar por data
    chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Formatar data para X-axis
    chartData = chartData.map((dataPoint) => ({
        ...dataPoint,
        month: moment(dataPoint.date).format("DD/MM"), // formato dia/mês
    }));

    return chartData;
};
