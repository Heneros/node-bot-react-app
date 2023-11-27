import React, { useCallback, useEffect, useState } from 'react'
import './Form.css';
import useTelegram from '../../hooks/useTelegram';

export default function Form() {
    const [name, setName] = useState('');
    const [email, setEmaIL] = useState('');
    const [subject, setSubject] = useState('physical');
    const { tg } = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            name,
            email,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [name, email, subject]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Send data'
        })
    }, []);

    useEffect(() => {
        if (!email || !name) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [name, email])

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangEmail = (e) => {
        setEmaIL(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }


    return (
        <div className={"form"}>
            <h3>Enter your data</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Full Name'}
                value={name}
                onChange={onChangeName}
            />
            <input
                className={'input'}
                type="email"
                placeholder={'Email'}
                value={email}
                onChange={onChangEmail}
            />
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'physical'}>Физ. лицо</option>
                <option value={'legal'}>Юр. лицо</option>
            </select>
        </div>
    )
}
