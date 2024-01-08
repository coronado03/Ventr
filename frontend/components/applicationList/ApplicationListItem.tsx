import { ApplicationListItemProps } from "./types"
import moment from 'moment';

export default function ApplicationListItem({ data }: ApplicationListItemProps) {
  let formattedApplicationDate = moment(data.applicationDate);

  return (
    <>
    <tr className="[&>*]:border [&>*]:border-b-0 [&>*]:border-slate-600">        
      <td>{data.applicationId}</td>   
      <td>{data.companyName}</td>
      <td>{data.jobRole}</td>
      <td>{data.sourceLinks}</td>
      <td>{formattedApplicationDate.format('YYYY-MM-DD')}</td>   
      <td>{data.stateOfApplication}</td>
      <td>{data.comments}</td>
    </tr>
    </>

  )
}