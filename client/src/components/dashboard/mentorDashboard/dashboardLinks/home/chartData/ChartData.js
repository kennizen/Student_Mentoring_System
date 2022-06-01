import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getInteractions } from "../../../../../../actions/interactions";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartData = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getInteractions(history));
    }, []);

    return (
        <Line
            data={{
                labels: [
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
                    23, 24, 25, 26, 27, 28, 29, 30, 31,
                ],
                datasets: [
                    {
                        label: "posts",
                        data: [0, 0, 0, 0, 12, 19, 3, 5, 2, 3],
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                    {
                        label: "meetings",
                        data: [0, 12, 56, 3, 50, 21, 36],
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                    },
                ],
            }}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            }}
        />
    );
};

export default ChartData;
