import React, { useEffect, useState } from 'react';
import AttackButton from '../components/AttackButton';
import DelayInput from '../components/DelayInput';
import { getIp, getAmountRequests, doAttack, getRequestsGoneThrough, getMinReq } from '../api.js';

const Main = () => {
    const [amountRequests, setAmountRequests] = useState(getAmountRequests());
    const [requestsGoneTrough, setRequestsGoneThrough] = useState(getRequestsGoneThrough());
    const [delay, setDelay] = useState(2);
    const [isAttacking, setIsAttacking] = useState(false);
    const [minReqSpeed, setMinReqSpeed] = useState(2);


    useEffect(() => {
        const interval = setInterval(() => {
            if (isAttacking) {
                attack();
            }
        }, delay * 1000);

        return () => clearInterval(interval);
    }, [isAttacking, delay]);

    useEffect(() => {
        const interval = setInterval(() => {
            const fetchMinReq = async () => {
                const minReq = await getMinReq();

                console.log(minReq);


                setMinReqSpeed(minReq);
                if (delay < minReq) {
                    setDelay(minReq);
                }
            };

            fetchMinReq();
        }, 4000);

        return () => clearInterval(interval);
    }, [isAttacking, delay]);


    const attack = async () => {
        console.log('attack');

        setAmountRequests((amountRequests) => parseInt(amountRequests) + 1);
        console.log(amountRequests);


        const res = await doAttack();
        console.log(res);

        if (res.success) {
            setRequestsGoneThrough((requestsGoneTrough) => parseInt(requestsGoneTrough) + 1);
        }
    }

    return (
        <div className='flex flex-col space-y-8 justify-center items-center h-screen'>
            <h1 className='text-8xl font-bold text-center'>
                DDoS
            </h1>
            <p>IP-Adresse: {getIp()}</p>
            <AttackButton attack={() => setIsAttacking(!isAttacking)} isAttacking={isAttacking} />
            <DelayInput dely={delay} setDelay={setDelay} min={minReqSpeed} />
            <div className='flex flex-col justify-center items-center'>
                <p>Anfragen gesendet: {amountRequests}</p>
                <p>Anfragen beantwortet: {requestsGoneTrough}</p>
            </div>
        </div>
    )
}

export default Main