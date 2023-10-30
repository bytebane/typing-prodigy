import { Box, Container, Typography } from '@mui/material'
import { createRef, useContext, useEffect, useMemo, useRef, useState } from 'react'
import './TypingBox.css'
import { generate } from 'random-words'
import { TimerContext } from '../../services/contexts/TimerContext/timerContext'
import { TypingResultData } from '../../services/contexts/TypingResultContext'

const TypingBox = () => {
	const timerData = useContext(TimerContext)

	//? Generate random words and memoizing them to prevent unnecessary re-renders
	const generatedWords = useMemo(() => {
		switch (timerData.timerDuration) {
			case 15:
				return generate({ exactly: 50, minLength: 5, maxLength: 9 })

			case 30:
				return generate({ exactly: 150, minLength: 5, maxLength: 9 })

			case 60:
				return generate({ exactly: 200, minLength: 5, maxLength: 9 })
			case 180:
				return generate({ exactly: 300, minLength: 5, maxLength: 9 })

			default:
				return generate({ exactly: 150, minLength: 5, maxLength: 9 })
		}
	}, [])

	const [typingWordIndex, setTypingWordIndex] = useState(0)
	const [typingCharIndex, setTypingCharIndex] = useState(0)

	const inputRef = useRef(null)

	const typingData = TypingResultData()

	//? References for each word
	const textSpanRefs = useMemo(() => {
		return Array(generatedWords.length)
			.fill(0)
			.map(() => createRef(null))
	}, [generatedWords])

	//? Set focus to the input field
	const focusInput = () => {
		inputRef.current.focus()
	}

	//? Set blur(unfocus) to the input field
	const unfocusInput = () => {
		inputRef.current.blur()
	}

	const handleInputFocus = () => {
		if (document.activeElement === inputRef.current) {
			textSpanRefs[typingWordIndex].current.childNodes[typingCharIndex].className = 'cursor'
		}
	}
	const handleInputBlur = () => {
		if (typingCharIndex === textSpanRefs[typingWordIndex].current.childNodes.length) {
			textSpanRefs[typingWordIndex].current.childNodes[typingCharIndex - 1].className = ''
		} else {
			textSpanRefs[typingWordIndex].current.childNodes[typingCharIndex].className = ''
		}
	}

	const handleTyping = (e) => {
		getTotalTypedData()
		//! If escape key is pressed remove focus
		if (e.key === 'Escape') {
			return unfocusInput()
		}
		//! If special keys eg  Tab, Home, End, etc are pressed do nothing
		if (e.key === 'Tab' || e.key === 'Home' || e.key === 'End' || e.key === 'PageUp' || e.key === 'PageDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter' || e.key === 'Delete' || e.key === 'Insert' || e.key === 'PrintScreen') {
			return e.preventDefault()
		}

		const prevCharNodeList = typingWordIndex > 0 && textSpanRefs[typingWordIndex - 1].current?.childNodes
		const currCharNodeList = textSpanRefs[typingWordIndex].current?.childNodes
		const nextCharNodeList = typingWordIndex < generatedWords.length - 1 && textSpanRefs[typingWordIndex + 1].current?.childNodes

		//? if space bar is pressed
		if (e.keyCode === 32) {
			//* if last character reached
			//* remove cursor from the last character
			//* else remove cursor from the current character
			if (typingCharIndex >= currCharNodeList.length) {
				currCharNodeList[typingCharIndex - 1].classList.remove('cursor-end')
			} else {
				currCharNodeList[typingCharIndex].classList.remove('cursor')
			}

			//* Add cursor to the next word
			if (typingWordIndex < generatedWords.length - 1) {
				nextCharNodeList[0].className = 'cursor'
			}

			setTypingCharIndex(0) //* reset the character index
			setTypingWordIndex((prev) => prev + 1) //* increment the word index
			return //* exit the function
		}

		//? if backspace key is pressed
		if (e.keyCode === 8) {
			if (typingCharIndex > 0) {
				//* if last character
				if (typingCharIndex === currCharNodeList.length) {
					//* if extra trailing character remove character and add cursor at the end of the previous character
					if (currCharNodeList[typingCharIndex - 1].className.includes('extra')) {
						currCharNodeList[typingCharIndex - 1].remove()
						currCharNodeList[typingCharIndex - 2].className += ' cursor-end'
					} else {
						currCharNodeList[typingCharIndex - 1].className = 'cursor'
					}
					setTypingCharIndex((prev) => prev - 1) //* decrement the character index
					return //* exit the function
				}

				currCharNodeList[typingCharIndex].className = '' //* remove all classes
				currCharNodeList[typingCharIndex - 1].className = 'cursor' //* add cursor to the previous character
				setTypingCharIndex((prev) => prev - 1) //* decrement the character index
			} else if (typingWordIndex > 0) {
				//* if first character and not the first word
				//* remove classes for current character
				currCharNodeList[typingCharIndex].className = ''
				//* add cursor to the last character of the previous word
				prevCharNodeList[prevCharNodeList.length - 1].className += ' cursor-end'
				//* decrement the word index
				setTypingWordIndex((prev) => prev - 1)
				//* set the character index to the last character of the previous word
				setTypingCharIndex(prevCharNodeList.length)
			}
			return //* exit the function
		}

		//? for end of current word and no space bar pressed
		//? append the new characters
		if (typingCharIndex === currCharNodeList.length) {
			let newCharNode = document.createElement('span')
			newCharNode.className = 'wrong-char cursor-end extra'
			newCharNode.textContent = e.key
			currCharNodeList[typingCharIndex - 1].classList.remove('cursor-end')
			textSpanRefs[typingWordIndex].current.appendChild(newCharNode)
			setTypingCharIndex((prev) => prev + 1)
			return
		}

		//? Correct/Wrong key pressed
		if (e.key === currCharNodeList[typingCharIndex]?.textContent) {
			currCharNodeList[typingCharIndex].className = 'correct-char'
		} else {
			currCharNodeList[typingCharIndex].className = 'wrong-char'
		}

		//? If end of word add cursor at the end of the word
		//? else add cursor to the next character
		if (typingCharIndex === currCharNodeList.length - 1) {
			currCharNodeList[typingCharIndex].className += ' cursor-end'
		} else {
			currCharNodeList[typingCharIndex + 1].className = 'cursor'
		}

		//* increment the character index
		setTypingCharIndex((prev) => prev + 1)
	}

	const getTotalTypedData = () => {
		typingData.setCorrectWordsTyped(
			textSpanRefs.reduce((acc, spanRef) => {
				if (spanRef.current?.childNodes.length === spanRef.current?.querySelectorAll('.correct-char').length) {
					acc++
				}
				return acc
			}, 0)
		)
		// typingData.setTotalWordsTyped(
		// 	textSpanRefs.reduce((acc, spanRef) => {
		// 		if (spanRef.current?.childNodes.length === spanRef.current?.querySelectorAll('.correct-char, .wrong-char').length) {
		// 			acc++
		// 		}
		// 		return acc
		// 	}, 0)
		// )

		typingData.setTotalWordsTyped(typingWordIndex + 1)

		typingData.setCorrectCharsTyped(0)
		typingData.setIncorrectCharsTyped(0)
		typingData.setTotalCharsTyped(0)
		typingData.setExtraCharsTyped(0)
		textSpanRefs.forEach((spanRef) => {
			typingData.setCorrectCharsTyped((prev) => prev + spanRef.current?.querySelectorAll('.correct-char').length)
			typingData.setIncorrectCharsTyped((prev) => prev + spanRef.current?.querySelectorAll('.wrong-char').length)
			typingData.setTotalCharsTyped((prev) => prev + spanRef.current?.querySelectorAll('.correct-char, .wrong-char, .extra').length)
			typingData.setExtraCharsTyped((prev) => prev + spanRef.current?.querySelectorAll('.extra').length)
		})
	}

	// useEffect(() => {
	// 	console.log(typingData.correctWordsTyped, typingData.correctCharsTyped, typingData.incorrectCharsTyped)
	// }, [typingData.correctWordsTyped, typingData.correctCharsTyped, typingData.incorrectCharsTyped])

	useEffect(() => {
		focusInput()
	}, [])

	return (
		<Container sx={{ my: 2, height: '90%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
			{/* Hidden input field to grab the user's input */}
			<input onFocus={handleInputFocus} onBlur={handleInputBlur} type='text' name='text' id='textbox' style={{ width: 0, height: 0, position: 'absolute', bottom: 0, left: 0, opacity: 0 }} ref={inputRef} onKeyDown={handleTyping} />

			{timerData.timeLeft <= 0 && console.log('Hola')}

			<Box onClick={focusInput} component={'div'} sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', columnGap: 1, flexWrap: 'wrap' }}>
				{generatedWords.map((word, word_index) => {
					{
						/* Mapping Each word from the generated words */
					}
					return (
						<Typography ref={textSpanRefs[word_index]} key={word_index} component={'span'} variant='h6' sx={{ color: 'text.secondary' }}>
							{word.split('').map((letter, letter_index) => {
								{
									/* Mapping Each Character from each mapped word */
								}
								return <span key={letter_index}>{letter}</span>
							})}
						</Typography>
					)
				})}
			</Box>
		</Container>
	)
}

export default TypingBox
