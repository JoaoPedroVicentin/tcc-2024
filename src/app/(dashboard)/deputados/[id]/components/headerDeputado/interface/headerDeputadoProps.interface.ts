import { IGetDeputadoByIdReturn } from '@/httpsRequests/deputados/getDeputadoById/interface/getDeputadoByIdReturn.interface'

export interface IHeaderDeputadoProps {
  deputado: IGetDeputadoByIdReturn['dados']
}
