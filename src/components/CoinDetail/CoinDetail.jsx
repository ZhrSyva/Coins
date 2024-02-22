import { NavLink, useParams } from "react-router-dom";
import coinDetail from "./coinDetail.module.css";
import { useEffect, useState } from "react";

const CoinDetail = () => {
    const coin = useParams();
    const [coinDetails, setCoinDetails] = useState(localStorage.getItem('coin') ? JSON.parse(localStorage.getItem('coin')) : {});
    const [showZoomFront, setShowZoomFront] = useState(false);
    const [showZoomBack, setShowZoomBack] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [zoomFactor, setZoomFactor] = useState();
    localStorage.setItem('coin', JSON.stringify(coinDetails));

    useEffect(() => {

        fetch(`http://localhost:3000/coins/${coin.id}`)
            .then(res => res.json())
            .then(data => setCoinDetails(data));

    }, [coin.id]);


    const handleMouseMoveFront = (event) => {
        const { clientX, clientY } = event;

        const leftPos = clientX - 200;
        const topPos = clientY - 115;

        setShowZoomFront(true);
        setZoomFactor(3);
        setZoomPosition({ x: leftPos, y: topPos });
    };

    const handleMouseMoveBack = (event) => {
        const { clientX, clientY } = event;

        const leftPos = clientX - 185;
        const topPos = clientY - 425;

        setShowZoomBack(true);
        setZoomFactor(3);
        setZoomPosition({ x: leftPos, y: topPos });
    };

    const handleMouseLeave = () => {
        setShowZoomFront(false);
        setShowZoomBack(false);
    }

    return (
        <div className={coinDetail["detail-container"]}>
            <div className={coinDetail["detail-images"]} >
                <div onMouseMove={handleMouseMoveFront} onMouseLeave={handleMouseLeave}>
                    <img src={coinDetails && coinDetails['image_front-side']} alt="front-image" />
                    {
                        showZoomFront && (
                            <div
                                className={coinDetail["zoom-window"]}
                                style={{
                                    backgroundImage: `url(${coinDetails && coinDetails['image_front-side']})`,
                                    backgroundPosition: `-${zoomPosition.x * zoomFactor}px -${zoomPosition.y * zoomFactor}px`,
                                    backgroundSize: `${300 * zoomFactor}px ${300 * zoomFactor}px`,
                                    left: `${zoomPosition.x}px`,
                                    top: `${zoomPosition.y}px`,
                                    zIndex: 100
                                }}
                            ></div>
                        )}
                </div>
                <div onMouseMove={handleMouseMoveBack} onMouseLeave={handleMouseLeave}>
                    <img src={coinDetails && coinDetails['image_back-side']} alt="back-image" />
                    {
                        showZoomBack && (
                            <div
                                className={coinDetail["zoom-window"]}
                                style={{
                                    backgroundImage: `url(${coinDetails && coinDetails['image_back-side']})`,
                                    backgroundPosition: `-${zoomPosition.x * zoomFactor}px -${zoomPosition.y * zoomFactor}px`,
                                    backgroundSize: `${300 * zoomFactor}px ${300 * zoomFactor}px`,
                                    left: `${zoomPosition.x}px`,
                                    top: `${zoomPosition.y}px`
                                }}
                            ></div>
                        )}
                </div>
            </div>
            <div className={coinDetail["detail-wrapper"]}>
                <h1>{coinDetails?.name}</h1>
                <p>{coinDetails?.short_description}</p>
                <p>{coinDetails?.long_description}</p>
                <table>
                    <tbody>
                        <tr>
                            <td>Issuing Country</td>
                            <td>{coinDetails?.country}</td>
                        </tr>
                        <tr>
                            <td>Composition</td>
                            <td>{coinDetails?.metal}</td>
                        </tr>
                        <tr>
                            <td>Quality</td>
                            <td>{coinDetails?.quality}</td>
                        </tr>
                        <tr>
                            <td>Denomination</td>
                            <td>{coinDetails?.face_value}</td>
                        </tr>
                        <tr>
                            <td>Year</td>
                            <td>{coinDetails?.year}</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>{coinDetails?.weight}</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>{coinDetails?.price} $</td>
                        </tr>
                    </tbody>
                </table>
                <NavLink to="/list">
                    <button>Back to List</button>
                </NavLink>
            </div>
        </div>
    )
}

export default CoinDetail
