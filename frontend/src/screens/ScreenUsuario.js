import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getClientes } from '../redux/ducks/getClients';
import { getCasos, filterCasos, editarFechas } from '../redux/ducks/getCasos';
import { ContainerUser, Body } from '../styles/styleComponents';
import Loader from '../components/Loader';
import SideBar from '../components/SideBar';
import DataTable from '../components/DataTable';
import FilterData from '../components/FilterData';
import Message from '../components/Message';


export default function ScreenUsuario() {

    const dispatch = useDispatch()
    const [state, setState] = useState({ selected: null })



    const { loading, clientes, loadingClientes } = useSelector(state => state.clientes)
    const { casos, startDate, endDate, loadingCasos, errorCasos } = useSelector(state => state.casos)


    useEffect(() => {

        dispatch(getClientes())

    }, [])

    const handleChildClick = id => {
        setState(id)
        dispatch(getCasos(id))
    }





    return (
        <div style={{ height: '100vh', width: '100vw'}}>
            {
                loading
                    ? < Loader />
                    : loadingClientes
                        ? <Loader />
                        : (
                            <ContainerUser>
                                <SideBar
                                    state={state}
                                    loading={loading}
                                    clientes={clientes}
                                    funcion={handleChildClick}
                                />
                                <Body>
                                    <FilterData
                                        dispatch={dispatch}
                                        estadoUno={startDate}
                                        estadoDos={endDate}
                                        accionGet={filterCasos}
                                        accionFecha={editarFechas}
                                    />

                                    {errorCasos
                                        ? <Message variant="danger">
                                            {errorCasos}
                                        </Message>
                                        :
                                        <DataTable
                                            casos={casos}
                                            loadingCasos={loadingCasos}
                                        />
                                    }
                                </Body>
                            </ContainerUser>
                        )
            }
        </div>
    )
}

