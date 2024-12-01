import React, { useEffect, useState } from "react";
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
import Loading from "../../../../../loading/Loading";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartData = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [data, setData] = useState({
        labels: [],
        posts: [],
        meetings: [],
        maxVal: 0,
    });

    useEffect(() => {
        dispatch(getInteractions(history, setData));
    }, []);

    return (
        <>
            {data.labels.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center">
                    <Loading />
                </div>
            ) : (
                <Line
                    data={{
                        labels: data.labels,
                        datasets: [
                            {
                                label: "posts",
                                data: data.posts,
                                borderColor: "rgb(255, 99, 132)",
                                backgroundColor: "rgba(255, 99, 132, 0.5)",
                                tension: 0.3,
                            },
                            {
                                label: "meetings",
                                data: data.meetings,
                                borderColor: "rgb(53, 162, 235)",
                                backgroundColor: "rgba(53, 162, 235, 0.5)",
                                tension: 0.3,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1,
                                },
                                //max: data.maxVal,
                            },
                        },
                    }}
                />
            )}
        </>
    );
};

export default ChartData;
