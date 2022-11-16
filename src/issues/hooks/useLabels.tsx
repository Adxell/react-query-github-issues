import {useQuery} from '@tanstack/react-query'

import { githubApi } from "../../api/githubApi"
import { sleep } from '../../helpers/sleep'
import { Label } from "../interfaces/label"


const getLabels = async(): Promise<Label[]> => {
  await sleep(2)
  const {data} = await githubApi.get<Label[]>('/labels?per_page=100', {
    headers: {
      Authorization: null
    }
  }) 
  return data
}

export const useLabels = () => {

    const labels = useQuery(
    ['labels'],
    getLabels,
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60, 
    //  initialData : [],
      placeholderData: [
        {
            id: 69105383,
            node_id: "MDU6TGFiZWw2OTEwNTM4Mw==",
            url: "https://api.github.com/repos/facebook/react/labels/Browser:%20IE",
            name: "Browser: IE",
            color: "c7def8",
            default: false,
        },
        {
            id: 69105358,
            node_id: "MDU6TGFiZWw2OTEwNTM1OA==",
            url: "https://api.github.com/repos/facebook/react/labels/Browser:%20Safari",
            name: "Browser: Safari",
            color: "c7def8",
            default: false,
        }
        ]
    }
  )

  return labels
}