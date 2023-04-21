import metadata from '../../metadata'
import MetaItem from '../MetaItem'

import type { IPropsDetail } from '../../types'


const Index = (props: IPropsDetail) => {
	const { current_td_item } = props
	const { type, label, value, rowSpan, colSpan, props: td_props } = current_td_item

      return <div className='detail_wrap'>
            {/* {
                  Object.keys(metadata.common).map(key => (
                        <MetaItem {...metadata.common[key]}></MetaItem>
                  ))
            } */}
      </div>
}

export default window.$app.memo(Index)
