import {useEffect, useState} from "react";
import {SettingsRepository} from "../domain/repositories/SettingsRepository";
import {LocalStorageAdapter} from "../domain/repositories/LocalStorageAdapter";
import Modal from 'react-modal';
import TelegramIcon from '../telegram-icon.svg'
import VkIcon from '../vk-icon.svg'
import {IntegrationType} from "../domain/repositories/UsersRepository";

export const IntegrationItem = (props: any) => {
    return <div style={{padding: 15, backgroundColor: '#d7bcbc', borderRadius: 15}}>
        <div style={{padding: 5}}>{props.name}</div>
        <div >Status: {props.state}</div>
    </div>
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 350,
        border: 'none',
        backgroundColor: '#91d3b7',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
};

interface ConnectionStageProps {
    integrationsRepository: SettingsRepository;
    instanceId: string;
}

export const ConnectionStage = (props: ConnectionStageProps) => {

    const [field, setField] = useState('')
    const [value, setValue] = useState('')

    useEffect(() => {
        props.integrationsRepository.canCommitCreate(props.instanceId).then((res) => {
            console.log(res)
            if(res.fieldName) {
                setField(res.fieldName)
            }
        })
    }, [])

    const pushStage = async (value: string) => {
        const response = await props.integrationsRepository.pushAuth(props.instanceId, value)
        setValue('')
        setTimeout(() => {
            props.integrationsRepository.canCommitCreate(props.instanceId).then((res) => {
                console.log(res)
                setField(res.fieldName)
            })
        }, 1000)
    }

    const commitCreate = async () => {
        const response = await props.integrationsRepository.commitCreate(props.instanceId)
        // eslint-disable-next-line no-restricted-globals
        location.reload()
    }

    return (
        <div>
            {!field ?
                <button className="input" onClick={() => commitCreate()}>Commit creation</button>
            : <div>
                <input
                    placeholder={`Enter ${field}`}
                    type="text"
                    className="input"
                    value={value}
                    onChange={(ev) => setValue(ev.target.value)}
                />
                    <button className="input" onClick={() => pushStage(value)}>Next</button>
                <button className="input" onClick={() => {}}>Close Modal</button></div>
            }
        </div>
    );
}

export const Settings = (props: any) => {

    const [isConnecting, setIsConnecting] = useState(false)
    const [tempInstanceId, setTempInstanceId] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [integrations, setIntegrations] = useState([{name: "aaa"}])
    const accessToken = LocalStorageAdapter.getAuthData()
    const integrationsRepository = new SettingsRepository(accessToken)
    Modal.setAppElement('#root');

    useEffect(() => {
        integrationsRepository.getUserIntegration().then((res) => setIntegrations(res))
    }, [])

    const initConnect = async (type: IntegrationType) => {
        const createResponse = await integrationsRepository.createIntegration(type)
        if(!createResponse.instanceId){
            return
        }
        setTempInstanceId(createResponse.instanceId)
        setIsConnecting(true)
    }

    return <div>
        <Modal
            isOpen={showModal}
            onAfterOpen={() => {}}
            onRequestClose={() => {}}
            style={customStyles}
            contentLabel="Create your new integration"
        >
            <h2>Choose channel to connect</h2>
            {isConnecting ? <ConnectionStage
                integrationsRepository={integrationsRepository}
                instanceId={tempInstanceId}/> :  <div style={{display: 'flex'}}>
                <div className="settings-channel">
                    <h3>Telegram</h3>
                    <img src={TelegramIcon}/>
                    <div className="input" onClick={() => initConnect(IntegrationType.TELEGRAM)}>connect</div>
                </div>
                <div className="settings-channel">
                    <h3>VK</h3>
                    <img src={VkIcon}/>
                    <div className="input">connect</div>
                </div>
            </div> }

            <button className="input" onClick={() => setShowModal(false)}>Exit</button>
        </Modal>
        <h3>Settings</h3>
        <h2>Integrations</h2>
        {integrations.map((item) => <IntegrationItem {...item}/> )}
        <div
            className="input"
             onClick={() => setShowModal(true)}>Connect new integration</div>
    </div>
}
