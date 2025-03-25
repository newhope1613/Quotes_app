import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import api from '../http/api.ts';

const AddQuote = () => {
	const [quote, setQuote] = useState<string>('');
	const [author, setAuthor] = useState<string>('');
	const [category, setCategory] = useState<string>('жизнь');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await api.post('quote/', {
				text: quote,
				author: author,
				category: category,
			});

			setQuote('');
			setAuthor('');
			setCategory('жизнь');
			console.log('Цитата создана');
		} catch (error) {
			console.error('Ошибка:', error);
			alert('Ошибка при добавлении цитаты');
		}
	};

	return (
		<Container className='mt-4'>
			<h2>Добавить цитату</h2>

			<Form onSubmit={handleSubmit}>
				<Form.Group className='mb-3'>
					<Form.Label>Цитата</Form.Label>
					<Form.Control
						type='text'
						value={quote}
						onChange={e => setQuote(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Label>Автор</Form.Label>
					<Form.Control
						type='text'
						value={author}
						onChange={e => setAuthor(e.target.value)}
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Label>Категория</Form.Label>
					<Form.Select
						value={category}
						onChange={e => setCategory(e.target.value)}
					>
						<option value='life'>Жизнь</option>
						<option value='motivation'>Мотивация</option>
						<option value='love'>Любовь</option>
						<option value='wisdom'>Мудрость</option>
					</Form.Select>
				</Form.Group>
				<Button variant='primary' type='submit' onClick={handleSubmit}>
					Добавить
				</Button>
			</Form>
		</Container>
	);
};

export default AddQuote;
