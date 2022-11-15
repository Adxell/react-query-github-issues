import { useState } from 'react'
import { LoadingIcon } from '../../shared/components/LoginIcon';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';


export const ListView = () => {
  const [selectedLabel, setSelectedLabel] = useState<string[]>([])
  const {issuesQuery} = useIssues()
  const onLabelChanged = (labelName: string) => {
    (selectedLabel.includes(labelName))
      ? setSelectedLabel( selectedLabel.filter( label => label !== labelName ))
      : setSelectedLabel( [...selectedLabel, labelName ])
  }
  return (
    <div className="row mt-5">
      
      <div className="col-8">
        {
          issuesQuery.isLoading
            ? (<LoadingIcon/>)
            : (<IssueList issues={issuesQuery.data || [] }/>)
        }
      </div>
      
      <div className="col-4">
        <LabelPicker
          selectedLabel = {selectedLabel}
          onChange={(labelName) => onLabelChanged(labelName)}
        />
      </div>
    </div>
  )
}
