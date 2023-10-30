import { addDoc, collection, getDocs } from 'firebase/firestore'
import { auth, dbFirestore } from '.'
import { toast } from 'react-toastify'

export const addResultsToDatabase = async ({ wpm, accuracy, correctChars, totalChars, correctWords, totalWords, extraChars }) => {
	if (wpm === 0 && accuracy === 0) {
		toast.error('Invalid Test! Please try again')
		return
	}
	if (auth.currentUser) {
		await addDoc(collection(dbFirestore, `users/${auth.currentUser.uid}/results`), {
			uid: auth.currentUser.uid,
			wpm,
			accuracy,
			chars: `${correctChars}/${totalChars}`,
			words: `${correctWords}/${totalWords}`,
			extraChars,
			createdAt: Date.now(),
		})
	} else {
		toast.error('Please login to save results')
	}
}

export const getResultsFromDatabase = async () => {
	if (auth.currentUser) {
		const data = await getDocs(collection(dbFirestore, `users/${auth.currentUser.uid}/results`))

		return data.docs.map((doc) => doc.data()).sort((a, b) => a.createdAt - b.createdAt)
	}
}
