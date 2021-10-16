import React from "react";

const SingleComment = () => {
    return (
        <div className="p-2 bg-gray-100 rounded-md place-self-start mb-3 mr-2 flex">
            <img
                className="h-8 w-8 rounded-full mr-3 flex-shrink-0"
                src="https://picsum.photos/id/237/200/300"
                alt="commentorImage"
            />
            <div>
                <div className="flex items-center justify-start">
                    <h5>Commentor name</h5>
                    <div className="ml-2 mr-2 w-1 h-1 rounded-full bg-black"></div>
                    <h5>Time</h5>
                </div>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit placeat modi
                    porro saepe. Sit omnis ipsum cupiditate deserunt eaque assumenda ipsam alias aut
                    perspiciatis ad aliquid numquam, provident possimus. Nisi!
                </p>
            </div>
        </div>
    );
};

export default SingleComment;
