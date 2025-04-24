import {useParams, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Copy, Check, ExternalLink, ArrowLeft, Clock } from 'lucide-react';
import { Button, Alert } from '@mui/joy';
import axios from 'axios';

const ViewText = () => {
    const navigate = useNavigate()
    const {code} = useParams()
    const [text, setText] = useState("")
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getData = async() => {
            try{
                setLoading(true);
                const URL = `https://ziptxt-production.up.railway.app/${code}`;
				const response = await axios.get(URL);
				setText(response.data.content);
                setLoading(false);
            }catch(err){
                console.error(err);
                setError(true);
                setLoading(false);
            }
        }
        getData()
    }, [code])

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[40vh] w-full py-8">
                <div className="animate-pulse bg-[var(--secondary-color)] h-6 w-3/4 max-w-md rounded mb-4"></div>
                <div className="animate-pulse bg-[var(--secondary-color)] h-6 w-2/4 max-w-sm rounded mb-4"></div>
                <div className="animate-pulse bg-[var(--secondary-color)] h-6 w-1/3 max-w-xs rounded"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full py-6">
                <Alert
                    variant="soft"
                    color="danger"
                    sx={{ mb: 4, padding: '14px', fontSize: '15px' }}
                >
                    This text snippet does not exist or has expired.
                </Alert>
                
                <Button 
                    onClick={() => navigate('/')}
                    startDecorator={<ArrowLeft size={16} />}
                    sx={{ 
                        bgcolor: 'var(--accent-color)',
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
                    Create New Snippet
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="bg-[var(--secondary-color)] px-8 py-8 rounded-lg shadow-sm border border-[var(--border-color)] mb-8 transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <div className="bg-[var(--accent-color)] text-white p-1 rounded">
                            <Copy size={18} />
                        </div>
                        Text Snippet
                    </h2>
                    <div className="flex items-center text-sm opacity-70">
                        <Clock size={16} className="mr-2" />
                        <span>Available for 24 hours</span>
                    </div>
                </div>
                
                <div className="bg-[var(--bg-primary)] px-6 py-6 rounded border border-[var(--border-color)] mb-5 whitespace-pre-wrap">
                    {text}
                </div>
                
                <div className="flex justify-between items-center">
                    <Button
                        onClick={() => navigate('/')}
                        variant="outlined"
                        startDecorator={<ArrowLeft size={16} />}
                        sx={{ 
                            borderColor: 'var(--border-color)',
                            padding: '8px 16px',
                            fontSize: '15px',
                            fontWeight: '500',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                borderColor: 'var(--accent-color)',
                                boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                            }
                        }}
                    >
                        Create New
                    </Button>
                    
                    <div className="flex gap-3">
                        <Button
                            variant="outlined"
                            onClick={() => {
                                const url = window.location.href;
                                navigator.clipboard.writeText(url);
                            }}
                            startDecorator={<ExternalLink size={16} />}
                            sx={{ 
                                borderColor: 'var(--border-color)',
                                padding: '8px 16px',
                                fontSize: '15px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    borderColor: 'var(--accent-color)',
                                    boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                }
                            }}
                        >
                            Copy Link
                        </Button>
                        
                        <Button
                            onClick={copyToClipboard}
                            startDecorator={copied ? <Check size={16} /> : <Copy size={16} />}
                            sx={{ 
                                bgcolor: copied ? 'green' : 'var(--accent-color)',
                                '&:hover': {
                                    bgcolor: copied ? 'green' : 'var(--accent-color)',
                                    filter: 'brightness(0.9)',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                },
                                padding: '8px 16px',
                                fontSize: '15px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {copied ? 'Copied!' : 'Copy Text'}
                        </Button>
                    </div>
                </div>
            </div>
            
            <div className="px-8 py-6 bg-[var(--secondary-color)] rounded-lg border border-[var(--border-color)] text-center transition-all hover:shadow-md">
                <p className="text-[var(--text-primary)] opacity-70">
                    Share this link with anyone you want to share this text with.
                </p>
            </div>
        </div>
    );
}
export default ViewText

