import { useEffect, useState } from 'react';
import './App.css';
type Card = {
	id: number;
	color: string;
	isGuest: boolean;
	showFront: boolean;
};
function App() {
	const [cards, setCards] = useState<Card[]>([]);
	const [first, setFirst] = useState<Card | null>(null);
	const [isActive, setIsActive] = useState(true);
	const shuffleArray = (array: string[]) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]]; // Zamiana elementów
		}
		return array;
	};
	useEffect(() => {
		const colors = ['blue', 'red', 'green', 'yellow'];
		const doubleColors = shuffleArray([...colors, ...colors]);
		setCards(
			doubleColors.map((color, index) => ({
				id: index,
				color,
				isGuest: false,
				showFront: false,
			}))
		);
	}, []);

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isActive) {
			return;
		}
		const cardsCopy = [...cards];
		const card = e.currentTarget;
		const index = Number(card.dataset.id);
		if (cards[index].isGuest) {
			return;
		}

		if (!first) {
			setFirst(cards[index]);
			cardsCopy[index].showFront = true;
			setCards(cardsCopy);
		} else if (first.id !== cards[index].id) {
			setIsActive(false);
			console.log(cards);
			cardsCopy[index].showFront = true;
			setCards(cardsCopy);
			if (first.color === cards[index].color) {
				setCards(
					[...cards].map((el: Card) => {
						if (el.id === first.id || el.id === cards[index].id) {
							return {
								...el,
								isGuest: true,
								showFront: false,
							};
						} else {
							return {
								...el,
								showFront: false,
							};
						}
					})
				);
				setFirst(null);
				setIsActive(true);
			} else {
				setTimeout(() => {
					setCards(
						[...cards].map((el: Card) => ({
							...el,
							showFront: false,
						}))
					);

					setFirst(null);
					setIsActive(true);
				}, 2000);
			}
		}
	};

	return (
		<>
			<h1>Memory Game</h1>
			<div className='container'>
				{cards.map((card) => (
					<div
						data-id={card.id}
						className='card'
						key={card.id}
						style={
							card.isGuest || card.showFront
								? { backgroundColor: card.color }
								: { backgroundColor: 'black' }
						}
						onClick={handleClick}
					></div>
				))}
			</div>
		</>
	);
}

export default App;
