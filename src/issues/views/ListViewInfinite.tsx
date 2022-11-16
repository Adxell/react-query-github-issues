import { useState } from 'react'
import { useIssues, useIssuesInfinite } from '../hooks';
import { LoadingIcon } from '../../shared/components/LoginIcon';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { State } from '../interfaces/issues';


export const ListViewInfinite = () => {
  const [selectedLabel, setSelectedLabel] = useState<string[]>([])
  
  const [state, setState] = useState<State>()
  
  const {issuesQuery} = useIssuesInfinite({state, labels: selectedLabel})

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
            : (<IssueList 
                issues={issuesQuery.data?.pages.flat() || [] }
                state= {state}
                onStateChanged = {(newState?: State) => setState(newState)} 
                />)
        }
        <button 
          disabled={!issuesQuery.hasNextPage}
          className='btn btn-outline-primary'
          onClick={() => issuesQuery.fetchNextPage()}
        >
          Load more...
        </button>
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
