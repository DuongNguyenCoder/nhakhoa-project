import { useEffect } from 'react';

function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null; // Không render gì ra UI
}

export default PageTitle;
