import { makeStyles } from '@/components/common'

export default makeStyles()({
	local: {
		background: `linear-gradient(
                  to bottom,
                  rgba(var(--r), var(--g), var(--b), 72%),
                  rgba(var(--r), var(--g), var(--b), 93%)
            )`,
		borderRadius: '50%'
	}
})
