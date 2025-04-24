import { Button, Textarea } from "@mui/joy";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileEdit, SendHorizonal, InfoIcon } from "lucide-react";

const CreateText = () => {
	const navigate = useNavigate();
	const [content, setContent] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const createNewCode = async () => {
		if (!content.trim()) return;

		setIsLoading(true);
		try {
			const response = await axios.post("https://ziptxt-production.up.railway.app", {
				content: content,
			});
			navigate(`/${response.data.code}`);
		} catch (err) {
			console.error(err);
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full">
			<div className="bg-[var(--secondary-color)] px-8 py-8 rounded-lg shadow-sm border border-[var(--border-color)] transition-all hover:shadow-md">
				<div className="mb-6">
					<h2 className="text-2xl font-bold flex items-center gap-3 mb-2">
						<div className="bg-[var(--accent-color)] text-white p-1.5 rounded">
							<FileEdit size={20} />
						</div>
						<span>Create New Text Snippet</span>
					</h2>
					<p className="text-[var(--text-primary)] opacity-70">
						Enter your text below and click submit to generate a shareable link.
					</p>
				</div>

				<form
					className="flex flex-col"
					onSubmit={(event) => {
						event.preventDefault();
						createNewCode();
					}}
				>
					<Textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="Enter your text here..."
						required
						minRows={10}
						sx={{ 
							mb: 4,
							'--Textarea-focusedHighlight': 'var(--accent-color)',
							'--Textarea-focusedThickness': '2px',
							border: '1px solid var(--border-color)',
							fontSize: '16px',
							padding: '16px',
							transition: 'all 0.2s ease',
							backgroundColor: 'var(--input-bg)',
							color: 'var(--input-text)',
							'&:hover': {
								borderColor: 'var(--accent-color)',
							},
							'& .MuiTextarea-textarea::placeholder': {
								color: 'var(--input-text)',
								opacity: 0.6,
							}
						}}
					/>

					<div className="flex justify-between items-center">
						<div className="flex items-center text-sm opacity-70">
							<InfoIcon size={16} className="mr-2" />
							<span>Your text will be available for 24 hours</span>
						</div>
						<Button 
							type="submit" 
							loading={isLoading}
							disabled={!content.trim()}
							endDecorator={<SendHorizonal size={16} />}
							sx={{ 
								bgcolor: 'var(--accent-color)',
								color: 'white',
								'&:hover': {
									bgcolor: 'var(--accent-color)',
									filter: 'brightness(0.9)',
									boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
								},
								padding: '8px 16px',
								fontSize: '15px',
								fontWeight: '500',
								transition: 'all 0.2s ease',
							}}
						>
							Create Snippet
						</Button>
					</div>
				</form>
			</div>

			<div className="mt-8 px-8 py-6 bg-[var(--secondary-color)] rounded-lg border border-[var(--border-color)] transition-all hover:shadow-md">
				<h3 className="text-lg font-semibold mb-2">About ZipTXT</h3>
				<p className="text-[var(--text-primary)] opacity-70">
					ZipTXT is a simple tool for sharing text snippets quickly and easily. 
					Create a snippet and share the link with anyone you want to share your text with.
				</p>
			</div>
		</div>
	);
};

export default CreateText;
