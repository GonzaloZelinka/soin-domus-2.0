import { useEffect } from 'react'
import stringify from 'qs-stringify'
import { useNavigate } from 'react-router-dom'
import { pickBy } from 'lodash'
import { IParams } from 'shared-common'

interface Props {
  initialParams: IParams
}

function SyncQueryParams({ initialParams }: Props) {
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { inquilino, properties } = initialParams
  useEffect(() => {
    const queryParams = stringify(
      pickBy(
        {
          inquilino,
          properties,
        },
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        (value: any) => !!value,
      ),
    )
    navigate({ search: queryParams })
  }, [navigate, inquilino, properties])

  return null
}
export default SyncQueryParams
