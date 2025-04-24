import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const Heading = () => {
  return (
    <Link to="/" className="no-underline flex items-center gap-2 group">
      <div className="bg-[var(--accent-color)] text-white p-1.5 rounded shadow-sm group-hover:shadow transition-all duration-300">
        <FileText size={20} />
      </div>
      <h1 className='text-[var(--accent-color)] font-bold text-xl flex items-center tracking-tight'>
        Zip<span className='text-[var(--text-primary)]'>TXT</span>
      </h1>
    </Link>
  );
}

export default Heading;