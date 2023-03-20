import { FC, MouseEvent, useState } from "react";
import { IUser } from "../../interfaces";
import { useTypedDispatch } from "../../redux/store";
import { removeUserByIdThunk } from "../../redux/user/userReducers";
import { markSearchValue } from "../../utils/utils";
import { Modal } from "../Modal/Modal";

import './styles.scss'

interface Props {
    user: IUser
    searchedValue: string
}

interface IRenderedItems {
    [key: string]: string | IRenderedItems
}

export const UserItem: FC<Props> = ({user, searchedValue}) => {
    const dispatch = useTypedDispatch();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const renderObjectData = (data: IRenderedItems): React.ReactNode => {
        const keys = Object.keys(data);

        return (
            keys.map((item) => {
                if (typeof data[item] === 'object') {
                    return renderObjectData(data[item] as {})
                }
                return <div key={item}>
                    <span>{item}:</span>
                    <span>{data[item] as string}</span>
                </div>
            })
        )
    }

    const handleDeleteUser = (userId: number) => {
        dispatch(removeUserByIdThunk(userId));
    }

    const onOpenModal = (e: MouseEvent) => {
        if ((e.target as HTMLElement).tagName === 'BUTTON') {
            return null
        }
        setIsOpenModal(!isOpenModal);
    }

    return (
        <>
            <li onClick={onOpenModal} className="user">
                <p>
                    name: <span dangerouslySetInnerHTML={{__html: markSearchValue(user.name, searchedValue)}} />
                </p>
                <p>
                    username: <span dangerouslySetInnerHTML={{__html: markSearchValue(user.username, searchedValue)}} />
                </p>
                <p>
                    email: <span dangerouslySetInnerHTML={{__html: markSearchValue(user.email, searchedValue)}} />
                </p>
                <button onClick={() => handleDeleteUser(user.id)} className="user__delete-btn">X</button>
            </li>
            {isOpenModal && (
                <Modal onClose={setIsOpenModal}>
                    <h3>Address</h3>
                    {renderObjectData(user.address)}
                    <hr />
                    <h3>Company</h3>
                    {renderObjectData(user.company)}

                </Modal>
            )}
        </>
    )
}
