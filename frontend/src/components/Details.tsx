import ReactModal from 'react-modal';

export interface DetailsProps {
    data: any,
    visible: boolean,
    onClose?: () => void,
    className?: string,
}

export function Details({
        data,
        visible,
        onClose= () => {},
        className="",
    }: DetailsProps) {

    return (
        <ReactModal
            isOpen={visible}
            appElement={document.getElementById("app") as HTMLElement}
            onRequestClose={onClose}
            className={className}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
        >
            <div onClick={onClose} className="movieDetailsContainer">
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </ReactModal>
    )
}