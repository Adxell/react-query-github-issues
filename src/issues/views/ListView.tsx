import { useState } from 'react'
import { LoadingIcon } from '../../shared/components/LoginIcon';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { State } from '../interfaces/issues';


export const ListView = () => {
  const [selectedLabel, setSelectedLabel] = useState<string[]>([])
  
  const [state, setState] = useState<State>()
  
  const {issuesQuery, page, nextPage, prevPage} = useIssues({state, labels: selectedLabel})

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
                issues={issuesQuery.data || [] }
                state= {state}
                onStateChanged = {(newState?: State) => setState(newState)} 
                />)
        }
        <div className='d-flex mt-2 justify-content-between align-items-center'>
          <button 
            onClick={()=> prevPage()} 
            className='btn btn-outline-primary'
            disabled={issuesQuery.isFetching}
          >Prev</button>
          <span>{page}</span>
          <button 
            onClick={() => nextPage()} 
            className='btn btn-outline-primary'
            disabled={issuesQuery.isFetching}
          >Next</button>
        </div>
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
