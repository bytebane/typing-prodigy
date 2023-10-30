import styled from '@emotion/styled'
import { Box } from '@mui/material'

const ModalBox = styled(Box)(({ theme, height, width, paddingTop }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: width ?? '55%',
	height: height,
	minWidth: 300,
	minHeight: 120,
	color: theme.palette.text.primary,
	backgroundColor: theme.palette.background.paper,
	paddingTop: paddingTop ?? '2.5rem',
	paddingLeft: ` 1.5rem`,
	paddingRight: ` 1.5rem`,
	paddingBottom: '2.5rem',
	borderRadius: 5,
	outline: 'none',
	border: `1px solid ${theme.palette.secondary.main}`,
	boxShadow: 24,
	p: 4,
}))

export default ModalBox
