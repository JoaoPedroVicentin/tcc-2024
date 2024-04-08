import { IGetDeputadoByIdReturn } from '@/httpsRequests/deputados/getDeputadoById/interface/getDeputadoByIdReturn.interface'
import { IGetProfissoesDeputadoReturn } from '@/httpsRequests/deputados/getProfissoesDeputado/interface/getProfissoesDeputadoReturn.interface'

export interface IAboutDeputadoProps {
  deputado: IGetDeputadoByIdReturn['dados']
  profissoes?: IGetProfissoesDeputadoReturn['dados']
}
