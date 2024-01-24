import { ApplicationListItemProps } from "./types"
import moment from 'moment';

export default function ApplicationListItem({ data }: ApplicationListItemProps) {
  let formattedApplicationDate = moment(data.applicationDate);

  return (
    <>
    <tr className="[&>*]:border [&>*]:border-b-0 [&>*]:border-blue-300 [&>*]:truncate">        
      <td className="pl-3">{data.applicationId}</td>   
      <td className="pl-3">{data.companyName}</td>
      <td className="pl-3">{data.jobRole}</td>
      <td className="pl-3">{data.sourceLinks}</td>
      <td className="pl-3">{formattedApplicationDate.format('YYYY-MM-DD')}</td>   
      <td className="pl-3">{data.stateOfApplication}</td>
      <td className="pl-3">{data.comments}</td>
    </tr>
    </>

  )
}