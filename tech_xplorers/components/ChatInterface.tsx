import React, { useState, useRef, useEffect } from 'react';
import Message from '@/components/Message';
import { sendToClaude } from '@/components/Ailogic';
import axios from 'axios'; // Import axios for making HTTP requests

const ChatInterface: React.FC = () => {
	const [messages, setMessages] = useState<{ content: string; timestamp: Date; isUser: boolean }[]>([]);
	const [inputMessage, setInputMessage] = useState<string>('');

	const messageEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Scroll to the bottom of the message area when new messages are added
		if (messageEndRef.current) {
			messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages]);

	const handleSendMessage = async () => {
		if (inputMessage.trim() !== '') {
			// Add user message to message list
			const userMessage = { content: inputMessage, timestamp: new Date(), isUser: true };
			setMessages([...messages, userMessage]);

			// Clear input field
			setInputMessage('');

			try {
				const apiKey = process.env.ANTHROPIC_API_KEY; // Fetch from environment variable
				if (!apiKey) {
					console.error('API key is not defined.');
					return;
				}

				const response = await sendToClaude(inputMessage, apiKey);

				const botResponse = { content: response, timestamp: new Date(), isUser: false };
				setMessages([...messages, botResponse]);
			} catch (error) {
				console.error('An error occurred while sending message to Claude:', error);
			}
		}
	};

	return (
		<div className="flex flex-col h-screen ">
			<div className="flex-1 overflow-y-scroll bg-gray-400 px-4 py-6">
				<div className="space-y-4">
					{messages.map((message, index) => (
						<Message key={index} content={message.content} isUserMessage={message.isUser} />
					))}
					{/* Empty div to scroll to bottom */}
					<div ref={messageEndRef}></div>
				</div>
			</div>
			<div className="bg-white border-t border-gray-200 px-4 py-2 fixed bottom-0 w-full">
				<div className="flex">
					<input
						type="text"
						value={inputMessage}
						onChange={(e) => setInputMessage(e.target.value)}
						placeholder="Type your message..."
						className="flex-1 px-2 py-1 rounded-l border border-gray-300 focus:outline-none"
					/>
					<button
						onClick={handleSendMessage}
						className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none"
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChatInterface;
