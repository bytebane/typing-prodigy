import { Container, Skeleton, Typography } from '@mui/material'

const TypingBoxSkeleton = ({ animate = true }) => {
	return (
		<Container sx={{ my: 2, height: '90%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
			{!animate && (
				<Typography className='custom' color={'secondary'} align='center' sx={{ zIndex: 9, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} variant='h4'>
					Hit Ctrl + Alt to Start Typing
				</Typography>
			)}
			<Skeleton sx={{ opacity: animate ? 1 : 0.35 }} animation={animate ? 'pulse' : animate} width={'100%'} />
			<Skeleton sx={{ opacity: animate ? 1 : 0.35 }} animation={animate ? 'pulse' : animate} width={'100%'} />
			<Skeleton sx={{ opacity: animate ? 1 : 0.35 }} animation={animate ? 'pulse' : animate} width={'100%'} />
			<Skeleton sx={{ opacity: animate ? 1 : 0.35 }} animation={animate ? 'pulse' : animate} width={'100%'} />
			<Skeleton sx={{ opacity: animate ? 1 : 0.35 }} animation={animate ? 'pulse' : animate} width={'100%'} />
			<Skeleton sx={{ opacity: animate ? 1 : 0.35 }} animation={animate ? 'pulse' : animate} width={'100%'} />
			<Skeleton sx={{ opacity: animate ? 1 : 0.35 }} animation={animate ? 'pulse' : animate} width={'100%'} />
			<Skeleton sx={{ opacity: animate ? 1 : 0.35 }} animation={animate ? 'pulse' : animate} width={'100%'} />
			<Skeleton sx={{ opacity: animate ? 1 : 0.35 }} animation={animate ? 'pulse' : animate} width={'100%'} />
			<Skeleton sx={{ opacity: animate ? 1 : 0.35 }} animation={animate ? 'pulse' : animate} width={'100%'} />
			<Skeleton sx={{ opacity: animate ? 1 : 0.35 }} animation={animate ? 'pulse' : animate} width={'100%'} />
			<Skeleton sx={{ opacity: animate ? 1 : 0.35 }} animation={animate ? 'pulse' : animate} width={'100%'} />
			<Skeleton sx={{ opacity: animate ? 1 : 0.35 }} animation={animate ? 'pulse' : animate} width={'100%'} />
			<Skeleton sx={{ opacity: animate ? 1 : 0.35 }} animation={animate ? 'pulse' : animate} width={'100%'} />
			<Skeleton sx={{ opacity: animate ? 1 : 0.35 }} animation={animate ? 'pulse' : animate} width={'100%'} />
		</Container>
	)
}

export default TypingBoxSkeleton
