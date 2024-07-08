import { IGetEventosByIdReturn } from '@/httpsRequests/eventos/getEventosById/interface/getEventosByIdReturn.interface'

export interface IEventoSectionProps {
  evento: IGetEventosByIdReturn['dados']
}
