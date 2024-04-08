import { IGetDeputadoByIdReturn } from '@/httpsRequests/deputados/getDeputadoById/interface/getDeputadoByIdReturn.interface'

export interface IDeputadoSectionProps {
  deputado: IGetDeputadoByIdReturn['dados']
}
