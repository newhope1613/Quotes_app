import { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ADD_ROUTE } from '../utils/consts';
import api from '../http/api.ts';

const QuoteBox = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(ADD_ROUTE);
	};
	const [quote, setQuote] = useState<{
		id: number | null;
		text: string;
		author: string;
		category: string;
	}>({
		id: null,
		text: '',
		author: '',
		category: '',
	});
	const [prevQuoteId, setPrevQuoteId] = useState<number[]>([]);

	//Загружаем цитату
	const getNewQuote = async () => {
		try {
			let newQuote;
			do {
				const response = await api.get('/quote/random'); // Запрос случайной цитаты
				newQuote = response.data;
			} while (newQuote.id === prevQuoteId);

			setQuote(newQuote);
			setPrevQuoteId(newQuote.id);
		} catch (e) {
			console.error(e);
			setQuote({
				id: null,
				text: 'Не удалось загрузить цитату 😞',
				author: '',
				category: '',
			});
		}
	};

	//Удаляем цитату
	const removeQuote = async (id: number | null) => {
		try {
			if (id === null) return;
			const response = await api.delete(`quote/${id}`);

			console.log('Ответ сервера:', response.data);

			if (response.data.message) {
				console.log('Цитата успешно удалена');
				await getNewQuote();
			} else {
				console.warn('Неожиданный ответ от сервера:', response.data);
			}
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		getNewQuote();
	}, []);

	return (
		<Container
			className='d-flex justify-content-center align-items-center mb-2'
			style={{ height: '60vh' }}
		>
			<Card className='p-4 text-center shadow-lg' style={{ maxWidth: '600px' }}>
				<Card.Body>
					<Card.Text className='fs-4'>"{quote.text}"</Card.Text>
					<Card.Subtitle className='text-muted mt-2'>
						— {quote.author}
					</Card.Subtitle>
					<Card.Subtitle
						className='mt-2'
						style={{
							fontFamily: 'Roboto, sans-serif',
							fontSize: '15px',
							fontStyle: 'Italic',
						}}
					>
						{quote.category}
					</Card.Subtitle>
					<div className='mt-4'>
						<Button variant='primary' onClick={() => getNewQuote()}>
							🔄 Новая цитата
						</Button>
						<Button
							variant='outline-secondary'
							className='ms-2'
							onClick={handleClick}
						>
							➕ Добавить
						</Button>
						<Button
							variant='outline-secondary'
							className='ms-2'
							onClick={() => removeQuote(quote.id)}
						>
							➖ Удалить
						</Button>
					</div>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default QuoteBox;
